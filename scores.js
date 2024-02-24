
function displayScores() {
    const scores = JSON.parse(localStorage.getItem('quizScores')) || [];
    const scoresList = document.getElementById('scoresList');
    scoresList.innerHTML = '';
    scores.forEach((scoreObj, index) => {
      const listItem = document.createElement('li');
      const scoreText = scoreObj.score >= 4 ? 'Pass' : 'Fail' // Interpret the score as Pass or Fail
      listItem.textContent = `Initials: ${scoreObj.initials}, Score: ${scoreText}, Total Correct: ${scoreObj.score} /6`;
      scoresList.appendChild(listItem);
    });
  }
  
  window.onload = displayScores;
  