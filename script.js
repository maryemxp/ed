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

/* 😴 Sleep AI */
function sleepMotivation() {
  const msg = [
    "😴 Sleep = Brain Power",
    "⚡ Rest makes you smarter",
    "🧠 Your brain is recharging",
    "💙 Good sleep = success"
  ][Math.floor(Math.random()*4)];

  document.getElementById("sleepMsg").innerText = msg;
  addXP(10);
}

/* 📚 SMART AI (any language support) */
function generateSummary() {
  let text = lessonInput.value;

  if (!text) return;

  let result = "📚 AI Explanation: " + text;

  if (/[\u0600-\u06FF]/.test(text)) {
    result = "📚 شرح ذكي: " + text;
  }

  if (/[à-ÿ]/i.test(text)) {
    result = "📚 Explication: " + text;
  }

  summaryResult.innerText = result;
  addXP(20);
}

/* 🥗 FOOD */
function checkFood() {
  let food = foodInput.value.toLowerCase();

  foodResult.innerText =
    (food.includes("burger") || food.includes("cola"))
    ? "🔴 Unhealthy"
    : "🟢 Healthy";

  addXP(10);
}

/* 🏆 CHALLENGE */
function checkDone() {
  let boxes = document.querySelectorAll("input[type=checkbox]");
  let allDone = [...boxes].every(b => b.checked);

  if (allDone) {
    congrats.innerText = "🎉 CONGRATULATIONS 🎉";
    addXP(30);
  } else {
    congrats.innerText = "";
  }
}

/* 📥 DOWNLOAD SYSTEM */
function downloadText(filename, text) {
  let blob = new Blob([text], {type: "text/plain"});
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

/* downloads */
function downloadSleep() {
  downloadText("sleep.txt", sleepMsg.innerText);
}

function downloadSummary() {
  downloadText("summary.txt", summaryResult.innerText);
}

function downloadFood() {
  downloadText("food.txt", foodResult.innerText);
}

function downloadChallenge() {
  downloadText("challenge.txt", congrats.innerText);
}

update();
