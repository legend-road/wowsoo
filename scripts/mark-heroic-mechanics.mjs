/**
 * 为 10H brief.mechanics（及旧 skills）写入 heroic 标记。
 * 兼容 name: "..." 与 "name": "..." 两种写法。
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import vm from "vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = join(root, "h10-data.js");

/** bossId → { 名称包含关键字: true | "diff" } */
const MARKS = {
  immerseus: {
    肿胀腐蚀: true,
    煞能之池: true,
  },
  protectors: {
    "洛克：腐化酒桶": "diff",
    "何：锁喉": "diff",
    "孙：灾祸": "diff",
    "洛克绝命": "diff",
    "孙绝命：黑暗冥想": "diff",
  },
  pride: {
    放逐: true,
    裂隙: true,
  },
  galakras: {
    "塔楼步兵 / 爆破专家": "diff",
  },
  juggernaut: {
    地雷: "diff",
    攻城模式: "diff",
  },
  shaman: {
    // 「胜负条件」全文件重名多，禁止用全局 name patch；见下方上下文替换
  },
  nazgrim: {
    "【<10%】斩杀阶段": "diff",
    斩杀: "diff",
    破坏者: "diff",
    增援波: "diff",
  },
  malkorok: {
    内爆能量: "diff",
    精华球: "diff",
  },
  spoils: {
    不稳火花: true,
    物质扰乱: true,
  },
  thok: {
    锁定: "diff",
    "狱卒 / 囚犯": "diff",
    "毒 / 冰 / 火": true,
  },
  blackfuse: {
    装配传送带: "diff",
    过载武器: "diff",
  },
  paragons: {
    瞄准: "diff",
  },
  garrosh: {
    "间奏（能量 <25）": true,
    强化旋风小怪: true,
    恶意: "diff",
    "轰炸 → 铁星打断": "diff",
  },
};

function cleanName(name) {
  return name
    .replace(/^【英雄】/, "")
    .replace(/\s*【英雄】$/, "")
    .replace(/【英雄】/g, "")
    .trim();
}

function resolveFlag(bossId, name) {
  const table = MARKS[bossId];
  if (!table) return null;
  const cleaned = cleanName(name);
  let flag = /【英雄】/.test(name) ? true : null;
  const keys = Object.keys(table).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    if (cleaned.includes(key) || name.includes(key)) {
      flag = table[key];
      break;
    }
  }
  return flag;
}

function flagLiteral(flag) {
  return flag === "diff" ? '"diff"' : "true";
}

/**
 * 在任意 name 字段后写入/更新 heroic；同时清理【英雄】字样。
 * 用 AST 式扫描：找到 mechanics/skills 数组里的对象更稳，但文件混用引号，
 * 这里对整文件所有匹配 name 行做替换，依赖 plan 里的精确全名。
 */
function patchAll(src, exactName, flag) {
  const display = cleanName(exactName);
  const esc = exactName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // name: "X", 或 "name": "X",
  // 后面可能已有 heroic 行（各种缩进）
  const re = new RegExp(
    `([\\t ]*)(?:"name"|name)\\s*:\\s*"${esc}"\\s*,` +
      `(?:\\s*\\n\\s*heroic\\s*:\\s*(?:true|"diff")\\s*,)?`,
    "g"
  );
  let count = 0;
  const out = src.replace(re, (match, indent) => {
    count += 1;
    return `${indent}name: "${display}",\n${indent}heroic: ${flagLiteral(flag)},`;
  });
  return { out, count, display };
}

const raw = readFileSync(dataPath, "utf8");
const ctx = { window: {} };
vm.runInNewContext(raw, ctx);

const plan = [];
const seen = new Set();
for (const b of ctx.window.SOO_H10.bosses) {
  const lists = [...(b.brief?.mechanics || []), ...(b.skills || [])];
  for (const m of lists) {
    const flag = resolveFlag(b.id, m.name);
    if (!flag) continue;
    // 禁止对短名「胜负条件」做全局替换（多 Boss 重名）
    if (cleanName(m.name) === "胜负条件") continue;
    const planKey = `${m.name}::${flag}`;
    if (seen.has(planKey)) continue;
    seen.add(planKey);
    plan.push({ name: m.name, flag });
  }
}

// 胜负条件只标 shaman，不要全局 patch「胜负条件」
// 上面 plan 用的是全名；shaman 是「胜负条件」，immerseus 是「胜负条件（先讲清）」——OK

let next = raw;
const report = [];
for (const item of plan) {
  // 对「胜负条件」单独限制：只在 shaman 段替换太难，改为在验证后手工补
  const { out, count, display } = patchAll(next, item.name, item.flag);
  if (count === 0) {
    report.push(`MISS: ${item.name}`);
    continue;
  }
  next = out;
  report.push(
    `OK: ${display} → ${item.flag === "diff" ? "H加强" : "H特有"} (×${count})`
  );
}

// shaman 胜负条件：精确替换 brief 里带共享血描述的那几处
// 用更精确上下文
{
  const re =
    /("name"|name):\s*"胜负条件",(\s*\n\s*heroic:\s*(?:true|"diff"),)?(\s*\n\s*(?:"phase"|phase):\s*"总则",\s*\n\s*(?:"who"|who):\s*"全团",\s*\n\s*(?:"dmg"|dmg):\s*"—",\s*\n\s*(?:"detail"|detail):\s*"双 Boss 共享血)/g;
  let n = 0;
  next = next.replace(re, (m, nameKey, _oldH, rest) => {
    n += 1;
    return `name: "胜负条件（共享生命）",\n            heroic: true,${rest}`;
  });
  report.push(n ? `OK: shaman 胜负条件 → H特有 (×${n})` : "MISS: shaman 胜负条件上下文");
}

writeFileSync(dataPath, next);

const ctx2 = { window: {} };
vm.runInNewContext(next, ctx2);
let only = 0;
let diff = 0;
for (const b of ctx2.window.SOO_H10.bosses) {
  const tags = [];
  for (const m of b.brief?.mechanics || []) {
    if (m.heroic === "diff") {
      diff++;
      tags.push(`H加强:${m.name}`);
    } else if (m.heroic) {
      only++;
      tags.push(`H特有:${m.name}`);
    }
  }
  if (tags.length) console.log(b.id, "→", tags.join(", "));
}
console.log(report.join("\n"));
console.log(`\nbrief.mechanics: H特有 ${only}, H加强 ${diff}`);
