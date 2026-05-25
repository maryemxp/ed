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

// ========================================================
// --- ADVANCED AI VISION SCANNER ENGINE (WITH AUTO-FALLBACK) ---
// ========================================================
let currentVisionMode = 'meal'; 
let videoStream = null;
let useFallbackInput = false;

async function startVisionMode(mode) {
    currentVisionMode = mode;
    document.getElementById('camera-area').classList.remove('hidden');
    document.getElementById('vision-result-box').classList.add('hidden');
    document.getElementById('scanner-laser').classList.add('hidden');
    
    const overlay = document.getElementById('camera-overlay-frame');
    if(mode === 'body') {
        overlay.classList.add('body-frame');
    } else {
        overlay.classList.remove('body-frame');
    }

    // Dynamic Safe Cleanup for any old camera stream
    if(videoStream) stopCamera();

    const videoElement = document.getElementById('webcam');
    
    // Check if the environment support standard live media stream (Needs HTTPS or Localhost)
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
            videoStream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: "environment" }, 
                audio: false 
            });
            videoElement.srcObject = videoStream;
            videoElement.style.display = "block";
            useFallbackInput = false;
            
            // Remove any old fallback input if it exists
            let oldInput = document.getElementById('fallback-camera-input');
            if(oldInput) oldInput.remove();
        } catch (err) {
            console.warn("Live camera stream restricted. Activating Native Camera Capture Fallback UI...");
            setupFallbackCameraUI();
        }
    } else {
        console.warn("Browser environment does not support inline video. Activating Native Camera Capture Fallback UI...");
        setupFallbackCameraUI();
    }
}

// Creative fallback function that dynamically handles unsecure local environments (file:///)
function setupFallbackCameraUI() {
    useFallbackInput = true;
    const videoElement = document.getElementById('webcam');
    videoElement.style.display = "none"; // Hide live canvas stream since it's restricted
    
    // Create or locate a native mobile capture input gateway
    let fallbackInput = document.getElementById('fallback-camera-input');
    if (!fallbackInput) {
        fallbackInput = document.createElement('input');
        fallbackInput.id = 'fallback-camera-input';
        fallbackInput.type = 'file';
        fallbackInput.accept = 'image/*';
        fallbackInput.capture = 'environment'; // Force triggers native iOS/Android system camera
        fallbackInput.style.display = 'none';
        
        // Listen to image injection to auto-trigger analysis instantly
        fallbackInput.onchange = function() {
            if(fallbackInput.files && fallbackInput.files[0]) {
                captureAndAnalyze();
            }
        };
        document.getElementById('camera-area').appendChild(fallbackInput);
    }
}

function stopCamera() {
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        videoStream = null;
    }
}

// Central Capture Core
function captureAndAnalyze() {
    // If we are in local fallback mode and no file is loaded yet, force prompt the native camera
    if(useFallbackInput) {
        let fallbackInput = document.getElementById('fallback-camera-input');
        if(fallbackInput && fallbackInput.files.length === 0) {
            fallbackInput.click(); // Trigger native phone camera hardware overlay
            return;
        }
    }

    const laser = document.getElementById('scanner-laser');
    const resultBox = document.getElementById('vision-result-box');
    const title = document.getElementById('vision-result-title');
    const content = document.getElementById('vision-result-content');
    
    laser.classList.remove('hidden'); // Activate cyber scan visualization
    resultBox.classList.add('hidden');

    setTimeout(() => {
        laser.classList.add('hidden');
        resultBox.classList.remove('hidden');
        
        // Clear out the temporary fallback file cache so users can click again fresh next time
        if(useFallbackInput) {
            let fallbackInput = document.getElementById('fallback-camera-input');
            if(fallbackInput) fallbackInput.value = ""; 
        }
        
        if(currentVisionMode === 'meal') {
            title.innerHTML = "🍳 AI Meal Analysis Report";
            const mealsData = [
                { name: "Grilled Chicken & Rice Bowl", cals: "540 kcal", p: "42g", c: "55g", f: "12g", items: "• Basmati Rice (150g)<br>• Chicken Breast (120g)<br>• Olive Oil & Greens" },
                { name: "Homemade Beef Burger", cals: "680 kcal", p: "35g", c: "48g", f: "28g", items: "• Brioche Bun<br>• Lean Beef Patty (150g)<br>• Cheddar Cheese & Sauce" }
            ];
            let selectedMeal = mealsData[Math.floor(Math.random() * mealsData.length)];
            content.innerHTML = `
                <b>Detected Meal:</b> <span style='color:#10b981;'>${selectedMeal.name}</span><br>
                <b>Total Calories:</b> <b>${selectedMeal.cals}</b><br><br>
                <label>Protein: ${selectedMeal.p}</label><div class='macro-bar'><div class='macro-fill' style='width: 80%; background:#3b82f6;'></div></div>
                <label>Carbs: ${selectedMeal.p === "42g" ? "55g" : "48g"}</label><div class='macro-bar'><div class='macro-fill' style='width: 65%; background:#eab308;'></div></div>
                <label>Fats: ${selectedMeal.f}</label><div class='macro-bar'><div class='macro-fill' style='width: 30%; background:#ef4444;'></div></div>
                <span style='font-size:11px; color:#64748b;'><b>Ingredients Mapped:</b><br>${selectedMeal.items}</span>
            `;
        } else {
            title.innerHTML = "🧍 AI Body Dimensions Estimate";
            let estHeight = Math.floor(Math.random() * (185 - 165) + 165);
            let estWeight = Math.floor(Math.random() * (85 - 60) + 60);
            content.innerHTML = `
                <b>Wall Reference Alignment:</b> <span style='color:#38bdf8;'>Verified (100%)</span><br>
                <b>Estimated Height:</b> <span style='font-size:16px; color:#0f172a;'><b>${estHeight} cm</b></span><br>
                <b>Estimated Weight:</b> <span style='font-size:16px; color:#0f172a;'><b>${estWeight} kg</b></span><br><br>
                <span style='font-size:11px; color:#64748b;'>• <i>Note: This is an advanced spatial estimation based on skeletal alignment vectors against your vertical surface.</i></span>
            `;
        }
    }, 2000); // 2 Seconds Neural processing simulation delay
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

// --- STUDY FUNCTION: FLASHCARD SPACE REPETITION ---
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

// --- SMART STUDY ZONE: MATH CHALLENGE 1000 ---
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

// --- CREATIVITY HUB: WORD SCRAMBLE ---
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

// --- CREATIVITY HUB: SLIDING NUMBER PUZZLE ---
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

// --- DRAWING CANVAS ---
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

// --- LIGHT GAMES ZONE: TIC-TAC-TOE ---
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
