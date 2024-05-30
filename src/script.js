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

        {
            question: "What does CSS stand for?",
            answers: {
                a: "Connecting Style Sheets",
                b: "Cascading Style Sheets",
                c: "Cascading Style Steps"
            },
            correctAnswer: "b"
        },

        {
            question: "What is the purpose of the script tag in HTML?",
            answers: {
                a: "To include CSS styles",
                b: "To include JavaScript code",
                c: "To create hyperlinks"
            },
            correctAnswer: "b"
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

        {
            question: "What is the correct syntax to output <q>Hello World</q> in <u>Python</u>?",
            answers: {
                a: "Print(<q>Hello World</q>)",
                b: "console.log(<q>Hello World</q>)",
                c: " printf(<q>Hello World</q>);",
            },
            correctAnswer: "a"
        },

        {
            question: "How do you comment in C?",
            answers: {
                a: "*/ Insert comment /*",
                b: "# Insert comment",
                c: "// Insert comment",
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

        {
            question: "What is the result of 2^10?",
            answers: {
                a: "1024",
                b: "256",
                c: "1000"
            },
            correctAnswer: "a"
        },

        {
            question: "What is the first prime number?",
            answers: {
                a: "1",
                b: "0",
                c: "2"
            },
            correctAnswer: "c"
        },

    ],
    net: [
        
        {
            question: "What does http stand for?",
            answers: {
                a: "Hypertext Transfer Process",
                b: "Hypertext Transport Protocol",
                c: "Hypertext Transfer Protocol"
            },
            correctAnswer: "c"
        },

        {
            question: "What does TCP stand for?",
            answers: {
                a: "Transmission Control Protocol",
                b: "Technological Control Protocol",
                c: "Transmission Connection Protocol"
            },
            correctAnswer: "a"
        },

        {
            question: "Which of the following devices forwards data packets between networks?",
            answers: {
                a: "Firewall",
                b: "Router",
                c: "Bluetooth"
            },
            correctAnswer: "b"
        },

    ],
    os: [
        
        {
            question: "Which one is <u>not</u> a valid OS?",
            answers: {
                a: "Ubuntu",
                b: "Intel",
                c: "MacOS"
            },
            correctAnswer: "b"
        },

        {
            question: "Which is <u>not</u> a characteristic element of a semaphore?",
            answers: {
                a: "resource counter",
                b: "secure access",
                c: "waiting queue"
            },
            correctAnswer: "b"
        },

        {
            question: "Which is the drawback of choosing a really large page in virtual memory?",
            answers: {
                a: "external fragmentation",
                b: "bad performance",
                c: "internal fragmentation"
            },
            correctAnswer: "c"
        },

    ]
};

// Function to load a category of questions
function loadCategory(category) {
    if (categories.hasOwnProperty(category)) {
        // Clone and shuffle questions
        myQuestions = shuffleArray([...categories[category]]);
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
    const answers = shuffleArray(Object.entries(question.answers));
    
    const answersHTML = answers.map(([letter, answer]) => `
    <div class="answer">
        <label>
            <input type="radio" name="question" value="${letter}">
            ${letter} :
            ${answer}
        </label>
    </div>
`).join('');

    quizContainer.innerHTML = `
        <div class="question"> ${question.question} </div>
        <div class="answers"> ${answersHTML} </div>
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
    
    // If there are incorrect answers, list them and provide a retry button
    if (incorrectAnswers.length > 0) {
        resultsHTML += `<div>You answered the following questions incorrectly:</div><ul>`;
        incorrectAnswers.forEach(index => {
            resultsHTML += `<li>${myQuestions[index].question}</li>`;
        });
        resultsHTML += `</ul>`;
        resultsHTML += `<button id="retryButton">Retry</button>`;
    } else {
        // If all answers are correct, provide a link back to the home page
        resultsHTML += `<a href="quiz.html" class="home-button">Go to Home Page</a>`;
    }

    resultsContainer.innerHTML = resultsHTML;

    // Add an event listener to the retry button
    const retryButton = document.getElementById('retryButton');
    if (retryButton) {
        retryButton.addEventListener('click', function() {
            // Reset the quiz
            currentQuestionIndex = 0;
            numCorrect = 0;
            incorrectAnswers = [];
            // Hide the results and show the first question again
            resultsContainer.innerHTML = '';
            // Shuffle questions again
            myQuestions = shuffleArray([...myQuestions]);
            showQuestion(currentQuestionIndex);
            submitButton.style.display = 'inline-block';
        });
    }

    // Hide the submit button after displaying results
    submitButton.style.display = 'none';
}

// Function to shuffle the questions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initial setup for category buttons
document.querySelectorAll('.category-menu button').forEach(button => {
    button.addEventListener('click', () => loadCategory(button.getAttribute('data-category')));
});
submitButton.addEventListener('click', showNextQuestion);