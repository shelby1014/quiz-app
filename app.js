const questions = [

    {

        question: "How is an array initialized in C language?",
        answers: [
            { text: "int a = {1, 2, 3}", correct: false },
            { text: "int a[3] = {1, 2, 3}", correct: true },
            { text: "int a[] = new int[3]", correct: false },
            { text: "int a(3) = [1, 2, 3]", correct: false },
        ]
    },
    {
        question: "Which of the following is a linear data structure?",
        answers: [
            { text: "Array", correct: true },
            { text: "AVL Trees", correct: false },
            { text: "Binary Trees", correct: false },
            { text: "Graphs", correct: false },
        ]
    },
    {
        question: "Which of the following is not the type of queue?",
        answers: [
            { text: "Priority queue", correct: false },
            { text: "Circular queue", correct: false },
            { text: "Single-ended queue", correct: true },
            { text: "Ordinary queue", correct: false },
        ]
    },
    {
        question: "What is the time complexity of a linear search algorithm?",
        answers: [
            { text: "O(1)", correct: false },
            { text: "O(log n)", correct: false },
            { text: "O(n)", correct: true },
            { text: "O(n^2)", correct: false },
        ]
    },
    {
        question: "Which data structure follows the Last In, First Out (LIFO) principle?",
        answers: [
            { text: "Queue", correct: false },
            { text: "Stack", correct: true },
            { text: "Linked List", correct: false },
            { text: "Tree", correct: false },
        ]
    },
    {
        question: "In computer science, what does 'DFS' stand for?",
        answers: [
            { text: "Depth First Search", correct: true },
            { text: "Dynamic File System", correct: false },
            { text: "Data Flow System", correct: false },
            { text: "Depth of Field Simulation", correct: false },
        ]

    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();