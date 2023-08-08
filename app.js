const ROWS = 3;
const COLS = 3;

const gameBoard = (() => {
    const board = new Array();
    const generate = (rows, cols) => {
        for (let i = 0; i < rows; i++) {
            board[i] = new Array();
            for (var j = 0; j < cols; j++) {
                board[i].push(" ");
            }
            console.log("new array");
        };
    };
    const move = (id, move) => {
        switch(parseInt(id)) {
            case 0:
                var x = 0;
                var y = 0;
                board[x][y] = move;
                break;
            case 1:
                x = 0;
                y = 1;
                board[x][y] = move;
                break;
            case 2:
                x = 0;
                y = 2;
                board[x][y] = move;
                break;
            case 3:
                x = 1;
                y = 0;
                board[x][y] = move;
                break;
            case 4:
                x = 1;
                y = 1;
                board[x][y] = move;
                break;
            case 5:
                x = 1;
                y = 2;
                board[x][y] = move;
                break;
            case 6:
                x = 2;
                y = 0;
                board[x][y] = move;
                break;
            case 7:
                x = 2;
                y = 1;
                board[x][y] = move;
                break;
            case 8:
                x = 2;
                y = 2;
                board[x][y] = move;
                break;
        }
    }
    const checkBoard = (piece) => {
        console.log("Active");
        if (board[0][0] == piece && board[0][1] == piece && board[0][2] == piece) {
            return true;
        }
        else if (board[0][0] == piece && board[1][1] == piece && board[2][2] == piece) {
            return true;
        }
        else if (board[0][0] == piece && board[1][0] == piece && board[2][0] == piece) {
            return true;
        }
        else if (board[0][1] == piece && board[1][1] == piece && board[2][1] == piece) {
            return true;
        }
        else if (board[0][2] == piece && board[1][2] == piece && board[2][2] == piece) {
            return true;
        }
        else if (board[0][2] == piece && board[1][1] == piece && board[2][0] == piece) {
            return true;
        }
        else if (board[1][0] == piece && board[1][1] == piece && board[1][2] == piece) {
            return true;
        }
        else if (board[2][0] == piece && board[2][1] == piece && board[2][2] == piece) {
            return true;
        }
        else {
            return false;
        }
    }
    return {
        board,
        checkBoard,
        generate,
        move,
    };
})();

const displayController = (() => {
    const playerMove = (squareNumber, piece) => {
        let square = document.getElementById(`${squareNumber}`);
        square.innerHTML = `${piece}`;
    }
    const gameMsg = (msg) => {
        let container = document.getElementById('player');
        container.innerHTML = `${msg}`;
    }
    const createBoard = (rows, cols) => {
        let container = document.getElementById('container');
        container.style.setProperty('--grid-rows', rows);
        container.style.setProperty('--grid-cols', cols);
        for (let i = 0; i < (rows * cols); i++) {
            let square = document.createElement('div');
            square.classList = 'square';
            square.setAttribute('id', `${i}`);
            container.appendChild(square);
        }
    }
    return {
        gameMsg,
        createBoard,
        playerMove
    }
})();
function getIndex (arr, num) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == parseInt(num)) {
            return i;
        }
    }
    return -1;
}
function game() {
    gameBoard.generate(ROWS, COLS)
    displayController.createBoard(ROWS, COLS);
    console.log(gameBoard.board);
    // choose random player to start
    let playerOne = false;
    let playerTwo = false;
    let gameover = false;
    if (Math.random() < 0.5) {
        playerOne = true;
        displayController.gameMsg("Player One Start")
    }
    else {
        playerTwo = true;
        displayController.gameMsg("Player Two Start")
    }
    // create a get index function that gets the index of the square id in the array
    let available = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener('click', () => {
                let index = parseInt(getIndex(available, square.id));
                if (index !== -1) {
                    if (playerOne) {
                        displayController.playerMove(square.id, "X");
                        gameBoard.move(square.id, "X");
                        playerOne = false;
                        playerTwo = true;
                        available.splice(index, 1);
                        if (gameBoard.checkBoard("X")) {
                            displayController.gameMsg("Player One Wins");
                            return;
                        }
                        displayController.gameMsg("Player Two");
                    }
                    else {
                        displayController.playerMove(square.id, "O");
                        gameBoard.move(square.id, "O");
                        playerOne = true;
                        playerTwo = false;
                        available.splice(index, 1);
                        if (gameBoard.checkBoard("O")) {
                            displayController.gameMsg("Player Two Wins");
                            return;
                        }
                        displayController.gameMsg("Player One")
                    }
                }
                if (available.length == 0) {
                    displayController.gameMsg("Gameover")
                }
            });
        });
}


game();