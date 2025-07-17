const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers:[
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
            { text: "Great White Shark", correct: false }
        ]
    },
    {
        question: "What is the capital of France?",
        answers:[
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question:  " what is the chemical symbol for water?",
        answers:[
            { text: "H2O", correct: true },
            { text: "CO2", correct: false },
            { text: "O2", correct: false },
            { text: "NaCl", correct: false }
        ]
    },
    {
        question: "why is the sky blue?",
        answers:[
            { text: "Due to Rayleigh scattering", correct: true },
            { text: "Because of the ocean", correct: false },
            { text: "Due to pollution", correct: false },
            { text: "Because of the sun's reflection", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('ans-buttons');
const nextButton = document.getElementById('next-btn');

let currenQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currenQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currenQuestion = questions[currenQuestionIndex];
    let questionNo= currenQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currenQuestion.question;
    
    currenQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct == "true") {
            button.classList.add('correct');
        } 
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currenQuestionIndex++;
    if (currenQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if(currenQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

 startQuiz();
