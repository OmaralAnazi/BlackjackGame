const BLACKJACK = 21;
const MIN_CHIPS = 10;

let player = {
    name: 'Player',
    chips: 100
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = '';

const messageEl = document.getElementById('message-el');
const sumEl = document.getElementById('sum-el');
const cardsEl = document.getElementById('cards-el');
const playerEl = document.getElementById('player-el');
const startBtn = document.getElementById('start-btn');
const newCardBtn = document.getElementById('new-card-btn');

playerEl.textContent = `${player.name}: $${player.chips}`;
startBtn.addEventListener('click', startGame);
newCardBtn.addEventListener('click', addNewCard);
toggleButtons();

function startGame() {
    if (!isAlive && isPlayerHasMoney()) {
        resetGame();
        isAlive = true;
        addNewCard();
        addNewCard();
        toggleButtons();
        renderGame();
    }
}

function toggleButtons() {
    startBtn.disabled = isAlive;
    newCardBtn.disabled = !isAlive;
}

function isPlayerHasMoney() {
    if (player.chips >= MIN_CHIPS) return true;
    alert('Sorry, you ran out of money!');
    return false;
}

function resetGame() {
    cards = [];
    sum = 0;
    hasBlackJack = false;
}

function addNewCard() {
    let cardNumber = getRandomCard();
    sum += cardNumber;
    cards.push(cardNumber);
    renderGame();        
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    
    if (randomNumber > 10) return 10;
    if (randomNumber === 1) return 11;
    return randomNumber;
}

function adjustPlayerChips() {
    player.chips += hasBlackJack ? 10 : -10;
    playerEl.textContent = `${player.name}: $${player.chips}`;
}

function renderGame() {
    cardsEl.textContent = `Cards: ${cards.join(' ')}`;
    sumEl.textContent = `Sum: ${sum}`;
    
    if (sum > 20) {
        hasBlackJack = sum === BLACKJACK;
        message = hasBlackJack ? 'You\'ve got Blackjack!' : 'You\'re out of the game!';
        isAlive = false;
        adjustPlayerChips();
        toggleButtons();
    } else {
        message = 'Do you want to draw a new card?';
    }

    messageEl.textContent = message;
}