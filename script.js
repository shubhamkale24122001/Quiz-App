const startButton= document.getElementById('start-btn');
const nextButton= document.getElementById('next-btn');
const questionContainer= document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const questionText= document.getElementById('question');
const finishQuizText= document.getElementById('finish-quiz');
const timer= document.getElementById('timer');
const guidelines= document.getElementById('guidelines');

let currentIndex, timeOutId, timeIntervalId, time;  //time is time for quiz in seconds


function UpdateTimer(){
    let minutes= Math.floor(time/60);
    let seconds= time%60;

    seconds= seconds<10 ? '0'+seconds: seconds;
    timer.innerHTML=`${minutes}:${seconds}`;
    --time;
}

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click',()=>{
    ++currentIndex;
    if(currentIndex>= questions.length){
        endQuiz();
    }
    else{
        setNextQuestion();
    }
});


function startGame(){
    time=60;
    timeOutId= setTimeout(endQuiz, (time)*1000);
    UpdateTimer();
    timeIntervalId= setInterval(UpdateTimer, 1000);
    startButton.classList.add('hide');
    finishQuizText.classList.add('hide');
    guidelines.classList.add('hide');
    questionContainer.classList.remove('hide');
    currentIndex=0;
    setNextQuestion();
}

function endQuiz(){
    startButton.innerHTML='Restart';
    startButton.classList.remove('hide');
    nextButton.classList.add('hide');
    questionContainer.classList.add('hide');
    finishQuizText.classList.remove('hide');
    clearTimeout(timeOutId);
    clearInterval(timeIntervalId);
}

function setNextQuestion(){
    resetState();
    showNextQestion(questions[currentIndex]);
}

function resetState(){
    nextButton.classList.add('hide');
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showNextQestion(question){
    questionText.innerHTML= question.question;
    question.answers.forEach(answer => {
        const button= document.createElement('button');
        button.innerHTML=answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e){
    const button= e.target;
    const correct= button.dataset.correct;

    if(correct){
        button.classList.add('correct');
    }
    else{
        button.classList.add('wrong');
    }
    [...answerButtons.children].forEach(button=>{
        if(button.dataset.correct){// to highlight corret answer if wrong answer selected
            button.classList.add('correct');
        }
        button.removeEventListener('click', selectAnswer);
    });
    nextButton.classList.remove('hide');
}

questions=[
    {
        question: 'What is 2*2 ?',
        answers:[
            {text:'4', correct:true},
            {text:'22', correct:false},
            {text:'12', correct:false}
        ]
    },
    {
        question:'Is web development fun ?',
        answers:[
            {text:'No',correct:false},
            {text:'Kinda',correct:false},
            {text:'Yes',correct:true},
            {text:'Maybe',correct:false}
        ]
    },
    {
        question:'Which of the following is not one of the Seven Wonders of The World ?',
        answers:[
            {text:'Taj Mahal',correct:false},
            {text:'My House',correct:true},
            {text:'Great Pyramid of Giza',correct:false},
            {text:'Statue of Zeus at Olympia',correct:false}
        ]
    },
    {
        question:'Which of the following is not a Natural number ?',
        answers:[
            {text:'0',correct:true},
            {text:'1',correct:false},
            {text:'2',correct:false},
            {text:'2000',correct:false},
            {text:'1000000',correct:false}
        ]
    }
]

