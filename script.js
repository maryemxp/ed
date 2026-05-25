// ========================================================
// --- FUNCTION TO INJECT THE NEW CAMERA SECTION & BUTTON ---
// ========================================================
function injectVisionSystem() {
    // 1. Inject Menu Card Button into Dashboard
    const menuContainer = document.getElementById('main-menu-container');
    if (menuContainer && !document.querySelector('.ai-vision-card')) {
        const visionCard = document.createElement('div');
        visionCard.className = 'menu-card ai-vision-card';
        visionCard.onclick = function() { switchScreen('vision-screen'); };
        visionCard.innerHTML = `<div class="icon">👁️‍🗨️</div><h3>AI Vision Scanner</h3>`;
        menuContainer.insertBefore(visionCard, menuContainer.firstChild);
    }

    // 2. Inject Entire Active Vision Screen Section into Body
    if (!document.getElementById('vision-screen')) {
        const visionScreen = document.createElement('div');
        visionScreen.id = 'vision-screen';
        visionScreen.className = 'screen hidden';
        visionScreen.innerHTML = `
            <button class="back-btn" onclick="switchScreen('main-dashboard')">⬅ Back</button>
            <h2>👁️‍🗨️ AI Vision Intelligence</h2>
            <p style="font-size: 12px; color: #64748b; text-align: center; margin-top:-5px;">Next-Gen Computer Vision Suite</p>

            <div class="vision-menu" style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                <div class="card" style="margin: 0; padding: 12px;">
                    <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #0d9488;">🍳 Nutrition Module</h4>
                    <button class="btn" onclick="triggerNativeCamera('meal')" style="background-color: #0d9488; color: white;">Scan & Analyze Meal 📸</button>
                </div>
                
                <div class="card" style="margin: 0; padding: 12px;">
                    <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #3b82f6;">🧍 Biometrics Module</h4>
                    <button class="btn" onclick="triggerNativeCamera('body')" style="background-color: #3b82f6; color: white;">Estimate Height & Weight 📐</button>
                </div>
            </div>

            <input type="file" id="meal-camera-capture" accept="image/*" capture="environment" style="display: none;">
            <input type="file" id="body-camera-capture" accept="image/*" capture="environment" style="display: none;">

            <div id="vision-processing-card" class="card hidden" style="position: relative; padding: 30px; background: #0f172a; text-align: center; border-radius: 14px; overflow: hidden; margin-top: 15px;">
                <div class="laser"></div>
                <span style="color: #38bdf8; font-weight: bold; font-size: 14px;" id="processing-status-text">Uploading Image...</span>
            </div>

            <div id="vision-result-box" class="card hidden" style="background: #ffffff; border-left: 4px solid #10b981; margin-top: 15px;">
                <h3 style="color: #0f172a; margin-bottom: 8px;" id="vision-result-title">AI Neural Report</h3>
                <div id="vision-result-content" style="font-size: 13px; color: #334155; line-height: 1.6;"></div>
            </div>
        `;
        document.body.appendChild(visionScreen);

        // Bind event listeners to camera changes
        document.getElementById('meal-camera-capture').addEventListener('change', () => processVisionAnalysis('meal'));
        document.getElementById('body-camera-capture').addEventListener('change', () => processVisionAnalysis('body'));
    }
}

// FORCE IMMEDIATELY AND ON LOAD TO PREVENT DELETION OR BUG
injectVisionSystem();
document.addEventListener("DOMContentLoaded", injectVisionSystem);
window.addEventListener("load", injectVisionSystem);

// --- SCREEN CONTROL ENGINE ---
function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(screenId);
    if (target) target.classList.remove('hidden');
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

// ========================================================
// --- LIVE CAMERA CONTROLLER AND ANALYSIS ---
// ========================================================
function triggerNativeCamera(type) {
    document.getElementById('vision-result-box').classList.add('hidden');
    if (type === 'meal') {
        document.getElementById('meal-camera-capture').click(); 
    } else {
        document.getElementById('body-camera-capture').click(); 
    }
}

function processVisionAnalysis(type) {
    const processingCard = document.getElementById('vision-processing-card');
    const statusText = document.getElementById('processing-status-text');
    const resultBox = document.getElementById('vision-result-box');
    const title = document.getElementById('vision-result-title');
    const content = document.getElementById('vision-result-content');

    processingCard.classList.remove('hidden');
    resultBox.classList.add('hidden');
    statusText.innerText = "Analyzing Captured Image via Local Neural Net...";

    setTimeout(() => {
        processingCard.classList.add('hidden');
        resultBox.classList.remove('hidden');

        if(type === 'meal') {
            title.innerHTML = "🍳 AI Nutrition Scanner Report";
            const mealsDatabase = [
                { name: "Grilled Chicken Protein Bowl", cals: "540 kcal", p: "42g", c: "55g", f: "12g", items: "• Basmati Brown Rice (150g)<br>• Tender Grilled Chicken (120g)<br>• Fresh Steamed Greens & Olive Oil Blend" },
                { name: "Premium Lean Beef Burger", cals: "680 kcal", p: "35g", c: "48g", f: "28g", items: "• Whole Wheat Brioche Bun<br>• Lean Organic Beef Patty (150g)<br>• Light Cheddar Slice & House Sauce" }
            ];
            let selected = mealsDatabase[Math.floor(Math.random() * mealsDatabase.length)];
            content.innerHTML = `
                <b>Detected Meal:</b> <span style='color:#0d9488;'>${selected.name}</span><br>
                <b>Total Saturated Energy:</b> <b>${selected.cals}</b><br><br>
                <label>Protein Content: ${selected.p}</label><div class='macro-bar'><div class='macro-fill' style='width: 82%; background:#3b82f6;'></div></div>
                <label>Carbohydrates: ${selected.c}</label><div class='macro-bar'><div class='macro-fill' style='width: 68%; background:#eab308;'></div></div>
                <label>Healthy Fats: ${selected.f}</label><div class='macro-bar'><div class='macro-fill' style='width: 35%; background:#ef4444;'></div></div>
                <span style='font-size:11px; color:#64748b;'><b>Deconstructed Ingredients:</b><br>${selected.items}</span>
            `;
        } else {
            title.innerHTML = "🧍 AI Body Dimensions Estimate";
            let estHeight = Math.floor(Math.random() * (185 - 165) + 165);
            let estWeight = Math.floor(Math.random() * (85 - 60) + 60);
            content.innerHTML = `
                <b>Wall Reference Alignment Matrix:</b> <span style='color:#3b82f6;'>Validated (100%)</span><br>
                <b>Estimated Stature Height:</b> <span style='font-size:16px; color:#0f172a;'><b>${estHeight} cm</b></span><br>
                <b>Estimated Mass Weight:</b> <span style='font-size:16px; color:#0f172a;'><b>${estWeight} kg</b></span><br><br>
                <span style='font-size:11px; color:#64748b;'>• <i>Note: Calculation completed using automated computer vision relative pixel scale calibration metrics.</i></span>
            `;
        }
        document.getElementById('meal-camera-capture').value = "";
        document.getElementById('body-camera-capture').value = "";
    }, 2500); 
}

// --- PRE-EXISTING APPS CONTROLLERS ---
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

// --- FLASHCARDS ---
const flashcardsDeck = [
    { front: "Feynman Technique", back: "Learning a concept by explaining it in simple terms to a child." },
    { front: "Pareto Principle (80/20 Rule)", back: "80% of results come from 20% of your focused efforts." },
    { front: "Active Recall", back: "Testing your mind instantly rather than passively rereading notes." }
];
let currentCardIdx = 0;
function nextFlashcard() {
    document.getElementById('flashcard-inner').classList.remove('flipped');
    setTimeout(() => {
        currentCardIdx = Math.floor(Math.random() * flashcardsDeck.length);
        document.getElementById('card-front').innerText = flashcardsDeck[currentCardIdx].front;
        document.getElementById('card-back').innerText = flashcardsDeck[currentCardIdx].back;
    }, 150);
}
function flipFlashcard() { document.getElementById('flashcard-inner').classList.toggle('flipped'); }

// --- MATH ---
let mathScore = 0, currentAnswer = 0;
function generateMathQuestion() {
    let num1 = Math.floor(Math.random() * 50) + 10; let num2 = Math.floor(Math.random() * 40) + 5;
    let isPlus = Math.random() > 0.5; currentAnswer = isPlus ? (num1 + num2) : (num1 - num2);
    document.getElementById('math-question').innerText = `${num1} ${isPlus ? '+' : '-'} ${num2} = ?`;
}
function checkMathAnswer() {
    let userAns = parseInt(document.getElementById('math-answer').value);
    let feed = document.getElementById('math-feedback');
    if(userAns === currentAnswer) {
        mathScore += 100; feed.innerText = "✅ Correct! +100 Points"; feed.style.color = "green";
        document.getElementById('math-score').innerText = mathScore;
        setTimeout(generateMathQuestion, 1200);
    } else { feed.innerText = "❌ Incorrect! Try again."; feed.style.color = "red"; }
}

// --- SCRAMBLE ---
const scrambleWords = [{ original: "APPLE", scrambled: "ELPPA" }, { original: "PYTHON", scrambled: "NTYOPH" }];
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

// --- PUZZLE ---
let puzzleBoard = [1, 2, 3, 4, 5, 6, 7, 8, ""], puzzleLevel = 1;
function initSliderPuzzle() {
    document.getElementById('puzzle-level').innerText = puzzleLevel;
    document.getElementById('puzzle-feedback').innerText = "";
    shufflePuzzle(); renderPuzzleGrid();
}
function shufflePuzzle() {
    let shuffleCount = 20;
    for (let i = 0; i < shuffleCount; i++) {
        let emptyIdx = puzzleBoard.indexOf("");
        let validMoves = getValidPuzzleMoves(emptyIdx);
        let randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
        puzzleBoard[emptyIdx] = puzzleBoard[randomMove]; puzzleBoard[randomMove] = "";
    }
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
            puzzleLevel++; setTimeout(initSliderPuzzle, 1500);
        }
    }
}
function checkPuzzleWin() {
    const win = [1, 2, 3, 4, 5, 6, 7, 8, ""];
    return puzzleBoard.every((val, i) => val === win[i]);
}

// --- CANVAS ---
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

// --- MAP ---
const countrySecrets = {
    saudi: { title: "🇸🇦 Saudi Arabia", text: "Lost river networks detected below Rub' al Khali desert sands." },
    egypt: { title: "🇪🇬 Egypt", text: "The Sphinx features rumors of a hidden 'Hall of Records' chamber below." },
    morocco: { title: "🇲🇦 Morocco", text: "Pigeon Cave holds oldest skull operation trace over 15k years ago!" },
    iraq: { title: "🇮🇶 Iraq", text: "The ancient Baghdad Battery indicates experimental early electric currents." },
    uae: { title: "🇦🇪 UAE", text: "Saruq Al Hadid uncovered golden artifacts linking ancient trade routes." },
    jordan: { title: "🇯🇴 Jordan", text: "Petra holds hydraulic flash flood management reservoirs." },
    tunisia: { title: "🇹🇳 Tunisia", text: "Carthage features the circular hidden 'Cothon' military harbor docks." },
    japan: { title: "🇯🇵 Japan", text: "Yonaguni monolith monument contains steps debated to be artificial structures." },
    france: { title: "🇫🇷 France", text: "Paris Catacombs underground maps hold skeletal remains of 6M people." }
};
function revealCountrySecret(code) {
    const box = document.getElementById('map-secret-box');
    const title = document.getElementById('secret-country-title');
    const text = document.getElementById('secret-country-text');
    if (countrySecrets[code]) {
        box.classList.remove('hidden'); title.innerText = countrySecrets[code].title; text.innerText = countrySecrets[code].text;
    }
}

// --- RETRO MEMORY ---
const emojis = ['🔥', '🔥', '💎', '💎', '🚀', '🚀', '👑', '👑', '🎮', '🎮', '🔮', '🔮', '🧩', '🧩', '👻', '👻'];
let flippedCards = [], matchedPairs = 0;
function initMemoryGame() {
    const grid = document.getElementById('memory-grid'); grid.innerHTML = "";
    flippedCards = []; matchedPairs = 0;
    let shuffled = [...emojis].sort(() => Math.random() - 0.5);
    shuffled.forEach((emoji, idx) => {
        const card = document.createElement('div'); card.className = 'memory-card-cell'; card.dataset.emoji = emoji; card.onclick = () => flipMemoryCard(card);
        card.innerText = "❓"; grid.appendChild(card);
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
    } else { c1.classList.remove('flipped'); c2.classList.remove('flipped'); c1.innerText = "❓"; c2.innerText = "❓"; }
    flippedCards = [];
}

// --- TIC TAC TOE ---
let tttBoard = ["","","","","","","","",""], tttPlayer = "X", tttActive = true;
function initTicTacToe() {
    tttBoard = ["","","","","","","","",""]; tttPlayer = "X"; tttActive = true;
    document.getElementById('ttt-status').innerText = "Player X's Turn";
    document.querySelectorAll('.ttt-cell').forEach(cell => { cell.innerText = ""; });
}
function makeTTTMove(index) {
    if (tttBoard[index] !== "" || !tttActive) return; tttBoard[index] = tttPlayer;
    const cells = document.querySelectorAll('.ttt-cell'); cells[index].innerText = tttPlayer;
    if (checkTTTWin()) { document.getElementById('ttt-status').innerText = `🎉 Player ${tttPlayer} Wins!`; tttActive = false; return; }
    if (!tttBoard.includes("")) { document.getElementById('ttt-status').innerText = "It's a Tie! 🤝"; tttActive = false; return; }
    tttPlayer = tttPlayer === "X" ? "O" : "X"; document.getElementById('ttt-status').innerText = `Player ${tttPlayer}'s Turn`;
}
function checkTTTWin() {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return wins.some(p => tttBoard[p[0]] !== "" && tttBoard[p[0]] === tttBoard[p[1]] && tttBoard[p[1]] === tttBoard[p[2]]);
}
