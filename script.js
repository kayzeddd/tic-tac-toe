const Players = () => {
    const player1 = createPlayer(document.querySelector("#playerOne").value);
    const player2 = createPlayer(document.querySelector("#playerTwo").value);
    function createPlayer(name) {
        let player = {
            name,
            wins: 0,
            addWin(){
                this.wins += 1
            }
        }
        return player 
    }
   return {player1, player2}
}

const gameboard = (() => {
    const gameboardGrid = document.querySelector(".gameboardGrid");
    const newGameBtn = document.querySelector(".newGameBtn");
    newGameBtn.addEventListener("click", _newGame);
    newGameBtn.addEventListener("click", createPlayers, {once: true})

    let boardArr = [1,2,3,4,5,6,7,8,9];
    let turn = true;
    let players;

    function createPlayers(){
        const playerInputs = document.querySelector(".playerInputs");
        const playerNames = document.querySelector(".playerNameContainer");
        const player1Name = document.querySelector(".player1Name");
        const player2Name = document.querySelector(".player2Name");

        players = Players();

        player1Name.textContent = players.player1.name;
        player2Name.textContent = players.player2.name;

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
           gameboardGrid.appendChild(square);
        }
    }

    const _placeMark = (e) => {
        const x = "images/x.svg";
        const o = "images/circle.svg"
        let targetSquare = e.target;
        let targetDataSquare = e.target.getAttribute("data-square");
        let imgTag = document.createElement("img");
        if (turn == true) {
            imgTag.setAttribute("src",x);
            boardArr[targetDataSquare - 1] = "x";
            turn = false
        }
        else if (turn == false){
            imgTag.setAttribute("src", o);
            boardArr[targetDataSquare - 1] = "o";
            turn = true;
        }
        targetSquare.appendChild(imgTag);
        _checkWin();
    }

    function _newGame() {
        while (gameboardGrid.hasChildNodes()){
            gameboardGrid.removeChild(gameboardGrid.lastChild)
        }
        boardArr = [1,2,3,4,5,6,7,8,9];
        turn = true;
        _makeBoard();
    }

    function _checkWin(){
        let arr = boardArr;
        if (arr.every(x => x !== +x)){
            console.log("TIE!")
            gameboardGrid.addEventListener("click", (e) => e.stopPropagation(), true)
            return
        }
        const combos = [arr.slice(0,3),arr.slice(3,6),arr.slice(6,9),
                        [0,3,6].map(x => arr[x]),[1,4,7].map(x => arr[x]),
                        [2,5,8].map(x => arr[x]),[0,4,8].map(x => arr[x]),
                        [2,4,6].map(x => arr[x])];
        for (let i = 0; i < combos.length; i++ ){
            if (combos[i].every(x => x == combos[i][0])){
                if(combos[i][0] == "x"){
                    players.player1.addWin();
                    console.log(players)
                }
                else {
                    players.player2.addWin()
                    console.log(players)
                }
                gameboardGrid.addEventListener("click", (e) => e.stopPropagation(), true)
            }
        }
    }

    return 
})()

