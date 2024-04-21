const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const categoryMenu = document.querySelector('.category-menu');
const quizContainerElement = document.querySelector('.quiz-container');
const submitButton = document.getElementById('submit');
let currentQuestionIndex = 0;
let numCorrect = 0;
let incorrectAnswers = [];
let myQuestions = [];

const categories = {
    webdev: [
        // Example question
        {
            question: "What does HTML stand for?",
            answers: {
                a: "HyperText Markup Language",
                b: "HighTech Machine Language",
                c: "HyperText Machine Language"
            },
            correctAnswer: "a"
        },
        
    ],
    prog: [
        
        {
            question: "Which language runs in a web browser?",
            answers: {
                a: "Java",
                b: "C",
                c: "JavaScript"
            },
            correctAnswer: "c"
        },
        
    ],
    math: [
        
        {
            question: "What is the square root of 144?",
            answers: {
                a: "12",
                b: "14",
                c: "16"
            },
            correctAnswer: "a"
        },

    ]
};

// Function to load a category of questions
function loadCategory(category) {
    if (categories.hasOwnProperty(category)) {
        myQuestions = categories[category];
        buildQuiz();
        categoryMenu.style.display = 'none';
        quizContainerElement.style.display = 'block';
    }/* else {
        alert('Category not found!');
    }*/ // This is commented out because the category buttons should only be visible if the category exists but not sure so I commented it out
}

// Function to build the quiz
function buildQuiz() {
    // Reset for new category
    currentQuestionIndex = 0;
    numCorrect = 0;
    incorrectAnswers = [];
    submitButton.style.display = 'inline-block';
    resultsContainer.innerHTML = '';
    showQuestion(currentQuestionIndex);
}

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
    const correctAnswer = myQuestions[currentQuestionIndex].correctAnswer;

    if (userAnswer === correctAnswer) {
        numCorrect++;
    } else {
        // If the answer is wrong, add the question to the incorrectAnswers array
        incorrectAnswers.push(currentQuestionIndex);
    }

    // Proceed to the next question regardless of whether the previous one was correct
    currentQuestionIndex++;
    if (currentQuestionIndex >= myQuestions.length) {
        showResults();
    } else {
        showQuestion(currentQuestionIndex);
    }
}

function showResults() {
    let resultsHTML = `<div>You got ${numCorrect} out of ${myQuestions.length} questions right.</div>`;
    
    // If there are incorrect answers, list them
    if (incorrectAnswers.length > 0) {
        resultsHTML += `<div>\nYou answered the following questions incorrectly:</div><ul>`;
        incorrectAnswers.forEach(index => {
            resultsHTML += `<li>${myQuestions[index].question}</li>`;
        });
        resultsHTML += `</ul>`;
    }

    resultsContainer.innerHTML = resultsHTML;
    submitButton.style.display = 'none'; // Hide the submit button after displaying results
}

// Initial setup for category buttons
document.querySelectorAll('.category-menu button').forEach(button => {
    button.addEventListener('click', () => loadCategory(button.getAttribute('data-category')));
});
submitButton.addEventListener('click', showNextQuestion);