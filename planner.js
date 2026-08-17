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
      flexHeal: Object.prototype.hasOwnProperty.call(m, "flexHeal")
        ? m.flexHeal || ""
        : P.defaultFlexFor(m.specId, "heal") || "",
      flexTank: Object.prototype.hasOwnProperty.call(m, "flexTank")
        ? m.flexTank || ""
        : P.defaultFlexFor(m.specId, "tank") || "",
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
      `<option value="">不能切</option>` +
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
        const flexHeal = Object.prototype.hasOwnProperty.call(m, "flexHeal")
          ? m.flexHeal || ""
          : P.defaultFlexFor(m.specId, "heal") || "";
        const flexTank = Object.prototype.hasOwnProperty.call(m, "flexTank")
          ? m.flexTank || ""
          : P.defaultFlexFor(m.specId, "tank") || "";
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

  function ul(items) {
    if (!items || !items.length) return "<p class='brief-empty'>—</p>";
    return `<ul>${items.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>`;
  }

  function roundGrid(rounds, opts) {
    if (!rounds || !rounds.length) return "<p class='brief-empty'>阵容无团减/抬血技能</p>";
    const fmt = window.SOO_PLANNER && window.SOO_PLANNER.formatRound;
    const suffix = opts && opts.suffix !== undefined ? opts.suffix : "循环";
    return `<div class="rb-cd-grid planner-round-grid">${rounds
      .map((r) => {
        const body = fmt ? fmt(r) : (r.items || []).map((i) => `${i.who}（${i.skills}）`).join(" + ");
        return `
      <article class="rb-cd-slot rb-cd-slot--round">
        <h5><span class="rb-cd-num">${escapeHtml(r.slot)}</span>${escapeHtml(suffix)}</h5>
        <p class="rb-cd-skills">${escapeHtml(body)}</p>
      </article>`;
      })
      .join("")}</div>`;
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
            .map((f) => `${escapeHtml(f.display || f.tag)}（${escapeHtml(f.text)}）`)
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
        }"><strong>${escapeHtml(m.display || m.tag)}</strong> ${escapeHtml(m.spec)}${
          m.name && m.tag && m.name !== m.tag ? ` <em>${escapeHtml(m.tag)}</em>` : ""
        }${bits.length ? ` <em>${escapeHtml(bits.join(" "))}</em>` : ""}</span>`;
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
    <h4>常规减伤（3 轮循环）</h4>
    ${roundGrid(r.cdRounds)}
    <p class="planner-hint">一轮 = 一减 + 一抬，余量技能自动补进轮次。特殊 Boss 切专精后以该 Boss 卡片为准。</p>
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
        const shareText = b.shareText || (window.SOO_PLANNER.exportBossShare && window.SOO_PLANNER.exportBossShare(b)) || "";
        const mrt = b.mrt ? mrtById[b.id] : null;
        const edited = mrt && Object.prototype.hasOwnProperty.call(mrtEdits, b.id);
        const displayText = mrt ? getMrtText(b.id, mrt.text) : "";
        const processList =
          b.process && b.process.length
            ? `<div class="brief-block brief-span-2"><h4>进程</h4>${ul(b.process)}</div>`
            : "";
        const shareBox = `<div class="planner-share" data-share-box="${b.id}">
        <div class="planner-mrt-head">
          <h4>团员粘贴稿</h4>
          <div class="planner-mrt-actions">
            <button type="button" class="btn btn-primary btn-share-copy" data-share="${b.id}">复制给团员</button>
          </div>
        </div>
        <p class="planner-hint">可直接发 QQ / 微信。站位 / 分工 / 进程已拆开，不重复。</p>
        <textarea class="planner-share-text" data-share-text="${b.id}" rows="12" spellcheck="false" aria-label="${escapeAttr(
          b.name
        )} 团员稿" readonly>${escapeHtml(shareText)}</textarea>
      </div>`;
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
        <p class="planner-hint">本战有固定减伤时间轴。可改文本；复制会用你改过的版本。已填角色名会自动写入。</p>
        <textarea class="planner-mrt-text" data-mrt-text="${b.id}" rows="12" spellcheck="false" aria-label="${escapeAttr(
              b.name
            )} MRT">${escapeHtml(displayText)}</textarea>
      </div>`
          : `<p class="planner-hint">本战无固定减伤轴，不生成 MRT。用上方团员稿即可。</p>`;
        return `
<article class="brief-card" id="plan-${b.id}">
  <header class="brief-card-head">
    <span class="brief-idx">${b.idx}</span>
    <div>
      <h3>${escapeHtml(b.name)} ${flexBadge(b)}${b.mrt ? ' <span class="planner-mrt-badge">MRT</span>' : ""}</h3>
      <p class="brief-meta">${escapeHtml(b.note || "")} · 嗜血：${escapeHtml(b.lust)} · 主T ${escapeHtml(
        (b.roles && b.roles.mt) || "?"
      )} · 副T ${escapeHtml((b.roles && b.roles.ot) || "?")}${
        b.roles && b.roles.t3 ? " · 三T " + escapeHtml(b.roles.t3) : ""
      }</p>
    </div>
  </header>
  <div class="brief-card-body">
    <p class="brief-pull"><strong>起手站位</strong> ${escapeHtml(b.stance || b.pull || "")}</p>
    <div class="brief-grid">
      <div class="brief-block">
        <h4>人员分工</h4>
        ${ul(b.assign)}
      </div>
      <div class="brief-block">
        <h4>${escapeHtml(b.cdRoundLabel || "本 Boss 减伤（3 轮循环）")}</h4>
        ${roundGrid(b.cdRounds, { suffix: b.cdCover === "raid" ? "全团" : "循环" })}
      </div>
      ${processList}
      ${
        b.mrt && b.timeline && b.timeline.length
          ? `<div class="brief-block brief-span-2">
        <h4>固定减伤时间轴</h4>
        ${timelineTable(b.timeline)}
      </div>`
          : ""
      }
    </div>
    ${shareBox}
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

    listEl.querySelectorAll(".btn-share-copy").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-share");
        const ta = listEl.querySelector(`textarea[data-share-text="${id}"]`);
        const boss = (lastPlan && lastPlan.bosses.find((x) => x.id === id)) || plan.bosses.find((x) => x.id === id);
        if (!ta || !boss) return;
        try {
          await navigator.clipboard.writeText(ta.value);
          setStatus(`已复制 ${boss.idx}. ${boss.name} 团员稿`);
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
            )}${b.flexNotes && b.flexNotes.length ? " *" : ""}${b.mrt ? " MRT" : ""}${
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
    setStatus(`已生成 ${lastPlan.bosses.length} 个 Boss · 3 轮减伤 · ${lastPlan.roster.note}`);
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
    const text = P.exportShare ? P.exportShare(lastPlan) : P.exportText(lastPlan);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("已复制全部团员稿，可直接发给团员");
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
        setStatus(`已复制 ${notes.length} 份特殊 Boss ${modeShort} MRT（含已保存的修改）`);
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

  document.getElementById("btnPrint").addEventListener("click", () => {
    window.print();
  });

  if (window.SOO_MRT && window.SOO_MRT.initMode) window.SOO_MRT.initMode();
  syncMrtModeButtons();
  renderRows(loadRoster());
  generate();
})();
