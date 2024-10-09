
// questions and answers
const rounds = [

   {
      round: 1, 
      question: "Magbigay ng salitang pwedeng pang-describe sa saging?" ,
      answers:["Mahaba", "Masarap", "Dilaw", "Matamis", "Malambot", "Kurbado"],
      points:[43, 10 , 9, 6, 4, 4]
   },
   {
      round: 2, 
      question: "Mahirap maging _________." ,
      answers:["Pogi", "Mahirap", "Mabait", "Pangit", "Single"],
      points:[60, 17 , 4, 4, 3]
   },
   {
      round: 3, 
      question: "Ano ang karaniwang ginagawa sa dilim?" ,
      answers:["Natutulog", "Kiss / Sexy time", "Nangangapa", "Nagtatago"],
      points:[21, 16 , 11, 11]
   },
   {
      round: 4, 
      question: "Anong mga pambobola ang sinasabi ng lalaki sa babae?" ,
      answers:["Ang ganda mo", "Ikaw lang wala na", "Di kita iiwan", "I miss you", "Ang sexy mo"],
      points:[32, 31 , 8, 3]
   },
   {
      round: 5, 
      question: "Magbigay ng tunog na nalilikha ng katawan?" ,
      answers:["Utot", "Boses", "Sipol", "Hilik", "Palakpak"],
      points:[24, 14 , 10, 9, 8]
   },
   {
      round: 6, 
      question: "Matutuwa ka kung ano ang mabango sa lalaki?" ,
      answers:["Buhok / Ulo", "Kilikili", "Bibig/Hininga", "Dibdib"],
      points:[32, 18 , 12, 12, 4]
   },
   {
      round: 7, 
      question: "Anong nagagawa ng bibe na kaya mo rin gawin?" ,
      answers:["Lumangoy", "Lumakad", "Tumuka", "Uminom", "Mag quack quack"],
      points:[38, 26 , 13, 13, 6, 3]
   },
   {
      round: 8, 
      question: "Sino kinakausap mo pag may problem ka sa lovelife?" ,
      answers:["Friend", "Parents", "Kapatid", "Sarili", "Nagse-cellphone"],
      points:[51, 13 , 6, 4, 3, 7]
   },
];
 

// 2
let playerScores = 0;
let numRounds = 0;
let currAns = "";
let currentRoundIndex = 0;


// 7 timer
let countdownTime = 100; 
let countdownInterval;

const progressBar = document.getElementById('progressBar'); // progressbar
const timerDisplay = document.getElementById('timer'); // timer
const startGameBtn = document.getElementById('startGame'); // startgame btn
const ansBtn = document.getElementById('ansBtn'); // Answers
const gameOverText = document.getElementById(''); // game Over text
const questionDisplay = document.getElementById("question");
const answerInput = document.getElementById("answer");

// onther interfaces
const showGameInterface = document.getElementById("startGameF");
const startUpMenu = document.getElementById("startUpMenu");
const gameResultsData = document.getElementById("gameResultsData");
const gameOverMsg = document.getElementById("gameOverMsg");
const upperInterface = document.getElementById("upperInterface");
const gameSetup = document.getElementById("gameSetup");


// DISPLAY THE QUESTIONS
function displayQuestions(){
   const round = rounds[currentRoundIndex];
   questionDisplay.textContent = round.question;
   answerInput.value = "";

}
// DISPLAY THE TIMER
function timer() {
   // Disable the button
   startGameBtn.disabled = true;
   timerDisplay.textContent = `Cooldown: ${countdownTime} seconds`;
   progressBar.value = countdownTime;
   progressBar.style.display = "block";

   // Start the cooldown timer
   countdownInterval = setInterval(() => {
      countdownTime--;

       // Update the timer display
       timerDisplay.textContent = `Timer: ${countdownTime} seconds`;

       // Update progress bar value
       progressBar.value = countdownTime;

       // Check if cooldown has ended
       if (countdownTime == 0) {
         clearInterval(countdownInterval);
         startGameBtn.disabled = false; // Re-enable the button
         timerDisplay.textContent = "";
         countdownTime = 10;
         progressBar.value = 0;
         progressBar.style.display = "none";

         GameOver();
      }
   }, 1000);
}

function DisplayTimer(){

   clearInterval(countdownInterval);
   countdownInterval = setInterval(()=>{
      countdownTime--;
      startGameBtn.disabled = true;
      progressBar.value = countdownTime;
      progressBar.style.display = "block";

      // Update the timer display
      timerDisplay.textContent = `Timer: ${countdownTime} seconds`;

      if (countdownTime <= 0) {
         clearInterval(countdownInterval);
         alert("Time's up! Moving to the next question.");

         startGameBtn.disabled = false; // Re-enable the button
         timerDisplay.textContent = "";
         countdownTime = 10;
         progressBar.value = 0;
         progressBar.style.display = "none";

         GameOver();
      }
   }, 1000);
}

function verifyAnswer(){
   const answer = answerInput.value.trim();
   const round = rounds[currentRoundIndex];

   const answerIndex = round.answers.findIndex(a => a.toLowerCase() === answer.toLowerCase());
   if (answerIndex !== -1) {
      playerScores += round.points[answerIndex];
      alert(`Correct! You scored ${round.points[answerIndex]} points.`);
      nextRound();
   } else {
    alert("Wrong answer! Try again.");
   }
   answerInput.value = "";
}


// START GAME
startGameBtn.addEventListener('click', () => {
   // display Game interface
   showGameInterface.style.display = 'block';
   startUpMenu.style.display = 'none';
   gameResultsData.style.display = 'none';
   gameOverMsg.style.display = 'none';
   upperInterface.style.display = 'block';

   timer();
   displayQuestions();
})

// GAME OVER 
function GameOver(){
   showGameInterface.style.display = 'block';
   startUpMenu.style.display = 'block';
   gameResultsData.style.display = 'block';
   gameOverMsg.style.display = 'block';
   upperInterface.style.display = 'none';
   gameSetup.style.display = 'none';
   currentRoundIndex = 0;
}

// Submit answer
ansBtn.addEventListener('click', () => {
   verifyAnswer();
})


//Next Round
function nextRound(){
   currentRoundIndex++;
   if (currentRoundIndex < rounds.length) {
      displayQuestions();
      //DisplayTimer();
   } else {
      alert(`Game Over! Your total score is ${playerScores}.`);
   }
}

