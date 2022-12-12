const createPlayer = (name) => {
    let player = {
        name,
        wins: 0,
        addWin(){
            this.wins += 1
        }
    }
    return player 
}



const gameboard = (() => {
    const gameboardGrid = document.querySelector(".gameboardGrid");
    const mainTag = document.querySelector("main")
    const playerInputs = document.querySelector(".playerInputs");
    const playerNames = document.querySelector(".playerNameContainer");
    const player1Name = document.querySelector(".player1Name");
    const player2Name = document.querySelector(".player2Name");
    const btnContainer = document.querySelector(".btnContainer");
    const newGameBtn = document.querySelector(".newGameBtn");
    const vsAIbtn = document.querySelector(".vsAIbtn");
    const popup = document.querySelector(".popup");
    const newGameBtn2 = document.querySelector(".newGameBtn2");
    const player1score = document.querySelector(".player1Score");
    const player2score = document.querySelector(".player2Score");
    const popupText = document.querySelector(".popupText");
    
    const x = "images/x.svg";
    const o = "images/circle.svg";

    let boardArr = [0,1,2,3,4,5,6,7,8]; 
    let turn = true;
    let turnCount = 0;
    let player1;
    let player2;
    let vsAI = false;
    let gameOver = false;

    newGameBtn.addEventListener("click", _newGame);
    newGameBtn.addEventListener("click", () => PvP = true);
    newGameBtn.addEventListener("click", createPlayers, {once: true});
    vsAIbtn.addEventListener("click", () => vsAI = true);
    vsAIbtn.addEventListener("click", _newGame);
    vsAIbtn.addEventListener("click", createPlayers, {once: true});
    newGameBtn2.addEventListener("click", _newGame);
    
    function createPlayers(){
        player1 = createPlayer(document.querySelector("#playerOne").value);
        if (vsAI == true){
            player2 = createAI()
        }
        else {
            player2 = createPlayer(document.querySelector("#playerTwo").value);
        }
        player1Name.textContent = player1.name;
        player2Name.textContent = player2.name;
        mainTag.removeChild(btnContainer)
        playerInputs.style = "display:none";
        playerNames.style = "display:flex";
    }

    function _makeBoard() {
        for (let i= 0; i < 9; i++){
           let square = document.createElement("div");
           square.classList.add("square");
           if (i == 1 || i == 4 || i == 7){square.classList.add("midV")};
           if (i == 3 || i == 4 || i == 5){square.classList.add("midH")}; 
           square.setAttribute("data-square", `${i}`);
           square.addEventListener("click", (e) => _placeMark(e), {once: true})
           gameboardGrid.removeEventListener("click", _stopProp, true)
           gameboardGrid.appendChild(square);
           _checkTurn();
        }
        if (vsAI == true && turn == false){
            AIplay();
        }
    }

    const _placeMark = (e) => {
        let imgTag = document.createElement("img");
        if (turn == true) {
            imgTag.setAttribute("src", x);
            boardArr[+(e.target.getAttribute("data-square"))] = "x";
            turn = false
        }
        else if (turn == false && vsAI == false){
            imgTag.setAttribute("src", o);
            boardArr[+(e.target.getAttribute("data-square"))] = "o";
            turn = true;
        }
        e.target.appendChild(imgTag);
        turnCount++;
        _checkWin();
        _checkTurn();
        if (turn == false && vsAI == true && gameOver == false){
            AIplay()
        }
      }

    function AIplay(){
        const playIndex = () => {
            if (turnCount == 0){
                let moves = [0,2,6,8];
                return moves[Math.floor(Math.random() * moves.length)]
            }
            else {
                return player2.AImove(boardArr);
            }
        };
        let AIindex = playIndex();
        let AIsquare = document.querySelector(`div[data-square="${AIindex}"]`);
        let imgTag = document.createElement("img");
        imgTag.setAttribute("src", o);
        boardArr[AIindex] = "o";
        AIsquare.appendChild(imgTag);
        turn = true;
        turnCount++;
        _checkWin();
        _checkTurn();
    }

    function _checkTurn() {
        if (turn == true){
            player1Name.classList.add("turnBorder")
            player2Name.classList.remove("turnBorder")
           }
        if (turn == false){
            player1Name.classList.remove("turnBorder")
            player2Name.classList.add("turnBorder")
        }
    }

    function _checkWin(){
        const arr = boardArr;
        const combos = [arr.slice(0,3),arr.slice(3,6),arr.slice(6,9),
                        [0,3,6].map(x => arr[x]),[1,4,7].map(x => arr[x]),
                        [2,5,8].map(x => arr[x]),[0,4,8].map(x => arr[x]),
                        [2,4,6].map(x => arr[x])];
        for (let i = 0; i < combos.length; i++ ){
            if (combos[i].every(x => x == combos[i][0])){
                if(combos[i][0] == "x"){
                    player1.addWin();
                    popupText.textContent = `${player1.name} WINS!`
                    player1score.textContent = player1.wins;
                    turn = false;
                }
                else if (combos[i][0] == "o"){
                    player2.addWin()
                    popupText.textContent = `${player2.name} WINS!`
                    player2score.textContent = player2.wins;
                    turn = true;
                }
                popup.style = "display: flex";
                gameboardGrid.addEventListener("click", _stopProp, true);
                gameOver = true;
                return
            }
        }
        if (turnCount == 9){
            if(arr.every(x => x !== +x)){
            gameboardGrid.addEventListener("click", _stopProp, true);
            popupText.textContent = "TIE!";
            popup.style = "display: flex";
            gameOver = true;
            return
            }
        }
    }

    function _newGame() {
        while (gameboardGrid.hasChildNodes()){
            gameboardGrid.removeChild(gameboardGrid.lastChild)
        }
        boardArr = [0,1,2,3,4,5,6,7,8];
        turnCount = 0;
        gameOver = false;
        popup.style = "display: none"
        _makeBoard();
    }

    function _stopProp(e){
        e.stopPropagation();
    }

    return
})()


const createAI = () => {
    let playerAI = {
        name: "AI",
        wins: 0,
        addWin(){
            this.wins += 1
        }
    }
    const AImove = (gameArray) => {
        let boardArray = [...gameArray];
        const saveBoardArray = [...gameArray];
    
        function freeSquares(array){
            let arr = array;
            return arr.filter( x => {if(x !== "x" && x !== "o"){return true}})
        }
    
        function findMove(){
            let winMoves = [];
            let tieMoves = [];
            const freeSquares2 = (() => {
                return  boardArray.filter( x => {if(x !== "x" && x !== "o"){return true}})
            })();
            for (let i = 0; i < freeSquares2.length; i++){
                let testNode = freeSquares2[i];
                boardArray[testNode] = "o";
                //boardArray2[testNode] = "x";
                //console.log(boardArray)
                let moveValue = minimax(boardArray, freeSquares2.length - 1, false);
                if (moveValue > 0){
                winMoves.push(testNode)
                }
                else if (moveValue == 0){
                tieMoves.push(testNode)
                }
                boardArray = [...saveBoardArray];
            }
            if (winMoves.length > 0){
                let pick = winMoves[Math.floor(Math.random() * winMoves.length)]
                return pick
            }
            else {
                let pick = tieMoves[Math.floor(Math.random() * tieMoves.length)]
                return pick
            }
        }
    
        function minimax(arr, depth, maximizingPlayer){
            if (depth == 0 || checkWin(arr).over == true){
                //console.log(arr);
                let winner = checkWin(arr).winner;
                //console.log(winner)
                if(winner == "o"){
                    return 1
                }        
                if(winner == "x"){
                    return -1
                }
                if(winner == "tie"){
                    return 0
                }
            }
            if (maximizingPlayer){
                let value = -Infinity;
                const saveArr = [...arr];
                freeSquares(saveArr).forEach((square) => {
                    let newArr = createNewArr(saveArr, square, "o");
                    value = Math.max(value, minimax(newArr, (depth - 1), false));
                })
                //console.log(value)
                return value
            }
            else {
                let value = +Infinity;
                const saveArr = [...arr]
                freeSquares(saveArr).forEach((square) => {
                    const newArr = createNewArr(saveArr, square, "x");
                    value = Math.min(value, minimax(newArr, (depth - 1), true));
                })
                //console.log(value)
                return value
            }
        }
    
        function createNewArr(arr, index, mark){
            let newArr = [];
            for (let i = 0; i < arr.length; i++){
                if (i == index){
                    newArr.push(mark)
                }
                else {
                    newArr.push(arr[i])
                }
            }
            return newArr
        }
    
        function checkWin(arr){
            const combos = [arr.slice(0,3),arr.slice(3,6),arr.slice(6,9),
                            [0,3,6].map(x => arr[x]),[1,4,7].map(x => arr[x]),
                            [2,5,8].map(x => arr[x]),[0,4,8].map(x => arr[x]),
                            [2,4,6].map(x => arr[x])];
            for (let i = 0; i < combos.length; i++ ){
                if (combos[i].every(x => x == combos[i][0])){
                    if(combos[i][0] == "x"){
                        return {over:true, winner:"x"}
                    }
                    else if (combos[i][0] == "o"){
                        return {over:true, winner:"o"}
                    }
                }
            }
            if(arr.every(x => x !== +x)){
                return {over:true, winner:"tie"}
            }
            return false
        }
    
        return findMove();
    };
    

    return Object.assign({},playerAI, {AImove})
}