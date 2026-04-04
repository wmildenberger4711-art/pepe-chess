const SIZE = 5;

// --------------------
// DAILY STATE
// --------------------
let boards = [];
let originalBoards = [];
let currentBoardIndex = 0;

let selected = null;
let kingCaptured = false;

let startTime = Date.now();
let timerInterval = null;
let elapsedSeconds = 0;

let boardAttempts = [0,0,0,0,0];
let boardCompleted = [false,false,false,false,false];

let gameFinished = false;

// --------------------
// INIT
// --------------------
function initGame(){
    const seed = getDailySeed();
    originalBoards = generateBoards(seed);

    boards = originalBoards.map(board =>
        board.map(row =>
            row.map(cell => cell ? {...cell} : null)
        )
    );

    startTimer();
    drawBoard();
}

function getDailySeed(){
    const today = new Date();
    return today.getFullYear()*10000 + (today.getMonth()+1)*100 + today.getDate();
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
// DRAW BOARD
// --------------------
const boardDiv = document.getElementById("board");

function drawBoard(){
    boardDiv.innerHTML = "";

    const board = boards[currentBoardIndex];

    for (let y = 0; y < SIZE; y++){
        for (let x = 0; x < SIZE; x++){
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (selected && selected.x === x && selected.y === y){
                cell.classList.add("selected");
            }

            const piece = board[y][x];

            if (piece){
                switch(piece.type){
                    case "rook": cell.textContent = "♖"; break;
                    case "bishop": cell.textContent = "♗"; break;
                    case "queen": cell.textContent = "♕"; break;
                    case "king": cell.textContent = "♔"; break;
                    case "knight": cell.textContent = "♘"; break;
                    case "pawn": cell.textContent = "♙"; break;
                    default: cell.textContent = "?";
                }
            } else {
                cell.textContent = "";
            }

            if (piece && piece.moves >= 2){
                cell.style.opacity = "0.4";
            }

            cell.onclick = () => handleClick(x,y);

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
        if (!statusDiv) return;

    if (gameFinished){
        statusDiv.textContent = "🎉 Daily Complete!";
        document.getElementById("shareBtn").style.display = "inline-block";
        return;
    }

    statusDiv.textContent =
        `Board ${currentBoardIndex+1}/5 | Attempts: ${boardAttempts[currentBoardIndex]}`;
}

// --------------------
// CLICK HANDLER
// --------------------
function handleClick(x, y){
    const board = boards[currentBoardIndex];
    const clickedPiece = board[y][x];

    // ✅ If clicking empty and nothing selected → do nothing
    if (!selected && !clickedPiece) return;

    // ✅ If clicking empty → deselect
    if (selected && !clickedPiece){
        selected = null;
        drawBoard();
        return;
    }

    // If a piece is already selected, try to move
    if (selected){

        if (selected.x === x && selected.y === y) return;

        const piece = board[selected.y][selected.x];
        const targetPiece = board[y][x];

        // must capture
        if (!targetPiece) return;

        if (isValidMove(selected.x, selected.y, x, y)){

            if (piece.moves >= 2) return;

            if (targetPiece.type === "king"){
                const nonKingsLeft = countNonKings(board);

                if (nonKingsLeft === 1){
                    kingCaptured = true;
                    boardCompleted[currentBoardIndex] = true;

                    if (currentBoardIndex < 4){
                        currentBoardIndex++;
                        selected = null;
                        drawBoard();
                        return;
                    } else {
                        gameFinished = true;
                        stopTimer();
                    }
                } else {
                    boardAttempts[currentBoardIndex]++;
                }
            }

            board[y][x] = piece;
            board[selected.y][selected.x] = null;

            piece.moves++;

            selected = null;
            drawBoard();
            return;
        }
    }

    // ✅ Select a piece
    if (clickedPiece){
        selected = {x, y};
        drawBoard();
    }
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
            // diagonal forward only (capture)
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
// SHARE
// --------------------
function shareResult(){
    let blocks = boardCompleted.map(c => c ? "🟩" : "🟥").join("");

    const text =
`🟩 Pepe Capture Daily
${blocks}
Time: ${formatTime(elapsedSeconds)}`;

    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    });
}

// --------------------
// SOLVABLE GENERATOR
// --------------------
function generateBoards(seed){
    const rng = mulberry32(seed);
    const boards = [];

    const pieceTypes = ["rook","bishop","knight","queen","pawn"];

    for (let i = 0; i < 5; i++){

        let board = Array.from({length: SIZE}, () =>
            Array.from({length: SIZE}, () => null)
        );

        // king
        let kx = Math.floor(rng()*SIZE);
        let ky = Math.floor(rng()*SIZE);
        board[ky][kx] = {type:"king", moves:0};

        // solver piece
        let type = pieceTypes[Math.floor(rng()*pieceTypes.length)];

        for (let t = 0; t < 50; t++){
            let x = Math.floor(rng()*SIZE);
            let y = Math.floor(rng()*SIZE);

            if (!board[y][x] && isValidCapturePosition(type, x, y, kx, ky)){

                // temporarily place the piece
                board[y][x] = {type, moves:0};

                // check path clearance for sliding pieces
                if (type === "rook" || type === "bishop" || type === "queen"){
                    if (!isPathClear(board, x, y, kx, ky)){
                        board[y][x] = null;
                        continue;
                    }
                }
                break;
            }
        }        

        // extras
        // extras
        let extras = 2 + Math.floor(rng()*2);

        for (let e = 0; e < extras; e++){
            let placed = false;

            for (let t = 0; t < 30 && !placed; t++){
                let x = Math.floor(rng()*SIZE);
                let y = Math.floor(rng()*SIZE);

                if (!board[y][x]){
                    let p = pieceTypes[Math.floor(rng()*pieceTypes.length)];
                    board[y][x] = {type:p, moves:0};
                    placed = true;
                }
            }
        }

        // ✅ STEP 3: validate solvability BEFORE accepting board
        console.log("Generated board:");
        console.log(board);
        console.log("Solvable?", canSolve(board));
        if (!canSolve(board)){
            i--;          // retry this board
            continue;     // skip pushing it
        }

        boards.push(board);
    }

    return boards;
}

function isValidCapturePosition(type, fx, fy, kx, ky){
    const dx = kx - fx;
    const dy = ky - fy;

    switch(type){
        case "rook": return dx===0 || dy===0;
        case "bishop": return Math.abs(dx)===Math.abs(dy);
        case "queen": return dx===0 || dy===0 || Math.abs(dx)===Math.abs(dy);
        case "knight":
            return (Math.abs(dx)===2 && Math.abs(dy)===1) ||
                   (Math.abs(dx)===1 && Math.abs(dy)===2);
        case "pawn": return Math.abs(dx)===1 && dy===-1;
        default: return false;
    }
}

// RNG
function mulberry32(a){
    return function(){
        let t = a += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
}

function resetCurrentBoard(){
    // restore original board state
    boards[currentBoardIndex] = originalBoards[currentBoardIndex].map(row =>
    row.map(cell => cell ? { ...cell, moves: 0 } : null)
    );

    // reset selection
    selected = null;

    // reset win state for that board
    kingCaptured = false;

    // reset attempts increment if you want resets to count as attempts
    boardAttempts[currentBoardIndex]++;

    drawBoard();
}
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

function canSolve(board, depth = 0, maxDepth = 6){
    if (isWin(board)) return true;
    if (depth >= maxDepth) return false;

    const moves = getAllMoves(board);

    for (let move of moves){
        const newBoard = applyMove(board, move);

        if (canSolve(newBoard, depth + 1, maxDepth)){
            return true;
        }
    }

    return false;
}

function isValidMoveSim(board, piece, fromX, fromY, toX, toY){
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

function cloneBoard(board){
    return board.map(row =>
        row.map(cell => cell ? {...cell} : null)
    );
}

function getAllMoves(board){
    const moves = [];

    for (let y1 = 0; y1 < SIZE; y1++){
        for (let x1 = 0; x1 < SIZE; x1++){
            const piece = board[y1][x1];
            if (!piece) continue;

            for (let y2 = 0; y2 < SIZE; y2++){
                for (let x2 = 0; x2 < SIZE; x2++){
                    const target = board[y2][x2];
                    if (!target || target.type === piece.type) continue;

                    if (target.type === "king" || target.type !== piece.type){
                        if (isValidMoveSim(board, piece, x1, y1, x2, y2)){
                            moves.push({fromX:x1, fromY:y1, toX:x2, toY:y2});
                        }
                    }
                }
            }
        }
    }

    return moves;
}

function applyMove(board, move){
    const newBoard = cloneBoard(board);

    const piece = newBoard[move.fromY][move.fromX];
    const target = newBoard[move.toY][move.toX];

    // capture
    newBoard[move.toY][move.toX] = piece;
    newBoard[move.fromY][move.fromX] = null;

    return newBoard;
}

function isWin(board){
    let pieces = 0;

    for (let row of board){
        for (let cell of row){
            if (cell && cell.type !== "king") pieces++;
        }
    }

    return pieces === 0;
}

function createFinalState(rng){
    let board = emptyBoard();

    // place king
    let kx = rand(rng, SIZE);
    let ky = rand(rng, SIZE);
    board[ky][kx] = {type:"king", moves:0};

    // place final capturing piece
    const types = ["rook","bishop","queen","knight","pawn"];
    let type = types[rand(rng, types.length)];

    let placed = false;

    while (!placed){
        let x = rand(rng, SIZE);
        let y = rand(rng, SIZE);

        if (!board[y][x] && isValidCapturePosition(type, x, y, kx, ky)){
            board[y][x] = {type, moves:0};
            placed = true;
        }
    }

    return board;
}

function reverseOneMove(board, rng){
    let newBoard = cloneBoard(board);

    // pick a piece to "rewind"
    let pieces = [];

    for (let y = 0; y < SIZE; y++){
        for (let x = 0; x < SIZE; x++){
            if (newBoard[y][x]){
                pieces.push({x,y,piece:newBoard[y][x]});
            }
        }
    }

    let choice = pieces[rand(rng, pieces.length)];
    let {x, y, piece} = choice;

    // find possible origin squares
    let origins = [];

    for (let y2 = 0; y2 < SIZE; y2++){
        for (let x2 = 0; x2 < SIZE; x2++){

            if (newBoard[y2][x2] !== null) continue;

            if (isValidMoveSim(newBoard, piece, x2, y2, x, y)){
                origins.push({x:x2, y:y2});
            }
        }
    }

    if (origins.length === 0) return null;

    let origin = origins[rand(rng, origins.length)];

    // move piece backward
    newBoard[origin.y][origin.x] = piece;
    newBoard[y][x] = null;

    // spawn captured piece
    const types = ["rook","bishop","knight","queen","pawn"];
    let newType = types[rand(rng, types.length)];

    newBoard[y][x] = {type:newType, moves:0};

    return newBoard;
}



// --------------------
// START
// --------------------
initGame();