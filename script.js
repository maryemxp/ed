// --- CENTRAL SWITCHES ---
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
    if(screenId !== 'arcade-screen') clearInterval(snakeInterval); 
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
    if(optionId !== 'snake-box') clearInterval(snakeInterval);
}

// --- BIOMETRIC SYSTEM & SLEEP CALCULATOR ---
function calculateBodyBattery() {
    let sleep = parseInt(document.getElementById('sleep-hours').value) || 8;
    let work = parseInt(document.getElementById('work-hours').value) || 0;
    let score = Math.max(5, Math.min(100, 50 + (sleep - 7) * 8 - (work * 4)));
    document.getElementById('battery-bar').style.width = score + "%";
    document.getElementById('battery-text').innerText = score + "% Charged";
}
function runAIHealthAdvisor() {
    const box = document.getElementById('ai-response'); box.classList.remove('hidden');
    box.innerHTML = "🧠 <b>AI Advisor:</b> Neural feedback stable. Maintain your optimized sleep schedule.";
}
function calculateSleepCycles() {
    const out = document.getElementById('sleep-results'); out.classList.remove('hidden');
    let now = new Date(), suggestions = [];
    for (let i = 4; i <= 5; i++) {
        let cycle = new Date(now.getTime() + (i * 90 * 60000) + (14 * 60000));
        suggestions.push(cycle.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }
    out.innerHTML = `⏰ <b>Perfect Wake-Up Targets:</b><br>• If you sleep right now ➜ Wake up at <b>${suggestions[0]}</b> or <b>${suggestions[1]}</b> to avoid morning fatigue!`;
}

// --- SMART STUDY HUB: UNIVERSAL AI EXPLAINER ---
function explainLessonAI() {
    const topic = document.getElementById('lesson-topic').value.trim();
    const out = document.getElementById('lesson-ai-response');
    if (!topic) { out.classList.remove('hidden'); out.innerHTML = "❌ Type a lesson name first!"; return; }
    out.classList.remove('hidden');
    out.innerHTML = `🤖 <b>Deconstruction Engine:</b><br>• <b>Concept [${topic}]:</b> Essential structural framework standard.<br>• <b>The Secret Link:</b> Works exponentially better when visual maps are introduced.<br>• <b>Application:</b> Use it directly to design modular problem architectures.`;
}

// --- SMART STUDY HUB: MATH CHALLENGE 1000 ---
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
    } else {
        feed.innerText = "❌ Incorrect! Try again."; feed.style.color = "red";
    }
}

// --- STUDY SECTION: POMODORO TIMER ---
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

// --- ENTERTAINMENT: WORD SCRAMBLE GAME ---
const scrambleWords = [
    { original: "APPLE", scrambled: "ELPPA" },
    { original: "PYTHON", scrambled: "NTYOPH" },
    { original: "MATRIX", scrambled: "XRIMAT" },
    { original: "PLANET", scrambled: "TLENAP" }
];
let currentScrambleIdx = 0;
function initWordScramble() {
    currentScrambleIdx = Math.floor(Math.random() * scrambleWords.length);
    document.getElementById('scrambled-word').innerText = scrambleWords[currentScrambleIdx].scrambled;
    document.getElementById('scramble-input').value = "";
    document.getElementById('scramble-feedback').innerText = "";
}
function checkScrambleAnswer() {
    let userAns = document.getElementById('scramble-input').value.toUpperCase().trim();
    let feed = document.getElementById('scramble-feedback');
    if(userAns === scrambleWords[currentScrambleIdx].original) {
        feed.innerText = "🎉 Brilliant! You cracked the word."; feed.style.color = "#22c55e";
        setTimeout(initWordScramble, 1500);
    } else { feed.innerText = "❌ Not quite right, look closer."; feed.style.color = "#ef4444"; }
}

// ========================================================
// --- ENTERTAINMENT: 100% SHAGALA SLIDING NUMBER PUZZLE WITH LEVELS ---
// ========================================================
let puzzleBoard = [1, 2, 3, 4, 5, 6, 7, 8, ""], puzzleLevel = 1;

function initSliderPuzzle() {
    document.getElementById('puzzle-level').innerText = puzzleLevel;
    document.getElementById('puzzle-feedback').innerText = "";
    shufflePuzzle();
    renderPuzzleGrid();
}

function shufflePuzzle() {
    // Shuffling factor changes depending on Level difficulty
    let shuffleCount = 20 + (puzzleLevel * 15);
    for (let i = 0; i < shuffleCount; i++) {
        let emptyIdx = puzzleBoard.indexOf("");
        let validMoves = getValidPuzzleMoves(emptyIdx);
        let randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        // Swap values
        puzzleBoard[emptyIdx] = puzzleBoard[randomMove];
        puzzleBoard[randomMove] = "";
    }
    // Safety check to ensure it doesn't accidentally shuffle into a solved board
    if (checkPuzzleWin()) shufflePuzzle();
}

function getValidPuzzleMoves(idx) {
    let moves = [];
    if (idx % 3 > 0) moves.push(idx - 1);  // Left
    if (idx % 3 < 2) moves.push(idx + 1);  // Right
    if (idx - 3 >= 0) moves.push(idx - 3); // Up
    if (idx + 3 < 9) moves.push(idx + 3);  // Down
    return moves;
}

function renderPuzzleGrid() {
    const grid = document.getElementById('puzzle-grid');
    grid.innerHTML = "";
    puzzleBoard.forEach((val, idx) => {
        const cell = document.createElement('div');
        cell.className = `puzzle-cell ${val === "" ? "empty" : ""}`;
        cell.innerText = val;
        cell.onclick = () => makePuzzleMove(idx);
        grid.appendChild(cell);
    });
}

function makePuzzleMove(idx) {
    let emptyIdx = puzzleBoard.indexOf("");
    let validMoves = getValidPuzzleMoves(emptyIdx);
    
    if (validMoves.includes(idx)) {
        puzzleBoard[emptyIdx] = puzzleBoard[idx];
        puzzleBoard[idx] = "";
        renderPuzzleGrid();
        
        if (checkPuzzleWin()) {
            document.getElementById('puzzle-feedback').innerText = `🎉 Level ${puzzleLevel} Cleared! Moving Up!`;
            document.getElementById('puzzle-feedback').style.color = "#22c55e";
            puzzleLevel++;
            setTimeout(initSliderPuzzle, 1800);
        }
    }
}

function checkPuzzleWin() {
    const winningCombo = [1, 2, 3, 4, 5, 6, 7, 8, ""];
    return puzzleBoard.every((val, idx) => val === winningCombo[idx]);
}

// --- CREATIVITY: DRAWING CANVAS ENGINE ---
let canvas, ctx, isDrawing = false;
function initCanvas() {
    canvas = document.getElementById('paintCanvas'); ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#2d3436'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    canvas.onmousedown = (e) => { isDrawing = true; draw(getPos(e)); };
    canvas.onmousemove = (e) => draw(getPos(e));
    canvas.onmouseup = () => { ctx.beginPath(); isDrawing = false; };
    canvas.addEventListener('touchstart', (e) => { isDrawing = true; e.preventDefault(); draw(getTouchPos(e)); }, {passive:false});
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); draw(getTouchPos(e)); }, {passive:false});
    canvas.addEventListener('touchend', () => ctx.beginPath());
}
function getPos(e) { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
function getTouchPos(e) { const r = canvas.getBoundingClientRect(); return { x: e.touches[0].clientX - r.left, y: e.touches[0].top - r.top }; }
function draw(pos) { if (!isDrawing) return; ctx.lineTo(pos.x, pos.y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(pos.x, pos.y); }
function clearCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height); }


// ========================================================
// --- LIGHT GAMES ZONE: SMOOTH & BALANCED RETRO SNAKE ---
// ========================================================
let snakeCanvas, sCtx, snake, snakeFood, snakeDx, snakeDy, snakeScore, snakeInterval = null;
let nextDirection = 'RIGHT'; // Prevents rapid double tapping collision bug
const boxSize = 15; 

function initSnakeGame() {
    snakeCanvas = document.getElementById('snakeCanvas');
    if(!snakeCanvas) return;
    sCtx = snakeCanvas.getContext('2d');
    clearInterval(snakeInterval);
    
    snake = [{x: 150, y: 150}, {x: 135, y: 150}, {x: 120, y: 150}];
    snakeDx = boxSize; snakeDy = 0; snakeScore = 0;
    nextDirection = 'RIGHT';
    document.getElementById('snake-score').innerText = snakeScore;
    
    generateSnakeFood();
    // Balanced Speed Frame rate (140ms) makes control significantly smoother and non-erratic
    snakeInterval = setInterval(stepSnakeGame, 140); 
}

function generateSnakeFood() {
    snakeFood = {
        x: Math.floor(Math.random() * (snakeCanvas.width / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (snakeCanvas.height / boxSize)) * boxSize
    };
    if (snake.some(part => part.x === snakeFood.x && part.y === snakeFood.y)) generateSnakeFood();
}

function stepSnakeGame() {
    // Process input vector safely
    if (nextDirection === 'LEFT' && snakeDx === 0) { snakeDx = -boxSize; snakeDy = 0; }
    if (nextDirection === 'UP' && snakeDy === 0) { snakeDx = 0; snakeDy = -boxSize; }
    if (nextDirection === 'RIGHT' && snakeDx === 0) { snakeDx = boxSize; snakeDy = 0; }
    if (nextDirection === 'DOWN' && snakeDy === 0) { snakeDx = 0; snakeDy = boxSize; }

    if (checkSnakeCollision()) {
        clearInterval(snakeInterval);
        alert(`💀 Game Over! Your Score: ${snakeScore}`);
        initSnakeGame(); return;
    }

    const head = {x: snake[0].x + snakeDx, y: snake[0].y + snakeDy};
    snake.unshift(head);

    if (head.x === snakeFood.x && head.y === snakeFood.y) {
        snakeScore += 10;
        document.getElementById('snake-score').innerText = snakeScore;
        generateSnakeFood();
    } else {
        snake.pop(); 
    }

    drawSnakeGrid();
}

function drawSnakeGrid() {
    sCtx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    sCtx.fillStyle = '#ef4444';
    sCtx.fillRect(snakeFood.x, snakeFood.y, boxSize - 1, boxSize - 1);
    
    snake.forEach((part, idx) => {
        sCtx.fillStyle = idx === 0 ? '#10b981' : '#34d399'; 
        sCtx.fillRect(part.x, part.y, boxSize - 1, boxSize - 1);
    });
}

function changeSnakeDirection(dir) {
    // Buffer inputs to prevent self-collision via immediate reverse commands
    if (dir === 'LEFT' && snakeDx === 0) nextDirection = 'LEFT';
    if (dir === 'UP' && snakeDy === 0) nextDirection = 'UP';
    if (dir === 'RIGHT' && snakeDx === 0) nextDirection = 'RIGHT';
    if (dir === 'DOWN' && snakeDy === 0) nextDirection = 'DOWN';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') changeSnakeDirection('LEFT');
    if (e.key === 'ArrowUp') changeSnakeDirection('UP');
    if (e.key === 'ArrowRight') changeSnakeDirection('RIGHT');
    if (e.key === 'ArrowDown') changeSnakeDirection('DOWN');
});

function checkSnakeCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= snakeCanvas.width || head.y < 0 || head.y >= snakeCanvas.height) return true;
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    return false;
}

// ========================================================
// --- LIGHT GAMES ZONE: TIC-TAC-TOE ---
// ========================================================
let tttBoard = ["","","","","","","","",""], tttPlayer = "X", tttActive = true;
function initTicTacToe() {
    tttBoard = ["","","","","","","","",""]; tttPlayer = "X"; tttActive = true;
    document.getElementById('ttt-status').innerText = "Player X's Turn";
    document.querySelectorAll('.ttt-cell').forEach(cell => { cell.innerText = ""; });
}
function makeTTTMove(index) {
    if (tttBoard[index] !== "" || !tttActive) return;
    tttBoard[index] = tttPlayer;
    const cells = document.querySelectorAll('.ttt-cell');
    cells[index].innerText = tttPlayer;
    cells[index].style.color = tttPlayer === "X" ? "#6c5ce7" : "#ff7675";
    
    if (checkTTTWin()) { document.getElementById('ttt-status').innerText = `🎉 Player ${tttPlayer} Wins! 🎉`; tttActive = false; return; }
    if (!tttBoard.includes("")) { document.getElementById('ttt-status').innerText = "It's a Tie! 🤝"; tttActive = false; return; }
    
    tttPlayer = tttPlayer === "X" ? "O" : "X";
    document.getElementById('ttt-status').innerText = `Player ${tttPlayer}'s Turn`;
}
function checkTTTWin() {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return wins.some(pattern => tttBoard[pattern[0]] !== "" && tttBoard[pattern[0]] === tttBoard[pattern[1]] && tttBoard[pattern[1]] === tttBoard[pattern[2]]);
}
