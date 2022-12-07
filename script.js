const gameboard = (() => {
    const gameboardGrid = document.querySelector(".gameboardGrid");
    const newGameBtn = document.querySelector(".newGameBtn");
    const x = "images/x.svg";
    const o = "images/circle.svg"
    let boardArr = [1,2,3,4,5,6,7,8,9];
    let boardObj = {boardArr};
    let turn = true;
    const makeBoard = () => {
        for (let i= 1; i <= 9; i++){
           let square = document.createElement("div");
           square.classList.add("square");
           if (i == 2 || i == 5 || i == 8){square.classList.add("midV")};
           if (i == 4 || i == 5 || i == 6){square.classList.add("midH")}; 
           square.setAttribute("data-square", `${i}`);
           square.addEventListener("click", (e) => placeMark(e), {once: true})
           gameboardGrid.appendChild(square);
        }
    }
    const placeMark = (e) => {
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
        checkWin();
    }
    const newGame = () => {
        while (gameboardGrid.childNodes.length > 0){
            gameboardGrid.removeChild(gameboardGrid.lastChild)
        }
        boardArr = [1,2,3,4,5,6,7,8,9];
        makeBoard();
    }
    function checkWin(){
        let arr = boardArr;
        const combos = [arr.slice(0,3),arr.slice(3,6),arr.slice(6,9),
                        [0,3,6].map(x => arr[x]),[1,4,7].map(x => arr[x]),
                        [2,5,8].map(x => arr[x]),[0,4,8].map(x => arr[x]),
                        [2,4,6].map(x => arr[x])];
        for (let i = 0; i < combos.length; i++ ){
            if (combos[i].every(x => x == combos[i][0])){
                console.log(`win = ${combos[i][0]}`)
            }
        }
    }
    newGameBtn.addEventListener("click", newGame);
    makeBoard()
    return {boardArr}
})()


const createPlayer = (name) => {
    let player = {
        name,
    }
    return player
}

const playerOne = createPlayer("Sam")
