let questions = [
    {
        question: "Who won the World Cup 2010?",
        options: [
            { text: "Italy", isCorrect: false },
            { text: "Spain", isCorrect: true },
            { text: "France", isCorrect: false },
            { text: "Germany", isCorrect: false }
        ]
    },
    {
        question: "Which of the following is a classic physical examination finding in a patient with lateral epicondylitis?",
        options: [
            { text: "Pain with palpation over the medial epicondyle", isCorrect: false },
            { text: "Pain with resisted wrist extension", isCorrect: true },
            { text: "Pain with ulnar deviation of the wrist", isCorrect: false },
            { text: "Pain with flexion and adduction of the wrist", isCorrect: false }
        ]
    },
    {
        question: "Who won the World Cup 1994?",
        options: [
            { text: "Italy", isCorrect: false },
            { text: "Brazil", isCorrect: true },
            { text: "France", isCorrect: false },
            { text: "Germany", isCorrect: false }
        ]
    },
    {
        question: "A 50-year-old woman presents with dry eyes and mouth, fatigue, and joint pain. On examination, there are bilateral parotid gland enlargement and positive anti-SSA (Ro) antibodies. What is the most likely diagnosis?",
        options: [
            { text: "Systemic lupus erythematosus (SLE)", isCorrect: false },
            { text: "Sjögren's syndrome", isCorrect: true },
            { text: "Rheumatoid arthritis (RA)", isCorrect: false },
            { text: "Polymyalgia rheumatica", isCorrect: false }
        ]
    },
    {
        question: "Who won the World Cup 2018?",
        options: [
            { text: "Italy", isCorrect: false },
            { text: "Brazil", isCorrect: false },
            { text: "France", isCorrect: true },
            { text: "Germany", isCorrect: false }
        ]
    },
    {
        question: "Milan UEFA Champions League titles",
        options: [
            { text: "5", isCorrect: false },
            { text: "7", isCorrect: true },
            { text: "3", isCorrect: false },
            { text: "8", isCorrect: false }
        ]
    },
    {
        question: "Most consecutive Premier League title wins",
        options: [
            { text: "Liverpool", isCorrect: false },
            { text: "Arsenal", isCorrect: false },
            { text: "Man City", isCorrect: true },
            { text: "Chelsea", isCorrect: false }
        ]
    },
    {
        question: "A 30-year-old female presents with pain and swelling in multiple joints, including the wrists, knees, and ankles. She reports morning stiffness lasting more than one hour. On examination, there is tenderness and swelling of the proximal interphalangeal joints and metacarpophalangeal joints. What is the most likely diagnosis?",
        options: [
            { text: "Rheumatoid arthritis (RA)", isCorrect: true },
            { text: "Osteoarthritis (OA)", isCorrect: false },
            { text: "Systemic lupus erythematosus (SLE)", isCorrect: false },
            { text: "Psoriatic arthritis", isCorrect: false }
        ]
    },
    {
        question: "Most Premier League titles by",
        options: [
            { text: "Man City", isCorrect: false },
            { text: "Chelsea", isCorrect: false },
            { text: "Arsenal", isCorrect: false },
            { text: "Man United", isCorrect: true }
        ]
    },
    {
        question: "A 60-year-old male presents with sudden-onset severe pain and pallor in his left lower extremity. On examination, the limb is cold to touch, with absent distal pulses. What is the most likely diagnosis?",
        options: [
            { text: "Acute arterial thrombosis", isCorrect: true },
            { text: "Deep vein thrombosis (DVT)", isCorrect: false },
            { text: "Acute compartment syndrome", isCorrect: false },
            { text: "Popliteal artery aneurysm rupture", isCorrect: false }
        ]
    },
    {
        question: "Who won the World Cup 2002?",
        options: [
            { text: "Italy", isCorrect: false },
            { text: "Brazil", isCorrect: true },
            { text: "France", isCorrect: false },
            { text: "Germany", isCorrect: false }
        ]
    },
    {
        question: "How many Ballon d'Or does Ronaldo have?",
        options: [
            { text: "2", isCorrect: false },
            { text: "5", isCorrect: true },
            { text: "3", isCorrect: false },
            { text: "4", isCorrect: false }
        ]
    },
    {
        question: "Who won the World Cup 2006?",
        options: [
            { text: "Italy", isCorrect: true },
            { text: "Brazil", isCorrect: false },
            { text: "France", isCorrect: false },
            { text: "Germany", isCorrect: false }
        ]
    }
];

let currentQuestionIndex = -1;
let correctAnswers = 0;
let chancesLeft = 2; // Number of chances user has

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
        button.addEventListener('click', function handleAnswer() {
            if (option.isCorrect) {
                button.classList.add('correct');
                correctAnswers++;
                showScore();
                calculatePercentageCorrect(); // Calculate and display percentage correct
                hideMessage(); // Clear any previous messages
                showCorrectMessage(); // Show message for correct answer
                disableAnswerButtons();
            } else {
                button.classList.add('incorrect');
                chancesLeft--;
                button.disabled = true;
                if (chancesLeft > 0) {
                    showMessage(`7awel mara tanya😡! You have ${chancesLeft} chances left.`);
                } else {
                    showMessage(`Teez🫤 The correct answer is: ${questionObj.options.find(opt => opt.isCorrect).text}`);
                    disableAnswerButtons();
                }
            }
        });
        questionContainer.appendChild(button);
    });

    updateProgressBar();
}

function resetQuiz() {
    currentQuestionIndex = -1;
    correctAnswers = 0;
    chancesLeft = 2; // Reset chances
    shuffleQuestions(); // Reshuffle questions array on reset
    displayQuestion();
    function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
}

function showScore() {
    const scoreElement = document.getElementById('score');
    const percentage = (correctAnswers / questions.length) * 100;
    scoreElement.textContent = `Score: ${percentage.toFixed(0)}%`;
}

function calculatePercentageCorrect() {
    const percentageElement = document.getElementById('percentage-correct');
    const percentage = (correctAnswers / (currentQuestionIndex + 1)) * 100;
    percentageElement.textContent = `Percentage Correct: ${percentage.toFixed(0)}%`;
}

function showMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = '#dc3545';
}

function showCorrectMessage() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = '3alamy😍😍!';
    messageElement.style.color = '#28a745';
}

function hideMessage() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = '';
}

function disableAnswerButtons() {
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
}

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

// Event listeners
document.getElementById('pop-question-btn').addEventListener('click', displayQuestion);
document.getElementById('next-question-btn').addEventListener('click', displayQuestion);
document.getElementById('skip-question-btn').addEventListener('click', displayQuestion);
document.getElementById('reset-btn').addEventListener('click', resetQuiz);

// Initial display of question
displayQuestion();
calculatePercentageCorrect(); // Calculate and display percentage correct

