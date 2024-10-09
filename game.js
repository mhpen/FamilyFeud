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
 let playerName = '';
 let playerScore = 0;
 let currentRoundIndex = 0;
 let countdownTime = 10;
 let countdownInterval;
 
 const startUpMenu = document.getElementById('startUpMenu');
 const gameInterface = document.getElementById('gameInterface');
 const gameOverInterface = document.getElementById('gameOverInterface');
 const playerForm = document.getElementById('player-form');
 const answerForm = document.getElementById('answer-form');
 const questionElement = document.getElementById('question');
 const timerElement = document.getElementById('timer');
 const progressBar = document.getElementById('progressBar');
 const finalScoreElement = document.getElementById('finalScore');
 const leaderboardElement = document.getElementById('leaderboard');
 const playAgainButton = document.getElementById('playAgain');
 const passButton = document.getElementById('passBtn');
 const playButton = document.getElementById('playBtn');
 
 playerForm.addEventListener('submit', function(e) {
     e.preventDefault();
     playerName = document.getElementById('player_name').value;
     startGame();
 });
 
 answerForm.addEventListener('submit', function(e) {
     e.preventDefault();
     verifyAnswer();
 });
 
 playAgainButton.addEventListener('click', function() {
     location.reload();
 });
 
 passButton.addEventListener('click', function() {
     nextRound();
 });
 
 playButton.addEventListener('click', function() {
     // Implement play functionality
 });
 
 function startGame() {
     startUpMenu.classList.add('hidden');
     gameInterface.classList.remove('hidden');
     displayQuestion();
     startTimer();
 
     fetch('game.php', {
         method: 'POST',
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
         body: `action=start_game&player_name=${encodeURIComponent(playerName)}`
     })
     .then(response => response.json())
     .then(data => {
         if (!data.success) {
             console.error('Failed to start game:', data.message);
         }
     });
 }
 
 function displayQuestion() {
     const currentRound = rounds[currentRoundIndex];
     questionElement.textContent = currentRound.question;
     countdownTime = 10;
     progressBar.value = 0;
 }
 
 function verifyAnswer() {
     const answer = document.getElementById('answer').value.trim().toLowerCase(); // Trim and convert to lowercase
     const currentRound = rounds[currentRoundIndex];
     
     const answerIndex = currentRound.answers.findIndex(a => a.toLowerCase() === answer);
 
     if (answerIndex !== -1) {
         // Correct answer
         playerScore += currentRound.points[answerIndex];
         document.getElementById(`ansHolder${answerIndex + 1}`).textContent = currentRound.answers[answerIndex];
         updateScore();
     } else {
         alert('Incorrect answer');
     }
 
     nextRound();
 }
 
 function nextRound() {
     currentRoundIndex++;
     if (currentRoundIndex < rounds.length) {
         displayQuestion();
     } else {
         endGame();
     }
 }
 
 function updateScore() {
     document.getElementById('scoreDisplay').textContent = `Score: ${playerScore}`; // Update score display
     fetch('game.php', {
         method: 'POST',
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
         body: `action=update_score&score=${playerScore}`
     });
 }
 
 function startTimer() {
     clearInterval(countdownInterval);
     countdownInterval = setInterval(function() {
         if (countdownTime > 0) {
             countdownTime--;
             timerElement.textContent = countdownTime;
             progressBar.value += 10;
         } else {
             clearInterval(countdownInterval);
             nextRound();
         }
     }, 1000);
 }
 
 function endGame() {
     gameInterface.classList.add('hidden');
     gameOverInterface.classList.remove('hidden');
     finalScoreElement.textContent = `Final Score: ${playerScore}`;
 
     fetch('game.php', {
         method: 'POST',
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
         body: 'action=end_game'
     })
     .then(response => response.json())
     .then(data => {
         if (data.success) {
             const leaderboard = data.leaderboard;
             leaderboardElement.innerHTML = `<h3>Leaderboard</h3>`;
             leaderboard.forEach(entry => {
                 leaderboardElement.innerHTML += `<p>${entry.player_name}: ${entry.score}</p>`;
             });
         } else {
             console.error('Failed to retrieve leaderboard:', data.message);
         }
     });
 }
