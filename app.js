const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-btn');

const symbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍊', '🍍', '🍓'];
let cards = [];
let flippedCards = [];
let matchedCards = 0;

// カードを初期化
function initGame() {
    const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

    cards = shuffledSymbols.map((symbol, index) => ({
        id: index,
        symbol: symbol,
        flipped: false
    }));

    // ゲームボードを作成
    gameBoard.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// カードをめくる
function flipCard(event) {
    const cardElement = event.target;
    const cardId = cardElement.dataset.id;
    const card = cards[cardId];

    if (card.flipped || flippedCards.length === 2) return;

    card.flipped = true;
    cardElement.classList.add('flipped');
    cardElement.textContent = card.symbol;
    flippedCards.push(cardElement);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// カードが一致しているか確認
function checkMatch() {
    const [card1, card2] = flippedCards;
    const id1 = card1.dataset.id;
    const id2 = card2.dataset.id;

    if (cards[id1].symbol === cards[id2].symbol) {
        matchedCards += 2;
        if (matchedCards === cards.length) {
            setTimeout(() => alert('ゲームクリア！'), 500);
        }
        flippedCards = [];
    } else {
        setTimeout(() => {
            cards[id1].flipped = false;
            cards[id2].flipped = false;
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

// ゲームリセット
resetButton.addEventListener('click', initGame);

// ゲーム開始
initGame();
