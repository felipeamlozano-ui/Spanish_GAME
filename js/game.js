/**
 * ¡SABORES HISPANOS! - MOTOR PRINCIPAL DEL JUEGO (MODO 100% INDIVIDUAL)
 * Experiencia solista de trivia gastronómica:
 * - Preguntas culturales sobre comidas típicas y países hispanohablantes.
 * - Cronómetro SVG y puntos basados en velocidad + racha personal.
 * - Sin bots ni marcadores artificiales: desafío 100% enfocado en el jugador.
 * - Curiosidades históricas ("¿Sabías que...?") en cada respuesta.
 * - Título honorífico y certificado final de maestría culinaria.
 */

class SaboresGame {
  constructor() {
    // Configuración individual
    this.playerAvatar = '🌮';
    this.questionCount = 15;
    this.timeLimit = 20;

    // Estado de la partida actual
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.correctCount = 0;
    this.totalTimeSpent = 0;
    this.userHistory = []; // Registro de preguntas para revisión final

    // Cronómetro
    this.timerInterval = null;
    this.timeLeft = 0;
    this.hasAnswered = false;
    this.questionStartTime = 0;

    this.initDOM();
    this.initEvents();
    this.loadSavedPreferences();
  }

  /* ========================================================================
     INICIALIZACIÓN DEL DOM
     ======================================================================== */
  initDOM() {
    this.screens = {
      lobby: document.getElementById('screen-lobby'),
      intro: document.getElementById('screen-intro'),
      question: document.getElementById('screen-question'),
      result: document.getElementById('screen-result'),
      podium: document.getElementById('screen-podium')
    };

    this.answerButtons = [
      document.getElementById('btn-ans-0'),
      document.getElementById('btn-ans-1'),
      document.getElementById('btn-ans-2'),
      document.getElementById('btn-ans-3')
    ];

    // HUD Superior
    this.hudQuestionText = document.getElementById('hud-q-text');
    this.hudCountryFlag = document.getElementById('hud-flag');
    this.hudCountryName = document.getElementById('hud-country');
    this.hudStreakBadge = document.getElementById('hud-streak-badge');
    this.hudStreakCount = document.getElementById('hud-streak-count');
    this.hudScore = document.getElementById('hud-score');

    // Cronómetro SVG
    this.timerCircle = document.getElementById('timer-circle');
    this.timerText = document.getElementById('timer-text');

    // Pantalla de Resultado Individual
    this.resultCard = document.getElementById('result-card-inner');
    this.resultIcon = document.getElementById('result-status-icon');
    this.resultTitle = document.getElementById('result-status-title');
    this.resultPoints = document.getElementById('points-earned-pill');
    this.resultStreak = document.getElementById('streak-notification');
    this.resultTrivia = document.getElementById('result-explanation-text');
    this.btnNextStep = document.getElementById('btn-next-step');
    this.btnNextText = document.getElementById('btn-next-text');

    // Modales
    this.modalHowToPlay = document.getElementById('modal-how-to-play');
    this.modalHighscores = document.getElementById('modal-highscores');
    this.modalReview = document.getElementById('modal-review');
    this.toastEl = document.getElementById('toast');
  }

  /* ========================================================================
     EVENT LISTENERS
     ======================================================================== */
  initEvents() {
    // Selección de Avatar / Emblema
    const avatarBtns = document.querySelectorAll('.avatar-opt');
    avatarBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playPop();
        avatarBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.playerAvatar = btn.dataset.avatar;
      });
    });

    // Selector de cantidad de preguntas
    const countBtns = document.querySelectorAll('#question-count-selector .seg-btn');
    countBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playPop();
        countBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.questionCount = parseInt(btn.dataset.count, 10);
      });
    });

    // Selector de tiempo por pregunta
    const timeBtns = document.querySelectorAll('#time-limit-selector .seg-btn');
    timeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playPop();
        timeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.timeLimit = parseInt(btn.dataset.time, 10);
      });
    });

    // Iniciar Juego Individual
    document.getElementById('btn-start-game').addEventListener('click', () => {
      sounds.playPop();
      this.startGame();
    });

    // Opciones de respuesta
    this.answerButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => this.handleAnswerSelect(index));
    });

    // Atajos de teclado (1, 2, 3, 4)
    window.addEventListener('keydown', (e) => {
      if (this.screens.question.classList.contains('active') && !this.hasAnswered) {
        if (e.key === '1') this.handleAnswerSelect(0);
        else if (e.key === '2') this.handleAnswerSelect(1);
        else if (e.key === '3') this.handleAnswerSelect(2);
        else if (e.key === '4') this.handleAnswerSelect(3);
      }
    });

    // Botón de paso a la siguiente pregunta (Flujo directo sin leaderboard)
    this.btnNextStep.addEventListener('click', () => {
      sounds.playWhoosh();
      this.advanceToNextOrFinish();
    });

    // Acciones del resumen final
    document.getElementById('btn-play-again').addEventListener('click', () => {
      sounds.playPop();
      this.returnToLobby();
    });

    document.getElementById('btn-review-answers').addEventListener('click', () => {
      sounds.playPop();
      this.openReviewModal();
    });

    document.getElementById('btn-share-score').addEventListener('click', () => {
      this.shareScore();
    });

    // Controles de Sonido y Pantalla Completa
    const soundToggle = document.getElementById('btn-sound-toggle');
    soundToggle.addEventListener('click', () => {
      const isMuted = sounds.toggleMute();
      document.getElementById('sound-icon').textContent = isMuted ? '🔇' : '🔊';
      this.showToast(isMuted ? 'Sonido silenciado' : 'Sonido activado');
    });

    document.getElementById('btn-fullscreen-toggle').addEventListener('click', () => {
      sounds.playPop();
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Modales
    document.getElementById('btn-how-to-play').addEventListener('click', () => {
      sounds.playPop();
      this.modalHowToPlay.showModal();
    });

    document.getElementById('btn-highscores').addEventListener('click', () => {
      sounds.playPop();
      this.renderHighscores();
      this.modalHighscores.showModal();
    });

    document.getElementById('btn-clear-highscores').addEventListener('click', () => {
      sounds.playPop();
      localStorage.removeItem('sabores_individual_records');
      this.renderHighscores();
      this.showToast('Historial personal borrado');
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playPop();
        const dialog = document.getElementById(btn.dataset.closeModal);
        if (dialog) dialog.close();
      });
    });
  }

  loadSavedPreferences() {
    const isMuted = sounds.isMuted();
    document.getElementById('sound-icon').textContent = isMuted ? '🔇' : '🔊';
  }

  /* ========================================================================
     CAMBIO DE PANTALLA
     ======================================================================== */
  switchScreen(screenName) {
    Object.values(this.screens).forEach(screen => {
      screen.classList.remove('active');
    });
    if (this.screens[screenName]) {
      this.screens[screenName].classList.add('active');
    }
  }

  /* ========================================================================
     FLUJO PRINCIPAL DEL JUEGO
     ======================================================================== */
  startGame() {
    // Barajar y tomar la cantidad elegida
    const shuffled = shuffleArray(QUIZ_QUESTIONS);
    this.questions = shuffled.slice(0, Math.min(this.questionCount, QUIZ_QUESTIONS.length));

    // Reiniciar contadores individuales
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.correctCount = 0;
    this.totalTimeSpent = 0;
    this.userHistory = [];

    this.startIntroCountdown();
  }

  startIntroCountdown() {
    this.switchScreen('intro');
    const currentQ = this.questions[this.currentIndex];

    document.getElementById('intro-question-badge').textContent = 
      `PREGUNTA ${this.currentIndex + 1} DE ${this.questions.length}`;
    document.getElementById('intro-country-flag').textContent = currentQ.flag;
    document.getElementById('intro-country-name').textContent = currentQ.country;

    let count = 3;
    const numEl = document.getElementById('intro-countdown-num');
    numEl.textContent = count;
    sounds.playTick(false);

    const countdownTimer = setInterval(() => {
      count--;
      if (count > 0) {
        numEl.textContent = count;
        sounds.playTick(false);
      } else {
        clearInterval(countdownTimer);
        this.renderQuestion();
      }
    }, 900);
  }

  renderQuestion() {
    this.switchScreen('question');
    const currentQ = this.questions[this.currentIndex];

    this.hasAnswered = false;
    this.questionStartTime = Date.now();
    this.timeLeft = this.timeLimit;

    // Actualizar HUD individual
    this.hudQuestionText.textContent = `${this.currentIndex + 1} / ${this.questions.length}`;
    this.hudCountryFlag.textContent = currentQ.flag;
    this.hudCountryName.textContent = currentQ.country;
    this.hudStreakCount.textContent = `Racha ${this.streak}`;
    this.hudScore.textContent = `${this.score.toLocaleString()} pts`;

    // Pregunta y opciones
    document.getElementById('question-dish-badge').textContent = `${currentQ.flag} ${currentQ.dish}`;
    document.getElementById('question-title-text').textContent = currentQ.question;

    this.answerButtons.forEach((btn, index) => {
      btn.disabled = false;
      btn.className = `answer-btn btn-${['red', 'blue', 'yellow', 'green'][index]}`;
      document.getElementById(`ans-text-${index}`).textContent = currentQ.options[index];
    });

    this.startTimer();
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    const fullCircumference = 264;
    this.timerCircle.style.strokeDashoffset = '0';
    this.timerCircle.className = 'timer-progress';
    this.timerText.textContent = this.timeLeft;

    const intervalStep = 100;
    const totalDuration = this.timeLimit * 1000;
    let elapsed = 0;

    this.timerInterval = setInterval(() => {
      elapsed += intervalStep;
      const remainingSeconds = Math.max(0, Math.ceil((totalDuration - elapsed) / 1000));
      this.timeLeft = remainingSeconds;
      this.timerText.textContent = remainingSeconds;

      const fraction = elapsed / totalDuration;
      const offset = fraction * fullCircumference;
      this.timerCircle.style.strokeDashoffset = offset;

      if (remainingSeconds <= 5) {
        this.timerCircle.classList.add('timer-danger');
        if (elapsed % 1000 < intervalStep) sounds.playTick(true);
      } else if (remainingSeconds <= 10) {
        this.timerCircle.classList.add('timer-warning');
        if (elapsed % 1000 < intervalStep) sounds.playTick(false);
      }

      if (elapsed >= totalDuration) {
        clearInterval(this.timerInterval);
        this.handleTimeout();
      }
    }, intervalStep);
  }

  /* ========================================================================
     RESPUESTAS Y PUNTUACIÓN INDIVIDUAL
     ======================================================================== */
  handleAnswerSelect(selectedIndex) {
    if (this.hasAnswered) return;
    this.hasAnswered = true;
    clearInterval(this.timerInterval);

    const currentQ = this.questions[this.currentIndex];
    const isCorrect = selectedIndex === currentQ.correct;
    const timeSpent = (Date.now() - this.questionStartTime) / 1000;
    this.totalTimeSpent += timeSpent;

    // Resaltar opciones
    this.answerButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === currentQ.correct) {
        btn.classList.add('is-correct');
      } else {
        btn.classList.add('is-wrong');
      }
      if (idx === selectedIndex) {
        btn.classList.add('selected-choice');
      }
    });

    let pointsAwarded = 0;
    let streakBonus = 0;

    if (isCorrect) {
      this.correctCount++;
      this.streak++;
      if (this.streak > this.maxStreak) this.maxStreak = this.streak;

      // Puntos de velocidad: hasta 1,000 pts base
      const speedRatio = Math.max(0, (this.timeLimit - timeSpent) / this.timeLimit);
      const basePoints = Math.round((0.5 + (speedRatio * 0.5)) * 1000);

      if (this.streak >= 2) {
        streakBonus = Math.min((this.streak - 1) * 100, 400);
      }

      pointsAwarded = basePoints + streakBonus;
      this.score += pointsAwarded;

      sounds.playCorrect();
      confetti.burst(window.innerWidth / 2, window.innerHeight * 0.4, 45);
    } else {
      this.streak = 0;
      sounds.playWrong();
    }

    // Registrar para la revisión posterior
    this.userHistory.push({
      question: currentQ.question,
      dish: currentQ.dish,
      country: currentQ.country,
      flag: currentQ.flag,
      userChoice: currentQ.options[selectedIndex],
      correctChoice: currentQ.options[currentQ.correct],
      isCorrect: isCorrect,
      trivia: currentQ.trivia,
      timeSpent: timeSpent.toFixed(1)
    });

    // Transición directa al resultado cultural
    setTimeout(() => {
      this.showResultScreen(isCorrect, pointsAwarded, streakBonus, false);
    }, 1100);
  }

  handleTimeout() {
    if (this.hasAnswered) return;
    this.hasAnswered = true;

    const currentQ = this.questions[this.currentIndex];
    this.streak = 0;
    this.totalTimeSpent += this.timeLimit;

    this.answerButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === currentQ.correct) {
        btn.classList.add('is-correct');
      } else {
        btn.classList.add('is-wrong');
      }
    });

    this.userHistory.push({
      question: currentQ.question,
      dish: currentQ.dish,
      country: currentQ.country,
      flag: currentQ.flag,
      userChoice: 'Tiempo Agotado',
      correctChoice: currentQ.options[currentQ.correct],
      isCorrect: false,
      trivia: currentQ.trivia,
      timeSpent: `${this.timeLimit}.0`
    });

    sounds.playWrong();

    setTimeout(() => {
      this.showResultScreen(false, 0, 0, true);
    }, 1100);
  }

  /* ========================================================================
     PANTALLA DE RESULTADO INDIVIDUAL Y CURIOSIDAD
     ======================================================================== */
  showResultScreen(isCorrect, points, streakBonus, isTimeout) {
    this.switchScreen('result');
    const currentQ = this.questions[this.currentIndex];

    this.resultCard.className = 'result-card glass-panel';

    if (isCorrect) {
      this.resultCard.classList.add('state-correct');
      this.resultIcon.textContent = '🎉';
      this.resultTitle.textContent = '¡RESPUESTA CORRECTA!';
      this.resultTitle.style.color = '#10b981';
      this.resultPoints.textContent = `+${points.toLocaleString()} PUNTOS`;
      this.resultPoints.style.display = 'inline-block';

      if (this.streak >= 2) {
        this.resultStreak.style.display = 'block';
        this.resultStreak.textContent = `🔥 ¡Racha de ${this.streak} respuestas correctas! (+${streakBonus} bono)`;
      } else {
        this.resultStreak.style.display = 'none';
      }
    } else if (isTimeout) {
      this.resultCard.classList.add('state-timeout');
      this.resultIcon.textContent = '⏱️';
      this.resultTitle.textContent = '¡TIEMPO AGOTADO!';
      this.resultTitle.style.color = '#f59e0b';
      this.resultPoints.style.display = 'none';
      this.resultStreak.style.display = 'none';
    } else {
      this.resultCard.classList.add('state-wrong');
      this.resultIcon.textContent = '❌';
      this.resultTitle.textContent = '¡RESPUESTA INCORRECTA!';
      this.resultTitle.style.color = '#ef4444';
      this.resultPoints.style.display = 'none';
      this.resultStreak.style.display = 'none';
    }

    this.resultTrivia.textContent = currentQ.trivia;

    // Si es la última pregunta, actualizar el texto del botón
    const isLast = this.currentIndex >= this.questions.length - 1;
    this.btnNextText.textContent = isLast ? 'VER MI RESULTADO FINAL' : 'SIGUIENTE PREGUNTA';
  }

  advanceToNextOrFinish() {
    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.startIntroCountdown();
    } else {
      this.showFinalIndividualSummary();
    }
  }

  /* ========================================================================
     RESUMEN FINAL INDIVIDUAL Y CERTIFICADO
     ======================================================================== */
  showFinalIndividualSummary() {
    this.switchScreen('podium');

    const accuracy = Math.round((this.correctCount / this.questions.length) * 100);
    const avgTime = (this.totalTimeSpent / this.questions.length).toFixed(1);
    const titleInfo = this.getGastronomicTitle(accuracy);

    // Título de maestría
    document.getElementById('final-mastery-icon').textContent = titleInfo.icon;
    document.getElementById('final-mastery-title').textContent = titleInfo.title;
    document.getElementById('final-mastery-desc').textContent = titleInfo.desc;

    // Puntuación
    document.getElementById('final-total-score').textContent = this.score.toLocaleString();

    // Estadísticas
    document.getElementById('final-stat-correct').textContent = `${this.correctCount} / ${this.questions.length}`;
    document.getElementById('final-stat-accuracy').textContent = `${accuracy}%`;
    document.getElementById('final-stat-streak').textContent = `🔥 ${this.maxStreak}`;
    document.getElementById('final-stat-speed').textContent = `${avgTime}s`;

    // Efectos de celebración
    sounds.playPodiumFanfare();
    confetti.startPodiumCelebration(5000);

    // Guardar en récords personales
    this.savePersonalRecord(accuracy, titleInfo.title);
  }

  getGastronomicTitle(accuracy) {
    if (accuracy >= 90) {
      return {
        title: 'Gran Maestro de la Cocina Hispana',
        icon: '👨‍🍳👑',
        desc: '¡Conocimiento gastronómico supremo! Conoces a profundidad las recetas, ingredientes y secretos culinarios de España e Hispanoamérica.'
      };
    }
    if (accuracy >= 75) {
      return {
        title: 'Chef Especialista Hispano',
        icon: '🥘🌟',
        desc: '¡Excelente paladar! Tienes un dominio impresionante de los platillos más emblemáticos del mundo hispanohablante.'
      };
    }
    if (accuracy >= 50) {
      return {
        title: 'Aficionado Gourmet',
        icon: '🌮✨',
        desc: '¡Buen desempeño! Identificas los clásicos más famosos, aunque aún quedan recetas y sabores tradicionales por explorar.'
      };
    }
    return {
      title: 'Aprendiz Culinario',
      icon: '🥑🌱',
      desc: '¡Un buen punto de partida! La gastronomía hispana es inmensa y llena de sorpresas. ¡Vuelve a intentarlo para subir de nivel!'
    };
  }

  savePersonalRecord(accuracy, rankTitle) {
    try {
      const records = JSON.parse(localStorage.getItem('sabores_individual_records') || '[]');
      records.push({
        avatar: this.playerAvatar,
        score: this.score,
        accuracy: `${accuracy}%`,
        correct: `${this.correctCount}/${this.questions.length}`,
        title: rankTitle,
        date: new Date().toLocaleDateString('es-ES')
      });
      records.sort((a, b) => b.score - a.score);
      const top10 = records.slice(0, 8);
      localStorage.setItem('sabores_individual_records', JSON.stringify(top10));
    } catch (e) {}
  }

  renderHighscores() {
    const container = document.getElementById('highscores-table-container');
    const records = JSON.parse(localStorage.getItem('sabores_individual_records') || '[]');

    if (records.length === 0) {
      container.innerHTML = '<p style="text-align:center; padding:16px; color:rgba(255,255,255,0.7);">Aún no tienes partidas registradas. ¡Completa tu primer desafío gastronómico!</p>';
      return;
    }

    container.innerHTML = records.map((rec, i) => `
      <div class="record-row">
        <span><strong>#${i + 1}</strong> ${rec.avatar} ${rec.title}</span>
        <span><strong>${rec.score.toLocaleString()} pts</strong> (${rec.accuracy})</span>
        <span class="record-date">${rec.date}</span>
      </div>
    `).join('');
  }

  openReviewModal() {
    const container = document.getElementById('review-list-container');
    container.innerHTML = this.userHistory.map((item, idx) => `
      <div class="review-item ${item.isCorrect ? 'was-correct' : 'was-wrong'}">
        <div class="review-q-title">${idx + 1}. ${item.flag} [${item.country}] ${item.question}</div>
        <div class="review-answer-line">
          Tu respuesta: <strong>${item.userChoice}</strong> ${item.isCorrect ? '✅' : '❌'} (${item.timeSpent}s)
        </div>
        ${!item.isCorrect ? `<div class="review-answer-line" style="color:#10b981;">Respuesta correcta: <strong>${item.correctChoice}</strong></div>` : ''}
        <div class="review-trivia">💡 <strong>Curiosidad gastronómica:</strong> ${item.trivia}</div>
      </div>
    `).join('');

    this.modalReview.showModal();
  }

  shareScore() {
    const accuracy = Math.round((this.correctCount / this.questions.length) * 100);
    const titleInfo = this.getGastronomicTitle(accuracy);
    const textToShare = `¡Alcancé el título "${titleInfo.title}" con ${this.score.toLocaleString()} puntos y ${accuracy}% de precisión en ¡Sabores Hispanos! 🌮🥘 ¿Qué tan bien conoces la gastronomía hispana?`;

    if (navigator.share) {
      navigator.share({
        title: '¡Sabores Hispanos! - Mi Resultado',
        text: textToShare,
        url: window.location.href
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(`${textToShare} Compruébalo aquí: ${window.location.href}`).then(() => {
        this.showToast('¡Resultado copiado al portapapeles!');
      });
    } else {
      this.showToast(textToShare);
    }
  }

  returnToLobby() {
    sounds.playWhoosh();
    this.switchScreen('lobby');
  }

  showToast(message) {
    if (!this.toastEl) return;
    this.toastEl.textContent = message;
    this.toastEl.classList.add('show');
    setTimeout(() => {
      this.toastEl.classList.remove('show');
    }, 2800);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.saboresGame = new SaboresGame();
});
