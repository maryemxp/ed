let q = {};
let xp = 0;

/* NAVIGATION */
function openSection(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function backHome(){
  openSection("home");
}

/* ================= HEALTH AI ================= */
function healthAI(){
  let sleep = +document.getElementById("sleep").value;
  let stress = document.getElementById("stress").value;
  let problem = document.getElementById("problem").value;

  let msg = "You are fine 👍";

  if(sleep < 6) msg = "😴 You need more sleep";
  if(stress === "yes") msg = "💙 Try breathing exercises";

  if(problem){
    msg += " | Advice: talk to someone you trust and take breaks.";
  }

  document.getElementById("healthResult").innerText = msg;
}

/* TASKS */
function checkHealthTasks(){
  let boxes = document.querySelectorAll("#health input[type=checkbox]");
  let done = [...boxes].every(b=>b.checked);

  if(done){
    document.getElementById("healthCongrats").innerText = "🎉 CONGRATULATIONS 🎉";
  }
}

/* ================= STUDY ================= */

/* TIMER */
let time = 1500;
let timer;

function startTimer(){
  clearInterval(timer);

  timer = setInterval(()=>{
    time--;

    let m = Math.floor(time/60);
    let s = time%60;

    document.getElementById("timer").innerText = m+":"+s;

    if(time<=0){
      clearInterval(timer);
      alert("Break time!");
      time = 300;
    }
  },1000);
}

/* MATH */
function newQuestion(){
  let a = Math.floor(Math.random()*50);
  let b = Math.floor(Math.random()*50);
  q.answer = a + b;
  document.getElementById("question").innerText = a + " + " + b;
}

function checkMath(){
  let ans = +document.getElementById("answer").value;

  if(ans === q.answer){
    xp++;
    newQuestion();
    document.getElementById("answer").value = "";
  }
}

newQuestion();

/* COUNTRY INFO */
function countryInfo(c){
  let data = {
    morocco:"Morocco is a North African country rich in culture.",
    france:"France is known for art, fashion and history.",
    japan:"Japan is a technological and cultural country."
  };

  document.getElementById("countryText").innerText = data[c] || "";
}

/* ================= FUN ================= */

/* DRAWING */
let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");
let draw = false;

canvas.onmousedown = ()=>draw=true;
canvas.onmouseup = ()=>draw=false;
canvas.onmousemove = (e)=>{
  if(draw){
    ctx.fillRect(e.offsetX, e.offsetY, 3, 3);
  }
};

function clearBoard(){
  ctx.clearRect(0,0,300,200);
}

/* WORD GAME */
let letters = ["A","B","C","D","E","T","R","O"];
document.getElementById("letters").innerText = letters.join(" ");

function checkWord(){
  let w = document.getElementById("word").value.toUpperCase();
  if(w.includes("CAT") || w.includes("RED")){
    document.getElementById("wordResult").innerText = "Correct 🎉";
  } else {
    document.getElementById("wordResult").innerText = "Try again";
  }
}
