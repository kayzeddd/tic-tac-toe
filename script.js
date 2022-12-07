const gameboard = (() => {
    const gameboardGrid = document.querySelector(".gameboardGrid");
    const newGameBtn = document.querySelector(".newGameBtn");
    const x = "images/x.svg";
    const o = "images/circle.svg"
    const arr = [x, o, x, x, o, x, x, o, x];
    const obj = {arr,};
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
        console.log(e.target);
        let targetSquare = e.target;
        let imgTag = document.createElement("img");
        if (turn == true) {
            imgTag.setAttribute("src",x);
            turn = false
        }
        else if (turn == false){
            imgTag.setAttribute("src", o);
            turn = true;
        }
        targetSquare.appendChild(imgTag);
    }
    const fillBoard = () => {
        for (let i=1; i <= arr.length; i++){
            let square = document.querySelector(`div[data-square="${i}"]`);
            let imgTag = document.createElement("img");
            (arr[i - 1] == x) ? imgTag.setAttribute("src", x) 
                              : imgTag.setAttribute("src", o);
            square.appendChild(imgTag)
        }
    }
    const newGame = () => {
        while (gameboardGrid.childNodes.length > 0){
            gameboardGrid.removeChild(gameboardGrid.lastChild)
        }
        makeBoard();
    }
    newGameBtn.addEventListener("click", newGame);
    makeBoard()
    return {gameboardGrid}
})()


const createPlayer = (name) => {
    let player = {
        name,
    }
    return player
}

const playerOne = createPlayer("Sam")

