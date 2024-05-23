const questions = [
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

// Function to shuffle questions array
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// Function to display question
function displayQuestion() {
    if (currentQuestionIndex === -1) {
        shuffleQuestions();
    }
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;

    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

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
            } else {
                button.classList.add('incorrect');
            }
            document.querySelectorAll('.option-button').forEach(btn => {
                btn.disabled = true;
                if (questions[currentQuestionIndex].options.find(opt => opt.text === btn.textContent).isCorrect) {
                    btn.classList.add('correct');
                } else if (!btn.classList.contains('correct')) {
                    btn.classList.add('incorrect');
                }
            });

            answeredQuestions++;
            correctAnswers += option.isCorrect ? 1 : 0;
            updateScore();
            updateProgress();
        });
        questionContainer.appendChild(button);
    });

    document.getElementById('pop-question-btn').style.display = 'none';
    document.getElementById('next-question-btn').style.display = 'inline-block';
    document.getElementById('skip-question-btn').style.display = 'inline-block';
}

// Function to update progress bar
function updateProgress() {
    const progress = (answeredQuestions / questions.length) * 100;
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = progress + '%';
}

// Function to update total score
function updateScore() {
    const score = (correctAnswers / answeredQuestions) * 100;
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Total Score: ${score.toFixed(2)}%`;
}

// Function to reset quiz
function resetQuiz() {
    currentQuestionIndex = -1;
    correctAnswers = 0;
    answeredQuestions = 0;
    updateScore();
    updateProgress();
    displayQuestion();
}

// Event listeners
document.getElementById('pop-question-btn').addEventListener('click', displayQuestion);
document.getElementById('next-question-btn').addEventListener('click', displayQuestion);
document.getElementById('skip-question-btn').addEventListener('click', displayQuestion);
document.getElementById('reset-btn').addEventListener('click', resetQuiz);

// Initial display of question
displayQuestion();

