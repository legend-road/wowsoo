/**
 * 根据阵容生成 14 Boss 分工 + 减抬时间轴
 * 依赖：SOO_PLANNER_SPECS / SOO_PLANNER_CD_PRIORITY / SOO_PLANNER_BOSSES / SOO_PLANNER_FLEX
 *
 * 弹性：成员可设 flexHeal / flexTank（可切专精 id）；
 * Boss 设 flex:{ heal:true, tank:true } 时自动切专精再分配。
 */
(function (global) {
  const SPECS = () => global.SOO_PLANNER_SPECS;
  const CD_PRI = () => global.SOO_PLANNER_CD_PRIORITY;
  const BOSSES = () => global.SOO_PLANNER_BOSSES;
  const FLEX = () => global.SOO_PLANNER_FLEX || { heal: [], tank: [] };

  const DEFAULT_ROSTER = [
    { tag: "ZST", specId: "prot_war" },
    { tag: "熊T", specId: "guardian" },
    { tag: "DZ", specId: "combat_rogue" },
    { tag: "FS", specId: "fire" },
    { tag: "LR", specId: "mm_hunter" },
    { tag: "SS", specId: "affli" },
    { tag: "SM", specId: "ele", flexHeal: "resto_sham" },
    { tag: "CJQ", specId: "ret", flexTank: "prot_pal" },
    { tag: "戒律", specId: "disc" },
    { tag: "NQ", specId: "holy_pal" },
  ];

  function specById(id) {
    return (SPECS().specs || []).find((s) => s.id === id) || null;
  }

  function defaultFlexFor(specId, kind) {
    const row = (FLEX()[kind] || []).find((r) => r.from === specId);
    return row ? row.to : "";
  }

  function enrich(member, forcedSpecId) {
    const specId = forcedSpecId || member.specId;
    const spec = specById(specId);
    const flexHeal = member.flexHeal || defaultFlexFor(member.specId, "heal") || "";
    const flexTank = member.flexTank || defaultFlexFor(member.specId, "tank") || "";
    if (!spec) {
      return {
        tag: member.tag || "?",
        specId,
        baseSpecId: member.specId,
        label: specId || "未知",
        role: "DPS",
        tags: ["dps"],
        flexHeal,
        flexTank,
        flexed: !!forcedSpecId,
      };
    }
    return {
      tag: member.tag || spec.label,
      specId: spec.id,
      baseSpecId: member.specId,
      label: spec.label,
      role: spec.role,
      tags: spec.tags.slice(),
      flexHeal,
      flexTank,
      flexed: !!forcedSpecId && forcedSpecId !== member.specId,
    };
  }

  function hasTag(m, tag) {
    return (m.tags || []).includes(tag);
  }

  function pickFirst(pool, pred) {
    return pool.find(pred) || null;
  }

  function joinTags(list) {
    if (!list || !list.length) return "—";
    return list.map((m) => m.tag).join("、");
  }

  /** 按 Boss 弹性需求切专精 */
  function applyFlex(rawMembers, flexOpts) {
    const wantHeal = !!(flexOpts && flexOpts.heal);
    const wantTank = !!(flexOpts && flexOpts.tank);
    const notes = [];

    const members = (rawMembers || []).map((m) => {
      let forced = null;
      if (wantHeal) {
        const to = m.flexHeal || defaultFlexFor(m.specId, "heal");
        if (to && specById(to) && specById(to).role === "治疗") {
          forced = to;
          notes.push(`${m.tag} 切${specById(to).label}`);
        }
      }
      if (wantTank && !forced) {
        const to = m.flexTank || defaultFlexFor(m.specId, "tank");
        if (to && specById(to) && specById(to).role === "坦") {
          forced = to;
          notes.push(`${m.tag} 切${specById(to).label}`);
        }
      }
      // 同人若同时可切治疗与坦克且 Boss 都要：优先治疗（奶更稀缺）；坦克另找
      if (wantHeal && wantTank) {
        const healTo = m.flexHeal || defaultFlexFor(m.specId, "heal");
        const tankTo = m.flexTank || defaultFlexFor(m.specId, "tank");
        if (healTo && specById(healTo)?.role === "治疗") {
          forced = healTo;
        } else if (tankTo && specById(tankTo)?.role === "坦") {
          forced = tankTo;
        }
      }
      return enrich(m, forced);
    });

    // 若 Boss 要切坦但上面因「同人优先切奶」漏了：再切一个可切坦的人
    if (wantTank) {
      const hasFlexedTank = members.some((p) => p.flexed && p.role === "坦");
      if (!hasFlexedTank) {
        const idx = members.findIndex((p) => {
          const raw = (rawMembers || []).find((r) => r.tag === p.tag);
          const to = (raw && raw.flexTank) || defaultFlexFor(raw ? raw.specId : p.baseSpecId, "tank");
          return to && specById(to)?.role === "坦" && p.role === "DPS";
        });
        if (idx >= 0) {
          const raw = (rawMembers || []).find((r) => r.tag === members[idx].tag);
          const to = (raw && raw.flexTank) || defaultFlexFor(raw.specId, "tank");
          members[idx] = enrich(raw, to);
          notes.push(`${members[idx].tag} 切${members[idx].label}`);
        }
      }
    }

    // 去重 notes
    const uniqNotes = [...new Set(notes)];
    return { people: members, flexNotes: uniqNotes };
  }

  function buildCdOrders(people) {
    const drOut = [];
    const healOut = [];
    const usedDr = new Set();
    const usedHeal = new Set();

    for (const rule of CD_PRI().dr) {
      if (drOut.length >= 3) break;
      const cand = people.find((p) => {
        if (usedDr.has(p.tag)) return false;
        if (!hasTag(p, rule.tag)) return false;
        if (rule.whoRole === "heal" && p.role !== "治疗") return false;
        return true;
      });
      if (!cand) continue;
      usedDr.add(cand.tag);
      drOut.push({
        slot: `${drOut.length + 1}减`,
        who: cand.tag,
        skills: rule.skill,
        tag: rule.tag,
        note: "",
      });
    }

    for (const rule of CD_PRI().heal) {
      if (healOut.length >= 3) break;
      const cand = people.find((p) => {
        if (usedHeal.has(p.tag)) return false;
        if (!hasTag(p, rule.tag)) return false;
        if (rule.whoRole === "heal" && p.role !== "治疗") return false;
        return true;
      });
      if (!cand) continue;
      usedHeal.add(cand.tag);
      healOut.push({
        slot: `${healOut.length + 1}抬`,
        who: cand.tag,
        skills: rule.skill,
        tag: rule.tag,
        note: "",
      });
    }

    return { cdsOrder: drOut, healOrder: healOut };
  }

  function analyzePeople(people, flexNotes) {
    const tanks = people.filter((p) => p.role === "坦");
    const heals = people.filter((p) => p.role === "治疗");
    const dps = people.filter((p) => p.role === "DPS");
    const melee = dps.filter((p) => hasTag(p, "melee"));
    const ranged = dps.filter((p) => hasTag(p, "ranged"));

    const mt =
      pickFirst(tanks, (t) => ["prot_war", "prot_pal", "blood_dk"].includes(t.specId) && !t.flexed) ||
      pickFirst(tanks, (t) => ["prot_war", "prot_pal", "blood_dk"].includes(t.specId)) ||
      tanks[0] ||
      null;
    const ot =
      pickFirst(tanks, (t) => t !== mt && hasTag(t, "solo_p2")) ||
      tanks.find((t) => t !== mt) ||
      null;
    const t3 = tanks.find((t) => t !== mt && t !== ot) || null;

    const h1 =
      pickFirst(heals, (h) => h.specId === "disc") ||
      pickFirst(heals, (h) => hasTag(h, "barrier") || hasTag(h, "shell")) ||
      heals[0] ||
      null;
    const h2 =
      pickFirst(heals, (h) => h !== h1 && !h.flexed) ||
      heals.find((h) => h !== h1) ||
      null;
    const h3 = heals.find((h) => h !== h1 && h !== h2) || null;

    const cloak = people.filter((p) => hasTag(p, "cloak") || hasTag(p, "iceblock"));
    const trap = people.filter((p) => hasTag(p, "trap"));
    const interrupt = people.filter((p) => hasTag(p, "interrupt"));
    const immune = people.filter(
      (p) => hasTag(p, "cloak") || hasTag(p, "iceblock") || hasTag(p, "fd")
    );

    const orders = buildCdOrders(people);
    const warnings = [];
    if (tanks.length < 2) warnings.push(`坦克不足：当前 ${tanks.length}，建议 2`);
    if (heals.length < 2) warnings.push(`治疗不足：当前 ${heals.length}，建议 2`);
    if (people.length !== 10) warnings.push(`总人数 ${people.length}（10H 标准 10 人）`);
    if (!orders.cdsOrder.some((c) => c.tag === "barrier")) {
      warnings.push("无屏障：团减少一层罩子，尖啸/分摊更吃其他减伤");
    }
    if (!orders.cdsOrder.some((c) => c.tag === "link") && !heals.some((h) => hasTag(h, "link"))) {
      warnings.push("无精神链接：均伤技能缺失，靠外壳/虔诚/挫志顶（SM 可切奶补链接）");
    }

    const flexed = people.filter((p) => p.flexed);

    return {
      people,
      tanks,
      heals,
      dps,
      melee,
      ranged,
      mt,
      ot,
      t3,
      h1,
      h2,
      h3,
      cloak,
      trap,
      interrupt,
      immune,
      ...orders,
      warnings,
      flexNotes: flexNotes || [],
      flexed,
      note: `${tanks.length} 坦 · ${heals.length} 奶 · ${dps.length} DPS`,
    };
  }

  function analyzeRoster(rawMembers) {
    const people = (rawMembers || DEFAULT_ROSTER).map((m) => enrich(m));
    return analyzePeople(people, []);
  }

  function resolvePrefer(prefer, ctx) {
    const parts = [];
    const usedTag = new Set();
    const EXTRA = {
      ps: "痛苦压制",
      sac: "牺牲之手",
      ironbark: "铁木树皮",
      cocoon: "作茧缚命",
      loh: "圣疗术",
      bop: "保护之手",
    };
    for (const tag of prefer || []) {
      if (usedTag.has(tag)) continue;
      const fromDr = ctx.cdsOrder.find((c) => c.tag === tag);
      const fromHeal = ctx.healOrder.find((c) => c.tag === tag);
      const hit = fromDr || fromHeal;
      if (hit) {
        parts.push(`${hit.slot} ${hit.who}（${hit.skills}）`);
        usedTag.add(tag);
        continue;
      }
      const holder = ctx.people.find((p) => hasTag(p, tag));
      if (holder) {
        const skillName =
          [...CD_PRI().dr, ...CD_PRI().heal].find((r) => r.tag === tag)?.skill ||
          EXTRA[tag] ||
          tag;
        parts.push(`${holder.tag}（${skillName}）`);
        usedTag.add(tag);
      }
    }
    return parts.length ? parts.join(" → ") : "阵容无对应技能，改个人减伤/外置";
  }

  function fillTpl(str, ctx) {
    const map = {
      mt: ctx.mt ? ctx.mt.tag : "主坦?",
      ot: ctx.ot ? ctx.ot.tag : "副坦?",
      t3: ctx.t3 ? ctx.t3.tag : "第三坦?",
      h1: ctx.h1 ? ctx.h1.tag : "治疗1?",
      h2: ctx.h2 ? ctx.h2.tag : "治疗2?",
      h3: ctx.h3 ? ctx.h3.tag : "治疗3?",
      melee: joinTags(ctx.melee),
      ranged: joinTags(ctx.ranged),
      cloak: joinTags(ctx.cloak),
      trap: joinTags(ctx.trap),
      interrupt: joinTags(ctx.interrupt),
      immune: joinTags(ctx.immune),
      heal1: ctx.healOrder[0] ? ctx.healOrder[0].who : "1抬?",
      heal2: ctx.healOrder[1] ? ctx.healOrder[1].who : "2抬?",
      heal3: ctx.healOrder[2] ? ctx.healOrder[2].who : "3抬?",
      dr1: ctx.cdsOrder[0] ? ctx.cdsOrder[0].who : "1减?",
      dr2: ctx.cdsOrder[1] ? ctx.cdsOrder[1].who : "2减?",
      dr3: ctx.cdsOrder[2] ? ctx.cdsOrder[2].who : "3减?",
      flex: (ctx.flexNotes || []).join("；") || "无弹性切换",
    };
    return str.replace(/\{(\w+)\}/g, (_, k) => map[k] ?? `{${k}}`);
  }

  function planBoss(boss, rawMembers) {
    const flexed = applyFlex(rawMembers, boss.flex || {});
    const ctx = analyzePeople(flexed.people, flexed.flexNotes);
    const assign = (boss.assignTpl || []).map((line) => fillTpl(line, ctx));
    if (ctx.flexNotes.length) {
      assign.unshift(`【弹性编制】${ctx.flexNotes.join("；")} → ${ctx.note}`);
    }
    const timeline = (boss.cdEvents || []).map((ev) => ({
      when: ev.when,
      call: resolvePrefer(ev.prefer, ctx),
      note: ev.note || "",
    }));
    return {
      id: boss.id,
      idx: boss.idx,
      name: boss.name,
      lust: boss.lust,
      flex: boss.flex || null,
      flexNotes: ctx.flexNotes,
      pull: fillTpl(boss.pull || "", ctx),
      assign,
      timeline,
      cdsOrder: ctx.cdsOrder,
      healOrder: ctx.healOrder,
      note: ctx.note,
      callouts: [
        ...ctx.cdsOrder.map((c) => `${c.slot}=${c.who}`),
        ...ctx.healOrder.map((c) => `${c.slot}=${c.who}`),
      ],
    };
  }

  function generate(rawMembers) {
    const base = rawMembers || DEFAULT_ROSTER;
    const ctx = analyzeRoster(base);
    const bosses = (BOSSES() || []).map((b) => planBoss(b, base));
    const flexCapable = base
      .map((m) => {
        const heal = m.flexHeal || defaultFlexFor(m.specId, "heal");
        const tank = m.flexTank || defaultFlexFor(m.specId, "tank");
        const parts = [];
        if (heal && specById(heal)) parts.push(`可切${specById(heal).label}`);
        if (tank && specById(tank)) parts.push(`可切${specById(tank).label}`);
        return parts.length ? { tag: m.tag, text: parts.join(" / ") } : null;
      })
      .filter(Boolean);

    return {
      generatedAt: new Date().toISOString(),
      roster: {
        note: ctx.note,
        members: ctx.people.map((p) => ({
          tag: p.tag,
          role: p.role,
          spec: p.label,
          specId: p.specId,
          flexHeal: p.flexHeal || "",
          flexTank: p.flexTank || "",
        })),
        cdsOrder: ctx.cdsOrder,
        healOrder: ctx.healOrder,
        warnings: ctx.warnings,
        flexCapable,
        roles: {
          mt: ctx.mt && ctx.mt.tag,
          ot: ctx.ot && ctx.ot.tag,
          t3: ctx.t3 && ctx.t3.tag,
          h1: ctx.h1 && ctx.h1.tag,
          h2: ctx.h2 && ctx.h2.tag,
          h3: ctx.h3 && ctx.h3.tag,
        },
      },
      bosses,
    };
  }

  function exportText(plan) {
    const lines = [];
    lines.push(`# SOO 10H 阵容分配 · ${plan.roster.note}`);
    lines.push("");
    lines.push("## 阵容");
    plan.roster.members.forEach((m) => {
      const flex = [];
      if (m.flexHeal && specById(m.flexHeal)) flex.push(`可切${specById(m.flexHeal).label}`);
      if (m.flexTank && specById(m.flexTank)) flex.push(`可切${specById(m.flexTank).label}`);
      lines.push(
        `- ${m.tag} · ${m.spec}（${m.role}）${flex.length ? "〔" + flex.join("；") + "〕" : ""}`
      );
    });
    lines.push("");
    lines.push("## 团减 / 抬血（常态）");
    plan.roster.cdsOrder.forEach((c) => {
      lines.push(`- ${c.slot} ${c.who}：${c.skills}`);
    });
    plan.roster.healOrder.forEach((c) => {
      lines.push(`- ${c.slot} ${c.who}：${c.skills}`);
    });
    if (plan.roster.warnings.length) {
      lines.push("");
      lines.push("## 提醒");
      plan.roster.warnings.forEach((w) => lines.push(`- ${w}`));
    }
    plan.bosses.forEach((b) => {
      lines.push("");
      lines.push(`## ${b.idx}. ${b.name}${b.flexNotes.length ? " 〔" + b.flexNotes.join("；") + "〕" : ""}`);
      lines.push(`编制：${b.note}`);
      lines.push(`嗜血：${b.lust}`);
      lines.push(`开打前：${b.pull}`);
      lines.push("### 分工");
      b.assign.forEach((a) => lines.push(`- ${a}`));
      lines.push("### 减抬时间轴");
      b.timeline.forEach((t) => {
        lines.push(`- 【${t.when}】${t.call}${t.note ? " · " + t.note : ""}`);
      });
    });
    return lines.join("\n");
  }

  global.SOO_PLANNER = {
    DEFAULT_ROSTER,
    SPECS: SPECS,
    FLEX: FLEX,
    defaultFlexFor,
    analyzeRoster,
    generate,
    exportText,
  };
})(typeof window !== "undefined" ? window : globalThis);
