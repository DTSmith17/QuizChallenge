function displayScores() {
    const scores = JSON.parse(localStorage.getItem('quizScores')) || [];
    const scoresList = document.getElementById('scoresList');
    scoresList.innerHTML = '';
    scores.forEach((score, index) => {
      const listItem = document.createElement('li');
      const scoreText = score.score === 'Pass' ? 'Pass' : 'Fail'; // Interpret the score as Pass or Fail
      listItem.textContent = `Initials: ${score.initials}, Score: ${scoreText}`;
      scoresList.appendChild(listItem);
    });
  }
  
  window.onload = displayScores;
  