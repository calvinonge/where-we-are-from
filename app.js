// Sophisticated Game Engine - Pure Visual Elegance

class WarmGameState {
    constructor() {
        this.currentTier = 'surface';
        this.currentCardIndex = 0;
        this.usedCards = { surface: [], story: [], soul: [] };
        this.gameStarted = false;
        this.gameEnded = false;
        this.reflecting = false;
        this.reflectionTimer = null;
        this.collectedWords = [];
        this.prompts = null;
        this.transitionInProgress = false;
    }

    reset() {
        this.currentTier = 'surface';
        this.currentCardIndex = 0;
        this.usedCards = { surface: [], story: [], soul: [] };
        this.gameStarted = false;
        this.gameEnded = false;
        this.reflecting = false;
        this.collectedWords = [];
        this.transitionInProgress = false;
        if (this.reflectionTimer) {
            clearInterval(this.reflectionTimer);
            this.reflectionTimer = null;
        }
    }
}

// Initialize game state
const gameState = new WarmGameState();

// DOM elements
const elements = {
    body: document.body,
    homeScreen: document.getElementById('home-screen'),
    gameScreen: document.getElementById('game-screen'),
    currentCard: document.getElementById('current-card'),
    reflectionOverlay: document.getElementById('reflection-overlay'),
    progressFill: document.getElementById('progress-fill'),
    tierNumber: document.getElementById('tier-number'),
    tierName: document.getElementById('tier-name'),
    homeStartBtn: document.getElementById('home-start-btn'),
    nextBtn: document.getElementById('next-btn'),
    wordCloudModal: document.getElementById('word-cloud-modal'),
    wordInput: document.getElementById('word-input'),
    addWordBtn: document.getElementById('add-word-btn'),
    collectedWords: document.getElementById('collected-words'),
    downloadBtn: document.getElementById('download-btn'),
    newJourneyBtn: document.getElementById('new-journey-btn'),
    timerProgress: document.getElementById('timer-progress'),
    timerText: document.getElementById('timer-text')
};

// Tier configurations with warm aesthetic
const tierConfig = {
    surface: {
        name: 'Surface',
        number: 1,
        className: 'tier-surface',
        progressWidth: '33.33%',
        description: 'Light conversations and gentle introductions'
    },
    story: {
        name: 'Story', 
        number: 2,
        className: 'tier-story',
        progressWidth: '66.66%',
        description: 'Personal narratives and shared experiences'
    },
    soul: {
        name: 'Soul',
        number: 3,
        className: 'tier-soul',
        progressWidth: '100%',
        description: 'Deep reflections and vulnerable truths'
    }
};

// Load prompts from JSON
async function loadPrompts() {
    try {
        const response = await fetch('./identity.json');
        gameState.prompts = await response.json();
        console.log('Prompts loaded successfully');
    } catch (error) {
        console.error('Error loading prompts:', error);
        // Fallback prompts with warm, conversational tone
        gameState.prompts = {
            surface: [
                "What's the first word that comes to mind when you think of 'home'?",
                "Name a smell that instantly takes you back to childhood.",
                "Which city's public transit map do you still know by heart—and why?",
                "What's a phrase or saying your family used that you later realized wasn't universal?",
                "What food did your family eat that you thought everyone ate?",
                "Describe the sound of your childhood neighborhood.",
                "What's a tradition from your culture that you're proud to continue?",
                "What's something about your heritage that you wish more people understood?"
            ],
            story: [
                "Describe a moment you realized you were both an insider and outsider at the same time.",
                "What's a family tradition you once dismissed but now respect?",
                "Tell about a time when you felt caught between two cultures.",
                "What's a story your family tells about you that you're tired of hearing?",
                "Describe a moment when you felt most connected to your roots.",
                "What's something you inherited from your family that isn't an object?",
                "When did you first realize your family was different from others?",
                "What's a lesson you learned from your community that school never taught?"
            ],
            soul: [
                "If your life were a street, what would its traffic look like today? Explain.",
                "What fear about aging feels uniquely yours, and where do you think it began?",
                "How do you honor your roots while still growing beyond them?",
                "What part of your identity do you struggle to explain to others?",
                "What would your ancestors think of who you've become?",
                "What's a truth about yourself that you're still learning to accept?",
                "How has your definition of 'home' changed as you've grown?",
                "What do you hope future generations will remember about your story?"
            ]
        };
    }
}

// Enhanced progress calculation for 10 cards per tier
function calculateProgress() {
    const cardsPerTier = 10; // Fixed game length
    const totalCards = cardsPerTier * 3; // 30 total cards
    let completedCards = 0;
    
    // Count completed cards from all tiers
    for (const tier in gameState.usedCards) {
        completedCards += gameState.usedCards[tier].length;
    }
    
    return Math.min((completedCards / totalCards) * 100, 100);
}

// Update progress bar smoothly
function updateProgress() {
    const progressPercent = calculateProgress();
    elements.progressFill.style.width = `${progressPercent}%`;
}

// Update tier visuals with warm transitions
function updateTierVisuals(tier) {
    const config = tierConfig[tier];
    
    // Update body class for CSS variables
    elements.body.className = `${config.className} tier-transition`;
    
    // Update tier indicators
    elements.tierNumber.textContent = config.number;
    elements.tierName.textContent = config.name;
    
    console.log(`Transitioned to ${config.name} tier`);
}
// Get next card with sophisticated selection (10 cards per tier)
function getNextCard() {
    const tierPrompts = gameState.prompts[gameState.currentTier];
    const usedCards = gameState.usedCards[gameState.currentTier];
    const cardsPerTier = 10;
    
    // If we've used 10 cards in this tier, move to next tier
    if (usedCards.length >= cardsPerTier) {
        return moveToNextTier();
    }
    
    // Find unused card
    let cardIndex;
    do {
        cardIndex = Math.floor(Math.random() * tierPrompts.length);
    } while (usedCards.includes(cardIndex));
    
    // Mark card as used
    usedCards.push(cardIndex);
    
    // Update progress after each card
    updateProgress();
    
    return {
        prompt: tierPrompts[cardIndex],
        tier: gameState.currentTier,
        cardNumber: usedCards.length,
        totalCards: cardsPerTier
    };
}

// Move to next tier with elegant transition
function moveToNextTier() {
    const tiers = ['surface', 'story', 'soul'];
    const currentIndex = tiers.indexOf(gameState.currentTier);
    
    if (currentIndex < tiers.length - 1) {
        gameState.currentTier = tiers[currentIndex + 1];
        updateTierVisuals(gameState.currentTier);
        
        // Add a pause for tier transition
        setTimeout(() => {
            const nextCard = getNextCard();
            if (nextCard) {
                displayCard(nextCard);
            }
        }, 800);
        
        return null; // Signal that we're transitioning
    } else {
        // Game ended - show word cloud
        endGame();
        return null;
    }
}

// Display card with smooth animation
function displayCard(cardData) {
    if (!cardData || gameState.transitionInProgress) return;
    
    gameState.transitionInProgress = true;
    
    // Prepare new card content
    const newCardContent = `
        <div class="card-inner">
            <div class="question-text">${cardData.prompt}</div>
            <div class="card-footer">
                <div class="reflection-hint">Hold to reflect</div>
            </div>
        </div>
    `;
    
    // If this is the first card, just update content
    if (!gameState.gameStarted) {
        elements.currentCard.innerHTML = newCardContent;
        gameState.transitionInProgress = false;
        return;
    }
    
    // Smooth card transition
    elements.currentCard.style.opacity = '0';
    elements.currentCard.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        elements.currentCard.innerHTML = newCardContent;
        elements.currentCard.style.opacity = '1';
        elements.currentCard.style.transform = 'translateY(0)';
        gameState.transitionInProgress = false;
    }, 200);
}

// Start the warm journey from home screen
function startFromHome() {
    // Hide home screen, show game screen
    elements.homeScreen.style.display = 'none';
    elements.gameScreen.style.display = 'flex';
    elements.gameScreen.classList.add('screen-transition');
    
    // Initialize game
    gameState.reset();
    gameState.gameStarted = true;
    
    // Show next button
    elements.nextBtn.style.display = 'flex';
    
    // Set initial tier and progress
    updateTierVisuals('surface');
    updateProgress();
    
    // Display first card
    const firstCard = getNextCard();
    if (firstCard) {
        displayCard(firstCard);
    }
}

// Start the warm journey (legacy function for compatibility)
function startGame() {
    startFromHome();
}

// Next card with transition check
function nextCard() {
    if (gameState.reflecting || gameState.transitionInProgress) return;
    
    const nextCardData = getNextCard();
    if (nextCardData) {
        displayCard(nextCardData);
    }
    // If nextCardData is null, we're either transitioning tiers or ending game
}

// Start reflection mode with warm animation
function startReflection() {
    if (gameState.reflecting || !gameState.gameStarted || gameState.gameEnded) return;
    
    gameState.reflecting = true;
    elements.reflectionOverlay.classList.add('active');
    elements.timerProgress.classList.add('animating');
    
    let timeLeft = 60;
    elements.timerText.textContent = timeLeft;
    
    gameState.reflectionTimer = setInterval(() => {
        timeLeft--;
        elements.timerText.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endReflection();
        }
    }, 1000);
}

// End reflection mode with gentle transition
function endReflection() {
    if (!gameState.reflecting) return;
    
    gameState.reflecting = false;
    elements.reflectionOverlay.classList.remove('active');
    elements.timerProgress.classList.remove('animating');
    
    if (gameState.reflectionTimer) {
        clearInterval(gameState.reflectionTimer);
        gameState.reflectionTimer = null;
    }
    
    // Reset timer display
    elements.timerText.textContent = '60';
    elements.timerProgress.style.strokeDashoffset = '283';
}

// End game and show word cloud
function endGame() {
    gameState.gameEnded = true;
    
    // Hide next button
    elements.nextBtn.style.display = 'none';
    
    // Show word cloud modal
    setTimeout(() => {
        elements.wordCloudModal.classList.add('active');
    }, 1000);
}

// Word collection functionality
function addWord() {
    const word = elements.wordInput.value.trim();
    if (word && !gameState.collectedWords.includes(word)) {
        gameState.collectedWords.push(word);
        elements.wordInput.value = '';
        updateWordDisplay();
    }
}

function removeWord(word) {
    const index = gameState.collectedWords.indexOf(word);
    if (index > -1) {
        gameState.collectedWords.splice(index, 1);
        updateWordDisplay();
    }
}

function updateWordDisplay() {
    elements.collectedWords.innerHTML = gameState.collectedWords.map(word => 
        `<span class="word-tag">
            ${word}
            <span class="remove" onclick="removeWord('${word}')">&times;</span>
        </span>`
    ).join('');
}

// Download session summary
function downloadSummary() {
    const content = `
WHERE WE'RE FROM
Journey Summary

Date: ${new Date().toLocaleDateString()}

Collected Words:
${gameState.collectedWords.length > 0 ? gameState.collectedWords.map(word => `• ${word}`).join('\n') : '• No words collected'}

This document captures the essence of your shared journey through 
three tiers of connection: Surface, Story, and Soul.

"Where We're From" - A warm exploration of identity, memory, and belonging.
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `journey-summary-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Start new journey
function newJourney() {
    elements.wordCloudModal.classList.remove('active');
    
    setTimeout(() => {
        // Reset everything
        gameState.reset();
        
        // Show home screen, hide game screen
        elements.gameScreen.style.display = 'none';
        elements.homeScreen.style.display = 'flex';
        
        // Reset tier visuals
        updateTierVisuals('surface');
        updateProgress();
        
        // Reset UI
        elements.nextBtn.style.display = 'none';
        
        // Reset card content
        elements.currentCard.innerHTML = `
            <div class="card-inner">
                <div class="question-text">
                    Ready to begin your journey of connection and discovery?
                </div>
                <div class="card-footer">
                    <div class="reflection-hint">Hold to reflect</div>
                </div>
            </div>
        `;
        
        // Clear word collection
        gameState.collectedWords = [];
        updateWordDisplay();
    }, 500);
}

// Event listeners
document.addEventListener('DOMContentLoaded', async () => {
    await loadPrompts();
    
    // Button event listeners
    elements.homeStartBtn.addEventListener('click', startFromHome);
    elements.nextBtn.addEventListener('click', nextCard);
    
    // Word cloud event listeners
    elements.addWordBtn.addEventListener('click', addWord);
    elements.wordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addWord();
    });
    elements.downloadBtn.addEventListener('click', downloadSummary);
    elements.newJourneyBtn.addEventListener('click', newJourney);
    
    // Card interaction for reflection
    let holdTimer;
    let holdStarted = false;
    
    function startHold() {
        if (!gameState.gameStarted || gameState.gameEnded || gameState.reflecting) return;
        
        holdStarted = true;
        holdTimer = setTimeout(() => {
            if (holdStarted) {
                startReflection();
            }
        }, 500);
    }
    
    function endHold() {
        holdStarted = false;
        clearTimeout(holdTimer);
    }
    
    // Mouse events
    elements.currentCard.addEventListener('mousedown', startHold);
    elements.currentCard.addEventListener('mouseup', endHold);
    elements.currentCard.addEventListener('mouseleave', endHold);
    
    // Touch events
    elements.currentCard.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startHold();
    });
    
    elements.currentCard.addEventListener('touchend', (e) => {
        e.preventDefault();
        endHold();
    });
    
    elements.currentCard.addEventListener('touchcancel', endHold);
    
    // Reflection overlay click to end
    elements.reflectionOverlay.addEventListener('click', endReflection);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (gameState.reflecting) {
            if (e.key === 'Escape') {
                endReflection();
            }
            return;
        }
        
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            if (gameState.gameStarted && !gameState.gameEnded) {
                nextCard();
            } else if (!gameState.gameStarted) {
                startFromHome();
            }
        }
        
        if (e.key === 'Enter' && gameState.gameStarted && !gameState.gameEnded) {
            startReflection();
        }
    });
    
    // Close modal on outside click
    elements.wordCloudModal.addEventListener('click', (e) => {
        if (e.target === elements.wordCloudModal) {
            newJourney();
        }
    });
    
    console.log('Warm conversation game initialized successfully');
});

// Make removeWord globally accessible
window.removeWord = removeWord;

