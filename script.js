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

let shuffledQuestions = [];

function shuffleQuestions() {
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
}

shuffleQuestions();

let currentQuestionIndex = -1;
let correctAnswers = 0;
let answeredQuestions = 0;

const questionContainer = document.getElementById('question-container');
const popQuestionBtn = document.getElementById('pop-question-btn');
const nextQuestionBtn = document.getElementById('next-question-btn');
const skipQuestionBtn = document.getElementById('skip-question-btn');
const resetBtn = document.getElementById('reset-btn');
const progressBar = document.getElementById('progress-bar');
const scoreContainer = document.getElementById('score-container');
const messageContainer = document.getElementById('message-container');

function displayQuestion() {
    questionContainer.innerHTML = '';
    messageContainer.textContent = '';

    if (currentQuestionIndex === -1) {
        popQuestionBtn.style.display = 'none';
        nextQuestionBtn.style.display = 'inline-block';
        skipQuestionBtn.style.display = 'inline-block';
        progressBar.style.display = 'block';
        currentQuestionIndex = 0;
        correctAnswers = 0;
        answeredQuestions = 0;
    }

    const questionObj = shuffledQuestions[currentQuestionIndex];

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
                correctAnswers++;
            } else {
                button.classList.add('incorrect');
                messageContainer.textContent = 'Wrong answer! Try again.';
            }
            answeredQuestions++;
            updateProgress();
            disableButtons();
        });
        questionContainer.appendChild(button);
    });

    updateProgress();
}

function updateProgress() {
    const progress = ((answeredQuestions / questions.length) * 100).toFixed(0);
    progressBar.style.width = progress + '%';
    progressBar.textContent = progress + '%';
    scoreContainer.textContent = `Score: ${correctAnswers}/${answeredQuestions}`;
}

function disableButtons() {
    document.querySelectorAll('.option-button').forEach(btn => {
        btn.disabled = true;
        if (shuffledQuestions[currentQuestionIndex].options.find(opt => opt.text === btn.textContent).isCorrect) {
            btn.classList.add('correct');
        } else if (!btn.classList.contains('correct')) {
            btn.classList.add('incorrect');
        }
    });
}

popQuestionBtn.addEventListener('click', displayQuestion);

nextQuestionBtn.addEventListener('click', function() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        currentQuestionIndex = 0;
        shuffleQuestions();
   


