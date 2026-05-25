// --- CENTRAL SCREENS CONTROL ---
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}
function switchStudyOption(optionId) {
    document.querySelectorAll('.study-option').forEach(o => o.classList.add('hidden'));
    document.getElementById(optionId).classList.remove('hidden');
}
function switchFunOption(optionId) {
    document.querySelectorAll('.fun-option').forEach(f => f.classList.add('hidden'));
    document.getElementById(optionId).classList.remove('hidden');
}
function switchArcadeOption(optionId) {
    document.querySelectorAll('.arcade-option').forEach(a => a.classList.add('hidden'));
    document.getElementById(optionId).classList.remove('hidden');
}

// --- BIOMETRIC SYSTEM & SLEEP CYCLE CALCULATOR ---
function calculateBodyBattery() {
    let sleep = parseInt(document.getElementById('sleep-hours').value) || 8;
    let work = parseInt(document.getElementById('work-hours').value) || 0;
    let score = Math.max(5, Math.min(100, 50 + (sleep - 7) * 8 - (work * 4)));
    document.getElementById('battery-bar').style.width = score + "%";
    document.getElementById('battery-text').innerText = score + "% Charged";
}
function runAIHealthAdvisor() {
    const box = document.getElementById('ai-response'); box.classList.remove('hidden');
    box.innerHTML = "🧠 <b>AI Advisor:</b> Bio-metrics analysis completed. Sleep parameters optimized.";
}
function calculateSleepCycles() {
    const out = document.getElementById('sleep-results'); out.classList.remove('hidden');
    let now = new Date(), suggestions = [];
    for (let i = 4; i <= 6; i++) {
        let cycleTime = new Date(now.getTime() + (i * 90 * 60000) + (14 * 60000));
        suggestions.push(cycleTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }
    out.innerHTML = `⏰ <b>If you fall asleep right now, you should wake up at:</b><br>
    • Option 1 (4 Cycles): <b>${suggestions[0]}</b><br>
    • Option 2 (5 Cycles - Recommended): <b>${suggestions[1]}</b><br>
    • Option 3 (6 Cycles - Perfect Rest): <b>${suggestions[2]}</b>`;
}

// ========================================================
// --- NEW STUDY FUNCTION: FLASHCARD SPACE REPETITION ---
// ========================================================
const flashcardsDeck = [
    { front: "Feynman Technique", back: "Learning a concept by explaining it in simple terms to a child." },
    { front: "Pareto Principle (80/20 Rule)", back: "80% of results come from 20% of your focused efforts." },
    { front: "Active Recall", back: "Testing your mind instantly rather than passively rereading notes." },
    { front: "Pomodoro Technique", back: "Studying intensely for 25 minutes followed by a short 5-minute break." },
    { front: "Spaced Repetition", back: "Reviewing information at increasing intervals to combat forgetting." }
];
let currentCardIdx = 0;
function nextFlashcard() {
    const inner = document.getElementById('flashcard-inner');
    inner.classList.remove('flipped'); // Reset flip status
    setTimeout(() => {
        currentCardIdx = Math.floor(Math.random() * flashcardsDeck.length);
        document.getElementById('card-front').innerText = flashcardsDeck[currentCardIdx].front;
        document.getElementById('card-back').innerText = flashcardsDeck[currentCardIdx].back;
    }, 150);
}
function flipFlashcard() {
    document.getElementById('flashcard-inner').classList.toggle('flipped');
}

// --- SMART STUDY ZONE: MATH CHALLENGE 1000 ---
let mathScore = 0, currentAnswer = 0;
function generateMathQuestion() {
    let num1 = Math.floor(Math.random() * 50) + 10;
    let num2 = Math.floor(Math.random() * 40) + 5;
    let isPlus = Math.random() > 0.5;
    currentAnswer = isPlus ? (num1 + num2) : (num1 - num2);
    document.getElementById('math-question').innerText = `${num1} ${isPlus ? '+' : '-'} ${num2} = ?`;
    document.getElementById('math-answer').value = "";
}
function checkMathAnswer() {
    let userAns = parseInt(document.getElementById('math-answer').value);
    let feed = document.getElementById('math-feedback');
    if(userAns === currentAnswer) {
        mathScore += 100; feed.innerText = "✅ Correct! +100 Points"; feed.style.color = "green";
        document.getElementById('math-score').innerText = mathScore;
        if(mathScore >= 1000) { feed.innerText = "🏆 Incredible! You hit the 1000 Points milestone!"; mathScore = 0; }
        setTimeout(generateMathQuestion, 1200);
    } else { feed.innerText = "❌ Incorrect! Try again."; feed.style.color = "red"; }
}
let pomodoroInterval, timerMinutes = 25, timerSeconds = 0, isTimerRunning = false;
function togglePomodoro() {
    const btn = document.getElementById('pomodoro-btn');
    if (isTimerRunning) { clearInterval(pomodoroInterval); isTimerRunning = false; btn.innerText = "Resume"; }
    else { isTimerRunning = true; btn.innerText = "Pause"; pomodoroInterval = setInterval(updatePomodoro, 1000); }
}
function updatePomodoro() {
    const disp = document.getElementById('timer-display');
    if (timerSeconds === 0) {
        if (timerMinutes === 0) { clearInterval(pomodoroInterval); alert("Done!"); return; }
        timerMinutes--; timerSeconds = 59;
    } else { timerSeconds--; }
    disp.innerText = `${timerMinutes < 10 ? '0' : ''}${timerMinutes}:${timerSeconds < 10 ? '0' : ''}${timerSeconds}`;
}

// --- CREATIVITY HUB: WORD SCRAMBLE ---
const scrambleWords = [{ original: "APPLE", scrambled: "ELPPA" }, { original: "PYTHON", scrambled: "NTYOPH" }, { original: "MATRIX", scrambled: "XRIMAT" }];
let currentScrambleIdx = 0;
function initWordScramble() {
    currentScrambleIdx = Math.floor(Math.random() * scrambleWords.length);
    document.getElementById('scrambled-word').innerText = scrambleWords[currentScrambleIdx].scrambled;
    document.getElementById('scramble-input').value = ""; document.getElementById('scramble-feedback').innerText = "";
}
function checkScrambleAnswer() {
    let userAns = document.getElementById('scramble-input').value.toUpperCase().trim();
    let feed = document.getElementById('scramble-feedback');
    if(userAns === scrambleWords[currentScrambleIdx].original) {
        feed.innerText = "🎉 Brilliant!"; feed.style.color = "#22c55e"; setTimeout(initWordScramble, 1500);
    } else { feed.innerText = "❌ Try again."; feed.style.color = "#ef4444"; }
}

// --- CREATIVITY HUB: SLIDING NUMBER PUZZLE ---
let puzzleBoard = [1, 2, 3, 4, 5, 6, 7, 8, ""], puzzleLevel = 1;
function initSliderPuzzle() {
    document.getElementById('puzzle-level').innerText = puzzleLevel;
    document.getElementById('puzzle-feedback').innerText = "";
    shufflePuzzle(); renderPuzzleGrid();
}
function shufflePuzzle() {
    let shuffleCount = 20 + (puzzleLevel * 10);
    for (let i = 0; i < shuffleCount; i++) {
        let emptyIdx = puzzleBoard.indexOf("");
        let validMoves = getValidPuzzleMoves(emptyIdx);
        let randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        puzzleBoard[emptyIdx] = puzzleBoard[randomMove]; puzzleBoard[randomMove] = "";
    }
    if (checkPuzzleWin()) shufflePuzzle();
}
function getValidPuzzleMoves(idx) {
    let moves = [];
    if (idx % 3 > 0) moves.push(idx - 1); if (idx % 3 < 2) moves.push(idx + 1);
    if (idx - 3 >= 0) moves.push(idx - 3); if (idx + 3 < 9) moves.push(idx + 3);
    return moves;
}
function renderPuzzleGrid() {
    const grid = document.getElementById('puzzle-grid'); grid.innerHTML = "";
    puzzleBoard.forEach((val, idx) => {
        const cell = document.createElement('div');
        cell.className = `puzzle-cell ${val === "" ? "empty" : ""}`;
        cell.innerText = val; cell.onclick = () => makePuzzleMove(idx);
        grid.appendChild(cell);
    });
}
function makePuzzleMove(idx) {
    let emptyIdx = puzzleBoard.indexOf("");
    if (getValidPuzzleMoves(emptyIdx).includes(idx)) {
        puzzleBoard[emptyIdx] = puzzleBoard[idx]; puzzleBoard[idx] = ""; renderPuzzleGrid();
        if (checkPuzzleWin()) {
            document.getElementById('puzzle-feedback').innerText = `🎉 Level ${puzzleLevel} Cleared!`;
            document.getElementById('puzzle-feedback').style.color = "#22c55e";
            puzzleLevel++; setTimeout(initSliderPuzzle, 1500);
        }
    }
}
function checkPuzzleWin() {
    const win = [1, 2, 3, 4, 5, 6, 7, 8, ""];
    return puzzleBoard.every((val, i) => val === win[i]);
}

// --- CREATIVITY: DRAWING CANVAS ---
let canvas, ctx, isDrawing = false;
function initCanvas() {
    canvas = document.getElementById('paintCanvas'); ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#2d3436'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    canvas.onmousedown = (e) => { isDrawing = true; draw(getPos(e)); };
    canvas.onmousemove = (e) => draw(getPos(e)); canvas.onmouseup = () => { ctx.beginPath(); isDrawing = false; };
}
function getPos(e) { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
function draw(pos) { if (!isDrawing) return; ctx.lineTo(pos.x, pos.y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(pos.x, pos.y); }
function clearCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height); }

// --- SECRET WORLD MAP DATABASE ---
const countrySecrets = {
    saudi: { title: "🇸🇦 Saudi Arabia", text: "Beneath the massive sands of the Rub' al Khali desert, satellites have detected lost river networks and ancient ruins of unknown civilizations that lived here thousands of years ago." },
    egypt: { title: "🇪🇬 Egypt", text: "Beneath the Sphinx lies a legendary secret known as the 'Hall of Records', a hidden chamber rumored to hold the ultimate lost knowledge of antiquity." },
    morocco: { title: "🇲🇦 Morocco", text: "The 'Pigeon Cave' in Taforalt houses the oldest discovered evidence of a successful cranial surgical operation in human history, dating back over 15,000 years!" },
    iraq: { title: "🇮🇶 Iraq", text: "The 'Baghdad Battery' discovered here suggests that ancient empires might have experimented with basic galvanization and electricity thousands of years ago." },
    uae: { title: "🇦🇪 UAE", text: "The Saruq Al Hadid archaeological site uncovered thousands of mysterious iron and gold artifacts, revealing secret trade routes connecting to distant ancient worlds." },
    jordan: { title: "🇯🇴 Jordan", text: "The rose-red city of Petra houses a hyper-advanced hydraulic engineering network capable of capturing, storing, and controlling flash floods in the middle of dry deserts." },
    tunisia: { title: "🇹🇳 Tunisia", text: "The ancient city of Carthage featured a secret circular military harbor called the 'Cothon', designed to completely hide internal navy preparations from outsider ships." },
    japan: { title: "🇯🇵 Japan", text: "Submerged off Yonaguni island lies a giant megalithic step pyramid structure with sharp 90-degree angles, creating fierce debates over whether it is artificial or natural." },
    france: { title: "🇫🇷 France", text: "Deep beneath the busy streets of Paris lies a dark, 300-kilometer labyrinth of underground tunnels holding the skeletal remains of over 6 million people, known as the Catacombs." }
};
function revealCountrySecret(code) {
    const box = document.getElementById('map-secret-box');
    const title = document.getElementById('secret-country-title');
    const text = document.getElementById('secret-country-text');
    if (countrySecrets[code]) {
        box.classList.remove('hidden'); title.innerText = countrySecrets[code].title; text.innerText = countrySecrets[code].text;
    }
}

// --- LIGHT GAMES ZONE: RETRO MEMORY MATCH ---
const emojis = ['🔥', '🔥', '💎', '💎', '🚀', '🚀', '👑', '👑', '🎮', '🎮', '🔮', '🔮', '🧩', '🧩', '👻', '👻'];
let flippedCards = [], matchedPairs = 0;
function initMemoryGame() {
    const grid = document.getElementById('memory-grid'); grid.innerHTML = "";
    flippedCards = []; matchedPairs = 0;
    let shuffled = [...emojis].sort(() => Math.random() - 0.5);
    shuffled.forEach((emoji, idx) => {
        const card = document.createElement('div');
        card.className = 'memory-card-cell'; card.dataset.emoji = emoji; card.dataset.id = idx;
        card.innerText = "❓"; card.onclick = () => flipMemoryCard(card);
        grid.appendChild(card);
    });
}
function flipMemoryCard(card) {
    if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length >= 2) return;
    card.classList.add('flipped'); card.innerText = card.dataset.emoji; flippedCards.push(card);
    if (flippedCards.length === 2) { setTimeout(checkMemoryMatch, 800); }
}
function checkMemoryMatch() {
    const [c1, c2] = flippedCards;
    if (c1.dataset.emoji === c2.dataset.emoji) {
        c1.classList.add('matched'); c2.classList.add('matched'); matchedPairs++;
        if (matchedPairs === emojis.length / 2) alert("🏆 Arcade: Outstanding! You matched all pairs!");
    } else { c1.classList.remove('flipped'); c2.classList.remove('flipped'); c1.innerText = "❓"; c2.innerText = "❓"; }
    flippedCards = [];
}

// --- LIGHT GAMES ZONE: TIC-TAC-TOE ---
let tttBoard = ["","","","","","","","",""], tttPlayer = "X", tttActive = true;
function initTicTacToe() {
    tttBoard = ["","","","","","","","",""]; tttPlayer = "X"; tttActive = true;
    document.getElementById('ttt-status').innerText = "Player X's Turn";
    document.querySelectorAll('.ttt-cell').forEach(cell => { cell.innerText = ""; });
}
function makeTTTMove(index) {
    if (tttBoard[index] !== "" || !tttActive) return;
    tttBoard[index] = tttPlayer; const cells = document.querySelectorAll('.ttt-cell');
    cells[index].innerText = tttPlayer; cells[index].style.color = tttPlayer === "X" ? "#6c5ce7" : "#ff7675";
    if (checkTTTWin()) { document.getElementById('ttt-status').innerText = `🎉 Player ${tttPlayer} Wins!`; tttActive = false; return; }
    if (!tttBoard.includes("")) { document.getElementById('ttt-status').innerText = "It's a Tie! 🤝"; tttActive = false; return; }
    tttPlayer = tttPlayer === "X" ? "O" : "X"; document.getElementById('ttt-status').innerText = `Player ${tttPlayer}'s Turn`;
}
function checkTTTWin() {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return wins.some(p => tttBoard[p[0]] !== "" && tttBoard[p[0]] === tttBoard[p[1]] && tttBoard[p[1]] === tttBoard[p[2]]);
}
