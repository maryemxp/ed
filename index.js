let xp = 0;
let level = 1;

function update() {
  document.getElementById("xp").innerText = xp;
  document.getElementById("level").innerText = level;
}

function addXP(v) {
  xp += v;
  level = Math.floor(xp / 100) + 1;
  update();
}

/* 😴 Sleep Motivation */
function sleepMotivation() {
  const msgs = [
    "😴 Sleep = Brain Power Boost!",
    "⚡ Rest improves memory & focus",
    "🧠 Your brain needs recovery!",
    "💙 Good sleep = better grades!"
  ];

  let msg = msgs[Math.floor(Math.random() * msgs.length)];
  document.getElementById("sleepMsg").innerText = msg;

  addXP(10);
}

/* 📚 AI SUMMARY (multi-language simple smart system) */
function generateSummary() {
  let text = document.getElementById("lessonInput").value;

  if (!text) return;

  let result = "📚 Explanation: " + text;

  // Arabic detection
  if (/[\u0600-\u06FF]/.test(text)) {
    result = "📚 شرح الدرس: " + text;
  }

  // French detection
  if (/[à-ÿ]/i.test(text)) {
    result = "📚 Explication du cours: " + text;
  }

  document.getElementById("summaryResult").innerText = result;

  addXP(20);
}

/* 🥗 Food AI */
function checkFood() {
  let food = document.getElementById("foodInput").value.toLowerCase();

  let result = "🟢 Healthy choice";

  if (food.includes("burger") || food.includes("cola") || food.includes("pizza")) {
    result = "🔴 Try healthier food";
  }

  document.getElementById("foodResult").innerText = result;

  addXP(10);
}

/* 🏆 Challenges */
function challengeDone(el) {
  addXP(15);

  let all = document.querySelectorAll("input[type='checkbox']");
  let done = [...all].every(x => x.checked);

  if (done) {
    document.getElementById("congrats").innerText =
      "🎉 CONGRATULATIONS 🎉";
  } else {
    document.getElementById("congrats").innerText = "";
  }
}

/* init */
update();
