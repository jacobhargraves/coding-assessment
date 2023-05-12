// query selectors
const startBtn = document.querySelector(".startBtn");
const startBox = document.querySelector(".startBox");
const startBoxContainer = document.querySelector(".startBoxContainer");
const contentContainer = document.querySelector(".contentContainer");
const questionText = document.querySelector(".questionText");
const options = document.querySelector(".optionsList");
const timerCountDown = document.querySelector(".timerCountDown");
const nextBtn = document.querySelector(".nextBtn");
const evaluate = document.querySelector(".evaluate");
const scoreDiv = document.querySelector(".score");
const resultsHeader = document.querySelector(".resultsHeader");
const scoreResults = document.querySelector(".scoreResults");
const resultsContainer = document.querySelector(".resultsContainer");
const submitBtn = document.querySelector("#submit");
const highScoreContainer = document.querySelector(".highScoreContainer");
const highScoreList = document.querySelector(".highScoreList");
const initialBox = document.querySelector("#initialBox");

// begins quiz and hides startBoxContainer
startBtn.addEventListener("click" , function () {
    startBoxContainer.classList.add("hidden"); // hides start box container message
    showQuetions(questionCount);
    startTimer();
});

// function to show questions when startBtn is clicked
var questionCount = 0;

function showQuetions(index) {
    let scoreTag = '<div class="scoreDisplay">' + 'Score: ' + score + '</div>';
    scoreDiv.innerHTML = scoreTag;
    let questionTag = '<h2>'+ questions[index].numb + ". " + questions[index].question +'</h2>';
    questionText.innerHTML = questionTag;
    let optionTag = '<div class="choice">'+ questions[index].choices[0] +'</div>'
    + '<div class="choice">'+ questions[index].choices[1] +'</div>'
    + '<div class="choice">'+ questions[index].choices[2] +'</div>'
    + '<div class="choice">'+ questions[index].choices[3] +'</div>';
    options.innerHTML = optionTag;

    let buttonTag = '<button id="nextBtnID">Next<button>';
    nextBtn.innerHTML = buttonTag; // displays the next button

    const choice = options.querySelectorAll(".choice");

    for(i=0; i < choice.length; i++){ // this creates an onclick attribut for each coice
       choice[i].setAttribute("onclick", "evaluateAnswer(this)");
    }
}

// button eventlistener to iterate through questions
nextBtn.addEventListener('click', function (){ // iterates through questions when next button is clicked
    if (questionCount < questions.length -1) {
        questionCount++;
        showQuetions(questionCount);
        evaluate.classList.add("hidden"); // hides if answer is correct or incorrect when pressed
    } else {
        displayResults();
        contentContainer.classList.add("hidden");
        timeLeft = 0;
    }
})

// hides contentContainer and shows time up
function sendMessage() {
    displayResults();
}
//starts timer at 60 seconds and refreshes every second
var timeLeft = 60;

function startTimer() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerCountDown.textContent = "Time Remaining: " + timeLeft;

        if(timeLeft <= 0) { 
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            sendMessage();
          }

    }, 1000);
}

var score = 0;

// evaluates if the user's answer is correct or incorrect
function evaluateAnswer(answer) {
    var answerInput = answer.textContent;
    var correctAnswer = questions[questionCount].answer;
    // var eachOption = options.children.length;

    if (answerInput == correctAnswer) { //displays if user selects the correct answer
        score += 1;
        let evaluateTag = "<h3 id='correct'>Correct!<h3>";
        evaluate.innerHTML = evaluateTag;
    }
    else {
        let evaluateTag = "<h3 id='incorrect'>Incorrect ☹️<h3>"; // states incorrect if user selects wrong answer
        evaluate.innerHTML = evaluateTag;
        timeLeft = timeLeft - 10; // subtracts 10 seconds from timer when answer is incorrect
    }
    evaluate.classList.remove("hidden"); // removes hidden css class so evaluation can be displayed
}

// Show results function
function displayResults() {
    resultsContainer.classList.remove("hidden");
    let resultsHeaderTag = "<h1>Assessment Results</h1>";
    resultsHeader.innerHTML = resultsHeaderTag;
    scoreResults.textContent = score;
}

function displayHighScores() {
    console.log(Object.entries(localStorage));
    for ( var i = 0, len = localStorage.length; i < len; ++i ) { // struggling to get the high score list and box to show high scores
        console.log(localStorage.getItem( localStorage.key( i )));
      }
}

// function to store high scores

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    
    // set new submission to local storage 
    localStorage.setItem(initialBox.value.trim(), JSON.stringify(score));
    displayHighScores();
  });