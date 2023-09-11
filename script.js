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

function getQuestion() {
  var getQuestion = questions[questionNumber];
  questionText.textContent = getQuestion.title;

  answerChoices.textContent = '';

  var answerList = document.createElement('ol');

  getQuestion.choices.forEach(function (choice) {
    var listItem = document.createElement('li');
    listItem.textContent = choice;
    listItem.addEventListener('click', function () {
      checkAnswer(choice, getQuestion.answer);
    })
    answerList.appendChild(listItem);
  })
  answerChoices.appendChild(answerList);

}

function checkAnswer(choice, correctChoice) {
  questionNumber++;
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

function gameOver() {
  questionText.textContent = 'Please enter Initials';
  answerChoices.textContent = '';
  resultsId.textContent = 'score is: ' + score;
}

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
},1000)

}

function checkTimeLeft() {
  if (timeLeft <= 0) {
    gameOver();
  }
}

startBtn.addEventListener('click', startQuiz);