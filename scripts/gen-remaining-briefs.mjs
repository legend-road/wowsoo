/**
 * Generate brief templates + position diagrams for SOO bosses 6–14.
 * Usage: node scripts/gen-remaining-briefs.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";
import { BOSSES_9_14 } from "./briefs-9-to-14.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "h10-data.js");
const DRAWIO =
  "/Applications/draw.io.app/Contents/MacOS/draw.io";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function panelText(lines) {
  return esc(lines.join("\n")).replace(/\n/g, "&#xa;&nbsp;&#xa;");
}

/** Minimal consistent dark diagram: title + warn + left panel + center cards */
function makeDrawio({ id, pages }) {
  const diagrams = pages
    .map((p, pi) => {
      const cells = [];
      let n = 10;
      const add = (val, style, x, y, w, h) => {
        const cid = `c${pi}_${n++}`;
        cells.push(
          `        <mxCell id="${cid}" value="${val}" style="${style}" parent="1" vertex="1">
          <mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry" />
        </mxCell>`
        );
      };
      add(
        "",
        "rounded=0;whiteSpace=wrap;html=1;fillColor=#0B1220;strokeColor=none;",
        0,
        0,
        1240,
        900
      );
      add(
        esc(p.title),
        "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontColor=#F8FAFC;fontSize=26;fontStyle=1;",
        40,
        16,
        1100,
        44
      );
      add(
        esc(p.sub),
        "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;fontColor=#94A3B8;fontSize=18;",
        40,
        60,
        1100,
        34
      );
      add(
        esc("⚠ " + p.warn),
        "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontColor=#FBBF24;fontSize=18;fontStyle=1;",
        40,
        96,
        1100,
        34
      );
      add(
        `&lt;b&gt;【要点】&lt;/b&gt;&#xa;&nbsp;&#xa;${panelText(p.points)}`,
        "rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#64748B;align=left;verticalAlign=top;spacing=16;fontColor=#F1F5F9;fontSize=18;",
        40,
        150,
        340,
        520
      );
      if (p.side) {
        add(
          `&lt;b&gt;【注意】&lt;/b&gt;&#xa;&nbsp;&#xa;${panelText(p.side)}`,
          "rounded=1;whiteSpace=wrap;html=1;fillColor=#422006;strokeColor=#F59E0B;align=left;verticalAlign=top;spacing=16;fontColor=#FDE68A;fontSize=18;",
          40,
          690,
          340,
          170
        );
      }
      // center stage cards
      const cards = p.cards || [];
      cards.forEach((c, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 420 + col * 380;
        const y = 160 + row * 160;
        add(
          `&lt;b&gt;${esc(c.title)}&lt;/b&gt;&#xa;&nbsp;&#xa;${esc(c.body)}`,
          `rounded=1;whiteSpace=wrap;html=1;fillColor=${c.fill || "#1E293B"};strokeColor=${c.stroke || "#94A3B8"};align=left;verticalAlign=top;spacing=14;fontColor=#F1F5F9;fontSize=17;`,
          x,
          y,
          350,
          140
        );
      });
      if (p.footer) {
        add(
          esc(p.footer),
          "rounded=1;whiteSpace=wrap;html=1;fillColor=#14532D;strokeColor=#22C55E;align=left;verticalAlign=middle;spacing=12;fontColor=#BBF7D0;fontSize=17;",
          420,
          740,
          730,
          110
        );
      }
      return `  <diagram id="${id}-p${pi + 1}" name="${esc(p.name)}">
    <mxGraphModel dx="1400" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1240" pageHeight="900" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
${cells.join("\n")}
      </root>
    </mxGraphModel>
  </diagram>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" agent="wowsoo" version="22.1.0" type="device">
${diagrams}
</mxfile>
`;
}

function mech(name, phase, who, dmg, detail) {
  return { name, phase, who, dmg, detail };
}

const BOSSES = [
  {
    id: "juggernaut",
    folder: "juggernaut",
    pngPrefix: "juggernaut",
    tipsKey: `      tips10: [
        "10H 建议 2/3/5，攻城治疗压力大。",
        "先吃 2 层灼燃再点雷可优化换坦节奏。",
        "攻城击退方向预留安全落点。",
        "弹射锯刃轨迹要提前让出。",
      ],
    },
    {
      id: "shaman",`,
    brief: {
      roster: ["2 坦 · 3 治疗 · DPS 5", "嗜血：开场突击交", "10H 攻城压力大，建议 3 奶"],
      checks: [
        "突击站位：禁正面；远程左约 8 码，近战身后",
        "副坦点雷职责；灼燃约 3 层换坦表",
        "攻城集合标记 + 三次震荡波减伤顺序",
        "切割激光点名：路径远离沥青",
      ],
      mechanics: [
        mech("胜负条件", "总则", "全团", "—", "突击约 2 分钟 ↔ 攻城约 1 分钟循环至击杀。突击躲正面机械；攻城集合吃震荡波击退以跳过迫击炮弹幕。"),
        mech("突击模式", "突击", "全员", "钻头/迫击炮/锯刃：物理向高伤；正面扫射致死", "约 2 分钟。禁站正面。远程左约 8 码、近战身后。躲钻头、迫击炮、弹射锯刃；注意激光灼烧。"),
        mech("灼燃装甲", "突击", "坦克", "坦职 Debuff，叠层增伤", "约 3 层嘲讽换坦。可先叠 2 层再穿插点雷。"),
        mech("地雷", "全程", "副坦", "拆除约 150 万物理", "约 30 秒一次。未激活坦点击拆除。"),
        mech("攻城模式", "攻城", "全员", "震荡波：魔法团伤+击退；迫击炮弹幕高伤", "约 1 分钟。集合吃震荡波击退，借击退远离以跳过弹幕。"),
        mech("地震活动", "攻城", "全员", "地面持续伤", "保持移动/出圈。"),
        mech("切割激光", "攻城", "点名", "火焰路径；点燃沥青会蔓延扩大", "把激光路径带离沥青。"),
        mech("震荡波（攻城）", "攻城", "治疗/减伤", "约三次高团伤", "排团队减伤；配合击退站位。"),
      ],
      positions: [
        {
          phase: "突击站位",
          diagram: { caption: "禁正面；远程左 8 码、近战身后；副坦点雷；灼燃 3 换坦。", img: "assets/juggernaut-p1-assault.png", alt: "钢铁战蝎突击站位" },
          points: ["嗜血开场。", "严格躲钻头/炮弹/锯刃。", "副坦约 30 秒点雷。", "灼燃约 3 层换坦。"],
        },
        {
          phase: "攻城站位",
          diagram: { caption: "集合吃震荡波击退躲弹幕；地震出圈；激光离沥青；三次减伤。", img: "assets/juggernaut-p2-siege.png", alt: "钢铁战蝎攻城站位" },
          points: ["听集合标记。", "借击退远离 Boss。", "激光点名拉离沥青。", "输出可偏保守保活。"],
        },
        {
          phase: "循环轴",
          diagram: { caption: "突击约 2 分 ↔ 攻城约 1 分，重复至击杀。", img: "assets/juggernaut-p3-cycle.png", alt: "钢铁战蝎循环轴" },
          points: ["~0:30 点雷/换坦窗。", "~2:00 转攻城。", "攻城三次震荡波。", "~3:00 回突击。"],
        },
      ],
      defensives: [
        { when: "开场嗜血", who: "全团", detail: "突击开场交。" },
        { when: "攻城三次震荡波", who: "治疗团减", detail: "按表排屏障/虔诚/个人大红。" },
        { when: "点雷", who: "副坦", detail: "约 150 万物理，自保减伤。" },
        { when: "锯刃/迫击炮", who: "治疗", detail: "突击持续抬压。" },
      ],
      flow: [
        { title: "突击", steps: ["嗜血；死守站位躲机械。", "副坦点雷；灼燃 3 换坦。"] },
        { title: "攻城", steps: ["集合吃击退躲弹幕。", "地震出圈；激光离沥青；三次减伤。"] },
        { title: "循环至击杀", steps: ["重复突击↔攻城。"] },
      ],
      timelineNote: "突击约 2 分钟，攻城约 1 分钟。",
      timeline: [
        { t: "0:00", a: "突击；嗜血" },
        { t: "~0:30", a: "地雷；灼燃换坦" },
        { t: "~2:00", a: "转攻城；集合震荡波" },
        { t: "攻城中", a: "地震 / 激光 / 三次减伤" },
        { t: "~3:00", a: "回突击" },
      ],
      roles: {
        tank: ["突击不让正面扫人；灼燃换坦；副坦点雷。", "攻城带好击退落点。"],
        dps: ["站位死守；激光点名拉走。", "攻城可降输出保活。"],
        healer: ["突击抬锯刃/炮弹；攻城三次震荡波减伤表。", "点雷坦瞬间伤。"],
      },
      callouts: ["「突击站位」", "「点雷」", "「换坦」", "「攻城集合」", "「震荡波减伤」", "「激光拉走」"],
      redlines: ["站 Boss 正面", "无人点雷", "攻城不集合硬吃弹幕", "切割激光点燃沥青", "灼燃层数不过来"],
    },
    pages: [
      {
        name: "1-突击",
        title: "钢铁战蝎 — 突击站位",
        sub: "约 2 分钟 · 禁正面 · 远程左 8 码 · 近战身后",
        warn: "正面扫射/钻头/锯刃可秒；副坦负责点雷",
        points: ["禁站正面", "远程左侧约 8 码", "近战身后", "躲钻头/迫击炮/锯刃", "灼燃约 3 层换坦", "约 30 秒点雷"],
        side: ["嗜血开场交", "10H 建议 3 奶"],
        cards: [
          { title: "主坦", body: "拉 Boss 使正面远离大团", fill: "#7F1D1D", stroke: "#FCA5A5" },
          { title: "副坦", body: "点地雷（约 150 万物理）；换坦", fill: "#7F1D1D", stroke: "#FCA5A5" },
          { title: "远程", body: "Boss 左侧约 8 码输出", fill: "#7C2D12", stroke: "#FB923C" },
          { title: "近战", body: "Boss 身后，注意锯刃轨迹", fill: "#1E3A5F", stroke: "#38BDF8" },
        ],
        footer: "突击结束 → 听集合转攻城",
      },
      {
        name: "2-攻城",
        title: "钢铁战蝎 — 攻城站位",
        sub: "约 1 分钟 · 集合吃震荡波击退 · 借机远离躲弹幕",
        warn: "不集合会被迫击炮弹幕打穿；激光勿点燃沥青",
        points: ["集合标记站位", "吃震荡波击退", "借击退远离 Boss", "地震地面出圈", "激光路径离沥青", "三次震荡波交减伤"],
        side: ["输出可偏保守", "保活优先"],
        cards: [
          { title: "震荡波 ×3", body: "高团伤；排团队减伤", fill: "#422006", stroke: "#F59E0B" },
          { title: "切割激光", body: "点名把路径带离沥青", fill: "#7F1D1D", stroke: "#FCA5A5" },
          { title: "地震", body: "地面效果，保持移动", fill: "#1E293B", stroke: "#94A3B8" },
          { title: "点雷仍在", body: "攻城阶段继续拆雷", fill: "#1E3A5F", stroke: "#38BDF8" },
        ],
        footer: "攻城结束 → 回突击循环至击杀",
      },
      {
        name: "3-循环",
        title: "钢铁战蝎 — 循环轴",
        sub: "突击 2 分 ↔ 攻城 1 分",
        warn: "站位失误比输出不够更容易灭",
        points: ["0:00 突击+嗜血", "~0:30 雷/换坦", "~2:00 攻城", "攻城三次减伤", "~3:00 回突击"],
        cards: [
          { title: "红线", body: "正面 / 无人点雷 / 不集合 / 点燃沥青", fill: "#450A0A", stroke: "#EF4444" },
          { title: "目标", body: "循环稳定推进至击杀", fill: "#14532D", stroke: "#22C55E" },
        ],
        footer: "编制建议：2 坦 · 3 奶 · 5 DPS",
      },
    ],
  },
];

// Due to file size, remaining bosses appended below in same structure via push
function pushBoss(b) {
  BOSSES.push(b);
}

pushBoss({
  id: "shaman",
  folder: "shaman",
  pngPrefix: "shaman",
  tipsKey: `      tips10: [
        "编制偏 3/3/4，分边奶量要够。",
        "剧毒风暴用建筑物卡视角/路径。",
        "污秽洪流站定比走位更重要。",
        "灰烬之墙预留下坡集合点。",
      ],
    },
    {
      id: "nazgrim",`,
  brief: {
    roster: ["3 坦 · 3 治疗 · DPS 4", "嗜血：约 25%", "卡组远程 / 哈组近战"],
    checks: [
      "开场先清狼，85% 前必须分边完成",
      "卡德里斯：1 坦 1 奶 + 远程；铁监牢满血盾",
      "哈洛姆：2 坦 2 奶 + 近战；铁墓放坡沿",
      "两边共享血压同步；灰烬墙下坡集合点",
    ],
    mechanics: [
      mech("胜负条件", "总则", "全团", "—", "双 Boss 共享血。清狼后分边；85% 前必须拉开。卡德里斯远程组、哈洛姆近战组，同步击杀。"),
      mech("狼", "开场", "全团", "物理", "优先击杀再分边。"),
      mech("铁监牢（卡）", "分边", "卡组坦/减伤", "按满血承伤准备的高伤", "约 1 分钟一次；必须盾/减伤。"),
      mech("剧毒风暴（卡）", "分边", "卡组", "自然向范围", "圆形风暴，绕建筑躲避。"),
      mech("污秽喷泉（卡）", "分边", "卡组", "刷软泥", "尽快清理。"),
      mech("铁墓（哈）", "分边", "哈组治疗", "点名占地", "点到治疗时在坡道边缘释放，少挡路。"),
      mech("污秽洪流（哈）", "分边", "哈组点名", "直线扫射", "站定，勿乱跑扫多人。"),
      mech("剧毒之雾（哈）", "分边", "哈组", "自然 DoT/团压", "排减伤与驱散。"),
      mech("灰烬之墙 / 坠落灰烬", "全程", "全员", "墙逼位；坠落灰烬全团伤", "墙来沿坡下移；坠落交减伤。"),
    ],
    positions: [
      {
        phase: "开场清狼",
        diagram: { caption: "集火狼 → 拉向分边路线；85% 前两组就位。", img: "assets/shaman-p1-wolves.png", alt: "黑暗萨满开场" },
        points: ["先清狼。", "规划分边路线。", "85% 前必须分开。", "标定两边世界标记。"],
      },
      {
        phase: "分边站位",
        diagram: { caption: "卡：远程+躲风暴+铁监牢；哈：近战+铁墓靠边+洪流站定。", img: "assets/shaman-p2-split.png", alt: "黑暗萨满分边" },
        points: ["卡组利用建筑躲风暴。", "哈组铁墓放坡沿。", "洪流站定。", "共享血同步。"],
      },
      {
        phase: "灰烬与斩杀",
        diagram: { caption: "灰烬墙下坡重站；约 25% 嗜血；注意坠落灰烬窗。", img: "assets/shaman-p3-ash.png", alt: "黑暗萨满灰烬" },
        points: ["墙来下坡。", "坠落灰烬预减伤。", "25% 嗜血。", "两边输出别严重脱节。"],
      },
    ],
    defensives: [
      { when: "铁监牢", who: "卡组", detail: "按满血承伤准备盾/减伤。" },
      { when: "坠落灰烬", who: "全团", detail: "预交团减。" },
      { when: "约 25% 嗜血", who: "全团", detail: "斩杀窗口。" },
      { when: "毒雾/洪流", who: "哈组治疗", detail: "热点+减伤。" },
    ],
    flow: [
      { title: "开场", steps: ["集火狼；拉向分边。", "85% 前两组就位。"] },
      { title: "分边持续", steps: ["卡：风暴/喷泉/铁监牢。", "哈：铁墓/洪流/毒雾/墙下坡。", "同步共享血。"] },
      { title: "斩杀", steps: ["约 25% 嗜血；注意灰烬窗。"] },
    ],
    timelineNote: "共享血；85% 前分边是硬节点。",
    timeline: [
      { t: "开场", a: "清狼" },
      { t: "<85%", a: "必须分边完成" },
      { t: "~1:00", a: "铁监牢窗" },
      { t: "墙", a: "下坡重站" },
      { t: "25%", a: "嗜血" },
    ],
    roles: {
      tank: ["卡组单坦控位躲风暴；哈组双坦分摊与墓位。", "灰烬墙带队下移。"],
      dps: ["远程去卡、近战去哈。", "清泥；同步共享血。"],
      healer: ["每边都有奶；铁监牢/坠落预减伤。", "哈组被点铁墓时主动靠边。"],
    },
    callouts: ["「清狼」", "「分边」", "「铁监牢盾」", "「风暴躲楼」", "「铁墓靠边」", "「洪流站定」", "「墙：下坡」", "「25% 嗜血」"],
    redlines: ["85% 仍叠在一起", "铁监牢无盾", "铁墓堵坡道", "洪流移动扫团", "两边输出严重不同步"],
  },
  pages: [
    {
      name: "1-开场",
      title: "黑暗萨满 — 开场清狼",
      sub: "先集火狼，再分边；85% 前必须拉开",
      warn: "85% 仍叠在一起会迅速失控",
      points: ["集火狼", "规划分边路线", "卡组=远程", "哈组=近战", "标定世界标记"],
      cards: [
        { title: "卡德里斯组", body: "1 坦 1 奶 + 远程", fill: "#1E3A5F", stroke: "#38BDF8" },
        { title: "哈洛姆组", body: "2 坦 2 奶 + 近战", fill: "#14532D", stroke: "#22C55E" },
      ],
      footer: "共享血条 — 两边输出尽量同步",
    },
    {
      name: "2-分边",
      title: "黑暗萨满 — 分边站位",
      sub: "卡躲风暴清泥扛铁监牢 · 哈铁墓靠边洪流站定",
      warn: "铁监牢无盾、洪流乱跑是常见灭点",
      points: ["卡：风暴绕建筑", "卡：喷泉清泥", "卡：铁监牢满血盾", "哈：铁墓坡沿", "哈：洪流站定", "哈：毒雾减伤"],
      cards: [
        { title: "铁监牢", body: "约 1 分钟；按满血承伤准备", fill: "#450A0A", stroke: "#EF4444" },
        { title: "铁墓", body: "治疗被点时靠边放", fill: "#422006", stroke: "#F59E0B" },
      ],
      footer: "两边血量差过大时指挥控手",
    },
    {
      name: "3-灰烬",
      title: "黑暗萨满 — 灰烬与斩杀",
      sub: "墙来下坡 · 坠落灰烬减伤 · 25% 嗜血",
      warn: "墙把人卡死在坡上会导致灭团",
      points: ["灰烬墙沿坡下移", "坠落灰烬预减伤", "约 25% 嗜血", "保持分边同步"],
      cards: [
        { title: "灰烬之墙", body: "带队下坡重新站位", fill: "#422006", stroke: "#F59E0B" },
        { title: "25% 嗜血", body: "斩杀窗口", fill: "#14532D", stroke: "#22C55E" },
      ],
      footer: "编制建议：3 坦 · 3 奶 · 4 DPS",
    },
  ],
});

// Continue with remaining bosses in a second file write via append - actually keep going in this file
pushBoss({
  id: "nazgrim",
  folder: "nazgrim",
  pngPrefix: "nazgrim",
  tipsKey: `      tips10: [
        "错误输出会喂怒气，防御停手是硬纪律。",
        "斩杀血量高，风筝质量决定能否吃满嗜血。",
        "狙击手点治疗时指挥点名减伤。",
        "余震常在震荡波后补刀，别急着集合。",
      ],
    },
    {
      id: "malkorok",`,
  brief: {
    roster: ["2 坦 · 2 治疗 · DPS 6", "嗜血：斩杀 <10%"],
    checks: [
      "姿态纪律：防御=全团停手",
      "Boss 拉向小怪刷新侧；萨满保持约 50 码",
      "小怪优先：旗>萨满>法师>盗贼>战士>狙击手",
      "<10%：清完当前波→副坦风筝全小怪→嗜血打 Boss",
    ],
    mechanics: [
      mech("姿态 / 怒气", "全程", "全员", "—", "防御姿态：停止 DPS（打他会喂怒气）。其它姿态听指挥输出。"),
      mech("斩杀", "狂暴等", "治疗/坦克", "英雄约 300 万（狂暴约 375 万量级）", "必须预减伤或避免低血硬吃。"),
      mech("震荡波 + 余震", "常态", "全员", "物理范围", "躲震荡波，并注意随后余震。"),
      mech("战歌", "~65 怒", "全员", "全团加压", "约 65% 怒气施放。"),
      mech("破坏者", "~100 怒", "全员", "高危技能", "协调减伤/走位。"),
      mech("旗帜", "增援", "DPS", "—", "刷新后最高优先击杀。"),
      mech("增援波", "增援", "全团", "各职业小怪技能", "优先：萨满>法师>盗贼>战士>狙击手。Boss 拉刷新侧。"),
      mech("【<10%】斩杀阶段", "斩杀", "全团", "Boss 约 5200 万量级收尾", "先清光当前波；此后小怪全交副坦风筝；嗜血只打 Boss。"),
    ],
    positions: [
      {
        phase: "常态站位",
        diagram: { caption: "Boss 放刷新侧；萨满约 50 码；防御停手；旗优先。", img: "assets/nazgrim-p1-open.png", alt: "纳兹戈林常态" },
        points: ["拉向刷新侧接怪。", "萨满拉远。", "防御绝对停手。", "拆旗按表。"],
      },
      {
        phase: "怒气窗口",
        diagram: { caption: "~65 怒战歌；~100 怒破坏者；震荡波注意余震。", img: "assets/nazgrim-p2-rage.png", alt: "纳兹戈林怒气" },
        points: ["听姿态开打/停手。", "战歌加压抬血。", "破坏者排减伤。", "余震别急着集合。"],
      },
      {
        phase: "斩杀 <10%",
        diagram: { caption: "清波→副坦风筝全小怪→嗜血集火 Boss。", img: "assets/nazgrim-p3-execute.png", alt: "纳兹戈林斩杀" },
        points: ["先清当前波。", "OT 风筝路线预留。", "大团嗜血只打 Boss。", "风筝质量决定能否收尾。"],
      },
    ],
    defensives: [
      { when: "斩杀", who: "坦/治疗", detail: "预减伤；低血不硬吃。" },
      { when: "战歌 / 破坏者", who: "治疗", detail: "团压窗口。" },
      { when: "<10% 嗜血", who: "全团", detail: "清波后交。" },
      { when: "狙击手点治疗", who: "指挥", detail: "点名减伤。" },
    ],
    flow: [
      { title: "开场", steps: ["Boss 放刷新侧；萨满约 50 码。", "确认防御停手与旗帜优先。"] },
      { title: "常态", steps: ["听姿态；拆旗按表清怪。", "震荡波+余震；65/100 怒排减伤。"] },
      { title: "斩杀", steps: ["清波→OT 风筝→嗜血打 Boss。"] },
    ],
    timelineNote: "错误输出会喂怒气；防御停手是硬纪律。",
    timeline: [
      { t: "姿态变", a: "防御→停手；其它听指挥" },
      { t: "加出现", a: "旗→萨→法→贼→战→狙" },
      { t: "~65怒", a: "战歌" },
      { t: "~100怒", a: "破坏者" },
      { t: "<10%", a: "清波→风筝→嗜血" },
    ],
    roles: {
      tank: ["Boss 放刷新侧；防御期维持仇恨但不喂技能。", "斩杀阶段副坦风筝全部小怪。"],
      dps: ["防御绝对停手；拆旗按表。", "斩杀只打 Boss。"],
      healer: ["斩杀预读；战歌/破坏者窗口。", "狙击手点名保目标。"],
    },
    callouts: ["「防御停手」", "「开打」", "「拆旗」", "「萨满」", "「震荡波」", "「战歌 / 破坏者」", "「斩杀风筝嗜血」"],
    redlines: ["防御姿态继续打", "旗帜不管", "斩杀前没清波", "萨满贴 Boss", "低血硬吃斩杀"],
  },
  pages: [
    {
      name: "1-常态",
      title: "纳兹戈林 — 常态站位",
      sub: "Boss 放刷新侧 · 萨满约 50 码 · 防御停手",
      warn: "防御姿态输出会喂怒气",
      points: ["拉向刷新侧", "萨满保持距离", "防御=停手", "旗永远先打", "优先萨>法>贼>战>狙"],
      cards: [
        { title: "防御姿态", body: "全团停止 DPS", fill: "#450A0A", stroke: "#EF4444" },
        { title: "旗帜", body: "刷新后最高优先", fill: "#422006", stroke: "#F59E0B" },
      ],
      footer: "小怪优先级写死，听标记",
    },
    {
      name: "2-怒气",
      title: "纳兹戈林 — 怒气窗口",
      sub: "~65 战歌 · ~100 破坏者 · 震荡波+余震",
      warn: "余震常在震荡波后补刀",
      points: ["听姿态开关手", "战歌加压", "破坏者减伤", "躲震荡波", "注意余震"],
      cards: [
        { title: "战歌", body: "约 65 怒全团加压", fill: "#7C2D12", stroke: "#FB923C" },
        { title: "破坏者", body: "约 100 怒高危", fill: "#7F1D1D", stroke: "#FCA5A5" },
      ],
      footer: "斩杀约 300 万级，预减伤",
    },
    {
      name: "3-斩杀",
      title: "纳兹戈林 — <10% 斩杀",
      sub: "清波 → 副坦风筝全小怪 → 嗜血打 Boss",
      warn: "没清波就嗜血会双线崩盘",
      points: ["先清当前波", "此后怪全交 OT 风筝", "嗜血只打 Boss", "约 5200 万收尾量级"],
      cards: [
        { title: "副坦", body: "风筝全部小怪", fill: "#7F1D1D", stroke: "#FCA5A5" },
        { title: "大团", body: "嗜血集火 Boss", fill: "#14532D", stroke: "#22C55E" },
      ],
      footer: "风筝路线开战前标定",
    },
  ],
});

function serializeBrief(brief) {
  return (
    `      /* 10H 战前讲解模板（技能→分阶段站位→减伤→流程→职责） */\n` +
    `      brief: ` +
    JSON.stringify(brief, null, 2)
      .split("\n")
      .map((line, i) => (i === 0 ? line : "      " + line))
      .join("\n") +
    `,\n`
  );
}

function injectBriefs(all) {
  let s = fs.readFileSync(DATA, "utf8");
  for (const b of all) {
    if (!s.includes(b.tipsKey)) {
      throw new Error(`tipsKey not found for ${b.id}`);
    }
    // skip if already has brief between this boss and tips
    const idIdx = s.indexOf(`id: "${b.id}"`);
    const tipsIdx = s.indexOf(b.tipsKey);
    const between = s.slice(idIdx, tipsIdx);
    if (between.includes("brief:")) {
      console.log("skip existing brief:", b.id);
      continue;
    }
    s = s.replace(b.tipsKey, serializeBrief(b.brief) + "\n" + b.tipsKey);
    console.log("injected brief:", b.id);
  }
  s = s.replace(/1–5 号已按新模板/g, "1–14 号已按新模板");
  s = s.replace(/1–5 号已完成/g, "1–14 号已完成");
  fs.writeFileSync(DATA, s);
}

function writeDrawios(all) {
  for (const b of all) {
    const dir = path.join(ROOT, "assets", b.folder);
    fs.mkdirSync(dir, { recursive: true });
    const drawioPath = path.join(dir, `${b.folder}-positions.drawio`);
    fs.writeFileSync(
      drawioPath,
      makeDrawio({ id: b.id, pages: b.pages })
    );
    console.log("wrote", drawioPath);
    // export pages 1..N
    b.pages.forEach((p, i) => {
      const imgName = b.brief.positions[i].diagram.img.replace(/^assets\//, "");
      const out = path.join(ROOT, "assets", imgName);
      try {
        execFileSync(
          DRAWIO,
          ["-x", "-f", "png", "-p", String(i + 1), "-o", out, drawioPath],
          { stdio: "inherit" }
        );
      } catch (e) {
        console.error("export failed", b.id, i + 1, e.message);
      }
    });
  }
}

function updateCopy() {
  for (const f of ["h10.html", "index.html", "h10.js"]) {
    const p = path.join(ROOT, f);
    let t = fs.readFileSync(p, "utf8");
    const n = t
      .replace(/1–5 号已按新模板/g, "1–14 号已按新模板")
      .replace(/1–5 号已完成/g, "1–14 号已完成");
    if (n !== t) {
      fs.writeFileSync(p, n);
      console.log("updated copy:", f);
    }
  }
}

export { BOSSES, makeDrawio };
const ALL = [...BOSSES, ...BOSSES_9_14];
if (import.meta.url === `file://${process.argv[1]}` && !process.env.SKIP_GEN_MAIN) {
console.log(
  "generating",
  ALL.length,
  "bosses:",
  ALL.map((b) => b.id).join(", ")
);
injectBriefs(ALL);
writeDrawios(ALL);
updateCopy();

// verify
eval(
  fs.readFileSync(DATA, "utf8").replace("window.SOO_H10", "globalThis.SOO_H10")
);
for (const b of globalThis.SOO_H10.bosses) {
  console.log(
    b.idx,
    b.name,
    "brief=",
    !!b.brief,
    b.brief ? `mech=${b.brief.mechanics.length} pos=${b.brief.positions.length}` : ""
  );
}
}
