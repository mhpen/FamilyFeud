// Game data (updated to handle multiple players)
let gameData = {
    players: [], // Array to store player objects with name and score
    currentPlayer: null,
    numberOfRounds: 3,
    currentRound: 0,
    timerDuration: 30,
    storedAnswers: ['answer1', 'answer2', 'answer3', 'answer4']
};

// DOM elements
const startButton = document.getElementById('start-game');
const answerForm = document.getElementById('answer-form');
const answerList = document.getElementById('answer-list');
const resultDiv = document.querySelector('.results');
const timerDiv = document.querySelector('.timer');
const resetButton = document.createElement('button');
resetButton.textContent = 'Reset Game';
resetButton.style.display = 'none';
document.querySelector('#game-container').appendChild(resetButton);

// New quit button
const quitButton = document.createElement('button');
quitButton.textContent = 'Quit Game';
quitButton.style.display = 'none';
document.querySelector('#game-container').appendChild(quitButton);

// Timer
let timerInterval;

// Function to add a new player
function addPlayer() {
    const playerNameInput = document.getElementById('new-player-name');
    const playerName = playerNameInput.value.trim();

    if (playerName) {
        // Create a new player object
        const newPlayer = { name: playerName, score: 0 };
        gameData.players.push(newPlayer); // Add player to players array
        gameData.currentPlayer = newPlayer; // Set as current player

        updateScoreDisplay(); // Display the new player in the score table
        playerNameInput.value = ''; // Clear the input field

        // Enable the start game button
        const startButton = document.getElementById('start-game');
        if (startButton) startButton.disabled = false;

        console.log(`Added new player: ${playerName}`); // Debug log
    }
}


// Update the score display for all players
function updateScoreDisplay() {
    const playerNameDisplay = document.getElementById('player-name-display');
    const playerScoreDisplay = document.getElementById('player-score-display');
    const scoreTableBody = document.getElementById('score-table-body');

    // Update the top display for the current player
    if (gameData.currentPlayer) {
        if (playerNameDisplay) playerNameDisplay.textContent = gameData.currentPlayer.name;
        if (playerScoreDisplay) playerScoreDisplay.textContent = gameData.currentPlayer.score;
    }

    // Update the score table for all players
    if (scoreTableBody) {
        scoreTableBody.innerHTML = gameData.players.map(player => `
            <tr>
                <td>${player.name}</td>
                <td>${player.score}</td>
            </tr>
        `).join('');
    }
}

// Start game
function startGame() {
    gameData.currentPlayer = gameData.players[gameData.players.length - 1]; // Set the last added player as current

    gameData.currentPlayer.score = 0; // Reset score for new game
    gameData.currentRound = 1;
    updateScoreDisplay(); // Update the score display for the new game

    displayQuestion();
    if (startButton) startButton.style.display = 'none';
    if (answerForm) answerForm.style.display = 'block';
    if (resultDiv) resultDiv.textContent = ''; // Clear previous round results
    if (timerDiv) timerDiv.textContent = ''; // Clear previous timer
    resetButton.style.display = 'inline-block';
    quitButton.style.display = 'inline-block';

    const playerSetup = document.getElementById('player-setup');
    if (playerSetup) playerSetup.style.display = 'none';
}

// Display the question
function displayQuestion() {
    if (answerList) {
        answerList.innerHTML = gameData.storedAnswers.map(() => '<li>?????</li>').join('');
    }
    startTimer();
}

// Timer function
function startTimer() {
    let timeLeft = gameData.timerDuration;
    updateTimerDisplay(timeLeft);

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endRound();
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay(time) {
    if (timerDiv) {
        timerDiv.textContent = `Time left: ${time}s`;
    }
}

// End round
function endRound() {
    clearInterval(timerInterval);
    gameData.currentRound++;

    if (gameData.currentRound <= gameData.numberOfRounds) {
        setTimeout(displayQuestion, 2000);
    } else {
        endGame();
    }
}

// End game
function endGame() {
    if (resultDiv) {
        resultDiv.textContent = `Game Over! ${gameData.currentPlayer.name}, your final score is ${gameData.currentPlayer.score}!`;
    }
    if (startButton) {
        startButton.style.display = 'block';
        startButton.textContent = 'Play Again';
    }
    if (answerForm) answerForm.style.display = 'none';
    resetButton.style.display = 'inline-block';
    quitButton.style.display = 'none';

    const playerSetup = document.getElementById('player-setup');
    if (playerSetup) playerSetup.style.display = 'block';
}

// Quit game
function quitGame() {
    clearInterval(timerInterval);

    if (resultDiv) {
        resultDiv.textContent = `Game ended. ${gameData.currentPlayer.name}, your final score was ${gameData.currentPlayer.score}.`;
    }

    if (startButton) {
        startButton.style.display = 'block';
        startButton.textContent = 'Start New Game';
    }
    
    if (answerForm) answerForm.style.display = 'none';
    resetButton.style.display = 'none';
    quitButton.style.display = 'none';

    const playerSetup = document.getElementById('player-setup');
    if (playerSetup) {
        playerSetup.style.display = 'block';
        const playerNameInput = document.getElementById('new-player-name');
        if (playerNameInput) playerNameInput.value = ''; // Clear the player name input for the new player
    }

    updateScoreDisplay(); // Update display after quitting
}

// Event listener for the "Add Player" button
document.getElementById('add-player').addEventListener('click', addPlayer);

// Event listener for the "Start Game" button
startButton.addEventListener('click', startGame);

// Event listener for the "Quit Game" button
quitButton.addEventListener('click', quitGame);

// Initialize the game when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Game initialized');
});
