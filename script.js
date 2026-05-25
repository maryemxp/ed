// --- CENTRAL NAVIGATIONAL SWITCHES ---
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

function switchStudyOption(optionId) {
    document.querySelectorAll('.study-option').forEach(o => o.classList.add('hidden'));
    document.getElementById(optionId).classList.remove('hidden');
}

function switchFunOption(optionId) {
    document.querySelectorAll('.fun-option').forEach(o => o.classList.add('hidden'));
    document.getElementById(optionId).classList.remove('hidden');
}


// --- HEALTH SECTION: MENTAL & WELL-BEING MOCK AI ---
function runAIHealthAdvisor() {
    const sleep = parseInt(document.getElementById('sleep-hours').value) || 0;
    const work = parseInt(document.getElementById('work-hours').value) || 0;
    const mood = document.getElementById('anxious-status').value;
    const prob = document.getElementById('health-problem').value.toLowerCase();
    const box = document.getElementById('ai-response');
    
    box.classList.remove('hidden');
    let advice = "🧠 <b>AI Health Insights:</b><br>";

    if (mood === 'anxious' || mood === 'sad' || prob.includes('stress') || prob.includes('sad')) {
        advice += "• Mind Check: Your emotional baseline is tense today. Let's counter this. Drop everything and click the <b>Digital Detox Timer</b> below right now.<br>";
    }
    if (sleep < 7 && sleep > 0) {
        advice += `• Sleep Deprivation: ${sleep}h is critical for memory consolidation. Expect lower concentration today. Prioritize an early bedtime.<br>`;
    }
    if (work > 8) {
        advice += `• Burnout Alert: Overworking (${work}h) triggers systemic fatigue. Keep regular hydration to flush toxins.<br>`;
    }
    if (prob.includes('headache') || prob.includes('migraine')) {
        advice += "• Physical Sign: Headaches often point to physical strain or blue light overexposure. Dim screens immediately.<br>";
    }
    if (advice === "🧠 <b>AI Health Insights:</b><br>") {
        advice += "• Metrics looks great! Keep balancing your work limits, track habits, and remember your 1-minute deep breathing exercise.";
    }
    box.innerHTML = advice;
}

// Digital Detox Timer Custom Implementation
let detoxTimeLeft = 60;
let detoxInterval;
function startDetox() {
    clearInterval(detoxInterval);
    detoxTimeLeft = 60;
    document.getElementById('detox-btn').disabled = true;
    detoxInterval = setInterval(() => {
        detoxTimeLeft--;
        document.getElementById('detox-timer').innerText = detoxTimeLeft + "s";
        if (detoxTimeLeft <= 0) {
            clearInterval(detoxInterval);
            document.getElementById('detox-timer').innerText = "Done! ✨";
            document.getElementById('detox-btn').disabled = false;
            alert("Digital Detox complete. Great job protecting your focus!");
        }
    }, 1000);
}

function checkTasks() {
    const t1 = document.getElementById('task1').checked;
    const t2 = document.getElementById('task2').checked;
    const t3 = document.getElementById('task3').checked;
    const msg = document.getElementById('congrats-msg');
    if (t1 && t2 && t3) msg.classList.remove('hidden');
    else msg.classList.add('hidden');
}


// --- STUDY SECTION: AI LESSON EXPLAINER ---
const mockLessonAI_Database = {
    "photosynthesis": "<b>Photosynthesis</b> is how plants produce food. They capture sunlight using green pigments called <i>chlorophyll</i>, absorb carbon dioxide ($CO_2$) from the air, and water ($H_2O$) from the ground. They convert this into glucose (energy sugar) and release clean oxygen ($O_2$) back into our atmosphere!",
    "quantum physics": "<b>Quantum Physics</b> studies particles smaller than atoms. At this tiny micro-scale, normal laws of physics shatter. Particles can exist in multiple spots simultaneously (Superposition) and influence each other instantly across light-years (Quantum Entanglement).",
    "world war 2": "<b>World War II (1939-1945)</b> was a vast worldwide conflict pitting the Allied powers (USA, UK, USSR) against the Axis powers (Germany, Japan, Italy). Triggered by Hitler's invasion of Poland, it reshaped maps, accelerated technology, and birthed the United Nations.",
    "gravity": "<b>Gravity</b> is a natural pull force. Sir Isaac Newton proved objects pull each other based on mass. Later, Albert Einstein updated this by proving massive objects literally curve the fabric of space-time around them like a heavy ball on a trampoline.",
    "algebra": "<b>Algebra</b> is a math division where symbols and letters (like $x$ and $y$) act as placeholder variables for unknown values. Isolating these variables allows you to build equations to unlock mysteries across code, logic, and physics."
};

function explainLessonAI() {
    const topic = document.getElementById('lesson-topic').value.trim().toLowerCase();
    const out = document.getElementById('lesson-ai-response');
    out.classList.remove('hidden');
    
    if (!topic) {
        out.innerHTML = "Please type a lesson or topic name first!";
        return;
    }
    
    // Check local smart simulation or output generic dynamic layout
    if (mockLessonAI_Database[topic]) {
        out.innerHTML = `🧠 <b>AI Teacher Response:</b><br>${mockLessonAI_Database[topic]}`;
    } else {
        out.innerHTML = `🧠 <b>AI Teacher Response:</b><br>Here is a structural breakdown of <b>"${topic.toUpperCase()}"</b>:<br>• <b>Core Concept:</b> It is a foundational academic principle widely studied in its field.<br>• <b>Key Mechanism:</b> It involves active operational rules, systemic dependencies, and sequential steps.<br>• <b>Real-world application:</b> Mastered to pass examinations, build engineering projects, or enrich human logic.`;
    }
}


// --- STUDY SECTION: POMODORO TIMER ---
let pomodoroInterval, timerMinutes = 25, timerSeconds = 0, isTimerRunning = false, isBreakPeriod = false;
function togglePomodoro() {
    const btn = document.getElementById('pomodoro-btn');
    if (isTimerRunning) {
        clearInterval(pomodoroInterval); isTimerRunning = false; btn.innerText = "Resume";
    } else {
        isTimerRunning = true; btn.innerText = "Pause";
        pomodoroInterval = setInterval(updatePomodoro, 1000);
    }
}
function updatePomodoro() {
    const disp = document.getElementById('timer-display');
    const status = document.getElementById('timer-status');
    if (timerSeconds === 0) {
        if (timerMinutes === 0) {
            isBreakPeriod = !isBreakPeriod;
            timerMinutes = isBreakPeriod ? 5 : 25;
            status.innerText = isBreakPeriod ? "Break Time! ☕" : "Study Time! 🧠";
            alert(isBreakPeriod ? "Take a 5-minute break!" : "Back to study!");
        } else { timerMinutes--; timerSeconds = 59; }
    } else { timerSeconds--; }
    disp.innerText = `${timerMinutes < 10 ? '0' + timerMinutes : timerMinutes}:${timerSeconds < 10 ? '0' + timerSeconds : timerSeconds}`;
}


// --- STUDY SECTION: PROGRESSIVE MATH GAME ---
let mathLevel = 1, currentMathAns = 0, mathTimeLeft = 15, mathTimerInterval;
function startMathGame() {
    document.getElementById('math-game-play').classList.remove('hidden');
    document.getElementById('math-game-over').classList.add('hidden');
    generateMathQuestion();
}
function generateMathQuestion() {
    clearInterval(mathTimerInterval);
    document.getElementById('math-level').innerText = mathLevel;
    document.getElementById('math-answer').value = "";
    
    let n1 = Math.floor(Math.random() * (mathLevel * 2)) + 2;
    let n2 = Math.floor(Math.random() * (mathLevel * 1.5)) + 2;
    let op = "+";
    if (mathLevel > 10) { op = Math.random() > 0.5 ? "-" : "+"; }
    if (mathLevel > 30) { op = Math.random() > 0.6 ? "*" : op; }

    if (op === "+") currentMathAns = n1 + n2;
    if (op === "-") currentMathAns = n1 - n2;
    if (op === "*") currentMathAns = n1 * n2;

    document.getElementById('math-question').innerText = `${n1} ${op} ${n2} = ?`;
    mathTimeLeft = Math.max(5, 18 - Math.floor(mathLevel / 25));
    document.getElementById('math-timer').innerText = "Time Left: " + mathTimeLeft + "s";
    
    mathTimerInterval = setInterval(() => {
        mathTimeLeft--;
        document.getElementById('math-timer').innerText = "Time Left: " + mathTimeLeft + "s";
        if (mathTimeLeft <= 0) endMathGame(false);
    }, 1000);
}
function submitMathAnswer() {
    if (parseInt(document.getElementById('math-answer').value) === currentMathAns) {
        mathLevel++;
        if (mathLevel > 1000) endMathGame(true); else generateMathQuestion();
    } else { endMathGame(false); }
}
function quitMathGame() { endMathGame(false, "Withdrew voluntarily."); }
function endMathGame(win, m) {
    clearInterval(mathTimerInterval);
    document.getElementById('math-game-play').classList.add('hidden');
    document.getElementById('math-game-over').classList.remove('hidden');
    document.getElementById('math-result-msg').innerText = win ? "🥇 1000 Level Master!" : (m || `Game Over at Level ${mathLevel}`);
    mathLevel = 1;
}


// --- STUDY SECTION: ATLAS MAP DATABASE (22 COUNTRIES) ---
const atlasData = {
    "Saudi Arabia": { f: "🇸🇦", h: "Birthplace of Islam, historical heart of ancient trade networks. Unified in 1932 by King Abdulaziz into a global modern economic titan." },
    "Egypt": { f: "🇪🇬", h: "Incredible 5,000+ year pharaonic legacy. Famous for Pyramids, Nile developments, and central Arab cultural leadership." },
    "USA": { f: "🇺🇸", h: "Gained independence in 1776. Transitioned rapidly via constitutional framework to lead modern industrial and tech landscapes." },
    "United Kingdom": { f: "🇬🇧", h: "Pioneered the global Industrial Revolution, maritime expansion, and Parliamentary systems widely adopted worldwide." },
    "China": { f: "🇨🇳", h: "Dynastic roots going back millennia, inventing paper, printing, and gunpowder. Now a premier global production superpower." },
    "Japan": { f: "🇯🇵", h: "Evolved through Samurai clan eras. Isolated for centuries before modernizing post-Meiji to become a peaceful tech leader." },
    "Morocco": { f: "🇲🇦", h: "Rich North African hub mixing Islamic, Amazigh, and European heritage. Home to the world's oldest continuously running university." },
    "Algeria": { f: "🇩🇿", h: "Known as the land of a million martyrs for its historic resistance. Largest geographical country in Africa." },
    "Tunisia": { f: "🇹🇳", h: "Ancient center of the Carthage empire which challenged Rome. Pivotal Mediterranean trade and learning point." },
    "UAE": { f: "🇦🇪", h: "Unified federation formed in 1971. Transformed coastal ports into structural, economic, and tourism wonders." },
    "Jordan": { f: "🇯🇴", h: "Crossroad of civilizations containing historic sites like Petra. Famous for deep cultural continuity and hospitality." },
    "France": { f: "🇫🇷", h: "Center of Enlightenment philosophy and the 1789 Revolution which reshaped global ideals on liberty and laws." },
    "Germany": { f: "🇩🇪", h: "Engine of Central European history, printing press origins, scientific excellence, and swift post-war rebuilding." },
    "Italy": { f: "🇮🇹", h: "Cradle of the massive Roman Empire and the Renaissance movement which ignited modern European art and science." },
    "Canada": { f: "🇨🇦", h: "Second largest nation on earth, built over vast indigenous history followed by peaceful democratic federation." },
    "Australia": { f: "🇦🇺", h: "Rich with tens of thousands of years of Aboriginal culture, transitioning into a modern vibrant oceanic continent." },
    "Brazil": { f: "🇧🇷", h: "Largest South American country, hosting the Amazon biome and Portuguese colonial transformations." },
    "India": { f: "🇮🇳", h: "Birthplace of major global spiritual traditions, Indus Valley origins, and current largest global democracy." },
    "South Korea": { f: "🇰🇷", h: "Ancient peninsular kingdom that rapidly transitioned into the modern Han River economic/pop-culture marvel." },
    "Spain": { f: "🇪🇸", h: "Maritime giant that spearheaded cross-Atlantic exploration networks, creating deep historic ties across Latin America." },
    "Turkey": { f: "🇹🇷", h: "Bridge between continents, acting as the historical capital core for both Byzantine and Ottoman empires." },
    "South Africa": { f: "🇿🇦", h: "Rainbow Nation possessing rich tribal histories, famous for its historic triumph over institutional inequality led by Mandela." }
};

function initAtlasMap() {
    const container = document.getElementById('dynamic-map-container');
    container.innerHTML = "";
    Object.keys(atlasData).forEach(country => {
        const btn = document.createElement('button');
        btn.className = 'country-btn';
        btn.innerHTML = `${atlasData[country].f} ${country}`;
        btn.onclick = () => {
            const box = document.getElementById('history-info');
            box.classList.remove('hidden');
            box.innerHTML = `<b>${atlasData[country].f} ${country} History:</b><br>${atlasData[country].h}`;
        };
        container.appendChild(btn);
    });
}
document.addEventListener("DOMContentLoaded", initAtlasMap);


// --- ENTERTAINMENT SECTION: DRAWING BOARD ---
let canvas, ctx, isDrawing = false;
function initCanvas() {
    canvas = document.getElementById('paintCanvas'); ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000000'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    canvas.onmousedown = (e) => { isDrawing = true; paint(e); };
    canvas.onmousemove = paint;
    canvas.onmouseup = () => { ctx.beginPath(); isDrawing = false; };
}
function paint(e) {
    if (!isDrawing) return;
    const r = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - r.left, e.clientY - r.top); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(e.clientX - r.left, e.clientY - r.top);
}
function clearCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height); }


// --- ENTERTAINMENT: LEVEL-BASED WORD UNSCRAMBLE GAME ---
const puzzleBank = [
    { original: "APPLE", scrambled: "P - P - L - A - E" },
    { original: "CODING", scrambled: "G - N - I - D - O - C" },
    { original: "BRAIN", scrambled: "I - A - R - N - B" },
    { original: "FUTURE", scrambled: "R - U - T - E - F - I" },
    { original: "PLANET", scrambled: "N - E - T - L - A - P" },
    { original: "HEALTH", scrambled: "T - L - A - E - H - H" },
    { original: "ENERGY", scrambled: "G - R - E - Y - N - E" },
    { original: "SYSTEM", scrambled: "M - E - T - S - Y - S" }
];
let currentWordIndex = 0, wordScore = 0, wordLevel = 1;

function startWordGame() {
    if (currentWordIndex >= puzzleBank.length) currentWordIndex = 0; // loops over bank
    document.getElementById('scrambled-letters').innerText = puzzleBank[currentWordIndex].scrambled;
    document.getElementById('word-input').value = "";
    document.getElementById('word-feedback').innerText = "";
    document.getElementById('word-score').innerText = wordScore;
    document.getElementById('word-level-display').innerText = wordLevel;
}

function checkWordGame() {
    const userAns = document.getElementById('word-input').value.trim().toUpperCase();
    const targetWord = puzzleBank[currentWordIndex].original;
    const feedback = document.getElementById('word-feedback');

    if (userAns === targetWord) {
        feedback.style.color = "#166534";
        feedback.innerText = "🎯 Brilliant! Level Cleared!";
        wordScore += 10;
        wordLevel++;
        currentWordIndex++;
        
        // Auto-progress to next scrambled word after brief delay
        setTimeout(() => { startWordGame(); }, 1200);
    } else {
        feedback.style.color = "#b91c1c";
        feedback.innerText = "❌ Incorrect arrangement. Try again!";
    }
}
