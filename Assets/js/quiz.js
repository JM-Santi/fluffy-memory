
const header = document.querySelector('header');
const scoresBtn = document.querySelector('#score-view');
const remainingTime = document.querySelector('#time-remaining');
const quiz = document.querySelector('#quiz');
const startBtn = document.querySelector('#start-button');
const questionsSection = document.querySelector('#question-section');
const question = document.querySelector('#question');
const multipleChoice = document.querySelector('#choices');
const correctIncorrect = document.querySelector('#review');
const totalScore = document.querySelector('#score-total');
const totalScoreMessage = document.querySelector("#total-score-message");
const submitBtn = document.querySelector('#submit');
const scoreListSection = document.querySelector('#score-list-section');
const list = document.querySelector('#highscores');
const returnBtn = document.querySelector('#return-button');
let savedScores = [];

let questions = [
    {
       question:  'Arrays can be used to store the following:',
       choices:   ['Numbers of strings', 'Other arrays', 'Booleans', 'All of the Above'],
       answer:    'All of the Above',
    },
    {
        question:  'The condidtion statement if/else is enclosed with the following:',
        choices:   ['Commas','Curly brackets','Quotes','Parentheses'],
        answer:    'Parentheses',

     },
     {
        question:  'Commonly used datatypes DO NOT include?:',
        choices:   ['Strings', 'Boolean', 'Alerts', 'Numbers'],
        answer:    'Alerts',
     },
     {
        question:  'A very useful tool to debug arrays is:',
        choices:   ['Javascript','Terminal/bash','for loops','Console.log'],
        answer:    'Console.log',
    },
    {
        question:  'Strings must be enclosed within ____ when being assigned to variables.',
        choices:   ['Commas','Curly brackets','Quotes','Paranethesese'],
        answer:    'Quotes',
    },
];

var qIndex;
var time;
var timerId; 
function startQuiz() {
    quiz.setAttribute("class", "hide");
    qIndex = 0;
    time = questions.length * 15;
    timerId = setInterval(timerStart, 1000);
    remainingTime.textContent = time;
    viewQuestion();
}

function timerStart() {
    time--;
    remainingTime.textContent = time;

    if (time <= 0){
        endQuiz();
    }
}

// Set question to page 
function viewQuestion() {
    var currentQuestion = questions[qIndex];
    question.textContent = currentQuestion.question;

    multipleChoice.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("class", "choice");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = choice;
        choiceBtn.onclick = optionPicked;
        multipleChoice.appendChild(choiceBtn);
    });
}

function optionPicked() {
    if (this.value !== questions[qIndex].answer){
        time -= 10; 

        if (time<0){
            time = 0;

        }
        remainingTime.textContent = time;
        correctIncorrect.textContent = "wrong";
    }   
    else {
        correctIncorrect.textContent = "correct";
    }
    
    correctIncorrect.setAttribute("class", "review");
    
    setTimeout(function() {
        correctIncorrect.setAttribute("class", "review hide");
    }, 1000);

    qIndex++;

    if (qIndex===questions.length){
        endQuiz();
    }
    else{
        viewQuestion();
    }
}

//When all questions are answered or time runs out. 
function endQuiz() {
    clearInterval(timerId);
    totalScoreMessage.textContent = "Your final score is: " + time;
    question.innerHTML = "";
    multipleChoice.innerHTML = "";
    remainingTime.innerHTML = "xxx";
    showScore();
}

// Display toatal score and submit
function showScore() {
    header.setAttribute("class", "hide");
    questionsSection.setAttribute("class", "hide");
    totalScore.setAttribute("class", "");
}
// Show list of scores
function showScoreList() {
    header.setAttribute("class", "hide");
    questionsSection.setAttribute("class", "hide");
    totalScore.setAttribute("class", "hide");
    scoreListSection.setAttribute("class", "");
}
// Save score
function save() {
    savedScores.push([initials.value, time]);
    initials.value = "";
    showScores();
    showScoreList();
}
// show score when saved
function showScores() {
    list.innerHTML = "";
    sortedScores = savedScores.sort(function(a, b) { return b[1] - a[1]; });
    savedScores.forEach((score, i) => {
        list.innerHTML += "<li>" + (++i) + ". " + score[0] + " - " + score[1] + "</li>";
    })
}
//returns you to start
function returnFromSave() {
    header.setAttribute("class", "");
    if (remainingTime.innerHTML == "xxx") {
        quiz.setAttribute("class", "");
    }
    
    questionsSection.setAttribute("class", "");
    scoreListSection.setAttribute("class", "hide");
}
scoresBtn.onclick = showScoreList;
submitBtn.onclick = save;
returnBtn.onclick = returnFromSave;
startBtn.onclick = startQuiz;