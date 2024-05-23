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

document.getElementById('pop-question-btn').addEventListener('click', function() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = '';

    const randomIndex = Math.floor(Math.random() * questions.length);
    const questionObj = questions[randomIndex];

    const questionElement = document.createElement('div');
    questionElement.textContent = questionObj.question;
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
                if (questions[randomIndex].options.find(opt => opt.text === btn.textContent).isCorrect) {
                    btn.classList.add('correct');
                } else if (!btn.classList.contains('correct')) {
                    btn.classList.add('incorrect');
                }
            });
        });
        questionContainer.appendChild(button);
    });
});
