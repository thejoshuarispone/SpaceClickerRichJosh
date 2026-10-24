//Game Variables
let points = 0;
let pointsPerClick = 1;
let upgradeCost = 10;
let addEarnerCost = 100;
//HTML Elements 
function updateDisplay() {
    document.getElementById("points").textContent = points;
    document.getElementById("upgradeCost").textContent = upgradeCost;
}

//points per click
function earnPoints() {
    points = points += pointsPerClick;
    updateDisplay();
}
 
//Clicker Upgrade purchase
function buyClickerUpgrade() {
            if (points >= upgradeCost) {
                points -= upgradeCost;
                pointsPerClick++;
                upgradeCost = (upgradeCost * pointsPerClick);
                 alert("Upgrade purchased! You now earn "+pointsPerClick+ " points per click!");
                 updateDisplay();
            } else {
                alert("Not enough points to buy upgrade!");
            }}

function constantEarner1(){
    if (points >= addEarnerCost) {
        points -= addEarnerCost;
        updateDisplay();
    }
}
function resetGame() {
    points = 0;
    pointsPerClick = 1;
    upgradeCost = 10;
    upgradecounter = 0;
    updateDisplay();
}