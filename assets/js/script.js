// query selectors
const startBtn = document.querySelector(".startBtn");
const startBox = document.querySelector(".startBox");
const startBoxContainer = document.querySelector(".startBoxContainer");
const contentContainer = document.querySelector(".contentContainer");
const questionText = document.querySelector(".questionText");
const options = document.querySelector(".optionsList");
const timerCountDown = document.querySelector(".timerCountDown");

// begins quiz and hides startBoxContainer
startBtn.addEventListener("click" , function () {
    startBoxContainer.classList.add("hidden"); // hides start box container message
    showQuetions(0);
    startTimer();
});

// function to show questions when startBtn is clicked
function showQuetions(index) {
    let questionTag = '<h2>'+ questions[index].numb + ". " + questions[index].question +'</h2>';
    questionText.innerHTML = questionTag;
    let optionTag = '<div class="choice">'+ questions[index].choices[0] +'</div>'
    + '<div class="choice">'+ questions[index].choices[1] +'</div>'
    + '<div class="choice">'+ questions[index].choices[2] +'</div>'
    + '<div class="choice">'+ questions[index].choices[3] +'</div>';
    options.innerHTML = optionTag;

    const choice = options.querySelectorAll(".choice");

    for(i=0; i < choice.length; i++){
        choice[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//starts timer at 60 seconds and refreshes every second
function startTimer() {
    var timeLeft = 60;
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerCountDown.textContent = "Time Remaining: " + timeLeft;

        if(secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            sendMessage();
          }

    }, 1000)
}