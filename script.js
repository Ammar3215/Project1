let questions = [
    {
        question: "A 25-year-old man presents with severe abdominal pain. Which of the following is the most likely diagnosis?",
        options: [
            { text: "Acute appendicitis", isCorrect: true },
            { text: "Gastroenteritis", isCorrect: false },
            { text: "Peptic ulcer disease", isCorrect: false },
            { text: "Irritable bowel syndrome", isCorrect: false }
        ]
    },
    {
        question: "A 60-year-old woman with a history of hypertension presents with a headache and visual disturbances. What is the most likely cause?",
        options: [
            { text: "Migraine", isCorrect: false },
            { text: "Hypertensive crisis", isCorrect: true },
            { text: "Tension headache", isCorrect: false },
            { text: "Cluster headache", isCorrect: false }
        ]
    },
    {
        question: "A 45-year-old man with a history of smoking presents with chronic cough and hemoptysis. What is the most likely diagnosis?",
        options: [
            { text: "Bronchitis", isCorrect: false },
            { text: "Lung cancer", isCorrect: true },
            { text: "Tuberculosis", isCorrect: false },
            { text: "Pneumonia", isCorrect: false }
        ]
    }
];

let currentQuestionIndex = -1;
let correctAnswers = 0;
let answeredQuestions = 0;

const questionContainer = document.getElementById('question-container');
const popQuestionBtn = document.getElementById('pop-question-btn');
const nextQuestionBtn = document.getElementById('next-question-btn');
const skipQuestionBtn = document.getElementById('skip-question-btn');
const resetBtn = document.getElementById('reset-btn');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score-text');
const messageContainer = document.getElementById('message-container');

// Shuffle questions on page load
shuffleQuestions();

function shuffleQuestions() {
    questions = questions.sort(() => Math.random() - 0.5);
}

function displayQuestion() {
    resetState();
    questionContainer.innerHTML = '';

    if (currentQuestionIndex === -1) {
        currentQuestionIndex = 0;
    }

    const questionObj = questions[currentQuestionIndex];

    const questionElement = document.createElement('div');
    questionElement.textContent = questionObj.question;
    questionElement.classList.add('question');
    questionContainer.appendChild(questionElement);

    questionObj.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.text;
        button.classList.add('option-button');
        button.addEventListener('click', function() {
            if (option.isCorrect) {
                button.classList.add('correct');
                handleCorrectAnswer();
            } else {
                button.classList.add('incorrect');
                handleWrongAnswer();
            }
            disableOptionButtons();
        });
        questionContainer.appendChild(button);
    });

    updateProgressBar();
}

function handleCorrectAnswer() {
    correctAnswers++;
    answeredQuestions++;
    showFeedbackMessage('Correct!');
    updateScore();
}

function handleWrongAnswer() {
    answeredQuestions++;
    showFeedbackMessage('Try again🤬🤬 Ya 🐏!');
}

function showFeedbackMessage(message) {
    messageContainer.textContent = message;
}

function updateScore() {
    const scorePercentage = Math.round((correctAnswers / answeredQuestions) * 100);
    scoreText.textContent = `Score: ${scorePercentage}%`;
}

function updateProgressBar() {
    const progressPercentage = Math.round((answeredQuestions / questions.length) * 100);
    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `Question ${answeredQuestions} of ${questions.length}`;
}

function disableOptionButtons() {
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.disabled = true;
        if (questions[currentQuestionIndex].options.find(opt => opt.text === btn.textContent).isCorrect) {
            btn.classList.add('correct');
        } else if (!btn.classList.contains('correct')) {
            btn.classList.add('incorrect');
        }
    });
}

function resetState() {
    messageContainer.textContent = '';
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('correct', 'incorrect');
    });
}

popQuestionBtn.addEventListener('click', displayQuestion);

nextQuestionBtn.addEventListener('click', function() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
});

skipQuestionBtn.addEventListener('click', function() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
});

resetBtn.addEventListener('click', function() {
    currentQuestionIndex = -1;
    correctAnswers = 0;
    answeredQuestions = 0;
    shuffleQuestions();
    displayQuestion();
    scoreText.textContent = 'Score: 0%';
    progressBar.style.width = '0%';
    progressText.textContent = '';
});
