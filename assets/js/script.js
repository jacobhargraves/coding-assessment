// query selectors
const startBtn = document.querySelector(".startBtn");
const startBox = document.querySelector(".startBox");
const startBoxContainer = document.querySelector(".startBoxContainer");
const contentContainer = document.querySelector(".contentContainer");
const questionText = document.querySelector(".questionText");
const options = document.querySelector(".optionsList");
const timerCountDown = document.querySelector(".timerCountDown");
const nextBtn = document.querySelector(".nextBtn");

// begins quiz and hides startBoxContainer
startBtn.addEventListener("click" , function () {
    startBoxContainer.classList.add("hidden"); // hides start box container message
    showQuetions(0);
    startTimer();
});

var questionCount = 0;
var questionNumber = 1;

// function to show questions when startBtn is clicked
function showQuetions(index) {
    let questionTag = '<h2>'+ questions[index].numb + ". " + questions[index].question +'</h2>';
    questionText.innerHTML = questionTag;
    let optionTag = '<button class="choice">'+ questions[index].choices[0] +'</button>'
    + '<div class="choice">'+ questions[index].choices[1] +'</div>'
    + '<div class="choice">'+ questions[index].choices[2] +'</div>'
    + '<div class="choice">'+ questions[index].choices[3] +'</div>';
    options.innerHTML = optionTag;

    let buttonTag = '<button id="nextBtnID">Next<button>';
    nextBtn.innerHTML = buttonTag;

    const choice = options.querySelectorAll(".choice");

    for(i=0; i < choice.length; i++){
       choice[i].setAttribute("onclick", "optionSelected(this)");
    }

    nextBtn.addEventListener('click', function (){
        if (questionCount < questions.length -1) {
            questionCount++;
            questionNumber++;
            showQuetions(questionCount);
        }
    })
}



// hides contentContainer and shows time up
function sendMessage() {
    // contentContainer.classList.add("hidden");
    alert('Time Up!');
}

//starts timer at 60 seconds and refreshes every second
function startTimer() {
    var timeLeft = 60;
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerCountDown.textContent = "Time Remaining: " + timeLeft;

        if(timeLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            sendMessage();
          }

    }, 1000)
}