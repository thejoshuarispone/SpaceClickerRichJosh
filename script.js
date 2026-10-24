//Game Variables
let points = 0;
let pointsPerClick = 1;
let pointsPerSecond = 0;
let upgradeCost = 10;
let upgradeCost2 = 100;
let addEarnerCost = 100;
//HTML Elements 
function updateDisplay() {
    document.getElementById("points").textContent = points;
    document.getElementById("upgradeCost").textContent = upgradeCost;
    document.getElementById("upgradeCost2").textContent = upgradeCost2;
    document.getElementById("perSecond").textContent = pointsPerSecond;
}
setInterval(function() {
    points += pointsPerSecond;
    updateDisplay();
}, 1000);

//points per click
function earnPoints() {
    points = points += pointsPerClick;
    updateDisplay();
}
 
//Clicker Upgrade purchase
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
function buyUpgrade2(){
     if (points >= upgradeCost2) {
        points -= upgradeCost2;
        pointsPerSecond++;
        upgradeCost2 = upgradeCost2 * 2;
        updateDisplay();
        showToast("Upgrade purchased! +" + pointsPerSecond + " per second", "success");
    } else {
        showToast("Not enough points!", "error");
    }
function resetGame() {
    points = 0;
    pointsPerClick = 1;
    upgradeCost = 10;
    upgradeCost2 = 100;
    pointsPerSecond= = 0
    upgradecounter = 0;
    updateDisplay();
}

//Toast
let toastTimer;

function showToast(message, type) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "toast " + type + " show";

    clearTimeout(toastTimer); //restarts if click p much
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 1000);  // 1 second
}


}
