// Sample quiz questions (you can replace with your own set)
const questions = [
    {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
        answer: "Mitochondria"
    },
    {
        question: "What is the largest organ in the human body?",
        options: ["Brain", "Liver", "Skin", "Heart"],
        answer: "Skin"
    }
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;

const startQuizButton = document.getElementById('start-quiz');
const nextQuestionButton = document.getElementById('next-question');
const skipQuestionButton = document.getElementById('skip-question');
const resetQuizButton = document.getElementById('reset-quiz');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBarFill = document.getElementById('progress-bar-fill');
const scoreText = document.getElementById('score');

startQuizButton.addEventListener('click', startQuiz);
nextQuestionButton.addEventListener('click', showNextQuestion);
skipQuestionButton.addEventListener('click', showNextQuestion);
resetQuizButton.addEventListener('click', resetQuiz);

function startQuiz() {
    shuffleQuestions();
    showQuestion();
    startQuizButton.style.display = 'none';
    nextQuestionButton.style.display = 'inline-block';
    skipQuestionButton.style.display = 'inline-block';
    resetQuizButton.style.display = 'inline-block';
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    
    optionsContainer.innerHTML = ''; // Clear previous options
    
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.classList.add('option-button');
        optionButton.textContent = option;
        optionButton.addEventListener('click', () => {
            checkAnswer(option, currentQuestion.answer);
        });
        optionsContainer.appendChild(optionButton);
    });

    updateProgressBar();
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score++;
    }

    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
        if (button.textContent === correctAnswer) {
            button.style.backgroundColor = '#4CAF50'; // Green for correct answer
        } else {
            button.style.backgroundColor = '#f44336'; // Red for wrong answers
        }
        button.disabled = true; // Disable buttons after answering
    });

    scoreText.textContent = `Score: ${(score / questions.length * 100).toFixed(2)}%`;
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    nextQuestionButton.style.display = 'none';
    skipQuestionButton.style.display = 'none';
    resetQuizButton.style.display = 'inline-block';
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    scoreText.textContent = `Score: 0%`;

    const optionButtons = document.querySelectorAll('.option-button');
    optionButtons.forEach(button => {
        button.style.backgroundColor = ''; // Reset button background color
        button.disabled = false; // Enable buttons
    });

    nextQuestionButton.style.display = 'inline-block';
    skipQuestionButton.style.display = 'inline-block';
    resetQuizButton.style.display = 'none';
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBarFill.style.width = `${progress}%`;
}

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}
