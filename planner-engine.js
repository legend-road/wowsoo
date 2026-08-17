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

  /** 空字符串 = 明确不能切；只有没设过才走默认双修 */
  function memberFlex(member, kind) {
    if (!member) return "";
    const key = kind === "heal" ? "flexHeal" : "flexTank";
    if (Object.prototype.hasOwnProperty.call(member, key)) return member[key] || "";
    return defaultFlexFor(member.specId || member.baseSpecId, kind) || "";
  }

  function displayOf(member) {
    const name = String((member && member.name) || "").trim();
    const tag = (member && member.tag) || "?";
    return name || tag;
  }

  function enrich(member, forcedSpecId) {
    const specId = forcedSpecId || member.specId;
    const spec = specById(specId);
    const flexHeal = memberFlex(member, "heal");
    const flexTank = memberFlex(member, "tank");
    const tag = member.tag || (spec && spec.label) || "?";
    const name = String(member.name || "").trim();
    const display = name || tag;
    if (!spec) {
      return {
        tag,
        name,
        display,
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
      tag,
      name,
      display,
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
    return list.map((m) => m.display || m.tag).join("、");
  }

  /** 按 Boss 弹性需求切专精 */
  function applyFlex(rawMembers, flexOpts) {
    const wantHeal = !!(flexOpts && flexOpts.heal);
    const wantTank = !!(flexOpts && flexOpts.tank);
    const notes = [];

    const members = (rawMembers || []).map((m) => {
      let forced = null;
      if (wantHeal) {
        const to = memberFlex(m, "heal");
        if (to && specById(to) && specById(to).role === "治疗") {
          forced = to;
          notes.push(`${displayOf(m)} 切${specById(to).label}`);
        }
      }
      if (wantTank && !forced) {
        const to = memberFlex(m, "tank");
        if (to && specById(to) && specById(to).role === "坦") {
          forced = to;
          notes.push(`${displayOf(m)} 切${specById(to).label}`);
        }
      }
      // 同人若同时可切治疗与坦克且 Boss 都要：优先治疗（奶更稀缺）；坦克另找
      if (wantHeal && wantTank) {
        const healTo = memberFlex(m, "heal");
        const tankTo = memberFlex(m, "tank");
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
          const to = memberFlex(raw || p, "tank");
          return to && specById(to)?.role === "坦" && p.role === "DPS";
        });
        if (idx >= 0) {
          const raw = (rawMembers || []).find((r) => r.tag === members[idx].tag);
          const to = memberFlex(raw || members[idx], "tank");
          members[idx] = enrich(raw, to);
          notes.push(`${members[idx].display || members[idx].tag} 切${members[idx].label}`);
        }
      }
    }

    // 去重 notes
    const uniqNotes = [...new Set(notes)];
    return { people: members, flexNotes: uniqNotes };
  }

  function skillItem(person, rule, slot) {
    return {
      slot: slot || "",
      who: person.display || person.tag,
      whoTag: person.tag,
      skills: rule.skill,
      tag: rule.tag,
      note: "",
    };
  }

  function collectByRules(people, rules) {
    const out = [];
    const usedWho = new Set();
    const usedTag = new Set();
    for (const rule of rules || []) {
      const cands = people.filter((p) => {
        if (!hasTag(p, rule.tag)) return false;
        if (usedWho.has(p.tag)) return false;
        if (rule.whoRole === "heal" && p.role !== "治疗") return false;
        return true;
      });
      if (rule.preferHeal) {
        cands.sort((a, b) => (a.role === "治疗" ? 0 : 1) - (b.role === "治疗" ? 0 : 1));
      }
      for (const cand of cands) {
        if (!rule.multi && usedTag.has(rule.tag)) break;
        if (usedWho.has(cand.tag)) continue;
        out.push(skillItem(cand, rule, ""));
        usedWho.add(cand.tag);
        usedTag.add(rule.tag);
        if (!rule.multi) break;
      }
    }
    return out;
  }

  function formatRound(round) {
    if (!round || !round.items || !round.items.length) return "—";
    return round.items.map((i) => `${i.who}（${i.skills}）`).join(" + ");
  }

  function assignExtra(rounds, item) {
    const roomy = rounds.filter((r) => r.items.length < 3);
    if (!roomy.length) return;
    let best = roomy[0];
    let bestScore = Infinity;
    for (const r of roomy) {
      const sameWho = r.items.some((x) => x.whoTag === item.whoTag);
      const sameTag = r.items.some((x) => x.tag === item.tag);
      const score = r.items.length * 10 + (sameTag ? 40 : 0) + (sameWho ? 8 : 0);
      if (score < bestScore) {
        bestScore = score;
        best = r;
      }
    }
    best.items.push({ ...item, kind: item.kind || "extra" });
  }

  function buildRaidAoeRounds(people) {
    const pri = CD_PRI();
    const raidRules = (pri.dr || []).filter((r) => r.cover === "raid");
    const stackRules = (pri.dr || []).filter((r) => r.cover !== "raid");
    const raidDr = collectByRules(people, raidRules);
    const stackDr = collectByRules(people, stackRules);
    const picked = raidDr.slice();
    for (const c of stackDr) {
      if (picked.length >= 3) break;
      if (picked.some((x) => x.whoTag === c.whoTag)) continue;
      picked.push({
        ...c,
        note: "AOE 时尽量靠拢再交",
      });
    }
    const cdsOrder = picked.slice(0, 3).map((c, i) => ({
      ...c,
      slot: `${i + 1}减`,
      kind: "dr",
    }));
    const healAll = collectByRules(people, pri.heal);
    const healOrder = healAll.slice(0, 3).map((c, i) => ({ ...c, slot: `${i + 1}抬`, kind: "heal" }));
    const cdRounds = cdsOrder.map((c, i) => ({
      n: i + 1,
      slot: `${i + 1}轮`,
      items: [{ ...c, kind: "dr" }],
    }));
    return { cdsOrder, healOrder, cdRounds };
  }

  function buildCdRounds(drAll, healAll) {
    const cdsOrder = drAll.slice(0, 3).map((c, i) => ({ ...c, slot: `${i + 1}减`, kind: "dr" }));
    const healOrder = healAll.slice(0, 3).map((c, i) => ({ ...c, slot: `${i + 1}抬`, kind: "heal" }));
    const rounds = [1, 2, 3].map((n) => ({ n, slot: `${n}轮`, items: [] }));
    for (let i = 0; i < 3; i++) {
      if (cdsOrder[i]) rounds[i].items.push({ ...cdsOrder[i], kind: "dr" });
      if (healOrder[i]) rounds[i].items.push({ ...healOrder[i], kind: "heal" });
    }
    const used = new Set(
      [...cdsOrder, ...healOrder].map((c) => `${c.whoTag}|${c.tag}`)
    );
    const extras = [...drAll.slice(3), ...healAll.slice(3)].filter(
      (c) => !used.has(`${c.whoTag}|${c.tag}`)
    );
    extras.forEach((c) => assignExtra(rounds, { ...c, kind: "extra", slot: "" }));
    return {
      cdsOrder,
      healOrder,
      cdRounds: rounds.filter((r) => r.items.length),
    };
  }

  function buildCdOrders(people, opts) {
    if (opts && opts.cover === "raid") return buildRaidAoeRounds(people);
    const drAll = collectByRules(people, CD_PRI().dr);
    const healAll = collectByRules(people, CD_PRI().heal);
    return buildCdRounds(drAll, healAll);
  }

  function analyzePeople(people, flexNotes, cdOpts) {
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

    const orders = buildCdOrders(people, cdOpts);
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
      cdRounds: orders.cdRounds || [],
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
        parts.push(`${holder.display || holder.tag}（${skillName}）`);
        usedTag.add(tag);
      }
    }
    return parts.length ? parts.join(" → ") : "阵容无对应技能，改个人减伤/外置";
  }

  function fillTpl(str, ctx) {
    const who = (p, fallback) => (p && (p.display || p.tag)) || fallback;
    const map = {
      mt: "主T",
      ot: "副T",
      t3: "三T",
      h1: who(ctx.h1, "治疗1"),
      h2: who(ctx.h2, "治疗2"),
      h3: who(ctx.h3, "治疗3"),
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
      r1: ctx.cdRounds && ctx.cdRounds[0] ? formatRound(ctx.cdRounds[0]) : "1轮?",
      r2: ctx.cdRounds && ctx.cdRounds[1] ? formatRound(ctx.cdRounds[1]) : "2轮?",
      r3: ctx.cdRounds && ctx.cdRounds[2] ? formatRound(ctx.cdRounds[2]) : "3轮?",
    };
    return str.replace(/\{(\w+)\}/g, (_, k) => map[k] ?? `{${k}}`);
  }

  function keepAssignLine(line, ctx) {
    if (line.startsWith("?t3:")) return !!ctx.t3;
    if (line.startsWith("!t3:")) return !ctx.t3;
    if (line.startsWith("?h3:")) return !!ctx.h3;
    if (line.startsWith("!h3:")) return !ctx.h3;
    if (line.includes("【弹性坦】") && !ctx.t3) return false;
    if (line.includes("【弹性奶】") && !ctx.h3) return false;
    if (/^【弹性】/.test(line) && !ctx.t3 && !ctx.h3) return false;
    return true;
  }

  function stripAssignPrefix(line) {
    return line.replace(/^([?!](?:t3|h3):)/, "");
  }

  function planBoss(boss, rawMembers) {
    const flexed = applyFlex(rawMembers, boss.flex || {});
    const ctx = analyzePeople(flexed.people, flexed.flexNotes, {
      cover: boss.cdCover || "",
    });
    const assign = (boss.assignTpl || [])
      .filter((line) => keepAssignLine(line, ctx))
      .map((line) => fillTpl(stripAssignPrefix(line), ctx));
    if (ctx.flexNotes.length) {
      assign.unshift(`【弹性编制】${ctx.flexNotes.join("；")} → ${ctx.note}`);
    }
    const timeline = (boss.cdEvents || []).map((ev) => {
      const byRound =
        ev.round && ctx.cdRounds && ctx.cdRounds[ev.round - 1]
          ? formatRound(ctx.cdRounds[ev.round - 1])
          : "";
      return {
        when: ev.when,
        call: byRound || resolvePrefer(ev.prefer, ctx),
        note: ev.note || "",
        round: ev.round || null,
      };
    });
    const stance = fillTpl(boss.stance || "", ctx);
    const process = (boss.process || []).map((line) => fillTpl(line, ctx));
    const planned = {
      id: boss.id,
      idx: boss.idx,
      name: boss.name,
      lust: boss.lust,
      mrt: !!boss.mrt,
      cdCover: boss.cdCover || "",
      cdRoundLabel: boss.cdRoundLabel || "常规减伤（3 轮循环）",
      flex: boss.flex || null,
      flexNotes: ctx.flexNotes,
      pull: fillTpl(boss.pull || "", ctx),
      stance,
      process,
      assign,
      timeline,
      cdsOrder: ctx.cdsOrder,
      healOrder: ctx.healOrder,
      cdRounds: ctx.cdRounds || [],
      note: ctx.note,
      roles: {
        mt: ctx.mt && (ctx.mt.display || ctx.mt.tag),
        ot: ctx.ot && (ctx.ot.display || ctx.ot.tag),
        t3: ctx.t3 && (ctx.t3.display || ctx.t3.tag),
        h1: ctx.h1 && (ctx.h1.display || ctx.h1.tag),
        h2: ctx.h2 && (ctx.h2.display || ctx.h2.tag),
        h3: ctx.h3 && (ctx.h3.display || ctx.h3.tag),
      },
      callouts: (ctx.cdRounds || []).map((r) => `${r.slot}=${formatRound(r)}`),
    };
    planned.shareText = exportBossShare(planned);
    return planned;
  }

  function generate(rawMembers) {
    const base = rawMembers || DEFAULT_ROSTER;
    const ctx = analyzeRoster(base);
    const bosses = (BOSSES() || []).map((b) => planBoss(b, base));
    const flexCapable = base
      .map((m) => {
        const heal = memberFlex(m, "heal");
        const tank = memberFlex(m, "tank");
        const parts = [];
        if (heal && specById(heal)) parts.push(`可切${specById(heal).label}`);
        if (tank && specById(tank)) parts.push(`可切${specById(tank).label}`);
        return parts.length
          ? { tag: m.tag, display: displayOf(m), text: parts.join(" / ") }
          : null;
      })
      .filter(Boolean);

    return {
      generatedAt: new Date().toISOString(),
      roster: {
        note: ctx.note,
        members: ctx.people.map((p) => ({
          tag: p.tag,
          name: p.name || "",
          display: p.display || p.tag,
          role: p.role,
          spec: p.label,
          specId: p.specId,
          flexHeal: p.flexHeal || "",
          flexTank: p.flexTank || "",
        })),
        cdsOrder: ctx.cdsOrder,
        healOrder: ctx.healOrder,
        cdRounds: ctx.cdRounds || [],
        warnings: ctx.warnings,
        flexCapable,
        roles: {
          mt: ctx.mt && (ctx.mt.display || ctx.mt.tag),
          ot: ctx.ot && (ctx.ot.display || ctx.ot.tag),
          t3: ctx.t3 && (ctx.t3.display || ctx.t3.tag),
          h1: ctx.h1 && (ctx.h1.display || ctx.h1.tag),
          h2: ctx.h2 && (ctx.h2.display || ctx.h2.tag),
          h3: ctx.h3 && (ctx.h3.display || ctx.h3.tag),
        },
      },
      bosses,
    };
  }

  function exportBossShare(boss) {
    const lines = [];
    lines.push(`【${boss.idx}. ${boss.name}】`);
    if (boss.flexNotes && boss.flexNotes.length) {
      lines.push(`编制：${boss.flexNotes.join("；")}（${boss.note}）`);
    }
    lines.push(`嗜血：${boss.lust || "—"}`);
    const r = boss.roles || {};
    const tankLine = ["主T " + (r.mt || "?"), "副T " + (r.ot || "?")]
      .concat(r.t3 ? ["三T " + r.t3] : [])
      .join(" · ");
    lines.push(`坦职：${tankLine}`);
    if (boss.stance) lines.push(`起手站位：${boss.stance}`);
    lines.push("");
    lines.push("人员分工");
    (boss.assign || []).forEach((a) => lines.push(a));
    lines.push("");
    lines.push(boss.cdRoundLabel || "常规减伤（3轮循环）");
    (boss.cdRounds || []).forEach((r) => {
      lines.push(`${r.slot}  ${formatRound(r)}`);
    });
    if (boss.process && boss.process.length) {
      lines.push("");
      lines.push("进程");
      boss.process.forEach((p, i) => lines.push(`${i + 1}. ${p}`));
    }
    return lines.join("\n");
  }

  function exportShare(plan) {
    const lines = [];
    lines.push(`SOO 10人 团员安排 · ${plan.roster.note}`);
    lines.push("");
    lines.push("【常规减伤 · 3轮循环】");
    (plan.roster.cdRounds || []).forEach((r) => {
      lines.push(`${r.slot}  ${formatRound(r)}`);
    });
    lines.push("特殊 Boss 若切专精，以该 Boss 卡片为准。");
    (plan.bosses || []).forEach((b) => {
      lines.push("");
      lines.push("————————");
      lines.push(b.shareText || exportBossShare(b));
    });
    return lines.join("\n");
  }

  function exportText(plan) {
    return exportShare(plan);
  }

  global.SOO_PLANNER = {
    DEFAULT_ROSTER,
    SPECS: SPECS,
    FLEX: FLEX,
    defaultFlexFor,
    analyzeRoster,
    generate,
    exportText,
    exportShare,
    exportBossShare,
    formatRound,
  };
})(typeof window !== "undefined" ? window : globalThis);
