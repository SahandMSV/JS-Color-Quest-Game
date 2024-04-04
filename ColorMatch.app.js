// Generate Grid 5x5

const grid_5x5 = document.querySelector(".container_5x5");
for (let i = 0; i < 25; i++) {
    const newBox = document.createElement("div");
    newBox.setAttribute("class", `div div${i}`);
    grid_5x5.appendChild(newBox);
}

// Generate random numbers for divs

const divNumbers_5x5 = [];
const divColors_5x5 = [];
const allBoxes = document.querySelectorAll(".div");

function updateNumberArray() {
    document.querySelectorAll(".div").forEach((div, index) => {
        divNumbers_5x5[index] = div.innerHTML;
    });
}

function AddToColorArray(color, index) {
    if (divColors_5x5.length < index) { divColors_5x5.length = index; }
    
    if (color === primaryColors[0]) {
        divColors_5x5[ index ] = "1";
    } else if (color === primaryColors[1]) {
        divColors_5x5[ index ] = "2";
    } else if (color === primaryColors[2]) {
        divColors_5x5[ index ] = "3";
    } else if (color === primaryColors[3]) {
        divColors_5x5[ index ] = "4";
    } else if (color === primaryColors[4]) {
        divColors_5x5[ index ] = "5";
    }
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

document.querySelectorAll(".colorBtns").forEach((colorBtn, index) => {
    colorBtn.addEventListener("click", () => {
        resetAllColorBtns();
        colorBtns[index].isClicked = true;
        currentColor = colorBtns[index].color;
        colorBtns[index].tick.classList.toggle("transformed");
    });
});