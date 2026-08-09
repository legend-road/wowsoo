/**
 * 从 h10-data.js 生成团长战前安排 brief-data.js
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import vm from "vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ctx = { window: {} };
vm.runInNewContext(readFileSync(join(root, "h10-data.js"), "utf8"), ctx);
const bosses = ctx.window.SOO_H10.bosses;

function pullLine(b) {
  const br = b.brief;
  const checks = br.checks || [];
  const head = checks.slice(0, 2).join("；");
  const lust =
    (br.roster || []).find((r) => /嗜血/.test(r)) ||
    (br.defensives || []).find((d) => /嗜血/.test(d.when || "") || /嗜血/.test(d.detail || ""));
  const lustHint = lust
    ? typeof lust === "string"
      ? lust.replace(/^嗜血[：:]?\s*/, "嗜血：")
      : `嗜血：${lust.when || ""}`.replace(/嗜血：\s*$/, "见减伤表")
    : "";
  const bits = [head, lustHint].filter(Boolean);
  return bits.length ? bits.join(" → ") + " → 开打" : "确认编制与检查项 → 开打";
}

function assign(b) {
  const br = b.brief;
  const out = [...(br.roster || []), ...(br.checks || [])];
  // 去重并截断过长
  const seen = new Set();
  return out
    .map((t) => String(t).trim())
    .filter((t) => {
      if (!t || seen.has(t)) return false;
      seen.add(t);
      return true;
    })
    .slice(0, 8);
}

function positions(b) {
  const br = b.brief;
  const pts = [];
  for (const p of br.positions || []) {
    const phase = p.phase ? `【${p.phase}】` : "";
    for (const point of (p.points || []).slice(0, 2)) {
      pts.push(phase ? `${phase}${point}` : point);
    }
  }
  return pts.slice(0, 8);
}

function timeline(b) {
  const br = b.brief;
  const items = [];
  const tl = br.timeline?.length ? br.timeline : b.timeline || [];
  if (tl.length) {
    for (const t of tl.slice(0, 8)) {
      items.push(`${t.t} ${t.a}`);
    }
  }
  // 减伤要点（补在轴后）
  for (const d of (br.defensives || []).slice(0, 4)) {
    const when = d.when || d.phase || "";
    const detail = (d.detail || "").split("。")[0];
    if (when && detail) items.push(`减伤·${when}：${detail}`);
  }
  // 无时间轴时用 flow 摘要
  if (!tl.length) {
    for (const f of (br.flow || []).slice(0, 4)) {
      const title = f.title || f.phase || "";
      const step = (f.steps || [])[0];
      if (title && step) items.push(`${title}：${step}`);
    }
  }
  const seen = new Set();
  return items
    .filter((t) => {
      if (seen.has(t)) return false;
      seen.add(t);
      return true;
    })
    .slice(0, 10);
}

const manualPull = {
  immerseus:
    "半场就位 → 免疫者起手消肿胀、报 4 层停手、P2 分向、踩池、旋涡减伤 → 嗜血开场",
  protectors:
    "报绝命序洛克→何→孙 → 印记传递链 + 灾祸减伤表 → 嗜血开场",
  norushen:
    "报试炼波次与虚空分配 → 约定 50% 前完成计划 → 开打（嗜血约 50%）",
  pride:
    "Boss 朝诺鲁什 + 标定监狱左/对角与赐福黄点 → 背一遍迷宫 → 开打（嗜血 30%）",
  galakras:
    "找洛瑟玛开打 → 确认塔队/炮手/步兵专人 → 地面木栏间就位（嗜血 P2）",
  juggernaut:
    "突击禁正面就位 → 副坦点雷 + 攻城三次减伤表 → 嗜血开场",
  shaman:
    "标定两组世界标记 → 清狼后 85% 前分边 → 铁监牢满血盾（嗜血约 25%）",
  nazgrim:
    "报防御停手纪律 + 小怪优先级 → Boss 靠刷新侧 → 开打（嗜血 <10%）",
  malkorok:
    "提醒 P1 按盾抬血 → 内爆必踩 / 吐息必出 → 嗜血开场（约 6 分钟狂暴）",
  spoils:
    "左右两组同时进 → 报能量组合与火花传递人 → 开打（约 4.5 分钟）",
  thok:
    "报监狱绿→蓝→红 + 致死再吃 → 啸次数专人 → 嗜血开场",
  blackfuse:
    "报上带名单 + 波次拆装表（多数打雷；3/11 打飞弹；6 打一个雷）→ 伐木机 35 码 → 嗜血开场（约 12% 停带）",
  paragons:
    "报九人击杀序 + 瞄准/琥珀/彩毒 → EAB 拾取即报 → 开打（嗜血常给夏克里尔）",
  garrosh:
    "报能量 <25 进间奏 + 西工程师优先 → P4 铁星打断分工 → 开打（嗜血约 10%）",
};

const brief = bosses.map((b) => {
  const br = b.brief;
  return {
    id: b.id,
    pull: manualPull[b.id] || pullLine(b),
    assign: assign(b),
    positions: positions(b),
    timeline: timeline(b),
    callouts: [...(br.callouts || [])],
    redlines: [...(br.redlines || [])],
  };
});

const out = `/* SOO 团长战前安排 — 依据 10H 攻略自动整理，开打前喊话清单 */
window.SOO_BRIEF = ${JSON.stringify(brief, null, 2)};
`;

writeFileSync(join(root, "brief-data.js"), out);
console.log("wrote", brief.length, "bosses");
brief.forEach((b) => {
  console.log(b.id, "assign", b.assign.length, "pos", b.positions.length, "tl", b.timeline.length);
});
