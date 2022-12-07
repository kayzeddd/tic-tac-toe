const gameboard = (() => {
    const gameboardDiv = document.querySelector(".gameboardDiv");
    const x = "images/x.svg";
    const o = "images/circle.svg"
    const arr = [x, o, x, x, o, x, x, o, x];
    const obj = {arr,};
    const makeBoard = () => {
        for (let i= 1; i <= 9; i++){
           let square = document.createElement("div");
           square.classList.add("square");
           if (i == 2 || i == 5 || i == 8){square.classList.add("midV")};
           if (i == 4 || i == 5 || i == 6){square.classList.add("midH")}; 
           square.setAttribute("data-square", `${i}`);
           gameboardDiv.appendChild(square);
        }
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
    return {obj, makeBoard, fillBoard}
})()

gameboard.makeBoard()
gameboard.fillBoard()

const createPlayer = (name) => {
    let player = {
        name,
    }
    return player
}

const playerOne = createPlayer("Sam")

