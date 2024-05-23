let questions = [
    {
        question: "Who won the world cup 2010",
        options: [
            { text: "Italy", isCorrect: false },
            { text: " spain", isCorrect: true },
            { text: "France", isCorrect: false },
            { text: "Germany", isCorrect: false }
        ]
    },
    {
        question: "Who won the world cup 1994",
        options: [
            { text: "Italy", isCorrect: false },
            { text: " Brazil", isCorrect: true },
            { text: "France", isCorrect: false },
            { text: "Germany", isCorrect: false }
        ]
    },
     {
        question: "Who won the world cup 2018",
        options: [
            { text: "Italy", isCorrect: false },
            { text: " Brazil", isCorrect: false },
            { text: "France", isCorrect: true },
            { text: "Germany", isCorrect: false }
        ]
    },
     {
        question: "Who won the world cup 2002",
        options: [
            { text: "Italy", isCorrect: false },
            { text: " Brazil", isCorrect: true },
            { text: "France", isCorrect: false },
            { text: "Germany", isCorrect: false }
        ]
    },
     {
        question: "How many ballon d'Or does Ronaldo have",
        options: [
            { text: "2", isCorrect: false },
            { text: " 5", isCorrect: true },
            { text: "3", isCorrect: false },
            { text: "4", isCorrect: false }
        ]
    },
    {
        question: "Who won the world cup 2006",
        options: [
            { text: "Italy", isCorrect: true },
            { text: " Brazil", isCorrect: false },
            { text: "France", isCorrect: false },
            { text: "Germany", isCorrect: false }
        ]
    }
];

let currentQuestionIndex = -1;
let correctAnswers = 0;

// Function to shuffle questions array
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// Shuffle questions array initially
shuffleQuestions();

// Function to display the next question
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
                hideMessage(); // Clear any previous messages
                showCorrectMessage(); // Show message for correct answer
            } else {
                button.classList.add('incorrect');
                showMessage(); // Show message for wrong answer
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
    shuffleQuestions(); // Reshuffle questions array on reset
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
    messageElement.textContent = 'Wrong answer🤬🤬 Try again Ya 🐏🐏';
    messageElement.style.color = '#dc3545';
}

function showCorrectMessage() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = '3alamy😍😍';
    messageElement.style.color = '#28a745';
}

function hideMessage() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = '';
}

// Event listeners
document.getElementById('pop-question-btn').addEventListener('click', displayQuestion);
document.getElementById('next-question-btn').addEventListener('click', displayQuestion);
document.getElementById('skip-question-btn').addEventListener('click', displayQuestion);
document.getElementById('reset-btn').addEventListener('click', resetQuiz);

// Initial display of question
displayQuestion();
