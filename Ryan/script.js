const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
let currentQuestionIndex = 0;
let numCorrect = 0;

const myQuestions = [
    {
        question: "What does HTML stand for?",
        answers: {
            a: "Hyper Trainer Marking Language",
            b: "Hyper Text Markup Language",
            c: "Hyper Texts Mark Language"
        },
        correctAnswer: "b"
    },
    {
        question: "Which language is used for styling web pages?",
        answers: {
            a: "HTML",
            b: "JQuery",
            c: "CSS"
        },
        correctAnswer: "c"
    },
    {
        question: "Which is not a JavaScript Framework?",
        answers: {
            a: "Python",
            b: "JQuery",
            c: "Django"
        },
        correctAnswer: "c"
    },
    {
        question: "What does CSS stand for?",
        answers: {
            a: "Computer Style Sheets",
            b: "Creative Style System",
            c: "Cascading Style Sheets"
        },
        correctAnswer: "c"
    },
    {
        question: "What is the purpose of the alt attribute in images?",
        answers: {
            a: "To create a link",
            b: "To define a source",
            c: "To provide an alternate text"
        },
        correctAnswer: "c"
    },
    {
        question: "Which HTML element is used for specifying a footer for a document or section?",
        answers: {
            a: "bottom",
            b: "footer",
            c: "section"
        },
        correctAnswer: "b"
    },
    
];

function showQuestion(index) {
    const question = myQuestions[index];
    const answers = [];
    for (const letter in question.answers) {
        answers.push(
            `<div class="answer">
                <label>
                    <input type="radio" name="question" value="${letter}">
                    ${letter} :
                    ${question.answers[letter]}
                </label>
            </div>`
        );
    }
    quizContainer.innerHTML = `
        <div class="question"> ${question.question} </div>
        <div class="answers"> ${answers.join('')} </div>
    `;
}

function showNextQuestion() {
    const answerContainers = quizContainer.querySelector('.answers');
    const selector = `input[name=question]:checked`;
    const userAnswer = (answerContainers.querySelector(selector) || {}).value;

    if (userAnswer === myQuestions[currentQuestionIndex].correctAnswer) {
        numCorrect++;
        currentQuestionIndex++;
        if (currentQuestionIndex >= myQuestions.length) {
            showResults();
        } else {
            showQuestion(currentQuestionIndex);
        }
    } else {
        alert('Wrong answer. Try again!');
    }
}

function showResults() {
    resultsContainer.innerHTML = `<div>You got ${numCorrect} out of ${myQuestions.length} questions right.</div>`;
    submitButton.style.display = 'none';
}

submitButton.addEventListener('click', showNextQuestion);

// Initialize with the first question
showQuestion(0);
