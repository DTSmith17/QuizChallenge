const timerEl = document.getElementById('timer')
const mainEl = document.getElementById('quiz')
let secondsLeft = 60;
let currentQuestion = 0;
const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const answerElement = document.querySelector('.answers');
let quizCompleted = false; // Flag to track if quiz is completed
let testScore = 0;

function countdownTimer() {
  // Sets interval in variable
  const timerInterval = setInterval(function() {
    secondsLeft--;
   
    timerEl.textContent = 'Timer:' + secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to 
      overMessage();
    }

  }, 1000);
}

function overMessage() {
  const testOver = document.createElement('H1');
  testOver.textContent = 'Testing Time Complete';
  mainEl.appendChild(testOver);
}

const quizData = [
    
    {
      question: "Commonly used Data Types do not include___",
      options: ["Strings", "Booleans", "Alerts", "Numbers"],
      answer: "Strings"
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Jupiter"
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Mitochondria", "Nucleus", "Ribosome", "Endoplasmic reticulum"],
      answer: "Mitochondria"
    }
  ];



  function loadQuestion() {
    const currentQuestionData = quizData[currentQuestion];
    questionElement.textContent = currentQuestionData.question;
    optionsElement.innerHTML = '';
    currentQuestionData.options.forEach(option => {
      const ansButton = document.createElement('button');
      ansButton.textContent = option;
      ansButton.classList.add('option');
      ansButton.addEventListener('click', checkAnswer);
      optionsElement.appendChild(ansButton);
    });
  }

  function checkAnswer(event) {
    const selectedOption = event.target.textContent;
    const correctAnswer = quizData[currentQuestion].answer;
    const tScoreEl = document.querySelector('#t-score')
    if (selectedOption === correctAnswer) {
      answerElement.textContent = 'Correct!';
      setTimeout(nextQuestion, 1000); // Display correct message for 1 second before moving to next question
      testScore++
      tScoreEl.textContent = testScore;
    } else {
      answerElement.textContent = 'Wrong Answer!';
      setTimeout(nextQuestion, 1000); // Display wrong message for 1 second before moving to next question
      
    }
  }

  function saveScore(initials) {
    if (quizCompleted) return; // Do not save score if quiz is already completed
    
    const scores = [];
    const correctAnswers = quizData.filter(question => question.result === 'Correct').length;
    const totalQuestions = quizData.length;
    const percentageCorrect = (correctAnswers / totalQuestions) * 100;
    const score = percentageCorrect >= 80 ? 'Pass' : 'Fail';
  
    scores.push({ initials: initials, score: score });
    localStorage.setItem('quizScores', JSON.stringify(scores));
  
    quizCompleted = true; // Set quizCompleted to true after saving the final score
  }
  
 

  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
      answerElement.textContent = ''; // Clear the answer message
    } else {
      const initials = prompt('Enter your initials:'); // Prompt user to enter initials
      if (initials) { // Proceed only if the user enters initials
        saveScore(initials, true); // Save the score as correct for the completed quiz
        window.location.href = 'scores.html'; // Redirect to view scores page
      } else {
        alert("End of Quiz!");
      }
    }
  }

  countdownTimer();
  loadQuestion();
