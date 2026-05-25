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

//
// 😴 Sleep Motivation (تحفيز ذكي)
//
function sleepMotivation() {
  const msgs = [
    "😴 Sleep is your superpower!",
    "💙 Rest = better brain performance",
    "⚡ Good sleep makes you smarter!",
    "🧠 Your brain is recharging..."
  ];

  const msg = msgs[Math.floor(Math.random() * msgs.length)];
  document.getElementById("sleepMsg").innerText = msg;

  addXP(10);
}

//
// 📚 AI Summary (ANY LANGUAGE SUPPORTED)
//
function generateSummary() {
  let text = document.getElementById("lessonInput").value;

  if (!text) return;

  let summary = "📚 Explanation: " + text;

  // تحسين بسيط حسب اللغة
  if (text.match(/[à-ÿ]/i)) {
    summary = "📚 Explication du cours: " + text;
  }
  if (text.match(/[\u0600-\u06FF]/)) {
    summary = "📚 شرح الدرس: " + text;
  }

  document.getElementById("summaryResult").innerText = summary;

  addXP(20);
}

//
// 🥗 Food check
//
function checkFood() {
  let food = document.getElementById("foodInput").value.toLowerCase();

  let result = "🟢 Healthy choice";

  if (food.includes("burger") || food.includes("cola")) {
    result = "🔴 Try healthier food";
  }

  document.getElementById("foodResult").innerText = result;

  addXP(10);
}

//
// 🏆 Challenges + CONGRATULATIONS
//
function challengeDone(el) {
  if (el.checked) {
    addXP(15);
  }

  let all = document.querySelectorAll("input[type=checkbox]");
  let done = [...all].every(x => x.checked);

  if (done) {
    document.getElementById("congrats").innerText =
      "🎉 CONGRATULATIONS 🎉";
  } else {
    document.getElementById("congrats").innerText = "";
  }
}

update();