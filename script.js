// Game Variables
let points = 0;
let pointsPerClick = 1;
let pointsPerSecond = 0;
let toastTimer;
let hp = 100;
let ox = 100;

// Space Prog
const suitCost = 5000;
const ascentCost = 10000;
let hasSuit = false;
let planetLevel = 0;
const planets = [
    { name: "Earth", img: "assets/earth.png" },
    { name: "Moon", img: "assets/moon.png" }
];

// Buildings 
const buildings = {
    chomp: { name: "Chomp Upgrade", baseCost: 10, click: 1, rate: 0, count: 0, costId: "upgradeCost", lvlId: "level1" },
    football: { name: "Hungry Football Team", baseCost: 100, click: 0, rate: 1, count: 0, costId: "upgradeCost2", lvlId: "level2" },
    union: { name: "Union Rush Hour", baseCost: 1000, click: 0, rate: 10, count: 0, costId: "upgradeCost3", lvlId: "level3" }
};

function getCost(b) {
    return Math.ceil(b.baseCost * Math.pow(1.15, b.count));   // +15% per purchase
}

function recalcStats() {
    pointsPerClick = 1;      // base click value
    pointsPerSecond = 0;
    for (const key in buildings) {
        const b = buildings[key];
        pointsPerClick += b.count * b.click;
        pointsPerSecond += b.count * b.rate;
    }
}

function buyBuilding(key) {
    const b = buildings[key];
    const cost = getCost(b);
    if (points >= cost) {
        points -= cost;
        b.count++;
        recalcStats();
        updateDisplay();
        const gain = b.click ? "+" + b.click + " per click" : "+" + b.rate + " per second";
        showToast(b.name + " purchased! " + gain, "success");
    } else {
        showToast("Not enough points!", "error");
    }
}

// Scene (planet and tiger images)
function setScene() {
    const planetImg = document.getElementById("planetImg");
    planetImg.src = planets[planetLevel].img;
    planetImg.alt = planets[planetLevel].name;
    document.getElementById("tigerImg").src = hasSuit ? "assets/space-helmet.png" : "assets/tiger.png";
}

// Suit purchase
function buySuit() {
    if (hasSuit) {
        showToast("You already have a space suit!", "error");
        return;
    }
    if (points >= suitCost) {
        points -= suitCost;
        hasSuit = true;
        setScene();
        updateDisplay();
        showToast("Space Suit purchased! You can now survive in space.", "success");
    } else {
        showToast("Not enough points for Space Suit!", "error");
    }
}

// Change the planet
function planetChange() {
    if (planetLevel >= planets.length - 1) {
        showToast("No more planets available!", "error");
        return;
    }
    if (points < ascentCost) {
        showToast("Not enough points for Ascent!", "error");
        return;
    }
    if (!hasSuit) {
        resetGame("You died without a space suit! Game reset.", "error", 2500);
        return;
    }
    points -= ascentCost;
    planetLevel++;
    setScene();
    updateDisplay();
    showToast("Ascent successful! Welcome to " + planets[planetLevel].name + ".", "success", 2000);
}

function updateDisplay() {
    document.getElementById("points").textContent = points;
    document.getElementById("perSecond").textContent = pointsPerSecond;
    document.getElementById("health").value = hp;
    document.getElementById("oxygen").value = ox;

    for (const key in buildings) {
        const b = buildings[key];
        document.getElementById(b.costId).textContent = getCost(b);
        document.getElementById(b.lvlId).textContent = b.count;
    }
}

setInterval(function () {
    points += pointsPerSecond;
    updateDisplay();
}, 1000);

// Toast
function showToast(message, type) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast " + type + " show";

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 1000);
}

// Points per click
function earnPoints(e) {
    points += pointsPerClick;
    updateDisplay();
    spawnPop(e.clientX, e.clientY, "+" + pointsPerClick);
}

function spawnPop(x, y, text) {
    const pop = document.createElement("span");
    pop.className = "pop";
    pop.textContent = text;
    pop.style.left = (x + (Math.random() * 30 - 15)) + "px";
    pop.style.top = (y - 10) + "px";
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 800);
}

// Placeholders so unfinished buttons don't throw errors
function constantEarner1() { showToast("Coming soon!", "error"); }

function resetGame() {
    points = 0;
    hp = 100;
    ox = 100;
    for (const key in buildings) {
        buildings[key].count = 0;
    }
    recalcStats();
    updateDisplay();
    showToast("Game reset!", "success");
}

updateDisplay();