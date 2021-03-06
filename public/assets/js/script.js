

//! HTML Screens
let missionCardEl = document.getElementById("mission-card") //card that displays missions
let paintWheelEl = document.getElementById("paint-stroke") //paint stroke mask that holds the wheel inside

//! vars
let grabbedWeights = false;
let sessionWeights;

function init() {
    createEventListeners();
}

function createEventListeners() {
    //todo sound design for completions
    document.getElementById("spin-wheel").addEventListener("click", spinWheel)

    document.getElementById("complete").addEventListener("click", () => {
        missionCardEl.style.display = "none";
    })

    document.getElementById("skip").addEventListener("click", spinWheel)
}

function spinWheel() {
    // missionCardEl.style.display = "none";
    missionCardEl.style.display = "block"; //!will need to wait in the future for the wheel to spin
    if (!grabbedWeights) {
        sessionWeights = getCategoryAmounts();
        grabbedWeights = true;
    }
    generateRandomMission();
}

function generateRandomMission() {
    if(!(sessionWeights === undefined)) {
        let categoryIndex = Math.floor(Math.random() * (sessionWeights[0][1] + 1));
        for (let index = 1; index < sessionWeights.length; index++) { //start at 1 to skip the total weight index
            if (categoryIndex < sessionWeights[index][2]){
                categoryIndex = index;
                break;
            }
        }

        let category = sessionWeights[categoryIndex][0]
        generateCardHtml(category, getMission(category, Math.floor(Math.random() * sessionWeights[categoryIndex][1])));
    }
}

init();