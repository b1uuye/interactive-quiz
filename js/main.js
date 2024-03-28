//getting all required elements

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

//If start Quiz button is clicked

start_btn.onclick = () =>{
    info_box.classList.add("activeInfo"); //shows the info box, by updating stylesheet
}

//If Exit button is clicked

exit_btn.onclick = () =>{
    info_box.classList.remove("activeInfo"); //hides the info box
}

//If Continue button is clicked

continue_btn.onclick = () =>{
    info_box.classList.remove("activeInfo"); //hides the info box
    quiz_box.classList.add("activeQuiz"); //shows the quiz box
    showQuestions(0);
    queCounter(1); //renders both the questions and the question counter after the button click
    startTimer(15);
    startTimerLine(0);
}


let que_count = 0;
let que_numb = 1; //declaring variables
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = document.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = document.querySelector(".result_box .buttons .restart");
const quit_quiz = document.querySelector(".result_box .buttons .quit");


restart_quiz.onclick = () =>{ //reloads entire quiz from question 1 over again
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");
    let que_count = 0;
    let que_numb = 1; //declaring variables
    let counter;
    let counterLine;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter); //clearinterval and startimer inside here reset the time to 15s every time a new question is brought up
    startTimer(timeValue);
    clearInterval(counterLine); 
    startTimerLine(widthValue);
    next_btn.style.display = "none" 
}
quit_quiz.onclick = () =>{
    window.location.reload(); //reloads page when you click quit
}
//If Next Button is clicked

next_btn.onclick = () =>{
    if(que_count < questions.length - 1){
        que_count++; //adds to the index of questions which changes the questions and options
        que_numb++ //works in conjunction with queCounter function to count through the number of questions
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter); //clearinterval and startimer inside here reset the time to 15s every time a new question is brought up
        startTimer(timeValue);
        clearInterval(counterLine); 
        startTimerLine(widthValue);
        next_btn.style.display = "none" //clears the next button once it has been clicked to go to the next question
        timeOff.textContent = "Time Left";
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions completed");
        showResultBox();
    }
   
}

//getting questions and options from the array

function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    
    let que_tag = '<span>'+questions[index].numb + ". " + questions[index].question +'<span>'; //indexing through each question from 0-9
    let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                      + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                      + '<div class="option">'+ questions[index].options[2] +'<span></span></div>' //indexing through for options for each question
                      + '<div class="option">'+ questions[index].options[3] +'<span></span></div>'
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer){
    clearInterval(counter); //clearinterval and startimer inside here reset the time to 15s every time a new question is brought up
    clearInterval(counterLine); //stops the time line upon selecting an answer
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns){
        userScore += 1; //everytime a user gets an answer right, it adds 1 to the tally
        console.log(userScore);
        answer.classList.add("correct"); //adds a class to the correct option and updates it, so that the chosen answer is highglighted green
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon); // adds the tick icon when the answer is correct
    }else{
        answer.classList.add("incorrect"); //adds a class to the incorrect option and updates it, so that the chosen answer is highglighted red
        console.log("Answer is incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon); // adds the cross icon when the answer is correct

        //if answers are incorrect then automatically shows the correct answer
        for (let i = 0; i < allOptions; i++){
            if(option_list.children[i].textContent == correctAns){ //scnas through and find the correct answer
                option_list.children[i].setAttribute("class", "option correct") // sets the correct answer class which then triggers the css to turn it green
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon); // adds tick to the real correct answer
            }
        }
    }
    
    //once user selected disable all other options
    for(let i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block"; //this changes the styling of display from none to block, so upon answer selection the button appears
}

function showResultBox(){
    info_box.classList.remove("activeInfo"); //hides the info box
    quiz_box.classList.remove("activeQuiz"); //hides the quiz box
    result_box.classList.add("activeResult"); //shows the results box
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 8){
        let scoreTag = '<span>and Congrats!🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p> </span>'
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore <=7 && userScore >= 4){
        let scoreTag = '<span>and Well Done!😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p> </span>'
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore <= 3){
        let scoreTag = '<span>and Sorry😕, You only got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p> </span>'
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){ //this function allows the counter to be set, and sets how fast it should go down
    counter = setInterval(timer, 1000);
    function timer(){
    timeCount.textContent = time;
    time--;
    if(time < 9){ //this if stores the number of timer and if it goes past 9 it adds a 0 infront of the single digit numbers
        let addZero = timeCount.textContent;
        timeCount.textContent = "0" + addZero;
    }
    if(time < 0){
        clearInterval(counter); //if timer gets to 0, clock stops so it doesnt go to minus numbers
        timeCount.textContent == "00"; //sets number to 0
        timeOff.textContent = "Time Off"; //notifies that timer has stopped
        
        let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;

        for (let i = 0; i < allOptions; i++){
            if(option_list.children[i].textContent == correctAns){ //scnas through and find the correct answer
                option_list.children[i].setAttribute("class", "option correct") // sets the correct answer class which then triggers the css to turn it green
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon); // adds tick to the real correct answer
            }
        }
    //once time runs out answer is selected and user cannot click any other answers
    for(let i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
    }
}
}


function startTimerLine(time){ //this function creates a line that goes across and simulates the timer but in a line version across the header
    counterLine = setInterval(timer, 29);
    function timer(){
    time += 1;
    timeLine.style.width = time + "px";
    if(time > 549){ //once the timeline reaches a certain length it is automatically stopped
        clearInterval(counterLine);
    }
}
}


function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQuesCountTag = '<span><p>'+ index + '</p>Of<p>'+ questions.length +'</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuesCountTag;
}


