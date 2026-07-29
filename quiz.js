(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  let selectedRole = null;
  let quizItems = [];
  let currentQ = 0;
  let answers = {};

  const quizSetup = $("#quizSetup");
  const quizBoard = $("#quizBoard");
  const quizResult = $("#quizResult");
  const quizForm = $("#quizForm");
  const startQuizBtn = $("#startQuiz");

  const SCOPE = {
    all: () => true,
    front: (b) => b.idx >= 1 && b.idx <= 7,
    back: (b) => b.idx >= 8 && b.idx <= 14,
  };

  $$(".role-card").forEach((card) => {
    card.addEventListener("click", () => {
      $$(".role-card").forEach((c) => c.setAttribute("aria-pressed", "false"));
      card.setAttribute("aria-pressed", "true");
      selectedRole = card.dataset.role;
      startQuizBtn.disabled = false;
    });
  });

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildQuiz(role, count, scopeKey) {
    const filter = SCOPE[scopeKey] || SCOPE.all;
    const bosses = window.SOO.bosses.filter(filter);
    const pool = [];

    for (const boss of bosses) {
      const bank = window.SOO_QUESTIONS[boss.id] || {};
      const list = bank[role] || [];
      list.forEach((item, idx) => {
        pool.push({
          id: `${boss.id}-${role}-${idx}`,
          bossId: boss.id,
          bossName: `${boss.idx}. ${boss.name}`,
          role,
          q: item.q,
          options: item.options,
          a: item.a,
        });
      });
    }

    const perBoss = [];
    const rest = [];
    const usedBoss = new Set();
    const shuffled = shuffle(pool);
    for (const item of shuffled) {
      if (!usedBoss.has(item.bossId)) {
        perBoss.push(item);
        usedBoss.add(item.bossId);
      } else {
        rest.push(item);
      }
    }
    const ordered = shuffle(perBoss).concat(shuffle(rest));
    return ordered.slice(0, Math.min(count, ordered.length));
  }

  function renderQuestion() {
    const item = quizItems[currentQ];
    if (!item) return;
    const roleLabel = window.SOO.roles[selectedRole].label;
    $("#quizRoleLabel").textContent = `职责：${roleLabel}`;
    $("#quizProgressText").textContent = `${currentQ + 1} / ${quizItems.length}`;
    $("#progressFill").style.width = `${((currentQ + 1) / quizItems.length) * 100}%`;

    quizForm.innerHTML = `
      <div class="q-card">
        <p class="q-boss">${item.bossName}</p>
        <h4>${item.q}</h4>
        <div class="options">
          ${item.options
            .map(
              (opt, i) => `
            <label class="opt">
              <input type="radio" name="answer" value="${i}" ${
                answers[item.id] === i ? "checked" : ""
              } />
              <span>${String.fromCharCode(65 + i)}. ${opt}</span>
            </label>`
            )
            .join("")}
        </div>
      </div>`;

    quizForm.onchange = () => {
      const checked = quizForm.querySelector("input[name=answer]:checked");
      if (checked) answers[item.id] = Number(checked.value);
    };

    $("#prevQ").disabled = currentQ === 0;
    $("#nextQ").disabled = currentQ === quizItems.length - 1;
  }

  function startQuiz() {
    if (!selectedRole) return;
    const count = Number($("#quizCount").value);
    const scope = $("#quizScope").value;
    quizItems = buildQuiz(selectedRole, count, scope);
    if (!quizItems.length) {
      alert("当前范围下没有可用题目。");
      return;
    }
    answers = {};
    currentQ = 0;
    quizSetup.classList.add("hidden");
    quizResult.classList.add("hidden");
    quizBoard.classList.remove("hidden");
    renderQuestion();
    quizBoard.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  startQuizBtn.addEventListener("click", startQuiz);

  $("#prevQ").addEventListener("click", () => {
    if (currentQ > 0) {
      currentQ -= 1;
      renderQuestion();
    }
  });

  $("#nextQ").addEventListener("click", () => {
    if (currentQ < quizItems.length - 1) {
      currentQ += 1;
      renderQuestion();
    }
  });

  quizForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const checked = quizForm.querySelector("input[name=answer]:checked");
    if (checked) answers[quizItems[currentQ].id] = Number(checked.value);

    const unanswered = quizItems.filter((q) => answers[q.id] === undefined).length;
    if (unanswered > 0) {
      const go = confirm(`还有 ${unanswered} 题未作答，确认交卷吗？`);
      if (!go) return;
    }

    let correct = 0;
    const rows = quizItems.map((item) => {
      const user = answers[item.id];
      const ok = user === item.a;
      if (ok) correct += 1;
      return { item, user, ok };
    });

    const total = quizItems.length;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const roleLabel = window.SOO.roles[selectedRole].label;
    let verdict = "需要再熟悉机制，建议打开攻略页复盘。";
    if (pct >= 90) verdict = "优秀！可以去给队友讲战术了。";
    else if (pct >= 75) verdict = "良好，关键机制已经掌握。";
    else if (pct >= 60) verdict = "及格，个别 Boss 还需加强。";

    quizBoard.classList.add("hidden");
    quizResult.classList.remove("hidden");
    quizResult.innerHTML = `
      <div class="score-hero">
        <div class="score-num">${correct} / ${total}</div>
        <p>${roleLabel}测验得分 ${pct}% · ${verdict}</p>
        <div style="margin-top:1rem;display:flex;gap:.6rem;justify-content:center;flex-wrap:wrap">
          <button type="button" class="btn btn-primary" id="retryQuiz">再测一次</button>
          <button type="button" class="btn btn-ghost" id="backSetup">返回选择职责</button>
          <a class="btn btn-ghost" href="index.html#guides">查看攻略</a>
        </div>
      </div>
      ${rows
        .map(({ item, user, ok }, i) => {
          const userText =
            user === undefined ? "未作答" : `${String.fromCharCode(65 + user)}. ${item.options[user]}`;
          const rightText = `${String.fromCharCode(65 + item.a)}. ${item.options[item.a]}`;
          return `
          <div class="result-item ${ok ? "correct" : "wrong"}">
            <div class="meta">${i + 1}. ${item.bossName} · ${ok ? "回答正确" : "回答错误"}</div>
            <h5>${item.q}</h5>
            <div class="ans">
              <div>你的答案：<span class="${ok ? "ok" : "bad"}">${userText}</span></div>
              ${ok ? "" : `<div>正确答案：<span class="ok">${rightText}</span></div>`}
            </div>
          </div>`;
        })
        .join("")}
    `;

    $("#retryQuiz").onclick = () => startQuiz();
    $("#backSetup").onclick = () => {
      quizResult.classList.add("hidden");
      quizBoard.classList.add("hidden");
      quizSetup.classList.remove("hidden");
      quizSetup.scrollIntoView({ behavior: "smooth" });
    };
    quizResult.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
