let data = JSON.parse(localStorage.getItem('eduwell')) || {
  xp: 0,
  level: 1,
  points: 0,
  challenges: [],
  history: [],
  badges: []
};

let user = localStorage.getItem('user') || prompt('Enter name');
localStorage.setItem('user', user);

function save() {
  localStorage.setItem('eduwell', JSON.stringify(data));
}

function addXP(x) {
  data.xp += x;
  data.level = Math.floor(data.xp / 100) + 1;
  save();
  updateUI();
}

function analyzeBurnout() {
  let s = +studyHours.value;
  let sl = +sleepHours.value;
  let sc = +screenHours.value;
  let st = +stressLevel.value;

  let score = 100;
  if (s > 8) score -= 20;
  if (sl < 6) score -= 30;
  if (sc > 6) score -= 20;
  if (st > 7) score -= 30;

  data.history.push(score);
  addXP(20);

  burnoutResult.innerText = score > 60 ? "Good" : "Bad";
}

function analyzeFood() {
  let m = mealInput.value.toLowerCase();
  foodResult.innerText = m.includes('burger') ? "Bad" : "Good";
  addXP(10);
}

function generateSummary() {
  let t = lessonInput.value;
  summaryResult.innerText = "AI: " + t;
  addXP(15);
}

function sendHelp() {
  helpResult.innerText = "Sent";
  addXP(25);
}

function toggleChallenge(el) {
  el.classList.toggle('active');
  addXP(10);
}

function updateUI() {
  level.innerText = data.level;
  xp.innerText = data.xp;
  points.innerText = data.points;
}

window.onload = updateUI;
