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

// --- HEALTH ZONE & SLEEP CYCLE CALCULATOR ---
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
    // Calculate perfect sleep cycles (90 mins each + 14 mins to fall asleep)
    for (let i = 4; i <= 6; i++) {
        let cycleTime = new Date(now.getTime() + (i * 90 * 60000) + (14 * 60000));
        suggestions.push(cycleTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }
    out.innerHTML = `⏰ <b>إذا نمت الآن، يجب أن تستيقظ في أحد هذه الأوقات لتقوم بكامل نشاطك:</b><br>
    • خيار 1 (4 دورات): <b>${suggestions[0]}</b><br>
    • خيار 2 (5 دورات ممتازة): <b>${suggestions[1]}</b><br>
    • خيار 3 (6 دورات نوم عميق): <b>${suggestions[2]}</b>`;
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
function explainLessonAI() {
    const topic = document.getElementById('lesson-topic').value.trim();
    const out = document.getElementById('lesson-ai-response');
    if (!topic) { out.classList.remove('hidden'); out.innerHTML = "❌ Type a lesson name first!"; return; }
    out.classList.remove('hidden');
    out.innerHTML = `🤖 <b>Deconstruction Engine:</b> Concept [${topic}] structural framework mapped successfully.`;
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

// ========================================================
// --- CREATIVITY HUB: SLIDING NUMBER PUZZLE ---
// ========================================================
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

// ========================================================
// --- NEW SECTION: SECRET WORLD MAP DATABASE ---
// ========================================================
const countrySecrets = {
    saudi: { title: "🇸🇦 المملكة العربية السعودية", text: "تحت رمال صحراء الربع الخالي الشاسعة، تكشف الأقمار الصناعية عن شبكات أنهار قديمة وجافة وبقايا حضارات غارقة مجهولة التاريخ كانت تعيش في اخضرار كامل قبل آلاف السنين." },
    egypt: { title: "🇪🇬 جمهورية مصر العربية", text: "تحت أبو الهول يوجد سر غامض يعرف بـ 'قاعة السجلات' (Hall of Records)، وهي مكتبة أنفاق سرية يُعتقد أنها تحتوي على علوم قارة أتلانتس المفقودة ولم تُفتح بالكامل حتى اليوم." },
    morocco: { title: "🇲🇦 المملكة المغربية", text: "مغارة 'الحمام' بمدينة تافوغالت شرق المغرب تحتوي على أقدم دليل في تاريخ البشرية لعملية جراحية ناجحة لثقب الجمجمة تعود لأكثر من 15,000 سنة!" },
    iraq: { title: "🇮🇶 جمهورية العراق", text: "في بغداد تم اكتشاف 'بطارية بغداد' الأثرية، وهي جرة فخارية تحتوي على أسطوانة نحاس وقضيب حديدي تفيد بأن السومريين أو البابليين عرفوا الكهرباء واستخدموا الطلاء الكهربائي قبل ألفي عام من جالفاني!" },
    uae: { title: "🇦🇪 الإمارات العربية المتحدة", text: "في موقع 'صاروج الحديد' الأثري في دبي، تم اكتشاف آلاف القطع الذهبية والحديدية الغامضة التي تعود للعصر الحديدي، والتي تكشف عن صلات تجارية سرية غير متوقعة مع حضارات ما وراء البحار." },
    jordan: { title: "🇯🇴 المملكة الأردنية الهاشمية", text: "مدينة البتراء الوردية المنحوتة في الصخر تحتوي على نظام هندسي خارق لإدارة وتخزين وتوجيه السيول والماء في قلب الصحراء، بدقة توازي الهندسة الهيدروليكية الحديثة." },
    tunisia: { title: "🇹🇳 الجمهورية التونسية", text: "مدينة قرطاج التاريخية كانت تمتلك ميناءً حربياً دائرياً سرياً وخفياً يسمى 'المونيبول'، مصمم بشكل يمنع أي سفينة معادية بالخارج من رؤية عدد أو تجهيزات السفن بالداخل." },
    japan: { title: "🇯🇵 اليابان", text: "تحت مياه جزيرة 'يوناغوني'، يوجد نصب صخري ضخم يشبه الهرم المدرج بجدران زواياها حادة 90 درجة، يختلف العلماء حول ما إذا كان من صنع الطبيعة أم بقايا قارة 'مو' الغارقة." },
    france: { title: "🇫🇷 فرنسا", text: "تحت شوارع باريس النابضة بالحياة، توجد شبكة أنفاق مظلمة ومرعبة بطول مئات الكيلومترات تضم عظام ورفات أكثر من 6 ملايين إنسان، وتُعرف بمقابر باريس السرية (The Catacombs)." }
};
function revealCountrySecret(code) {
    const box = document.getElementById('map-secret-box');
    const title = document.getElementById('secret-country-title');
    const text = document.getElementById('secret-country-text');
    if (countrySecrets[code]) {
        box.classList.remove('hidden'); title.innerText = countrySecrets[code].title; text.innerText = countrySecrets[code].text;
    }
}

// ========================================================
// --- LIGHT GAMES ZONE: RETRO MEMORY MATCH (GEL EL TAYEBIN) ---
// ========================================================
const emojis = ['🔥', '🔥', '💎', '💎', '🚀', '🚀', '👑', '👑', '🎮', '🎮', '🔮', '🔮', '🧩', '🧩', '👻', '👻'];
let flippedCards = [], matchedPairs = 0;
function initMemoryGame() {
    const grid = document.getElementById('memory-grid'); grid.innerHTML = "";
    flippedCards = []; matchedPairs = 0;
    // Shuffle cards
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
    if (flippedCards.length === 2) {
        setTimeout(checkMemoryMatch, 800);
    }
}
function checkMemoryMatch() {
    const [c1, c2] = flippedCards;
    if (c1.dataset.emoji === c2.dataset.emoji) {
        c1.classList.add('matched'); c2.classList.add('matched'); matchedPairs++;
        if (matchedPairs === emojis.length / 2) alert("🏆 الألعاب الخفيفة: كفو! أنهيت لعبة الذاكرة بنجاح!");
    } else {
        c1.classList.remove('flipped'); c2.classList.remove('flipped'); c1.innerText = "❓"; c2.innerText = "❓";
    }
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

