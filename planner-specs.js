/** MoP Classic 专精能力：用于阵容分配与减抬点名 */
window.SOO_PLANNER_SPECS = {
  roles: ["坦", "治疗", "DPS"],
  specs: [
    { id: "prot_war", label: "防战", role: "坦", tags: ["tank", "melee", "rally", "demo"] },
    { id: "prot_pal", label: "防骑", role: "坦", tags: ["tank", "melee", "bop", "sac", "aura"] },
    { id: "blood_dk", label: "血DK", role: "坦", tags: ["tank", "melee", "amz"] },
    { id: "brew_monk", label: "酒仙", role: "坦", tags: ["tank", "melee", "solo_p2"] },
    { id: "guardian", label: "熊坦", role: "坦", tags: ["tank", "melee", "solo_p2"] },

    { id: "disc", label: "戒律", role: "治疗", tags: ["heal", "barrier", "shell", "ps", "dispel"] },
    { id: "holy_priest", label: "神牧", role: "治疗", tags: ["heal", "hymn", "gs", "dispel"] },
    { id: "holy_pal", label: "奶骑", role: "治疗", tags: ["heal", "aura", "kings", "sac", "loh"] },
    { id: "resto_sham", label: "奶萨", role: "治疗", tags: ["heal", "link", "tide", "ascend"] },
    { id: "resto_druid", label: "奶德", role: "治疗", tags: ["heal", "tranq", "ironbark"] },
    { id: "mw_monk", label: "织雾", role: "治疗", tags: ["heal", "revival", "cocoon"] },

    { id: "arms", label: "武器战", role: "DPS", tags: ["dps", "melee", "rally", "demo"] },
    { id: "fury", label: "狂暴战", role: "DPS", tags: ["dps", "melee", "rally", "demo"] },
    { id: "ret", label: "惩戒骑", role: "DPS", tags: ["dps", "melee", "sac", "bop", "aura"] },
    { id: "enh", label: "增强萨", role: "DPS", tags: ["dps", "melee", "interrupt"] },
    { id: "feral", label: "猫德", role: "DPS", tags: ["dps", "melee"] },
    { id: "ww_monk", label: "踏风", role: "DPS", tags: ["dps", "melee"] },
    { id: "combat_rogue", label: "战斗盗贼", role: "DPS", tags: ["dps", "melee", "cloak", "interrupt", "smoke"] },
    { id: "ass_rogue", label: "刺杀盗贼", role: "DPS", tags: ["dps", "melee", "cloak", "interrupt", "smoke"] },
    { id: "sub_rogue", label: "敏锐盗贼", role: "DPS", tags: ["dps", "melee", "cloak", "interrupt", "smoke"] },
    { id: "unholy_dk", label: "邪DK", role: "DPS", tags: ["dps", "melee", "amz"] },
    { id: "frost_dk", label: "冰DK", role: "DPS", tags: ["dps", "melee", "amz"] },

    { id: "arcane", label: "奥法", role: "DPS", tags: ["dps", "ranged", "interrupt", "iceblock"] },
    { id: "fire", label: "火法", role: "DPS", tags: ["dps", "ranged", "interrupt", "iceblock"] },
    { id: "frost_mage", label: "冰法", role: "DPS", tags: ["dps", "ranged", "interrupt", "iceblock"] },
    { id: "affli", label: "痛苦术", role: "DPS", tags: ["dps", "ranged"] },
    { id: "demo", label: "恶魔术", role: "DPS", tags: ["dps", "ranged"] },
    { id: "destro", label: "毁灭术", role: "DPS", tags: ["dps", "ranged"] },
    { id: "ele", label: "元素萨", role: "DPS", tags: ["dps", "ranged", "interrupt"] },
    { id: "balance", label: "鸟德", role: "DPS", tags: ["dps", "ranged"] },
    { id: "shadow", label: "暗牧", role: "DPS", tags: ["dps", "ranged", "dispel"] },
    { id: "bm_hunter", label: "兽王猎", role: "DPS", tags: ["dps", "ranged", "trap", "fd"] },
    { id: "mm_hunter", label: "射击猎", role: "DPS", tags: ["dps", "ranged", "trap", "fd"] },
    { id: "sv_hunter", label: "生存猎", role: "DPS", tags: ["dps", "ranged", "trap", "fd"] },
  ],
};

/**
 * 常见双修：主专精 → 可切专精（应对特殊 Boss）
 * 引擎按 boss.flex.heal / boss.flex.tank 自动切
 */
window.SOO_PLANNER_FLEX = {
  /** 可切治疗：主 DPS → 治疗专精 */
  heal: [
    { from: "ele", to: "resto_sham", label: "元素→奶萨" },
    { from: "enh", to: "resto_sham", label: "增强→奶萨" },
    { from: "balance", to: "resto_druid", label: "鸟→奶德" },
    { from: "shadow", to: "disc", label: "暗牧→戒律" },
    { from: "shadow", to: "holy_priest", label: "暗牧→神牧" },
  ],
  /** 可切防御：主 DPS → 坦克专精 */
  tank: [
    { from: "ret", to: "prot_pal", label: "惩戒→防骑" },
    { from: "arms", to: "prot_war", label: "武器→防战" },
    { from: "fury", to: "prot_war", label: "狂暴→防战" },
    { from: "frost_dk", to: "blood_dk", label: "冰DK→血DK" },
    { from: "unholy_dk", to: "blood_dk", label: "邪DK→血DK" },
    { from: "ww_monk", to: "brew_monk", label: "踏风→酒仙" },
    { from: "feral", to: "guardian", label: "猫→熊" },
  ],
};

/**
 * 减伤/抬血优先级。
 * cover: "raid" = 不集合也能覆盖全团（光环/集结）；"stack" = 要进人/进圈
 * multi: 同技能可点多人（如双圣骑光环掌握）
 * preferHeal: 多人可交时优先治疗
 */
window.SOO_PLANNER_CD_PRIORITY = {
  dr: [
    { tag: "aura", skill: "光环掌握（虔诚）", whoRole: "any", multi: true, preferHeal: true, cover: "raid" },
    { tag: "rally", skill: "集结呐喊", whoRole: "any", cover: "raid" },
    { tag: "barrier", skill: "真言术：障", whoRole: "heal", cover: "stack" },
    { tag: "link", skill: "精神链接图腾", whoRole: "heal", cover: "stack" },
    { tag: "amz", skill: "反魔法领域", whoRole: "any", cover: "stack" },
    { tag: "demo", skill: "挫志战旗", whoRole: "any", cover: "stack" },
    { tag: "smoke", skill: "烟雾弹", whoRole: "any", cover: "stack" },
  ],
  heal: [
    { tag: "shell", skill: "灵魂外壳", whoRole: "heal" },
    { tag: "tide", skill: "治疗之潮图腾", whoRole: "heal" },
    { tag: "hymn", skill: "神圣赞美诗", whoRole: "heal" },
    { tag: "tranq", skill: "宁静", whoRole: "heal" },
    { tag: "revival", skill: "复苏", whoRole: "heal" },
    { tag: "kings", skill: "远古列王守卫", whoRole: "heal" },
    { tag: "ascend", skill: "升腾", whoRole: "heal" },
  ],
};
