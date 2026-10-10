const caseStudyMenuBtn = document.querySelector(".menu-icon");



document.addEventListener("scroll", (e)=> {
   e.preventDefault();
  document.body.classList.remove("menu-active")})

// favicon
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (isDarkMode) {
  document.body.classList.toggle(`dark-mode`)
  console.log(`darkmode`)
  document.querySelector('.favicon').href = "./images/favicon-dark.png"
} else {
  document.body.classList.toggle(`light-mode`)
  console.log(`lightmode`)
  document.querySelector('.favicon').href = "./images/favicon-light.png"
}


// darkmode.addEventListener ("click",applyDarkmode)
// lightmode.addEventListener ("click",applyLightmode)

// function applyDarkmode () {
//   document.querySelector(`:root`).style.setProperty(` --main`, `rgb(36, 36, 36)`);
//    document.querySelector(`:root`).style.setProperty(` --text`, `aliceblue`);
//   setUserSelection ("dark");
// }

// function toggleSelection() {
//     if (localStorage.getItem("currentMode") =="dark") {
//         applyLightMode();
//     }
//     else applyDarkMode();
// };

// Filter functionality for shelf items
const filterButtons = document.querySelectorAll('.filter-btn');
const shelfItems = document.querySelectorAll('.shelf-item');

if (filterButtons.length > 0 && shelfItems.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get selected category
      const selectedCategory = button.getAttribute('data-category');
      
      // Filter shelf items
      shelfItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}


// Game configuration
const EMOJIS = ['🍣', '🍉', '💻', '🇨🇦', '🇻🇳', '🚴🏻‍♀️', '🤑', '🎬'];
const TOTAL_PAIRS = 8;

// Game state
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let timerInterval = null;
let isLocked = false;

// Initialize game
function initGame() {
    // Reset game state
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    timer = 0;
    isLocked = false;
    
    // Reset UI
    document.getElementById('moves').textContent = '0';
    document.getElementById('timer').textContent = '0s';
    document.getElementById('winModal').classList.remove('show');
    
    // Clear timer if running
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    // Create card pairs
    cards = [];
    const cardValues = [...EMOJIS, ...EMOJIS];
    
    // Shuffle cards
    shuffleArray(cardValues);
    
    // Create card elements
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    cardValues.forEach((emoji, index) => {
        const card = createCard(emoji, index);
        cards.push({
            element: card,
            emoji: emoji,
            isFlipped: false,
            isMatched: false,
            index: index
        });
        gameBoard.appendChild(card);
    });
}

// Create a card element
function createCard(emoji, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    cardFront.textContent = emoji;
    
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    
    card.appendChild(cardFront);
    card.appendChild(cardBack);
    
    card.addEventListener('click', () => handleCardClick(index));
    
    return card;
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Handle card click
function handleCardClick(index) {
    const card = cards[index];
    
    // Don't allow clicking if:
    // - Card is already flipped
    // - Card is already matched
    // - Game is locked (waiting for flip animation)
    // - Two cards are already flipped
    if (card.isFlipped || card.isMatched || isLocked || flippedCards.length >= 2) {
        return;
    }
    
    // Start timer on first card flip
    if (moves === 0 && flippedCards.length === 0) {
        startTimer();
    }
    
    // Flip the card
    flipCard(index);
    
    // Add to flipped cards
    flippedCards.push(index);
    
    // If two cards are flipped, check for match
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        
        setTimeout(() => {
            checkMatch();
        }, 1000);
    }
}

// Flip a card
function flipCard(index) {
    const card = cards[index];
    card.isFlipped = true;
    card.element.classList.add('flipped');
}

// Unflip a card
function unflipCard(index) {
    const card = cards[index];
    card.isFlipped = false;
    card.element.classList.remove('flipped');
}

// Check if two flipped cards match
function checkMatch() {
    isLocked = true;
    
    const [index1, index2] = flippedCards;
    const card1 = cards[index1];
    const card2 = cards[index2];
    
    if (card1.emoji === card2.emoji) {
        // Match found!
        card1.isMatched = true;
        card2.isMatched = true;
        card1.element.classList.add('matched');
        card2.element.classList.add('matched');
        matchedPairs++;
        
        // Check if game is won
        if (matchedPairs === TOTAL_PAIRS) {
            setTimeout(() => {
                endGame();
            }, 500);
        }
    } else {
        // No match, flip cards back
        setTimeout(() => {
            unflipCard(index1);
            unflipCard(index2);
        }, 500);
    }
    
    // Reset flipped cards
    flippedCards = [];
    
    // Unlock after animation
    setTimeout(() => {
        isLocked = false;
    }, 1000);
}

// Start timer
function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById('timer').textContent = `${timer}s`;
    }, 1000);
}

// End game
function endGame() {
    clearInterval(timerInterval);
    timerInterval = null;
    
    document.getElementById('finalMoves').textContent = moves;
    document.getElementById('finalTime').textContent = `${timer}s`;
    document.getElementById('winModal').classList.add('show');
}

// Reset game
function resetGame() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    initGame();
}

// Event listeners
document.getElementById('resetBtn').addEventListener('click', resetGame);
document.getElementById('playAgainBtn').addEventListener('click', resetGame);

// Initialize game on load
initGame();

