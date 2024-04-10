// Generate Grids

const grid_5x5 = document.querySelector(".container_5x5");
for (let i = 0; i < 5 * 5; i++) {
    const newBox = document.createElement("div");
    newBox.setAttribute("class", "allDivs");
    grid_5x5.appendChild(newBox);
}

const grid_6x6 = document.querySelector(".container_6x6");
for (let i = 0; i < 6 * 6; i++) {
    const newBox = document.createElement("div");
    newBox.setAttribute("class", "allDivs");
    grid_6x6.appendChild(newBox);
}

const grid_7x7 = document.querySelector(".container_7x7");
for (let i = 0; i < 7 * 7; i++) {
    const newBox = document.createElement("div");
    newBox.setAttribute("class", "allDivs");
    grid_7x7.appendChild(newBox);
}

// Generate random numbers for divs

const divNumbers_5x5 = [];
const divColors_5x5 = [];
const allBoxes = document.querySelectorAll(".allDivs");

function updateNumberArray() {
    allBoxes.forEach((div, index) => {
        divNumbers_5x5[index] = div.innerHTML;
    });
}

function AddToColorArray(color, index) {
    if (divColors_5x5.length < index) { divColors_5x5.length = index; }
    
    switch (color) {
        case primaryColors[0]:
            divColors_5x5[index] = "1";
            break;
        case primaryColors[1]:
            divColors_5x5[index] = "2";
            break;
        case primaryColors[2]:
            divColors_5x5[index] = "3";
            break;
        case primaryColors[3]:
            divColors_5x5[index] = "4";
            break;
        case primaryColors[4]:
            divColors_5x5[index] = "5";
            break;
    }
    
    checkForWin();
}

allBoxes.forEach((box, index) => {
    box.textContent = Math.floor(Math.random() * 5) + 1;
    updateNumberArray();
    box.addEventListener("click", e => {
        if (currentColor === undefined) {
            alert("Select a color first!");
        } else {
            e.target.style.background = currentColor;
            AddToColorArray(currentColor, index);
        }
    });
});

// Color Palette

const primaryColors = [
    "rgb(232, 72, 85)", // Red
    "rgb(112, 146, 85)", // Green
    "rgb(126, 189, 195)", // Blue
    "rgb(255, 188, 66)", // Yellow
    "rgb(187, 168, 231)", // Purple
];

const colorPalette = document.querySelector(".colorPalette");
for (let i = 0; i < 5; i++) {
    const newBox = document.createElement("div");
    newBox.setAttribute("class", `colorBtns colorBtn${i + 1}`);
    newBox.innerHTML = i + 1;
    newBox.style.backgroundColor = primaryColors[i];
    colorPalette.appendChild(newBox);
}

// ColorBtn Objects

const colorBtns = [];
let currentColor;

for (let i = 1; i <= 5; i++) {
    const newColorBtn = {
        button: document.querySelector(`.colorBtn${i}`),
        tick: document.querySelector(`.tickIcon${i}`),
        color: primaryColors[i - 1],
        isClicked: false,
    };
    colorBtns.push(newColorBtn);
}

function resetAllColorBtns() {
    colorBtns.forEach(btn => {
        btn.isClicked = false;
        btn.tick.classList.remove("transformed");
    });
}

// Keyboard Shortcuts

document.addEventListener("keydown", event => {
    
    if (event.key >= "1" && event.key <= "5") {
        const index = parseInt(event.key) - 1;
        
        resetAllColorBtns();
        
        if (colorBtns[index]) {
            colorBtns[index].isClicked = true;
            colorBtns[index].tick.classList.toggle("transformed");
            currentColor = colorBtns[index].color;
        }
    }
});

document.querySelectorAll(".colorBtns").forEach((colorBtn, index) => {
    colorBtn.addEventListener("click", () => {
        
        resetAllColorBtns();
        
        colorBtns[index].isClicked = true;
        currentColor = colorBtns[index].color;
        colorBtns[index].tick.classList.toggle("transformed");
    });
});

// Grid Setting

const gridBtns = document.querySelectorAll(".gridBtns");

const gridBtn_5x5 = document.querySelector(".gridBtn_5x5");
const gridBtn_6x6 = document.querySelector(".gridBtn_6x6");
const gridBtn_7x7 = document.querySelector(".gridBtn_7x7");

let isGridBtn1Active = true;
let isGridBtn2Active = false;
let isGridBtn3Active = false;

function toggleGridSelection(gridBtn) {
    isGridBtn1Active = (gridBtn === gridBtn_5x5);
    isGridBtn2Active = (gridBtn === gridBtn_6x6);
    isGridBtn3Active = (gridBtn === gridBtn_7x7);
}

function resetGridBtnsStyle() {
    gridBtns.forEach(gridBtn => {
        gridBtn.style.backgroundColor = "rgb(210, 210, 205)";
    });
}


function showSelectedGrid(gridBtn) {
    const grids = [grid_5x5, grid_6x6, grid_7x7];
    const transformValues = ['465px', '560px', '655px'];
    
    grids.forEach((grid, index) => {
        if (gridBtn !== gridBtns[index]) {
            grid.style.zIndex = -2;
            grid.style.opacity = 0;
            grid.style.pointerEvents = "none";
        } else {
            grid.style.zIndex = 2;
            grid.style.opacity = 1;
            grid.style.pointerEvents = "auto";
            document.documentElement.style.setProperty('--grid-transform-value', transformValues[index]);
        }
    });
}


gridBtns.forEach(gridBtn => {
    gridBtn.addEventListener("click", () => {
        resetGridBtnsStyle();
        toggleGridSelection(gridBtn);
        showSelectedGrid(gridBtn);
        console.log(isGridBtn1Active, isGridBtn2Active, isGridBtn3Active);
        gridBtn.style.backgroundColor = "rgb(185, 185, 185)";
        allBoxes.forEach(box => {
            box.style.backgroundColor = "rgb(200, 200, 195)";
        })
    });
});

// Winning Sequence

let won = false;
function checkForWin() {
    if (divColors_5x5.length === 25 && !(divColors_5x5.includes(undefined))) {
        if (divNumbers_5x5.toString() !== divColors_5x5.toString()) {
            won = false;
            stopWinningSequence();
            document.body.style.backgroundColor = "rgb(245, 184, 184)";
        }
        else if (divNumbers_5x5.toString() === divColors_5x5.toString()) {
            won = true;
            startWinningSequence();
            document.body.style.backgroundColor = "rgb(202, 240, 177)";
        }
    }
}

const randomColors = [
    "rgb(255, 165, 0)",
    "rgb(255, 255, 102)",
    "rgb(255, 128, 171)",
    "rgb(255, 192, 203)",
    "rgb(102, 178, 255)",
    "rgb(102, 255, 102)",
    "rgb(255, 153, 204)",
    "rgb(255, 255, 153)",
    "rgb(204, 153, 255)",
    "rgb(255, 204, 102)",
    "rgb(255, 204, 153)",
    "rgb(255, 255, 153)",
    "rgb(102, 255, 178)",
    "rgb(102, 178, 255)",
    "rgb(102, 178, 255)",
    "rgb(255, 128, 171)",
];

let timeoutId;

function startWinningSequence() {
    timeoutId = setInterval(() => {
        grid_5x5.querySelectorAll("div").forEach(div => {
            const color = randomColors[Math.floor(Math.random() * randomColors.length)];
            div.style.backgroundColor = color;
        });
    }, 300);
}

function stopWinningSequence() {
    clearInterval(timeoutId);
        grid_5x5.querySelectorAll("div").forEach((div, index) => {
            div.style.backgroundColor = primaryColors[divColors_5x5[index] - 1]
        });
}