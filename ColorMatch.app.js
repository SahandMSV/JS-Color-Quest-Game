// Generate Grid 5x5

const grid_5x5 = document.querySelector(".container_5x5");
for (let i = 0; i < 25; i++) {
    const newBox = document.createElement("div");
    newBox.setAttribute("class", `div div${i}`);
    grid_5x5.appendChild(newBox);
}

// Generate random numbers for divs

const allBoxes = document.querySelectorAll(".div");
allBoxes.forEach(box => {
    box.textContent = Math.floor(Math.random() * 5) + 1;
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
