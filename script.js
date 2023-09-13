//questions for the quiz
var questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    title: 'Arrays in JavaScript can be used to store ____.',
    choices: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
  {
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
  },
  {
    title:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
];

// setting the variables for the code
var score = 0;
var questionNumber = 0;
var timeEl = document.querySelector('.time');
var timeLeft = 60;
var startBtn = document.querySelector('.start-button');
var questionText = document.querySelector('.question-text');
var answerChoices = document.querySelector('.answers');
var resultsId = document.querySelector('.results');
var right = 'Correct!';
var wrong = 'Wrong!';
resultsId.style.display = 'none';
var inputBox = document.createElement('input');
var submitBox = document.createElement('input');
var orderedEl = document.querySelector('.high-scores')
var viewScoreEl = document.querySelector('.view-scores')
var scoreText = 'View High Score';
var playAgainEl = document.querySelector('.play-again')
var clearStorageEl= document.querySelector('.clear-storage')

//function to get the question to show up
function getQuestion() {
  var getQuestion = questions[questionNumber];
  questionText.textContent = getQuestion.title;

  answerChoices.textContent = '';

  var answerList = document.createElement('ol');

  getQuestion.choices.forEach(function (choice) {
    var listItem = document.createElement('button');
    listItem.setAttribute('class', 'answer-list');
    listItem.textContent = choice;
    listItem.addEventListener('click', function () {
      checkAnswer(choice, getQuestion.answer);
    })
    answerList.appendChild(listItem);
  })
  answerChoices.appendChild(answerList);

}

//function to check the answer
function checkAnswer(choice, correctChoice) {
  questionNumber++;
  resultsId.style.display = 'block';
  if (questionNumber < questions.length) {
    getQuestion();
  }
  if (choice === correctChoice) {
    resultsId.textContent = right;
    score = score + 20;
  } else {
    resultsId.textContent = wrong;
    timeLeft = timeLeft - 10;
  }
  if (questionNumber >= 5) {
    gameOver();

  }
}

//game over function
function gameOver() {
  questionText.textContent = 'Please enter Initials';
  answerChoices.textContent = '';
  resultsId.textContent = 'score is: ' + score;
  inputBox.setAttribute('type', 'text');
  inputBox.setAttribute('placeholder', 'Enter initials');
  answerChoices.appendChild(inputBox);
  submitBox.setAttribute('type', 'submit');
  answerChoices.appendChild(submitBox);
  submitBox.addEventListener('click', highScore);
}

//function to start the quiz
function startQuiz() {
  startBtn.style.display = 'none';
  getQuestion();

  var intervalId = setInterval(function () {
    if (timeLeft <= 0 || questionNumber >= 5) {
      timeEl.textContent = 0;
      clearInterval(intervalId)
      gameOver();

    } else {
      timeEl.textContent = timeLeft;
      timeLeft--;
      checkTimeLeft();
    }
  }, 1000)
}

//function to show the highscores of the quiz
function highScore() {
  questionText.textContent = "High scores!";
  submitBox.textContent = score;
  var showHighScore = JSON.parse(localStorage.getItem('initials')) || [];

  if (inputBox.value === '') {
    alert("please enter initials");
    showHighScore = false;
    questionText.textContent = 'Please enter Initials';
  }

  showHighScore.push(inputBox.value + ' = ' + score);
  localStorage.setItem('initials', JSON.stringify(showHighScore));

  for (i = 0; i < showHighScore.length; i++) {
    var listEl = document.createElement('li');
    listEl.textContent = showHighScore[i];
    orderedEl.appendChild(listEl);
    
  }


  inputBox.classList.add('dont-show');
  submitBox.classList.add('dont-show');
  playAgainEl.classList.remove('dont-show');
  clearStorageEl.classList.remove('dont-show');

}

//function to check the time left and force a gameover if time reaches 0
function checkTimeLeft() {
  if (timeLeft <= 0) {
    gameOver();
  }
}

function playAgain() {
  window.location.reload();
}

function clearScore() {
  localStorage.removeItem('initials');
  orderedEl.classList.add('dont-show');
}


startBtn.addEventListener('click', startQuiz);

viewScoreEl.addEventListener('click', highScore);