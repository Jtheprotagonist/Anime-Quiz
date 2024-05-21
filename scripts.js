const questions = [
  {
    question: "Which anime protagonist is made of rubber?",
    answers: [
      { text: "Naruto", correct: false },
      { text: "Luffy", correct: true },
      { text: "Tanjiro", correct: false },
      { text: "Ichigo", correct: false },
    ],
  },
  {
    question:
      "Which anime plot involves a boy with a monkey's tail, in search of the dragon balls?",
    answers: [
      { text: "Dragonball Z", correct: true },
      { text: "Bleach", correct: false },
      { text: "Naruto", correct: false },
      { text: "Jujutsu Kaisen", correct: false },
    ],
  },
  {
    question: "What is Sanji's job in Luffy's pirate crew?",
    answers: [
      { text: "Sniper", correct: false },
      { text: "Swordsman", correct: false },
      { text: "Navigator", correct: false },
      { text: "Cook", correct: true },
    ],
  },
  {
    question:
      "In the Bleach anime, where does Ichigo journey to in order to save Rukia?",
    answers: [
      { text: "The Soul Society", correct: true },
      { text: "The Soulfood House", correct: false },
      { text: "The House of Blues", correct: false },
      { text: "Soul Reaper School", correct: false },
    ],
  },
  {
    question:
      "What legendary ninja fought alongside Orochimaru and Tsunade against Hanzo?",
    answers: [
      { text: "Kakashi", correct: false },
      { text: "Jiraiya", correct: true },
      { text: "Sasuke", correct: false },
      { text: "Sarutobi", correct: false },
    ],
  },
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

  currentQuestion.answers.forEach((answer) => {
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
  Array.from(answerButtons.children).forEach((button) => {
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
