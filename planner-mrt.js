/**
 * 生成 MRT Note 战术板（配合 Kaze MRT Timers / MRT Reminder 自动通知）
 * 依赖：SOO_PLANNER.generate 结果 + SOO_MRT_* + SOO_MRT_SPELLS
 * 模式：h10=10人英雄 · n10=10人普通(PT)
 */
(function (global) {
  const SPELLS = () => global.SOO_MRT_SPELLS || {};
  const MODE_KEY = "soo_planner_mrt_mode_v1";

  function getModeMeta(modeId) {
    const modes = global.SOO_MRT_MODES || {};
    return modes[modeId] || modes.h10 || { id: "h10", label: "10人英雄", short: "10H", timelines: [] };
  }

  function getMode() {
    return global.SOO_MRT_ACTIVE_MODE || "h10";
  }

  function setMode(modeId) {
    const meta = getModeMeta(modeId);
    if (!meta || !meta.timelines) return getMode();
    global.SOO_MRT_ACTIVE_MODE = meta.id;
    global.SOO_MRT_TIMELINES = meta.timelines;
    try {
      localStorage.setItem(MODE_KEY, meta.id);
    } catch (_) {}
    return meta.id;
  }

  function initMode() {
    let saved = "h10";
    try {
      saved = localStorage.getItem(MODE_KEY) || "h10";
    } catch (_) {}
    if (!getModeMeta(saved).timelines) saved = "h10";
    return setMode(saved);
  }

  const TLS = () => {
    const meta = getModeMeta(getMode());
    return meta.timelines || global.SOO_MRT_TIMELINES || [];
  };

  function padTime(t) {
    if (!t) return null;
    const m = String(t).trim().replace(/^~/, "").match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return null;
    return `${String(Number(m[1])).padStart(2, "0")}:${m[2]}`;
  }

  function spellIcon(tag) {
    const id = SPELLS()[tag];
    return id ? ` {spell:${id}}` : "";
  }

  function resolvePrefer(prefer, bossPlan, fullPlan) {
    if (!prefer || !prefer.length) return "";
    const cds = bossPlan.cdsOrder || [];
    const heals = bossPlan.healOrder || [];
    const members = (fullPlan && fullPlan.roster && fullPlan.roster.members) || [];
    const specs = (global.SOO_PLANNER_SPECS && global.SOO_PLANNER_SPECS.specs) || [];
    const parts = [];
    const used = new Set();

    function holderByTag(tag) {
      const hit = cds.find((c) => c.tag === tag) || heals.find((c) => c.tag === tag);
      if (hit) return hit.who;
      const bySpec = {
        ps: ["disc"],
        sac: ["holy_pal", "ret", "prot_pal"],
        ironbark: ["resto_druid", "guardian", "feral", "balance"],
        cocoon: ["mw_monk", "brew_monk", "ww_monk"],
        loh: ["holy_pal", "prot_pal", "ret"],
        bop: ["holy_pal", "prot_pal", "ret"],
      };
      const ids = bySpec[tag];
      if (!ids) {
        const m = members.find((mem) => {
          const sp = specs.find((s) => s.id === mem.specId);
          return sp && (sp.tags || []).includes(tag);
        });
        return m ? m.tag : null;
      }
      for (const id of ids) {
        const m = members.find((mem) => mem.specId === id);
        if (m) return m.tag;
      }
      return null;
    }

    for (const tag of prefer) {
      if (used.has(tag)) continue;
      const who = holderByTag(tag);
      if (who) {
        parts.push(`${who}${spellIcon(tag)}`);
      } else {
        parts.push(`${tagLabel(tag)}${spellIcon(tag)}`);
      }
      used.add(tag);
    }
    return parts.join(" ");
  }

  function tagLabel(tag) {
    return (
      {
        ps: "压制",
        sac: "牺牲",
        ironbark: "铁木",
        cocoon: "茧",
        loh: "圣疗",
        bop: "保护",
        barrier: "屏障",
        shell: "外壳",
        aura: "虔诚",
        rally: "集结",
        demo: "挫志",
        link: "链接",
        tide: "潮汐",
        kings: "列王",
        hymn: "赞美诗",
        tranq: "宁静",
        amz: "反魔法域",
      }[tag] || tag
    );
  }

  function whoList(keys, roles, bossPlan) {
    if (!keys || !keys.length) return "";
    const r = roles || {};
    const out = [];
    for (const k of keys) {
      if (k === "interrupt" || k === "trap" || k === "cloak" || k === "immune") {
        // 从 assign 文本里不好抽；用 callouts 旁路：从完整 generate 的 roles 没有这些
        continue;
      }
      if (r[k]) out.push(r[k]);
    }
    // interrupt/trap：从 timeline 不适用，尝试从 flex 外的成员标签 —— 由 generate 扩展
    if (keys.includes("interrupt") && bossPlan._interrupt) {
      out.push(...bossPlan._interrupt);
    }
    if (keys.includes("trap") && bossPlan._trap) {
      out.push(...bossPlan._trap);
    }
    return [...new Set(out.filter(Boolean))].join(" ");
  }

  function buildRolesFromPlan(plan, boss) {
    const base = plan.roster.roles || {};
    // 弹性 Boss 时从 assign 第一行解析不准；用 cds/heal 里的 who + 默认 roles
    // 更好：engine 已在 boss 上没有 roles，从 flex 后的 note 推断
    // 这里用全局 roles，弹性时用 cdsOrder 里出现的奶萨等
    const roles = { ...base };
    if (boss.flexNotes && boss.flexNotes.length) {
      // 从 cds/heal 补 h3：第三人治疗
      const heals = (boss.healOrder || []).map((c) => c.who);
      const uniqueHeals = [...new Set(heals)];
      if (uniqueHeals[0]) roles.h1 = uniqueHeals[0];
      if (uniqueHeals[1]) roles.h2 = uniqueHeals[1];
      if (uniqueHeals[2]) roles.h3 = uniqueHeals[2];
      // 第三坦：编制 note 含 3 坦时，CJQ 常在 flexNotes
      const tankFlex = boss.flexNotes.find((n) => /防|坦/.test(n));
      if (tankFlex) {
        const m = tankFlex.match(/^(\S+)\s/);
        if (m) roles.t3 = m[1];
      }
    }
    return roles;
  }

  function formatLine(line, bossPlan, roles, fullPlan) {
    const preferStr = resolvePrefer(line.prefer, bossPlan, fullPlan);
    const whoStr = whoList(line.whoKeys, roles, bossPlan);
    const lustStr = line.lust ? `${spellIcon("lust")} ` : "";
    const body = [lustStr + (line.msg || ""), whoStr, preferStr]
      .filter(Boolean)
      .join(" - ")
      .replace(/\s+/g, " ")
      .trim();

    if (line.after) {
      const delay = line.delay != null ? line.delay : 0;
      return `{time:${delay},${line.after}}${body}`;
    }
    const tt = padTime(line.t);
    if (tt) return `{time:${tt}}${body}`;
    return `# ${line.t || "?"} ${body}`;
  }

  function assignBlock(boss) {
    const lines = (boss.assign || []).map((a) => `- ${a}`);
    return lines.join("\n");
  }

  function cdBlock(boss) {
    const dr = (boss.cdsOrder || []).map((c) => `${c.slot} ${c.who} ${c.skills}${spellIcon(c.tag)}`);
    const heal = (boss.healOrder || []).map(
      (c) => `${c.slot} ${c.who} ${c.skills}${spellIcon(c.tag)}`
    );
    return [...dr, ...heal].join("\n");
  }

  function enrichBossCapabilities(bossPlan, fullPlan) {
    const members = fullPlan.roster.members || [];
    const specs = (global.SOO_PLANNER_SPECS && global.SOO_PLANNER_SPECS.specs) || [];
    const interrupt = [];
    const trap = [];
    members.forEach((m) => {
      const sp = specs.find((s) => s.id === m.specId);
      const tags = (sp && sp.tags) || [];
      if (tags.includes("interrupt")) interrupt.push(m.tag);
      if (tags.includes("trap")) trap.push(m.tag);
    });
    bossPlan._interrupt = interrupt;
    bossPlan._trap = trap;
    return bossPlan;
  }

  function buildNote(boss, fullPlan, tl) {
    const roles = buildRolesFromPlan(fullPlan, boss);
    enrichBossCapabilities(boss, fullPlan);

    const timed = [];
    const triggered = [];
    (tl.lines || []).forEach((line) => {
      const formatted = formatLine(line, boss, roles, fullPlan);
      if (line.after) triggered.push(formatted);
      else timed.push(formatted);
    });

    const flex =
      boss.flexNotes && boss.flexNotes.length
        ? `弹性：${boss.flexNotes.join("；")} → ${boss.note}\n`
        : `编制：${boss.note}\n`;

    const modeShort = (getModeMeta(getMode()).short || "10H");
    const header = [
      `${boss.idx}. ${boss.name} · ${modeShort}`,
      flex.trim(),
      `嗜血：${boss.lust}`,
      `开打前：${boss.pull}`,
      "",
      "主坦 " + (roles.mt || "?") + " · 副坦 " + (roles.ot || "?") +
        (roles.t3 ? " · 三坦 " + roles.t3 : "") +
        " · 奶 " + [roles.h1, roles.h2, roles.h3].filter(Boolean).join("/"),
    ].join("\n");

    const parts = [
      header,
      "",
      "=== 减抬点名 ===",
      cdBlock(boss),
      "",
      "=== 人员分工 ===",
      assignBlock(boss),
      "",
      "=== 开怪计时提醒（粘贴进 MRT Note；需 Reminder/Kaze Timers）===",
      ...(tl.note ? [`# ${tl.note}`] : []),
      ...timed,
    ];

    if (triggered.length) {
      parts.push(
        "",
        "=== 施法触发提醒（SCC/SCS，更稳；需 BigWigs/DBM + Kaze）===",
        ...triggered
      );
    }

    parts.push(
      "",
      "# 用法：团长 /rt note 粘贴本页 → 同步；个人装 Kaze MRT Timers 或 MRT Reminder",
      "# 分配器可填角色名后点「代号→角色名」，Kaze 会高亮本人任务；也可手动改"
    );

    return parts.join("\n");
  }

  function generateAll(fullPlan) {
    if (!fullPlan || !fullPlan.bosses) return [];
    return fullPlan.bosses.map((boss) => {
      const tl = TLS().find((t) => t.id === boss.id) || { lines: [], note: "无细轴，仅分工" };
      return {
        id: boss.id,
        idx: boss.idx,
        name: boss.name,
        text: buildNote(boss, fullPlan, tl),
      };
    });
  }

  function generateOne(fullPlan, bossId) {
    return generateAll(fullPlan).find((n) => n.id === bossId) || null;
  }

  function exportBundle(notes) {
    const mode = getModeMeta(getMode());
    const head = `# SOO ${mode.short || mode.label} MRT 合集\n`;
    return (
      head +
      notes
        .map((n) => `========== ${n.idx}. ${n.name} (${mode.short}) ==========\n${n.text}`)
        .join("\n\n")
    );
  }

  initMode();

  global.SOO_MRT = {
    generateAll,
    generateOne,
    exportBundle,
    SPELLS,
    getMode,
    setMode,
    initMode,
    getModeMeta,
    MODE_KEY,
  };
})(typeof window !== "undefined" ? window : globalThis);
