const container = document.querySelector(".container_5x5");
for (let i = 0; i < 25; i++) {
    const newBox = document.createElement("div");
    newBox.setAttribute("class", `div div${i}`);
    container.appendChild(newBox);
}

const allBoxes = document.querySelectorAll(".div");
allBoxes.forEach(box => {
    box.textContent = Math.floor(Math.random() * 5) + 1;
});