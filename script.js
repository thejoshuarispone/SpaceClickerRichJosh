// Game Variables
let points = 0;
let pointsPerClick = 1;
let pointsPerSecond = 0;
let upgradeCost = 10;
let upgradeCost2 = 100;
let toastTimer;
let hp = health;
let ox = 100;

function updateDisplay() {
    document.getElementById("points").textContent = points;
    document.getElementById("upgradeCost").textContent = upgradeCost;
    document.getElementById("upgradeCost2").textContent = upgradeCost2;
    document.getElementById("perSecond").textContent = pointsPerSecond;
    document.getElementById("health").textContent = hp;
    document.getElementById("oxygen").textContent = oz;
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
    pop.addEventListener("animationed", () => pop.remove());
}

// Chomp upgrade
function buyUpgrade1() {
    if (points >= upgradeCost) {
        points -= upgradeCost;
        pointsPerClick++;
        upgradeCost = upgradeCost * pointsPerClick;
        updateDisplay();
        showToast("Upgrade purchased! +" + pointsPerClick + " per click", "success");
    } else {
        showToast("Not enough points!", "error");
    }
}

// Hungry Football Team
function buyUpgrade2() {
    if (points >= upgradeCost2) {
        points -= upgradeCost2;
        pointsPerSecond++;
        upgradeCost2 = upgradeCost2 * 2;
        updateDisplay();
        showToast("Upgrade purchased! +" + pointsPerSecond + " per second", "success");
    } else {
        showToast("Not enough points!", "error");
    }
}

// Placeholders so the unfinished buttons don't throw errors
function constantEarner1() { showToast("Coming soon!", "error"); }
function planetChange()    { showToast("Coming soon!", "error"); }

function resetGame() {
    points = 0;
    pointsPerClick = 1;
    pointsPerSecond = 0;
    upgradeCost = 10;
    upgradeCost2 = 100;
    updateDisplay();
    showToast("Game reset!", "success");
}

updateDisplay();