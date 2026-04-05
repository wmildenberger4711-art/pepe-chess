const SIZE = 6;

// --------------------
// DAILY STATE
// --------------------
let boards = [];
let originalBoards = [];
let currentBoardIndex = 0;
let highlightedMoves = [];
let timerStarted = false;

let selected = null;
let kingCaptured = false;

let startTime = Date.now();
let timerInterval = null;
let elapsedSeconds = 0;
let currentPieceSet = "pepe";

const TOTAL_BOARDS = 5;

let boardAttempts = Array(TOTAL_BOARDS).fill(1);
let boardCompleted = Array(TOTAL_BOARDS).fill(false);
let boardUsedReset = Array(TOTAL_BOARDS).fill(false);

let gameFinished = false;

const pieceSets = {
    pepe: {
        king: "assets/pepe-king.png",
        queen: "assets/pepe-queen.png",
        rook: "assets/pepe-rook.png",
        bishop: "assets/pepe-bishop.png",
        knight: "assets/pepe-knight.png",
        pawn: "assets/pepe-pawn.png"
    },
    classic: {
        king: "assets/sprite-king.png",
        queen: "assets/sprite-queen.png",
        rook: "assets/sprite-rook.png",
        bishop: "assets/sprite-bishop.png",
        knight: "assets/sprite-knight.png",
        pawn: "assets/sprite-pawn.png"
    }
};

// --------------------
// INIT
// --------------------
function initGame(){
    const seed = getDailySeed();
    const pool = getBoardPool();

    const selectedBoards = pickDailyBoards(pool, seed, 5);

    originalBoards = selectedBoards;

    boards = originalBoards.map(board =>
        board.map(row =>
            row.map(cell => cell ? {...cell} : null)
        )
    );

    drawBoard();
    updateRuleText();
}



// --------------------
// TIMER
// --------------------
function startTimer(){
    startTime = Date.now();

    timerInterval = setInterval(() => {
        elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        const timerEl = document.getElementById("timer");
        if (timerEl){
            timerEl.textContent = `Time: ${formatTime(elapsedSeconds)}`;
        }
    }, 1000);
}

function stopTimer(){
    clearInterval(timerInterval);
}

function formatTime(seconds){
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// --------------------
// BOARD DRAW
// --------------------
const boardDiv = document.getElementById("board");

function drawBoard(){
    boardDiv.innerHTML = "";

    if (!boards[currentBoardIndex]) return;
    const board = boards[currentBoardIndex];

    for (let y = 0; y < SIZE; y++){
        for (let x = 0; x < SIZE; x++){
            const cell = document.createElement("div");
            cell.classList.add("cell");

            // checkerboard colors
            if ((x + y) % 2 === 0){
                cell.classList.add("light");
            } else {
                cell.classList.add("dark");
            }

            // selected piece highlight
            if (selected && selected.x === x && selected.y === y){
                cell.classList.add("selected");
            }

            // ✅ highlight valid moves
            const isHighlighted = highlightedMoves.some(m => m.x === x && m.y === y);
            if (isHighlighted){
                cell.classList.add("highlight-move");
            }

            const piece = board[y][x];

            if (piece){
                const img = document.createElement("img");
                img.src = pieceSets[currentPieceSet][piece.type];
                img.style.width = "100%";
                img.style.height = "100%";
                img.style.objectFit = "contain";

                cell.appendChild(img);

                // fade after 1 move
                if (piece.moves === 1){
                    cell.classList.add("piece-half");
                }

                if (piece.moves >= 2){
                    cell.classList.add("piece-full");
                }
            }

            // click handler
            cell.onclick = () => handleClick(x, y);

            boardDiv.appendChild(cell);
        }
    }

    updateStatus();
}

// --------------------
// STATUS
// --------------------
function updateStatus(){
    const statusDiv = document.getElementById("status");
    const shareBtn = document.getElementById("shareBtn");
    const resetBtn = document.getElementById("resetBtn");

    if (!statusDiv) return;

    if (gameFinished){
        statusDiv.textContent = "🎉 Daily Complete!";

        if (shareBtn) shareBtn.style.display = "inline-block";

        if (resetBtn){
            resetBtn.disabled = true;
            resetBtn.style.opacity = "0.5";
            resetBtn.style.cursor = "not-allowed";
        }

        return;
    }

    if (shareBtn) shareBtn.style.display = "none";

    if (resetBtn){
        resetBtn.disabled = false;
        resetBtn.style.opacity = "1";
        resetBtn.style.cursor = "pointer";
    }

    statusDiv.textContent =
        `Board ${currentBoardIndex+1}/5 | Attempts: ${boardAttempts[currentBoardIndex]}`;
}

// --------------------
// CLICK HANDLER
// --------------------
function handleClick(x, y){
    // ✅ start timer on first meaningful interaction
    if (!timerStarted){
        const board = boards[currentBoardIndex];
        const clickedPiece = board[y][x];

        // only start timer if user clicks a piece (not empty square)
        if (clickedPiece){
            timerStarted = true;
            startTimer();
        }
    }

    if (gameFinished) return;

    const board = boards[currentBoardIndex];
    const clickedPiece = board[y][x];

    // --------------------
    // No selection yet
    // --------------------
    if (!selected){
        if (!clickedPiece) return;

        selected = { x, y };
        highlightedMoves = getValidMovesForSelected();
        drawBoard();
        return;
    }

    // --------------------
    // Clicking same tile → deselect
    // --------------------
    if (selected.x === x && selected.y === y){
        selected = null;
        highlightedMoves = [];
        drawBoard();
        return;
    }

    const piece = board[selected.y][selected.x];
    const targetPiece = board[y][x];

    // --------------------
    // Empty square clicked → deselect
    // --------------------
    if (!targetPiece){
        selected = null;
        highlightedMoves = [];
        drawBoard();
        return;
    }

    // --------------------
    // Attempt move (capture only)
    // --------------------
    if (isValidMove(selected.x, selected.y, x, y)){

        // enforce move limit
        if (piece.moves >= 2) return;

        // prevent capturing king
        if (targetPiece.type === "king") return;

        // make the capture
        board[y][x] = piece;
        board[selected.y][selected.x] = null;
        piece.moves++;

        // clear selection + highlights
        selected = null;
        highlightedMoves = [];

        // --------------------
        // win condition
        // --------------------
        if (countNonKings(board) === 0){
            boardCompleted[currentBoardIndex] = true;

            drawBoard();

            if (currentBoardIndex < 4){
                setTimeout(() => {
                    currentBoardIndex++;
                    selected = null;
                    highlightedMoves = [];
                    drawBoard();
                }, 400);
            } else {
                setTimeout(() => {
                    gameFinished = true;
                    stopTimer();
                    drawBoard();
                }, 400);
            }

            return;
        }

        drawBoard();
        return;
    }

    // --------------------
    // Invalid move → reset selection
    // --------------------
    selected = null;
    highlightedMoves = [];
    drawBoard();
}

// --------------------
// COUNT PIECES
// --------------------
function countNonKings(board){
    let count = 0;
    for (let row of board){
        for (let cell of row){
            if (cell && cell.type !== "king") count++;
        }
    }
    return count;
}

// --------------------
// MOVE VALIDATION
// --------------------
function isValidMove(fromX, fromY, toX, toY){
    const board = boards[currentBoardIndex];
    const piece = board[fromY][fromX];
    const dx = toX - fromX;
    const dy = toY - fromY;

    switch(piece.type){

        case "rook":
            if (dx !== 0 && dy !== 0) return false;
            return isPathClear(board, fromX, fromY, toX, toY);

        case "bishop":
            if (Math.abs(dx) !== Math.abs(dy)) return false;
            return isPathClear(board, fromX, fromY, toX, toY);

        case "queen":
            if (dx === 0 || dy === 0 || Math.abs(dx) === Math.abs(dy)){
                return isPathClear(board, fromX, fromY, toX, toY);
            }
            return false;

        case "king":
            return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;

        case "knight":
            return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
                   (Math.abs(dx) === 1 && Math.abs(dy) === 2);

        case "pawn":
            return Math.abs(dx) === 1 && dy === -1;

        default:
            return false;
    }
}

// --------------------
// PATH CHECK
// --------------------
function isPathClear(board, fromX, fromY, toX, toY){
    let dx = Math.sign(toX - fromX);
    let dy = Math.sign(toY - fromY);

    let x = fromX + dx;
    let y = fromY + dy;

    while (x !== toX || y !== toY){
        if (board[y][x] !== null) return false;
        x += dx;
        y += dy;
    }

    return true;
}

// --------------------
// RESET
// --------------------
function resetCurrentBoard(){
    console.log("Reset clicked");

    boards[currentBoardIndex] = originalBoards[currentBoardIndex].map(row =>
        row.map(cell => cell ? { ...cell, moves: 0 } : null)
    );

    boardUsedReset[currentBoardIndex] = true;
    boardAttempts[currentBoardIndex]++;

    selected = null;

    drawBoard();
}

// --------------------
// SHARE
// --------------------
function shareResult(){
    let blocks = boardCompleted.map((completed, i) => {
        if (completed && !boardUsedReset[i]) return "🟩";
        if (completed && boardUsedReset[i]) return "🟨";
        return "🟥";
    }).join("");

    const text =
`🟩 Pepe Capture Daily
${blocks}
Time: ${formatTime(elapsedSeconds)}`;

    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    });
}

// --------------------
// BUTTON WIRING
// --------------------
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("resetBtn")?.addEventListener("click", resetCurrentBoard);
    document.getElementById("shareBtn")?.addEventListener("click", shareResult);

    document.getElementById("pieceToggle")?.addEventListener("change", (e) => {
        currentPieceSet = e.target.checked ? "classic" : "pepe";
        drawBoard();
    });
});

function getDailySeed(){
    const today = new Date();
    return today.getFullYear()*10000 + (today.getMonth()+1)*100 + today.getDate();
}

function pickDailyBoards(pool, seed, count){
    const rng = mulberry32(seed);

    let indices = pool.map((_, i) => i);

    // shuffle indices deterministically
    for (let i = indices.length - 1; i > 0; i--){
        const j = Math.floor(rng() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // take first N boards
    return indices.slice(0, count).map(i => cloneBoard(pool[i]));
}

function mulberry32(a){
    return function(){
        let t = a += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
}

function cloneBoard(board){
    return board.map(row =>
        row.map(cell => cell ? {...cell} : null)
    );
}

function clearHighlights() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('highlight-move');
    });
}

function selectPiece(cell) {
    clearHighlights();

    const moves = getValidMoves(cell); // your existing logic

    moves.forEach(move => {
        const targetCell = document.querySelector(`[data-row="${move.row}"][data-col="${move.col}"]`);
        if (targetCell) {
            targetCell.classList.add('highlight-move');
        }
    });
}

function getValidMovesForSelected() {
    if (!selected) return [];

    const board = boards[currentBoardIndex];
    const moves = [];
    const piece = board[selected.y][selected.x];

    if (piece.moves >= 2) return [];

    const directions = {
        rook: [
            {dx: 1, dy: 0}, {dx: -1, dy: 0},
            {dx: 0, dy: 1}, {dx: 0, dy: -1}
        ],
        bishop: [
            {dx: 1, dy: 1}, {dx: -1, dy: -1},
            {dx: 1, dy: -1}, {dx: -1, dy: 1}
        ],
        queen: [
            {dx: 1, dy: 0}, {dx: -1, dy: 0},
            {dx: 0, dy: 1}, {dx: 0, dy: -1},
            {dx: 1, dy: 1}, {dx: -1, dy: -1},
            {dx: 1, dy: -1}, {dx: -1, dy: 1}
        ]
    };

    // --------------------
    // SLIDING PIECES
    // --------------------
    if (["rook", "bishop", "queen"].includes(piece.type)) {
        for (let dir of directions[piece.type]) {
            let x = selected.x + dir.dx;
            let y = selected.y + dir.dy;

            while (x >= 0 && x < SIZE && y >= 0 && y < SIZE) {
                const target = board[y][x];

                if (!target) {
                    // empty square → valid move
                    moves.push({ x, y });
                } else {
                    // piece found
                    if (target.type !== "king") {
                        moves.push({ x, y }); // capture
                    }
                    break; // stop in this direction
                }

                x += dir.dx;
                y += dir.dy;
            }
        }
    }

    // --------------------
    // KNIGHT
    // --------------------
    if (piece.type === "knight") {
        const jumps = [
            {dx: 2, dy: 1}, {dx: 2, dy: -1},
            {dx: -2, dy: 1}, {dx: -2, dy: -1},
            {dx: 1, dy: 2}, {dx: 1, dy: -2},
            {dx: -1, dy: 2}, {dx: -1, dy: -2}
        ];

        for (let j of jumps) {
            const x = selected.x + j.dx;
            const y = selected.y + j.dy;

            if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) continue;

            const target = board[y][x];

            if (!target || target.type !== "king") {
                moves.push({ x, y });
            }
        }
    }

    // --------------------
    // KING
    // --------------------
    if (piece.type === "king") {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;

                const x = selected.x + dx;
                const y = selected.y + dy;

                if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) continue;

                const target = board[y][x];

                if (!target || target.type !== "king") {
                    moves.push({ x, y });
                }
            }
        }
    }

    // --------------------
    // PAWN (your custom capture-only)
    // --------------------
    if (piece.type === "pawn") {
        const x = selected.x;
        const y = selected.y;

        const attacks = [
            {dx: -1, dy: -1},
            {dx: 1, dy: -1}
        ];

        for (let a of attacks) {
            const nx = x + a.dx;
            const ny = y + a.dy;

            if (nx < 0 || nx >= SIZE || ny < 0 || ny >= SIZE) continue;

            const target = board[ny][nx];

            if (target && target.type !== "king") {
                moves.push({ x: nx, y: ny });
            }
        }
    }

    return moves;
}

function updateRuleText(){
    const el = document.getElementById("ruleText");
    if (!el) return;

    el.textContent = "♟️ King must capture the last remaining piece to complete the board.";
}

function getPathSquares(board, fromX, fromY, toX, toY){
    const squares = [];

    let dx = Math.sign(toX - fromX);
    let dy = Math.sign(toY - fromY);

    let x = fromX + dx;
    let y = fromY + dy;

    while (x !== toX || y !== toY){
        if (board[y][x] !== null) return []; // blocked → no path
        squares.push({ x, y });
        x += dx;
        y += dy;
    }

    return squares;
}


// --------------------
// START
// --------------------
initGame();