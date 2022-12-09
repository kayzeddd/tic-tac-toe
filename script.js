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
    const newGameBtn = document.querySelector(".newGameBtn");
    const mainTag = document.querySelector("main")
    const playerInputs = document.querySelector(".playerInputs");
    const playerNames = document.querySelector(".playerNameContainer");
    const player1Name = document.querySelector(".player1Name");
    const player2Name = document.querySelector(".player2Name");
    const btnContainer = document.querySelector(".btnContainer");
    const popup = document.querySelector(".popup");
    const newGameBtn2 = document.querySelector(".newGameBtn2");
    const player1score = document.querySelector(".player1Score");
    const player2score = document.querySelector(".player2Score");
    const popupText = document.querySelector(".popupText");

    let boardArr = [1,2,3,4,5,6,7,8,9];
    let turn = true;
    let count = 0;
    let player1;
    let player2;

    newGameBtn.addEventListener("click", _newGame);
    newGameBtn.addEventListener("click", createPlayers, {once: true})
    newGameBtn2.addEventListener("click", _newGame)
    
    function createPlayers(){
        player1 = createPlayer(document.querySelector("#playerOne").value);
        if ()
        player2 = createPlayer(document.querySelector("#playerTwo").value);
        player1Name.textContent = player1.name;
        player2Name.textContent = player2.name;
        mainTag.removeChild(btnContainer)
        playerInputs.style = "display:none";
        playerNames.style = "display:flex";
    }

    function _makeBoard() {
        for (let i= 1; i <= 9; i++){
           let square = document.createElement("div");
           square.classList.add("square");
           if (i == 2 || i == 5 || i == 8){square.classList.add("midV")};
           if (i == 4 || i == 5 || i == 6){square.classList.add("midH")}; 
           square.setAttribute("data-square", `${i}`);
           square.addEventListener("click", (e) => _placeMark(e), {once: true})
           gameboardGrid.removeEventListener("click", _stopProp, true)
           gameboardGrid.appendChild(square);
           _checkTurn();
        }
    }

    const _placeMark = (e) => {
        const x = "images/x.svg";
        const o = "images/circle.svg";
        let targetSquare = e.target;
        let targetDataSquare = e.target.getAttribute("data-square");
        let imgTag = document.createElement("img");
        if (turn == true) {
            imgTag.setAttribute("src", x);
            boardArr[targetDataSquare - 1] = "x";
            turn = false
        }
        else if (turn == false){
            imgTag.setAttribute("src", o);
            boardArr[targetDataSquare - 1] = "o";
            turn = true;
        }
        targetSquare.appendChild(imgTag);
        count++;
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
        if (count == 9){
            if(arr.every(x => x !== +x)){
            gameboardGrid.addEventListener("click", _stopProp, true);
            popupText.textContent = "TIE!";
            popup.style = "display: flex";
            }
        }
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
                gameboardGrid.addEventListener("click", _stopProp, true)
            }
        }
    }

    function _newGame() {
        while (gameboardGrid.hasChildNodes()){
            gameboardGrid.removeChild(gameboardGrid.lastChild)
        }
        boardArr = [1,2,3,4,5,6,7,8,9];
        count = 0;
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
        name: playerAI,
        wins: 0,
        addWin(){
            this.wins += 1
        }
    }
    const playAI = () => {
        ()
    }

    return Object.assign({},playerAI)
}