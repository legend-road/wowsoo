(function () {
  const P = window.SOO_PLANNER;
  if (!P) return;

  const STORAGE_KEY = "soo_planner_roster_v2";
  const MRT_STORAGE_PREFIX = "soo_planner_mrt_edits_";
  const rowsEl = document.getElementById("rosterRows");
  const navEl = document.getElementById("planNav");
  const listEl = document.getElementById("planList");
  const statusEl = document.getElementById("plannerStatus");
  const specs = P.SPECS().specs;

  function mrtStorageKey() {
    const mode = (window.SOO_MRT && window.SOO_MRT.getMode && window.SOO_MRT.getMode()) || "h10";
    return MRT_STORAGE_PREFIX + mode;
  }

  function loadMrtEdits() {
    try {
      const raw = localStorage.getItem(mrtStorageKey());
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") return parsed;
      }
    } catch (_) {}
    return {};
  }

  function saveMrtEdits(map) {
    localStorage.setItem(mrtStorageKey(), JSON.stringify(map));
  }

  function syncMrtModeButtons() {
    const mode = (window.SOO_MRT && window.SOO_MRT.getMode && window.SOO_MRT.getMode()) || "h10";
    document.querySelectorAll(".btn-mrt-mode").forEach((btn) => {
      const id = btn.getAttribute("data-mrt-mode");
      const on = id === mode;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.classList.toggle("is-active", on);
    });
  }

  function getMrtText(id, generated) {
    const edits = loadMrtEdits();
    return Object.prototype.hasOwnProperty.call(edits, id) ? edits[id] : generated;
  }

  function setMrtText(id, text) {
    const edits = loadMrtEdits();
    edits[id] = text;
    saveMrtEdits(edits);
  }

  function clearMrtText(id) {
    const edits = loadMrtEdits();
    delete edits[id];
    saveMrtEdits(edits);
  }

  function loadRoster() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return migrate(parsed);
      }
    } catch (_) {}
    return P.DEFAULT_ROSTER.map((m) => ({ ...m }));
  }

  function migrate(list) {
    return list.map((m) => ({
      tag: m.tag,
      name: m.name || "",
      specId: m.specId,
      flexHeal: m.flexHeal || P.defaultFlexFor(m.specId, "heal") || "",
      flexTank: m.flexTank || P.defaultFlexFor(m.specId, "tank") || "",
    }));
  }

  function saveRoster(roster) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roster));
  }

  function setStatus(msg) {
    if (statusEl) statusEl.textContent = msg || "";
  }

  function readRows() {
    return Array.from(rowsEl.querySelectorAll(".planner-row")).map((row) => ({
      tag: row.querySelector(".planner-tag").value.trim() || "?",
      name: (row.querySelector(".planner-name") && row.querySelector(".planner-name").value.trim()) || "",
      specId: row.querySelector(".planner-spec").value,
      flexHeal: row.querySelector(".planner-flex-heal").value || "",
      flexTank: row.querySelector(".planner-flex-tank").value || "",
    }));
  }

  function roleOf(specId) {
    const s = specs.find((x) => x.id === specId);
    return s ? s.role : "DPS";
  }

  function flexOptions(kind, selected) {
    const list = specs.filter((s) =>
      kind === "heal" ? s.role === "治疗" : s.role === "坦"
    );
    return (
      `<option value="">—</option>` +
      list
        .map(
          (s) =>
            `<option value="${s.id}" ${s.id === selected ? "selected" : ""}>${s.label}</option>`
        )
        .join("")
    );
  }

  function renderRows(roster) {
    const grouped = {
      坦: specs.filter((s) => s.role === "坦"),
      治疗: specs.filter((s) => s.role === "治疗"),
      DPS: specs.filter((s) => s.role === "DPS"),
    };
    rowsEl.innerHTML = roster
      .map((m, i) => {
        const optGroups = Object.entries(grouped)
          .map(
            ([role, list]) =>
              `<optgroup label="${role}">${list
                .map(
                  (s) =>
                    `<option value="${s.id}" ${s.id === m.specId ? "selected" : ""}>${s.label}</option>`
                )
                .join("")}</optgroup>`
          )
          .join("");
        const role = roleOf(m.specId);
        const flexHeal = m.flexHeal || P.defaultFlexFor(m.specId, "heal") || "";
        const flexTank = m.flexTank || P.defaultFlexFor(m.specId, "tank") || "";
        return `
<div class="planner-row" data-i="${i}">
  <input class="planner-tag" type="text" maxlength="8" value="${escapeAttr(m.tag)}" aria-label="代号" title="代号" />
  <input class="planner-name" type="text" maxlength="16" value="${escapeAttr(m.name || "")}" aria-label="角色名" title="角色名（MRT 高亮用）" placeholder="角色名" />
  <select class="planner-spec" aria-label="主专精">${optGroups}</select>
  <span class="planner-role planner-role--${role === "坦" ? "tank" : role === "治疗" ? "heal" : "dps"}">${role}</span>
  <select class="planner-flex-heal" aria-label="可切治疗" title="特殊 Boss 可切治疗">${flexOptions(
    "heal",
    flexHeal
  )}</select>
  <select class="planner-flex-tank" aria-label="可切防御" title="特殊 Boss 可切防御">${flexOptions(
    "tank",
    flexTank
  )}</select>
  <button type="button" class="btn btn-ghost planner-remove" data-remove="${i}" title="移除">×</button>
</div>`;
      })
      .join("");

    rowsEl.querySelectorAll(".planner-spec").forEach((sel) => {
      sel.addEventListener("change", () => {
        const row = sel.closest(".planner-row");
        const badge = row.querySelector(".planner-role");
        const role = roleOf(sel.value);
        badge.textContent = role;
        badge.className =
          "planner-role planner-role--" +
          (role === "坦" ? "tank" : role === "治疗" ? "heal" : "dps");
        const fh = row.querySelector(".planner-flex-heal");
        const ft = row.querySelector(".planner-flex-tank");
        const defH = P.defaultFlexFor(sel.value, "heal") || "";
        const defT = P.defaultFlexFor(sel.value, "tank") || "";
        fh.innerHTML = flexOptions("heal", defH);
        ft.innerHTML = flexOptions("tank", defT);
      });
    });
    rowsEl.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const rosterNow = readRows();
        rosterNow.splice(Number(btn.getAttribute("data-remove")), 1);
        renderRows(rosterNow);
      });
    });
  }

  function escapeAttr(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /** 代号 → 角色名（长代号优先，避免短串误伤） */
  function replaceTagsWithNames(text, roster) {
    const pairs = (roster || [])
      .map((m) => ({
        tag: String(m.tag || "").trim(),
        name: String(m.name || "").trim(),
      }))
      .filter((p) => p.tag && p.name && p.tag !== p.name)
      .sort((a, b) => b.tag.length - a.tag.length || b.name.length - a.name.length);
    if (!pairs.length) return { text, count: 0, mapped: 0 };
    let out = String(text || "");
    let hits = 0;
    for (const { tag, name } of pairs) {
      if (!out.includes(tag)) continue;
      const parts = out.split(tag);
      hits += parts.length - 1;
      out = parts.join(name);
    }
    return { text: out, count: hits, mapped: pairs.length };
  }

  function ul(items) {
    if (!items || !items.length) return "<p class='brief-empty'>—</p>";
    return `<ul>${items.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>`;
  }

  function cdGrid(items, kind) {
    if (!items || !items.length) return "<p class='brief-empty'>阵容无对应技能</p>";
    return `<div class="rb-cd-grid">${items
      .map(
        (c) => `
      <article class="rb-cd-slot rb-cd-slot--${kind}">
        <h5><span class="rb-cd-num${kind === "heal" ? " rb-cd-num--heal" : ""}">${escapeHtml(
          c.slot
        )}</span>${escapeHtml(c.who)}</h5>
        <p class="rb-cd-skills">${escapeHtml(c.skills)}</p>
      </article>`
      )
      .join("")}</div>`;
  }

  function timelineTable(rows) {
    if (!rows.length) return "";
    return `<div class="planner-timeline">
      <table>
        <thead><tr><th>时机</th><th>点名顺序</th><th>备注</th></tr></thead>
        <tbody>
          ${rows
            .map(
              (r) => `<tr>
            <td>${escapeHtml(r.when)}</td>
            <td>${escapeHtml(r.call)}</td>
            <td>${escapeHtml(r.note || "")}</td>
          </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>`;
  }

  function flexBadge(b) {
    if (!b.flexNotes || !b.flexNotes.length) return "";
    return `<span class="planner-flex-badge">${escapeHtml(b.flexNotes.join(" · "))}</span>`;
  }

  function renderPlan(plan) {
    const r = plan.roster;
    const warn =
      r.warnings && r.warnings.length
        ? `<div class="planner-warn"><strong>提醒</strong><ul>${r.warnings
            .map((w) => `<li>${escapeHtml(w)}</li>`)
            .join("")}</ul></div>`
        : "";

    const flexCap =
      r.flexCapable && r.flexCapable.length
        ? `<p class="planner-flex-cap"><strong>弹性双修：</strong>${r.flexCapable
            .map((f) => `${escapeHtml(f.tag)}（${escapeHtml(f.text)}）`)
            .join(" · ")}</p>`
        : "";

    const people = (r.members || [])
      .map((m) => {
        const bits = [];
        if (m.flexHeal) {
          const s = specs.find((x) => x.id === m.flexHeal);
          if (s) bits.push(`→${s.label}`);
        }
        if (m.flexTank) {
          const s = specs.find((x) => x.id === m.flexTank);
          if (s) bits.push(`→${s.label}`);
        }
        return `<span class="rb-tag rb-tag--${
          m.role === "坦" ? "tank" : m.role === "治疗" ? "heal" : "dps"
        }"><strong>${escapeHtml(m.tag)}</strong> ${escapeHtml(m.spec)}${
          bits.length ? ` <em>${escapeHtml(bits.join(" "))}</em>` : ""
        }</span>`;
      })
      .join("");

    const rosterCard = `
<article class="brief-card" id="plan-roster">
  <header class="brief-card-head">
    <span class="brief-idx">编</span>
    <div>
      <h3>生成结果 · ${escapeHtml(r.note)}</h3>
      <p class="brief-meta">主坦 ${escapeHtml(r.roles.mt || "?")} · 副坦 ${escapeHtml(
      r.roles.ot || "?"
    )} · 治疗 ${escapeHtml(r.roles.h1 || "?")} / ${escapeHtml(r.roles.h2 || "?")}</p>
    </div>
  </header>
  <div class="brief-card-body">
    <div class="rb-tags">${people}</div>
    ${flexCap}
    ${warn}
    <h4>团减轮次（常态）</h4>
    ${cdGrid(r.cdsOrder, "dr")}
    <h4>抬血轮次（常态）</h4>
    ${cdGrid(r.healOrder, "heal")}
    <p class="planner-hint">特殊 Boss 若 SM 切奶 / CJQ 切防，该 Boss 卡片内会重排减抬并标注弹性编制。</p>
  </div>
</article>`;

    const mrtNotes = window.SOO_MRT ? window.SOO_MRT.generateAll(plan) : [];
    const mrtById = Object.fromEntries(mrtNotes.map((n) => [n.id, n]));
    const mrtEdits = loadMrtEdits();
    const mrtModeShort =
      (window.SOO_MRT &&
        window.SOO_MRT.getModeMeta &&
        window.SOO_MRT.getModeMeta(window.SOO_MRT.getMode()).short) ||
      "10H";
    syncMrtModeButtons();

    const bossCards = plan.bosses
      .map((b) => {
        const mrt = mrtById[b.id];
        const edited = Object.prototype.hasOwnProperty.call(mrtEdits, b.id);
        const displayText = mrt ? getMrtText(b.id, mrt.text) : "";
        const mrtPreview = mrt
          ? `<div class="planner-mrt" data-mrt-box="${b.id}">
        <div class="planner-mrt-head">
          <h4>MRT 战术板 · ${escapeHtml(mrtModeShort)}${edited ? ' <span class="planner-mrt-edited">已改</span>' : ""}</h4>
          <div class="planner-mrt-actions">
            <button type="button" class="btn btn-ghost btn-mrt-reset" data-mrt="${b.id}" title="恢复自动生成版">恢复生成</button>
            <button type="button" class="btn btn-ghost btn-mrt-save" data-mrt="${b.id}">保存修改</button>
            <button type="button" class="btn btn-primary btn-mrt-copy" data-mrt="${b.id}">复制 MRT</button>
          </div>
        </div>
        <p class="planner-hint">可直接改文本；失焦或点「保存修改」写入本机。复制/全部复制会用你改过的版本。</p>
        <textarea class="planner-mrt-text" data-mrt-text="${b.id}" rows="14" spellcheck="false" aria-label="${escapeAttr(
              b.name
            )} MRT">${escapeHtml(displayText)}</textarea>
      </div>`
          : "";
        return `
<article class="brief-card" id="plan-${b.id}">
  <header class="brief-card-head">
    <span class="brief-idx">${b.idx}</span>
    <div>
      <h3>${escapeHtml(b.name)} ${flexBadge(b)}</h3>
      <p class="brief-meta">${escapeHtml(b.note || "")} · 嗜血：${escapeHtml(b.lust)}</p>
    </div>
  </header>
  <div class="brief-card-body">
    <p class="brief-pull">${escapeHtml(b.pull)}</p>
    <div class="brief-grid">
      <div class="brief-block">
        <h4>人员分工</h4>
        ${ul(b.assign)}
      </div>
      <div class="brief-block">
        <h4>本 Boss 减抬点名</h4>
        ${cdGrid(b.cdsOrder, "dr")}
        ${cdGrid(b.healOrder, "heal")}
      </div>
      <div class="brief-block brief-span-2">
        <h4>特殊技能 · 减抬时间轴</h4>
        ${timelineTable(b.timeline)}
      </div>
    </div>
    ${mrtPreview}
  </div>
</article>`;
      })
      .join("");

    listEl.innerHTML = rosterCard + bossCards;

    function currentMrtText(id) {
      const ta = listEl.querySelector(`textarea[data-mrt-text="${id}"]`);
      if (ta) return ta.value;
      const gen = mrtById[id];
      return gen ? getMrtText(id, gen.text) : "";
    }

    function markEdited(id, on) {
      const box = listEl.querySelector(`[data-mrt-box="${id}"]`);
      if (!box) return;
      const h4 = box.querySelector("h4");
      if (!h4) return;
      h4.innerHTML = on
        ? `MRT 战术板 · ${escapeHtml(mrtModeShort)} <span class="planner-mrt-edited">已改</span>`
        : `MRT 战术板 · ${escapeHtml(mrtModeShort)}`;
    }

    listEl.querySelectorAll(".planner-mrt-text").forEach((ta) => {
      ta.addEventListener("blur", () => {
        const id = ta.getAttribute("data-mrt-text");
        const gen = mrtById[id];
        if (!gen) return;
        if (ta.value === gen.text) {
          clearMrtText(id);
          markEdited(id, false);
        } else {
          setMrtText(id, ta.value);
          markEdited(id, true);
          setStatus(`已自动保存 ${gen.idx}. ${gen.name} 战术板修改`);
        }
      });
    });

    listEl.querySelectorAll(".btn-mrt-save").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-mrt");
        const ta = listEl.querySelector(`textarea[data-mrt-text="${id}"]`);
        const gen = mrtById[id];
        if (!ta || !gen) return;
        if (ta.value === gen.text) {
          clearMrtText(id);
          markEdited(id, false);
          setStatus(`${gen.idx}. ${gen.name} 与生成版相同，未保留额外修改`);
        } else {
          setMrtText(id, ta.value);
          markEdited(id, true);
          setStatus(`已保存 ${gen.idx}. ${gen.name} 战术板修改`);
        }
      });
    });

    listEl.querySelectorAll(".btn-mrt-reset").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-mrt");
        const gen = mrtById[id];
        const ta = listEl.querySelector(`textarea[data-mrt-text="${id}"]`);
        if (!gen || !ta) return;
        clearMrtText(id);
        ta.value = gen.text;
        markEdited(id, false);
        setStatus(`已恢复 ${gen.idx}. ${gen.name} 为自动生成版`);
      });
    });

    listEl.querySelectorAll(".btn-mrt-copy").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-mrt");
        const note = mrtById[id];
        if (!note) return;
        const text = currentMrtText(id);
        try {
          await navigator.clipboard.writeText(text);
          setStatus(`已复制 ${note.idx}. ${note.name} 的 MRT 战术板`);
        } catch (_) {
          setStatus("复制失败，请手动全选文本框");
        }
      });
    });

    navEl.innerHTML =
      `<a class="brief-nav-link" href="#plan-roster"><span class="brief-nav-idx">编</span>阵容</a>` +
      plan.bosses
        .map(
          (b) =>
            `<a class="brief-nav-link" href="#plan-${b.id}"><span class="brief-nav-idx">${b.idx}</span>${escapeHtml(
              b.name
            )}${b.flexNotes && b.flexNotes.length ? " *" : ""}${
              Object.prototype.hasOwnProperty.call(mrtEdits, b.id) ? " ✎" : ""
            }</a>`
        )
        .join("");
  }

  let lastPlan = null;

  function generate() {
    const roster = readRows();
    saveRoster(roster);
    lastPlan = P.generate(roster);
    renderPlan(lastPlan);
    setStatus(`已生成 ${lastPlan.bosses.length} 个 Boss · ${lastPlan.roster.note}`);
  }

  document.getElementById("btnGenerate").addEventListener("click", generate);
  document.getElementById("btnReset").addEventListener("click", () => {
    const def = P.DEFAULT_ROSTER.map((m) => ({ ...m }));
    renderRows(def);
    saveRoster(def);
    generate();
    setStatus("已恢复默认本团阵容并重新生成");
  });
  document.getElementById("btnAdd").addEventListener("click", () => {
    const roster = readRows();
    roster.push({ tag: "新人", name: "", specId: "fire", flexHeal: "", flexTank: "" });
    renderRows(roster);
  });
  document.getElementById("btnCopy").addEventListener("click", async () => {
    if (!lastPlan) generate();
    const text = P.exportText(lastPlan);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("已复制全文到剪贴板");
    } catch (_) {
      setStatus("复制失败，请用打印导出");
    }
  });
  const btnMrtAll = document.getElementById("btnMrtAll");
  if (btnMrtAll) {
    btnMrtAll.addEventListener("click", async () => {
      if (!lastPlan) generate();
      if (!window.SOO_MRT) {
        setStatus("MRT 模块未加载");
        return;
      }
      const modeShort =
        (window.SOO_MRT.getModeMeta &&
          window.SOO_MRT.getModeMeta(window.SOO_MRT.getMode()).short) ||
        "MRT";
      const notes = window.SOO_MRT.generateAll(lastPlan).map((n) => ({
        ...n,
        text: getMrtText(n.id, n.text),
      }));
      const text = window.SOO_MRT.exportBundle(notes);
      try {
        await navigator.clipboard.writeText(text);
        setStatus(`已复制全部 ${notes.length} 份 ${modeShort} MRT（含已保存的修改）`);
      } catch (_) {
        setStatus("复制失败");
      }
    });
  }

  document.querySelectorAll(".btn-mrt-mode").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!window.SOO_MRT || !window.SOO_MRT.setMode) return;
      const id = btn.getAttribute("data-mrt-mode");
      window.SOO_MRT.setMode(id);
      syncMrtModeButtons();
      generate();
      const meta = window.SOO_MRT.getModeMeta(id);
      setStatus(`已切换 MRT 模式：${meta.label || id}`);
    });
  });

  const btnReplaceNames = document.getElementById("btnMrtReplaceNames");
  if (btnReplaceNames) {
    btnReplaceNames.addEventListener("click", () => {
      if (!lastPlan) generate();
      if (!window.SOO_MRT) {
        setStatus("MRT 模块未加载");
        return;
      }
      const roster = readRows();
      saveRoster(roster);
      const named = roster.filter((m) => m.tag && m.name && m.tag !== m.name);
      if (!named.length) {
        setStatus("请先在「角色名」列填写至少一人的角色名");
        return;
      }
      const notes = window.SOO_MRT.generateAll(lastPlan);
      let bossTouched = 0;
      let totalHits = 0;
      for (const n of notes) {
        const base = getMrtText(n.id, n.text);
        const { text, count } = replaceTagsWithNames(base, roster);
        if (text === base) continue;
        setMrtText(n.id, text);
        bossTouched += 1;
        totalHits += count;
        const ta = listEl.querySelector(`textarea[data-mrt-text="${n.id}"]`);
        if (ta) {
          ta.value = text;
          const box = listEl.querySelector(`[data-mrt-box="${n.id}"]`);
          const h4 = box && box.querySelector("h4");
          if (h4 && !h4.querySelector(".planner-mrt-edited")) {
            const modeShort =
              (window.SOO_MRT.getModeMeta &&
                window.SOO_MRT.getModeMeta(window.SOO_MRT.getMode()).short) ||
              "MRT";
            h4.innerHTML = `MRT 战术板 · ${escapeHtml(modeShort)} <span class="planner-mrt-edited">已改</span>`;
          }
        }
      }
      if (!bossTouched) {
        setStatus(`已映射 ${named.length} 人，但当前 MRT 文本中未找到可替换的代号（可能已是角色名）`);
        return;
      }
      setStatus(
        `已将 ${named.length} 个代号→角色名写入 ${bossTouched} 份 MRT（约 ${totalHits} 处）。可直接复制；「恢复生成」可还原代号版`
      );
    });
  }

  document.getElementById("btnPrint").addEventListener("click", () => {
    window.print();
  });

  if (window.SOO_MRT && window.SOO_MRT.initMode) window.SOO_MRT.initMode();
  syncMrtModeButtons();
  renderRows(loadRoster());
  generate();
})();
