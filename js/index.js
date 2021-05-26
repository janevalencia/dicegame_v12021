// Element
let gameBtn = document.querySelector("#title button");
let gameTitle = document.querySelector("#title h1");
let gameIcon = document.querySelector("#title .fas");

// Constant dice images arr[]
const diceImg = 
[
    "dice1.png", 
    "dice2.png", 
    "dice3.png", 
    "dice4.png", 
    "dice5.png", 
    "dice6.png"
];

// Event listener
gameBtn.addEventListener("click", play);

// Game start
async function play() {
    // Reset the game title
    if (gameBtn.textContent === "Restart") {
        reset();
    }

    // Disabling the "Game Button" while rolling is starting
    gameBtn.disabled = true;

    // Roll the dices
    let players = document.querySelectorAll(".dice");
    let dices = await roll(3, players);

    // W:L Announcement
    getGameResult(dices[0], dices[1]);
    

    // Enabling the button for the next play
    gameBtn.disabled = false;
    gameBtn.textContent = "Restart";
}

// Simulate dice rolling upon interval
async function roll(interval, arr) {
    let dice1, dice2;

    for (let i = 0; i < interval; i++) {
        // Set player 1's dice
        dice1 = genRandom(0, 6);
        arr[0].setAttribute("src", "images/" + diceImg[dice1]);

        // Set player 2's dice
        dice2 = genRandom(0, 6);
        arr[1].setAttribute("src", "images/" + diceImg[dice2]);

        // Update button text
        gameBtn.textContent = (dice1 + 1) + " : " + (dice2 + 1);

        // Delay 2s then continue the loop
        await sleep(1000);
    }

    gameBtn.textContent = "Done";
    return [(dice1 + 1), (dice2 + 1)];
}

// Compare dice of player 1 and 2 and return the winner
function getGameResult(a, b) {
    let winner = 2;
    if (a > b) winner = 1;
    else if (a === b) winner = 0;
    announce(winner);
}

// Announce the winner to UI
function announce(winner) {
    if (winner === 0) {
        gameIcon.setAttribute("class", "fas fa-dice-d6 fa-5x");
        gameTitle.textContent = "Draw!";
    } else {
        gameIcon.setAttribute("class", "fas fa-medal fa-5x");
        gameTitle.textContent = "Player " + winner + " Wins!";
    }
}

// Util function: Generate random number with max non-inclusive
function genRandom(min, max) {
    return Math.floor(Math.random() * max - min) + min;
}

// Util function: Set delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Util function: Reset Content
function reset() {
    gameIcon.setAttribute("class", "fas fa-dice-six fa-5x");
    gameTitle.textContent = "Dice Rollin!";
}