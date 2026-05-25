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

function switchArcadeOption(optionId) {
    document.querySelectorAll('.arcade-option').forEach(a => a.classList.add('hidden'));
    document.getElementById(optionId).classList.remove('hidden');
}


// --- HEALTH SECTION: BODY BATTERY & SLEEP CYCLES ---
function calculateBodyBattery() {
    let sleep = parseInt(document.getElementById('sleep-hours').value) || 8;
    let work = parseInt(document.getElementById('work-hours').value) || 0;
    let mood = document.getElementById('anxious-status').value;
    let score = 50 + (sleep - 7) * 8 - (work * 4);
    if (mood === 'happy') score += 15; if (mood === 'tired') score -= 15; if (mood === 'anxious') score -= 20;
    score = Math.max(5, Math.min(100, score));
    document.getElementById('battery-bar').style.width = score + "%";
    document.getElementById('battery-text').innerText = score + "% Charged";
    const adv = document.getElementById('battery-advice');
    if (score > 75) adv.innerHTML = "🔋 Optimal Energy. Perfect time for tough studies or sports.";
    else if (score >= 40) adv.innerHTML = "⚡ Moderate Drain. Rest soon, hydrate properly.";
    else adv.innerHTML = "🚨 Low Battery! Rest your brain, turn off all screens.";
}

function calculateSleepCycles() {
    const out = document.getElementById('sleep-results'); out.classList.remove('hidden');
    let now = new Date();
    let suggestions = [];
    // Calculate wake up times based on 90-minute sleep cycles (4, 5, and 6 cycles)
    for (let i = 4; i <= 6; i++) {
        let cycleTime = new Date(now.getTime() + (i * 90 * 60000) + (14 * 60000)); // 14 mins to fall asleep
        suggestions.push(cycleTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }
    out.innerHTML = `⏰ <b>Best Wake-Up Times if you sleep now:</b><br>
    • <b>${suggestions[0]}</b> (4 Cycles - Light)<br>
    • <b>${suggestions[1]}</b> (5 Cycles - Balanced)<br>
    • <b>${suggestions[2]}</b> (6 Cycles - Optimal Deep Sleep)<br>
    Waking up at these times prevents waking up during deep sleep blur!`;
}

function runAIHealthAdvisor() {
    const sleep = parseInt(document.getElementById('sleep-hours').value) || 0;
    const mood = document.getElementById('anxious-status').value;
    const prob = document.getElementById('health-problem').value.toLowerCase();
    const box = document.getElementById('ai-response'); box.classList.remove('hidden');
    let advice = "🧠 <b>AI Health Insights:</b><br>";
    if (mood === 'anxious' || prob.includes('stress')) advice += "• Anxiety detected. Please take 5 deep slow breaths now.<br>";
    if (sleep < 7 && sleep > 0) advice += "• Low sleep reduces memory. Protect your schedule tonight.<br>";
    if (advice === "🧠 <b>AI Health Insights:</b><br>") advice += "• Systems fully functional. Stay consistent with your active targets.";
    box.innerHTML = advice;
}

// Binaural beats sound simulation audio generator logic
let audioCtx = null, currentWaveType = null, oscillatorLE, oscillatorRI, gainNode;
function toggleSoundFrequency(type) {
    const focusBtn = document.getElementById('sound-focus'), sleepBtn = document.getElementById('sound-sleep'), txt = document.getElementById('sound-status-text');
    if (currentWaveType === type) { stopBinauralAudio(); return; }
    stopBinauralAudio(); currentWaveType = type;
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    oscillatorLE = audioCtx.createOscillator(); oscillatorRI = audioCtx.createOscillator(); gainNode = audioCtx.createGain();
    if (type === 'focus') { oscillatorLE.frequency.value = 200; oscillatorRI.frequency.value = 212; focusBtn.classList.add('playing'); txt.innerText = "Playing Focus Waves (12Hz)"; }
    else { oscillatorLE.frequency.value = 150; oscillatorRI.frequency.value = 153.5; sleepBtn.classList.add('playing'); txt.innerText = "Playing Deep Sleep Waves (3.5Hz)"; }
    gainNode.gain.value = 0.06; oscillatorLE.connect(gainNode); oscillatorRI.connect(gainNode); gainNode.connect(audioCtx.destination); oscillatorLE.start(); oscillatorRI.start();
}
function stopBinauralAudio() {
    if (oscillatorLE) { try { oscillatorLE.stop(); oscillatorRI.stop(); } catch(e){} }
    document.getElementById('sound-focus').classList.remove('playing'); document.getElementById('sound-sleep').classList.remove('playing');
    document.getElementById('sound-status-text').innerText = "Status: Audio Off"; currentWaveType = null;
}
function checkTasks() {
    const t1 = document.getElementById('task1').checked, t2 = document.getElementById('task2').checked, t3 = document.getElementById('task3').checked;
    const m = document.getElementById('congrats-msg'); if (t1 && t2 && t3) m.classList.remove('hidden'); else m.classList.add('hidden');
}


// --- STUDY SECTION: AI EXPLAINER, POMODORO, MATHS ---
function explainLessonAI() {
    const topic = document.getElementById('lesson-topic').value.trim().toLowerCase();
    const out = document.getElementById('lesson-ai-response'); out.classList.remove('hidden');
    if (!topic) { out.innerHTML = "Type a topic name!"; return; }
    out.innerHTML = `🧠 <b>AI Structural Breakdown of "${topic.toUpperCase()}":</b><br>• Core Concept: It acts as an essential foundational standard within its educational track.<br>• Operations: Requires strategic rule execution, step dependencies, and formulas.<br>• Reality Impact: Vital to mastering standard testing modules and modern logic construction.`;
}

let pomodoroInterval, timerMinutes = 25, timerSeconds = 0, isTimerRunning = false, isBreakPeriod = false;
function togglePomodoro() {
    const btn = document.getElementById('pomodoro-btn');
    if (isTimerRunning) { clearInterval(pomodoroInterval); isTimerRunning = false; btn.innerText = "Resume"; }
    else { isTimerRunning = true; btn.innerText = "Pause"; pomodoroInterval = setInterval(updatePomodoro, 1000); }
}
function updatePomodoro() {
    const disp = document.getElementById('timer-display'), status = document.getElementById('timer-status');
    if (timerSeconds === 0) {
        if (timerMinutes === 0) {
            isBreakPeriod = !isBreakPeriod; timerMinutes = isBreakPeriod ? 5 : 25;
            status.innerText = isBreakPeriod ? "Break Time! ☕" : "Study Time! 🧠";
            alert(isBreakPeriod ? "Take a break!" : "Focus time!");
        } else { timerMinutes--; timerSeconds = 59; }
    } else { timerSeconds--; }
    disp.innerText = `${timerMinutes < 10 ? '0' + timerMinutes : timerMinutes}:${timerSeconds < 10 ? '0' + timerSeconds : timerSeconds}`;
}

let mathLevel = 1, currentMathAns = 0, mathTimeLeft = 15, mathTimerInterval;
function startMathGame() { document.getElementById('math-game-play').classList.remove('hidden'); document.getElementById('math-game-over').classList.add('hidden'); generateMathQuestion(); }
function generateMathQuestion() {
    clearInterval(mathTimerInterval); document.getElementById('math-level').innerText = mathLevel; document.getElementById('math-answer').value = "";
    let n1 = Math.floor(Math.random() * (mathLevel * 2)) + 2, n2 = Math.floor(Math.random() * (mathLevel * 1.5)) + 2;
    let op = mathLevel > 10 ? (Math.random() > 0.5 ? "-" : "+") : "+";
    if (op === "+") currentMathAns = n1 + n2; else currentMathAns = n1 - n2;
    document.getElementById('math-question').innerText = `${n1} ${op} ${n2} = ?`;
    mathTimeLeft = Math.max(5, 18 - Math.floor(mathLevel / 25));
    document.getElementById('math-timer').innerText = mathTimeLeft + "s";
    mathTimerInterval = setInterval(() => { mathTimeLeft--; document.getElementById('math-timer').innerText = mathTimeLeft + "s"; if (mathTimeLeft <= 0) endMathGame(false); }, 1000);
}
function submitMathAnswer() { if (parseInt(document.getElementById('math-answer').value) === currentMathAns) { mathLevel++; generateMathQuestion(); } else { endMathGame(false); } }
function quitMathGame() { endMathGame(false, "Withdrew."); }
function endMathGame(win, m) { clearInterval(mathTimerInterval); document.getElementById('math-game-play').classList.add('hidden'); document.getElementById('math-game-over').classList.remove('hidden'); document.getElementById('math-result-msg').innerText = m || `Game Over at Level ${mathLevel}`; mathLevel = 1; }

// --- STUDY: FLASHCARD INTELLIGENT MEMORY BOX ---
let flashcards = [];
let currentFlashcardIndex = 0;
let showingFront = true;

function addFlashcard() {
    const front = document.getElementById('fc-front').value.trim();
    const back = document.getElementById('fc-back').value.trim();
    if (front && back) {
        flashcards.push({ front, back });
        document.getElementById('fc-front').value = "";
        document.getElementById('fc-back').value = "";
        currentFlashcardIndex = flashcards.length - 1;
        showingFront = true;
        updateFlashcardDisplay();
    }
}
function flipFlashcard() {
    if (flashcards.length === 0) return;
    showingFront = !showingFront;
    updateFlashcardDisplay();
}
function updateFlashcardDisplay() {
    const display = document.getElementById('flashcard-display');
    if (flashcards.length === 0) { display.innerText = "👉 Add Cards to Begin"; return; }
    let card = flashcards[currentFlashcardIndex];
    display.innerText = showingFront ? `📝 Q: ${card.front}` : `💡 A: ${card.back}`;
}
function nextFlashcard() { if (flashcards.length > 0) { currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length; showingFront = true; updateFlashcardDisplay(); } }
function prevFlashcard() { if (flashcards.length > 0) { currentFlashcardIndex = (currentFlashcardIndex - 1 + flashcards.length) % flashcards.length; showingFront = true; updateFlashcardDisplay(); } }


// --- ATLAS MAP POPULATION ---
const atlasData = { "Saudi Arabia": "Birthplace of Islam, formed unified state in 1932.", "Egypt": "5000+ years of incredible Pharaonic history and Nile culture.", "USA": "Declared independence in 1776, fast global technology leader." };
function initAtlasMap() {
    const container = document.getElementById('dynamic-map-container'); if(!container) return; container.innerHTML = "";
    Object.keys(atlasData).forEach(c => {
        const b = document.createElement('button'); b.className = 'country-btn'; b.innerText = c;
        b.onclick = () => { const box = document.getElementById('history-info'); box.classList.remove('hidden'); box.innerHTML = `<b>${c}:</b> ${atlasData[c]}`; };
        container.appendChild(b);
    });
}
document.addEventListener("DOMContentLoaded", initAtlasMap);


// --- CREATIVITY: MOBILE DRAWING CANVAS (FIXED TOUCH EVENTS FOR PHONE) ---
let canvas, ctx, isDrawing = false;
function initCanvas() {
    canvas = document.getElementById('paintCanvas'); ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000000'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    
    // Mouse Support
    canvas.onmousedown = (e) => { isDrawing = true; paint(getMousePos(e)); };
    canvas.onmousemove = (e) => paint(getMousePos(e));
    canvas.onmouseup = () => { ctx.beginPath(); isDrawing = false; };

    // Mobile Phone Touch Support Fix
    canvas.addEventListener('touchstart', (e) => { isDrawing = true; e.preventDefault(); paint(getTouchPos(e)); }, {passive: false});
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); paint(getTouchPos(e)); }, {passive: false});
    canvas.addEventListener('touchend', () => { ctx.beginPath(); isDrawing = false; });
}
function getMousePos(e) { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
function getTouchPos(e) { const r = canvas.getBoundingClientRect(); return { x: e.touches[0].clientX - r.left, y: e.touches[0].top - r.top }; }
function paint(pos) { if (!isDrawing) return; ctx.lineTo(pos.x, pos.y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(pos.x, pos.y); }
function clearCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height); }


// --- CREATIVITY: WORD UNSCRAMBLE GAME ---
const puzzleBank = [{ original: "APPLE", scrambled: "P-P-L-A-E" }, { original: "CODING", scrambled: "G-N-I-D-O-C" }];
let currentWordIndex = 0, wordScore = 0, wordLevel = 1;
function startWordGame() {
    if (currentWordIndex >= puzzleBank.length) currentWordIndex = 0;
    document.getElementById('scrambled-letters').innerText = puzzleBank[currentWordIndex].scrambled;
    document.getElementById('word-input').value = ""; document.getElementById('word-feedback').innerText = "";
}
function checkWordGame() {
    if (document.getElementById('word-input').value.trim().toUpperCase() === puzzleBank[currentWordIndex].original) {
        currentWordIndex++; wordScore += 10; wordLevel++; startWordGame();
    } else { document.getElementById('word-feedback').innerText = "❌ Try Again!"; }
}


// --- CREATIVITY: SLIDING PUZZLE GAME ---
let puzzleStage = 1, correctState = [1,2,3,4,5,6,7,8,""], currentState = [];
function initPuzzleGame() {
    document.getElementById('puzzle-victory-msg').classList.add('hidden');
    do { currentState = [...correctState].sort(() => Math.random() - 0.5); } while (isSolved(currentState));
    renderPuzzleBoard();
}
function renderPuzzleBoard() {
    const grid = document.getElementById('puzzle-grid-container'); grid.innerHTML = "";
    currentState.forEach((v, i) => {
        const cell = document.createElement('div'); cell.className = 'puzzle-cell' + (v === "" ? " empty" : ""); cell.innerText = v;
        cell.onclick = () => movePuzzleCell(i); grid.appendChild(cell);
    });
}
function movePuzzleCell(index) {
    const emptyIndex = currentState.indexOf(""), allowed = {0:[1,3],1:[0,2,4],2:[1,5],3:[0,4,6],4:[1,3,5,7],5:[2,4,8],6:[3,7],7:[4,6,8],8:[5,7]};
    if (allowed[index].includes(emptyIndex)) {
        currentState[emptyIndex] = currentState[index]; currentState[index] = ""; renderPuzzleBoard();
        if (isSolved(currentState)) { document.getElementById('puzzle-victory-msg').classList.remove('hidden'); puzzleStage++; setTimeout(initPuzzleGame, 1500); }
    }
}
function isSolved(arr) { return arr.every((val, i) => val === correctState[i]); }


// --- NEW ARCADE SECTION: GAME 1 - RETRO SNAKE ---
let snakeCanvas, snakeCtx, snake, snakeFood, snakeScore, snakeDir, snakeGameInterval;
function initSnakeGame() {
    snakeCanvas = document.getElementById('snakeCanvas'); if(!snakeCanvas) return;
    snakeCtx = snakeCanvas.getContext('2d');
    snake = [{x: 10, y: 10}]; snakeFood = {x: 5, y: 5}; snakeScore = 0; snakeDir = "RIGHT";
    document.getElementById('snake-score').innerText = snakeScore;
    clearInterval(snakeGameInterval);
    snakeGameInterval = setInterval(updateSnakeEngine, 130);
}
function changeSnakeDirection(d) {
    if (d === "LEFT" && snakeDir !== "RIGHT") snakeDir = "LEFT";
    if (d === "RIGHT" && snakeDir !== "LEFT") snakeDir = "RIGHT";
    if (d === "UP" && snakeDir !== "DOWN") snakeDir = "UP";
    if (d === "DOWN" && snakeDir !== "UP") snakeDir = "DOWN";
}
function updateSnakeEngine() {
    let head = Object.assign({}, snake[0]);
    if (snakeDir === "LEFT") head.x--; if (snakeDir === "RIGHT") head.x++;
    if (snakeDir === "UP") head.y--; if (snakeDir === "DOWN") head.y++;
    
    // Wall and self collision checks
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || snake.some(s => s.x === head.x && s.y === head.y)) {
        clearInterval(snakeGameInterval); alert(`Game Over! Final Score: ${snakeScore}`); initSnakeGame(); return;
    }
    
    snake.unshift(head);
    if (head.x === snakeFood.x && head.y === snakeFood.y) {
        snakeScore += 10; document.getElementById('snake-score').innerText = snakeScore;
        snakeFood = { x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20) };
    } else { snake.pop(); }
    
    // Draw arena board layout
    snakeCtx.clearRect(0, 0, 280, 280);
    snakeCtx.fillStyle = "#22c55e"; snake.forEach(s => snakeCtx.fillRect(s.x*14, s.y*14, 12, 12));
    snakeCtx.fillStyle = "#ef4444"; snakeCtx.fillRect(snakeFood.x*14, snakeFood.y*14, 12, 12);
}
function stopSnakeGame() { clearInterval(snakeGameInterval); }


// --- NEW ARCADE SECTION: GAME 2 - MEMORY EMOJI CARD MATCH ---
const emojis = ['🔥', '🔥', '💎', '💎', '🚀', '🚀', '👑', '👑', '👾', '👾', '🌈', '🌈', '🍕', '🍕', '🐱', '🐱'];
let memorySelectedCards = [], memoryMatches = 0;
function initMemoryGame() {
    const grid = document.getElementById('memory-grid'); grid.innerHTML = "";
    memorySelectedCards = []; memoryMatches = 0;
    let shuffled = emojis.sort(() => Math.random() - 0.5);
    shuffled.forEach((emoji, index) => {
        const card = document.createElement('div'); card.className = 'memory-card-item'; card.dataset.emoji = emoji; card.dataset.id = index;
        card.onclick = () => flipMemoryCard(card); grid.appendChild(card);
    });
}
function flipMemoryCard(card) {
    if (card.classList.contains('flipped') || card.classList.contains('matched') || memorySelectedCards.length >= 2) return;
    card.classList.add('flipped'); memorySelectedCards.push(card);
    if (memorySelectedCards.length === 2) {
        if (memorySelectedCards[0].dataset.emoji === memorySelectedCards[1].dataset.emoji) {
            memorySelectedCards.forEach(c => c.classList.add('matched')); memoryMatches++; memorySelectedCards = [];
            if (memoryMatches === 8) alert("🏆 Ultimate Win! You matched all memory cards!");
        } else { setTimeout(() => { memorySelectedCards.forEach(c => c.classList.remove('flipped')); memorySelectedCards = []; }, 800); }
    }
}
