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
      question: "Which of these elements in HTML can be used for making a text bold?",
      options: ["<a>", "<pre>", "<br>", "<b>"],
      answer: "<b>"
    },
    {
      question: " In HTML, how do we insert an image?",
      options: ["<img src = “jtp.png” />", "<img href = “jtp.png” />", "<img link = “jtp.png” />", "<img url = “jtp.png” />"],
      answer: "<img src = “jtp.png” />"
    },
    {
      question: " In HTML, the tags are __________.",
      options: ["in upper case", "case-sensitive", "in lowercase", "not case sensitive"],
      answer: "not case sensitive"
    },
    {
      question: "Which tag is used in HTML5 for the initialization of the document type?",
      options: ["<Doctype HTML>", "<!DOCTYPE html>", "<Doctype>", "<\Doctype html>"],
      answer: "<!DOCTYPE html>"
    },
    {
      question: "Which one is the HTML document’s root tag?",
      options: ["<head>", "<body>", "<title>", "<html>"],
      answer: "<html>"
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

  function saveScore(initials, score) {
    const scoreList = JSON.parse(localStorage.getItem('quizScores')) ?? []
    scoreList.push({initials, score})
    localStorage.setItem('quizScores', JSON.stringify(scoreList))
  }
  
 

  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
      answerElement.textContent = ''; // Clear the answer message
    } else {
      const initials = prompt('Enter your initials:'); // Prompt user to enter initials
      if (initials) { // Proceed only if the user enters initials
        saveScore(initials, testScore); // Save the score as correct for the completed quiz
        window.location.href = 'scores.html'; // Redirect to view scores page
      } else {
        alert("End of Quiz!");
      }
    }
  }

  countdownTimer();
  loadQuestion();
