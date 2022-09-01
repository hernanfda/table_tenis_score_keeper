let pOne = {
    display: document.querySelector('#pOne'),
    button: document.querySelector('#pOneBtn'),
    value: 0
}
let pTwo = {
    display: document.querySelector('#pTwo'),
    button: document.querySelector('#pTwoBtn'),
    value: 0
}

const scoreLimit = document.querySelector('#scoreLimit');
const resetBtn = document.querySelector('#resetBtn');
const h1 = document.querySelector('h1');
let winingScore = 5;
let gameOver = false;
let tieBreakGame = false;
let tieBreakCounter = document.createElement('h6');

// Action buttons
pOne.button.addEventListener('click', () => {
    addScore(pOne, pTwo);
})
pTwo.button.addEventListener('click', () => {
    addScore(pTwo, pOne);
})
resetBtn.addEventListener('click', () => {
    resetScore(pOne, pTwo);
})

// Playing To selector action
scoreLimit.addEventListener('change', () => {
    winingScore = parseInt(scoreLimit.value);
    resetScore(pOne, pTwo);
})


//Function to add score
function addScore(player, oponent) {
    if (!gameOver) {
        player.value++;
        player.display.innerText = player.value;
        // Two point difference
        if (player.value === winingScore - 1 && oponent.value === winingScore - 1) {
            if (tieBreakGame === false) {
                winingScore += 1;
                tieBreakCounter.innerText = `(Tie break to: ${winingScore})`;
                h1.append(tieBreakCounter); //Como lo remuevo sin borrarlo
                tieBreakGame = true;
            } else {
                winingScore += 1;
                tieBreakCounter.innerText = `(Tie break to: ${winingScore})`;
            }
        }
        if (player.value === winingScore) {
            gameOver = true;
            player.button.disabled = true;
            oponent.button.disabled = true;
            colorChange(player, oponent);
        }
    }
}

// Color change function for win/lose player
function colorChange(player, oponent) {
    if (player.value > oponent.value) {
        player.display.classList.add('text-success');
        oponent.display.classList.add('text-danger');
    } else {
        player.display.classList.add('text-danger');
        oponent.display.classList.add('text-success');
    }
}

// Set to default values. 
function resetScore(player, oponent) {
    let playerArray = [player, oponent]
    for(let i = 0; i < playerArray.length; i++){
        playerArray[i].value = 0
        playerArray[i].display.classList.remove('text-success', 'text-danger');
        playerArray[i].display.innerText = player.value;
        playerArray[i].button.disabled = false;
    }
    gameOver = false;
    winingScore = parseInt(scoreLimit.value);
    tieBreakCounter.remove();
    tieBreakGame = false;
}