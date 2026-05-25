// --- NAVIGATIONAL FUNCTION (Navigation & Back Buttons) ---
function switchScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    // Show chosen screen
    document.getElementById(screenId).classList.remove('hidden');
}

function switchStudyOption(optionId) {
    document.querySelectorAll('.study-option').forEach(opt => opt.classList.add('hidden'));
    document.getElementById(optionId).classList.remove('hidden');
}

function switchFunOption(optionId) {
    document.querySelectorAll('.fun-option').forEach(opt => opt.classList.add('hidden'));
    document.getElementById(optionId).classList.remove('hidden');
}


// --- HEALTH SECTION: AI LOGIC & TASKS ---
function runAIHealthAdvisor() {
    const sleep = document.getElementById('sleep-hours').value;
    const work = document.getElementById('work-hours').value;
    const anxious = document.getElementById('anxious-status').value;
    const problem = document.getElementById('health-problem').value.toLowerCase();
    
    let responseBox = document.getElementById('ai-response');
    responseBox.classList.remove('hidden');
    
    // AI Decision Simulation Engine
    let advice = "🤖 <b>AI Health Assistant Response:</b><br>";
    
    if (anxious === 'very' || anxious === 'yes' || problem.includes('sad') || problem.includes('stress') || problem.includes('anxious')) {
        advice += "• I see you're feeling anxious or stressed. Please take 5 deep breaths right now. Consider pausing work and listen to calm music. Your mental health matters!<br>";
    }
    
    if (sleep !== "" && parseInt(sleep) < 7) {
        advice += "• You only slept " + sleep + " hours. This is lower than recommended. Try to avoid caffeine now and complete the 8-hour sleep task below tonight.<br>";
    } else if (parseInt(sleep) >= 7) {
        advice += "• Great job sleeping " + sleep + " hours! Keeping a regular sleep cycle works wonders.<br>";
    }
    
    if (work !== "" && parseInt(work) > 9) {
        advice += "• Working for " + work + " hours is heavy. Watch out for burnout! Take a 10-minute walk.<br>";
    }

    if (problem.includes('headache') || problem.includes('pain')) {
        advice += "• For physical discomfort/headaches, please stay hydrated, reduce screen brightness, and rest in a dark room. Consult a doctor if it persists.<br>";
    }
    
    if (problem === "" && anxious === 'no' && sleep === "" && work === "") {
        advice += "• Everything looks stable. Remember to complete your daily checklist tasks below to keep up the healthy momentum!";
    }
    
    responseBox.innerHTML = advice;
}

function checkTasks() {
    const t1 = document.getElementById('task1').checked;
    const t2 = document.getElementById('task2').checked;
    const t3 = document.getElementById('task3').checked;
    const congrats = document.getElementById('congrats-msg');
    
    if (t1 && t2 && t3) {
        congrats.classList.remove('hidden'); // Displays "Congratulations" in English
    } else {
        congrats.classList.add('hidden');
    }
}


// --- STUDY SECTION: POMODORO TIMER ---
let pomodoroInterval;
let timerMinutes = 25;
let timerSeconds = 0;
let isTimerRunning = false;
let isBreakPeriod = false;

function togglePomodoro() {
    const btn = document.getElementById('pomodoro-btn');
    if (isTimerRunning) {
        clearInterval(pomodoroInterval);
        isTimerRunning = false;
        btn.innerText = "Resume Timer";
    } else {
        isTimerRunning = true;
        btn.innerText = "Pause Timer";
        pomodoroInterval = setInterval(updatePomodoro, 1000);
    }
}

function updatePomodoro() {
    const display = document.getElementById('timer-display');
    const status = document.getElementById('timer-status');
    
    if (timerSeconds === 0) {
        if (timerMinutes === 0) {
            // Cycle ended
            if (!isBreakPeriod) {
                isBreakPeriod = true;
                timerMinutes = 5; // 5 mins break
                status.innerText = "Break Time! Rest your brain.";
                alert("Study session over! Time for a 5-minute break.");
            } else {
                isBreakPeriod = false;
                timerMinutes = 25; // 25 mins study
                status.innerText = "Study Time!";
                alert("Break over! Time to focus for 25 minutes.");
            }
        } else {
            timerMinutes--;
            timerSeconds = 59;
        }
    } else {
        timerSeconds--;
    }
    
    let minStr = timerMinutes < 10 ? "0" + timerMinutes : timerMinutes;
    let secStr = timerSeconds < 10 ? "0" + timerSeconds : timerSeconds;
    display.innerText = minStr + ":" + secStr;
}


// --- STUDY SECTION: 1000 PROGRESSIVE MATH LEVEL ---
let mathLevel = 1;
let currentAnswer = 0;
let mathTimeLeft = 15;
let mathTimerInterval;

function startMathGame() {
    document.getElementById('math-game-play').classList.remove('hidden');
    document.getElementById('math-game-over').classList.add('hidden');
    generateMathQuestion();
}

function generateMathQuestion() {
    clearInterval(mathTimerInterval);
    document.getElementById('math-level').innerText = mathLevel;
    document.getElementById('math-answer').value = "";
    
    // Scale difficulty up dynamically toward level 1000
    let num1 = Math.floor(Math.random() * (mathLevel * 2)) + 2;
    let num2 = Math.floor(Math.random() * (mathLevel * 1.5)) + 2;
    
    let op = "+";
    if (mathLevel > 15) {
        let ops = ["+", "-"];
        if (mathLevel > 40) ops.push("*");
        op = ops[Math.floor(Math.random() * ops.length)];
    }
    
    if (op === "+") currentAnswer = num1 + num2;
    else if (op === "-") currentAnswer = num1 - num2;
    else if (op === "*") currentAnswer = num1 * num2;
    
    document.getElementById('math-question').innerText = `${num1} ${op} ${num2} = ?`;
    
    // Timer speed gets tighter as levels scale up
    mathTimeLeft = Math.max(5, 20 - Math.floor(mathLevel / 20)); 
    document.getElementById('math-timer').innerText = "Time Left: " + mathTimeLeft + "s";
    
    mathTimerInterval = setInterval(() => {
        mathTimeLeft--;
        document.getElementById('math-timer').innerText = "Time Left: " + mathTimeLeft + "s";
        if (mathTimeLeft <= 0) {
            endMathGame(false); // Game over if time expires
        }
    }, 1000);
}

function submitMathAnswer() {
    let userAns = parseInt(document.getElementById('math-answer').value);
    if (userAns === currentAnswer) {
        mathLevel++;
        if(mathLevel > 1000) {
            endMathGame(true);
        } else {
            generateMathQuestion(); // Move to next harder calculation
        }
    } else {
        endMathGame(false);
    }
}

function quitMathGame() {
    endMathGame(false, "You chose to withdraw.");
}

function endMathGame(isWin, customMsg) {
    clearInterval(mathTimerInterval);
    document.getElementById('math-game-play').classList.add('hidden');
    document.getElementById('math-game-over').classList.remove('hidden');
    
    let msgElement = document.getElementById('math-result-msg');
    if (isWin) {
        msgElement.innerText = "🏆 Incredible! You cleared all 1000 levels!";
    } else {
        msgElement.innerText = customMsg ? customMsg : `Game Over! You reached Level ${mathLevel}.`;
    }
    mathLevel = 1; // reset
}


// --- STUDY SECTION: WORLD HISTORY EXPEDITION ---
const historyData = {
    "USA": "The United States declared independence in 1776 from Britain, growing rapidly through industrialization. It survived a Civil War (1861-1865) and became a global economic and technological superpower following WWII.",
    "Egypt": "Home to one of the world's oldest civilizations starting around 3100 BC. Famous for the Great Pyramids of Giza, Pharaohs, and integration into Islamic and modern Middle-Eastern golden eras.",
    "Saudi Arabia": "Rich in deep historical trade routes, it is the birthplace of Islam in the early 7th century. The modern Unified Kingdom was founded in 1932 by King Abdulaziz Al Saud, rapidly changing into a global energy leader.",
    "UK": "Constructed a massive empire covering vast global territories through industrial marvels and maritime dominance. Shaped democratic governance and survived the Blitz to remain an influential modern hub.",
    "China": "Boasts thousands of years of dynastic history (like Han & Tang dynasties), building the Great Wall. Transitioned into a massive People's Republic in 1949 and is currently a world economic and technological giant.",
    "Japan": "Famed for its feudal history featuring Samurai warriors and Shoguns. Closed off for centuries, it modernized instantly during the Meiji Restoration, ultimately emerging as a leading high-tech peaceful nation."
};

function showHistory(country) {
    let box = document.getElementById('history-info');
    box.classList.remove('hidden');
    box.innerHTML = `<b>📜 ${country}:</b><br>${historyData[country]}`;
}


// --- ENTERTAINMENT: WHITEBOARD DRAWING CANVAS ---
let canvas, ctx;
let isDrawing = false;

function initCanvas() {
    canvas = document.getElementById('paintCanvas');
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000000'; // Black Pen
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    // Mouse Events for Drawing
    canvas.addEventListener('mousedown', (e) => { isDrawing = true; draw(e); });
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => { ctx.beginPath(); isDrawing = false; });
    canvas.addEventListener('mouseleave', () => { ctx.beginPath(); isDrawing = false; });
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// --- ENTERTAINMENT: WORD ANAGRAM PUZZLE GAME ---
const wordBank = [
    { scrambled: "A - P - P - L - E", correct: "APPLE" },
    { scrambled: "C - O - D - I - N - G", correct: "CODING" },
    { scrambled: "S - M - A - R - T", correct: "SMART" },
    { scrambled: "H - A - P - P - Y", correct: "HAPPY" },
    { scrambled: "S - C - H - O - O - L", correct: "SCHOOL" }
];
let currentWordObj;

function startWordGame() {
    currentWordObj = wordBank[Math.floor(Math.random() * wordBank.length)];
    document.getElementById('scrambled-letters').innerText = currentWordObj.scrambled;
    document.getElementById('word-input').value = "";
    document.getElementById('word-feedback').innerText = "";
}

function checkWordGame() {
    let answer = document.getElementById('word-input').value.trim().toUpperCase();
    let fb = document.getElementById('word-feedback');
    if (answer === currentWordObj.correct) {
        fb.style.color = "green";
        fb.innerText = "🎯 Correct! Excellent Job!";
    } else {
        fb.style.color = "red";
        fb.innerText = "❌ Wrong! Try again.";
    }
}
