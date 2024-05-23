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

function displayQuestion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
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
                correctAnswers++;
                showScore();
                hideMessage(); // Clear any previous error message
            } else {
                button.classList.add('incorrect');
                showMessage(); // Show error message for wrong answer
            }
            document.querySelectorAll('.option-button').forEach(btn => {
                btn.disabled = true;
                if (questions[currentQuestionIndex].options.find(opt => opt.text === btn.textContent).isCorrect) {
                    btn.classList.add('correct');
                } else if (!btn.classList.contains('correct')) {
                    btn.classList.add('incorrect');
                }
            });
            document.getElementById('pop-question-btn').style.display = 'none';
            document.getElementById('next-question-btn').style.display = 'inline-block';
            document.getElementById('skip-question-btn').style.display = 'inline-block';
        });
        questionContainer.appendChild(button);
    });

    updateProgressBar();
}

function resetQuiz() {
    currentQuestionIndex = -1;
    correctAnswers = 0;
    displayQuestion();
    document.getElementById('pop-question-btn').style.display = 'inline-block';
    document.getElementById('next-question-btn').style.display = 'none';
    document.getElementById('skip-question-btn').style.display = 'none';
    hideMessage();
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
}

function showScore() {
    const scoreElement = document.getElementById('score');
    const score = (correctAnswers / questions.length) * 100;
    scoreElement.textContent = `Score: ${score.toFixed(0)}%`;
}

function showMessage() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = 'Wrong answer🤬🤬🤬 Try again Ya 🐏';
}
function showCorrectMessage() {
    showMessage('3alamy😍');
    const messageElement = document.getElementById('message');
    messageElement.style.color = '#28a745'; // Green color for correct messages
}

function showMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = '#dc3545'; // Red color for error messages
}


function hideMessage() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = '';
}

document.getElementById('pop-question-btn').addEventListener('click', displayQuestion);
document.getElementById('next-question-btn').addEventListener('click', displayQuestion);
document.getElementById('skip-question-btn').addEventListener('click', displayQuestion);
document.getElementById('reset-btn').addEventListener('click', resetQuiz);

// Initial display of question
displayQuestion();
