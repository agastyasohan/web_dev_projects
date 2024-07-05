console.log("hello");

/*
** The Gameboard represents the state of the board
** Each equare holds a Cell
** and we expose a setMarker method to be able to add Cells to squares
*/


//cell factory function
const cell = () => {
    let marker = "";

    const getMarker = () => marker;

    const setMarker = (newMarker) => {
        if(marker === ""){ //only set the marker if the marker is empty
            marker = newMarker;
            return true;
        }

        return false;
    }

    return { getMarker, setMarker};
}

//Game Board Module
const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    let board = [];

    const createBoard = () => {
        board = [];

        for(let i=0;i<rows;i++){
            board[i]=[];
            for(let j=0;j<columns;j++){
                board[i].push(cell());
            }
        }
    };

    const getBoard = () => board;

    const updateBoard = (row,column,marker) => {
        if((row>=0 && row<rows) && (column>=0 && column<columns)){
            return board[row][column].setMarker(marker);
        }
    };

    const resetBoard = () => createBoard();

    //Initialize the board
    createBoard();

    return {getBoard,updateBoard,resetBoard};
})();

//plyer factory function
const player = (name,marker) => {
    return {name,marker}
}

//game control module
const gameController = (() => {
    // Implement game start logic
    // Create turn-taking mechanism
    // Develop win and tie checking algorithms

    //private Variables
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    //public methods
    const start = (player1Name, player2Name) => {

        players = [ player(player1Name,'X'), player(player2Name, 'O') ];
        currentPlayerIndex = 0;
        gameOver = false;
        gameBoard.resetBoard();

    };

    const getCurrentPlayer = () => {
        return players[currentPlayerIndex];
    };

    const switchPlayer = () => {  //Toggles between players
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    const playTurn = (row,col,)=>{
        if(gameOver){
            return false;
        }

        const updateMarker = ()=>{ //this will update marker
            return gameBoard.updateBoard(row,col, getCurrentPlayer().marker);
        }

        if(updateMarker()){
            if(checkWinner(row,col)){
                gameOver = true;
                return "win"
            }
            else if(checkTie()){
                gameOver = true;
                return "tie";
            }else{
                switchPlayer();
                return true;
            }
        }

        return false;
    }

    const checkWinner = (row,col)=>{
        const winPatterns = [
            [[0,0], [0,1], [0,2]], // top row
            [[1,0], [1,1], [1,2]], // middle row
            [[2,0], [2,1], [2,2]], // bottom row
            [[0,0], [1,0], [2,0]], // left column
            [[0,1], [1,1], [2,1]], // middle column
            [[0,2], [1,2], [2,2]], // right column
            [[0,0], [1,1], [2,2]], // diagonal from top-left
            [[0,2], [1,1], [2,0]]  // diagonal from top-right
        ];

        return winPatterns.filter( (pattern) => {
            return pattern.some( ([r,c]) => (r === row && c === col));
        }).some( (pattern) => {
            return pattern.every(([r,c]) => {
               return gameBoard.getBoard()[r][c].getMarker() === getCurrentPlayer().marker
            });
        });

    };

    const checkTie = () => {
        return gameBoard.getBoard().every(row => row.every(col => col.getMarker()!==""));
    }

    return {start, getCurrentPlayer, playTurn};

})();

//displayController Module
const displayController = (() => {
    const startBtn = document.querySelector('#startBtn');
    const player1Input = document.querySelector('#playerOneName');
    const player2Input = document.querySelector('#playerTwoName');
    const messageElement = document.querySelector('#message');

    const boardElement = document.querySelector('#gameBoard');
    boardElement.style.gridTemplateColumns = 'repeat(3, 1fr)'
    boardElement.style.gridTemplateRows = 'repeat(3, 1fr)'
        
    // Update the game board display
    const updateBoard = ()=> {
        boardElement.innerHTML = "";

        gameBoard.getBoard().forEach((row,i) => {
            row.forEach((col,j) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.textContent = col.getMarker();
                cellElement.addEventListener('click', ()=> makeMove(i,j));
                boardElement.insertAdjacentElement('beforeend', cellElement)
            });
        });
    };

        
    // Handle a player's move
    const makeMove = (row,col)=> {
        const result = gameController.playTurn(row,col);
        if(result == "win"){
            messageElement.textContent = `${gameController.getCurrentPlayer().name} wins!`;                                           
        }else if(result == "tie"){
            messageElement.textContent = `It's a Tie!`;                                           
        }else if(result == true){
            messageElement.textContent = `${gameController.getCurrentPlayer().name}'s turn`;
        }
        updateBoard();
    };

        
    // Start button event listener
    startBtn.addEventListener('click', ()=>{
        const player1Name = player1Input.value || 'Player 1';
        const player2Name = player2Input.value || 'Player 2';
        gameController.start(player1Name,player2Name);
        updateBoard();
        messageElement.textContent = `${gameController.getCurrentPlayer().name}'s turn`;
    });

    return { updateBoard };

})();

// Initial setup
displayController.updateBoard();
