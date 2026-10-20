/**
 * ¡SABORES HISPANOS! - MOTOR PRINCIPAL DEL JUEGO (GAME ENGINE)
 * Lógica estilo Kahoot: Cronómetro SVG, puntuación por velocidad, rachas,
 * competidores simulados en vivo, podio 3D y resumen interactivo.
 */

class SaboresGame {
  constructor() {
    // Configuración del jugador
    this.playerName = 'Gourmet';
    this.playerAvatar = '🌮';
    this.questionCount = 15;
    this.timeLimit = 20;

    // Estado de la partida
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.correctCount = 0;
    this.userHistory = []; // Registro para la revisión final

    // Cronómetro
    this.timerInterval = null;
    this.timeLeft = 0;
    this.hasAnswered = false;
    this.questionStartTime = 0;

    // Rivales estilo Kahoot (Bots animados)
    this.rivals = [
      { id: 'rival-1', name: 'Sofía', avatar: '🇪🇸', score: 0, streak: 0, accuracy: 0.85 },
      { id: 'rival-2', name: 'Mateo', avatar: '🇦🇷', score: 0, streak: 0, accuracy: 0.80 },
      { id: 'rival-3', name: 'Valentina', avatar: '🇨🇴', score: 0, streak: 0, accuracy: 0.75 },
      { id: 'rival-4', name: 'Lucas', avatar: '🇲🇽', score: 0, streak: 0, accuracy: 0.70 },
      { id: 'rival-5', name: 'Camila', avatar: '🇨🇱', score: 0, streak: 0, accuracy: 0.65 }
    ];

    this.initDOM();
    this.initEvents();
    this.loadSavedPreferences();
  }

  /* ========================================================================
     INICIALIZACIÓN Y CACHÉ DEL DOM
     ======================================================================== */
  initDOM() {
    // Pantallas
    this.screens = {
      lobby: document.getElementById('screen-lobby'),
      intro: document.getElementById('screen-intro'),
      question: document.getElementById('screen-question'),
      result: document.getElementById('screen-result'),
      scoreboard: document.getElementById('screen-scoreboard'),
      podium: document.getElementById('screen-podium')
    };

    // Botones de respuesta
    this.answerButtons = [
      document.getElementById('btn-ans-0'),
      document.getElementById('btn-ans-1'),
      document.getElementById('btn-ans-2'),
      document.getElementById('btn-ans-3')
    ];

    // Elementos del HUD
    this.hudQuestionText = document.getElementById('hud-q-text');
    this.hudCountryFlag = document.getElementById('hud-flag');
    this.hudCountryName = document.getElementById('hud-country');
    this.hudStreakBadge = document.getElementById('hud-streak-badge');
    this.hudStreakCount = document.getElementById('hud-streak-count');
    this.hudScore = document.getElementById('hud-score');

    // Cronómetro SVG
    this.timerCircle = document.getElementById('timer-circle');
    this.timerText = document.getElementById('timer-text');

    // Pantalla de Resultado
    this.resultCard = document.getElementById('result-card-inner');
    this.resultIcon = document.getElementById('result-status-icon');
    this.resultTitle = document.getElementById('result-status-title');
    this.resultPoints = document.getElementById('points-earned-pill');
    this.resultStreak = document.getElementById('streak-notification');
    this.resultTrivia = document.getElementById('result-explanation-text');

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
    // Selección de Avatar
    const avatarBtns = document.querySelectorAll('.avatar-opt');
    avatarBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playPop();
        avatarBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.playerAvatar = btn.dataset.avatar;
      });
    });

    // Segmented Controls (Cantidad de preguntas)
    const countBtns = document.querySelectorAll('#question-count-selector .seg-btn');
    countBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playPop();
        countBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.questionCount = parseInt(btn.dataset.count, 10);
      });
    });

    // Segmented Controls (Tiempo por pregunta)
    const timeBtns = document.querySelectorAll('#time-limit-selector .seg-btn');
    timeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sounds.playPop();
        timeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.timeLimit = parseInt(btn.dataset.time, 10);
      });
    });

    // Iniciar Juego
    document.getElementById('btn-start-game').addEventListener('click', () => {
      sounds.playPop();
      this.startGame();
    });

    // Botones de Respuesta
    this.answerButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => this.handleAnswerSelect(index));
    });

    // Atajos de Teclado (1, 2, 3, 4)
    window.addEventListener('keydown', (e) => {
      if (this.screens.question.classList.contains('active') && !this.hasAnswered) {
        if (e.key === '1') this.handleAnswerSelect(0);
        else if (e.key === '2') this.handleAnswerSelect(1);
        else if (e.key === '3') this.handleAnswerSelect(2);
        else if (e.key === '4') this.handleAnswerSelect(3);
      }
    });

    // Navegación entre rondas
    document.getElementById('btn-next-step').addEventListener('click', () => {
      sounds.playWhoosh();
      this.showScoreboard();
    });

    document.getElementById('btn-continue-quiz').addEventListener('click', () => {
      sounds.playWhoosh();
      this.nextRoundOrFinish();
    });

    // Acciones del Podio
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

    // Modales (Abrir y Cerrar)
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
      localStorage.removeItem('sabores_highscores');
      this.renderHighscores();
      this.showToast('Historial de récords borrado');
    });

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
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
     LÓGICA DEL JUEGO
     ======================================================================== */
  startGame() {
    const nickInput = document.getElementById('player-nickname').value.trim();
    this.playerName = nickInput || 'Gourmet';

    // Barajar y seleccionar preguntas
    const shuffled = shuffleArray(QUIZ_QUESTIONS);
    this.questions = shuffled.slice(0, Math.min(this.questionCount, QUIZ_QUESTIONS.length));
    
    // Reiniciar contadores del jugador
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.correctCount = 0;
    this.userHistory = [];

    // Reiniciar rivales con puntajes en 0
    this.rivals.forEach(rival => {
      rival.score = 0;
      rival.streak = 0;
    });

    this.startIntroCountdown();
  }

  // Cuenta regresiva estilo Kahoot antes de cada pregunta
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
    }, 950);
  }

  // Renderizar y comenzar la pregunta activa
  renderQuestion() {
    this.switchScreen('question');
    const currentQ = this.questions[this.currentIndex];

    this.hasAnswered = false;
    this.questionStartTime = Date.now();
    this.timeLeft = this.timeLimit;

    // Actualizar HUD
    this.hudQuestionText.textContent = `${this.currentIndex + 1} / ${this.questions.length}`;
    this.hudCountryFlag.textContent = currentQ.flag;
    this.hudCountryName.textContent = currentQ.country;
    this.hudStreakCount.textContent = `Racha ${this.streak}`;
    this.hudScore.textContent = `${this.score.toLocaleString()} pts`;

    // Actualizar pregunta
    document.getElementById('question-dish-badge').textContent = `${currentQ.flag} ${currentQ.dish}`;
    document.getElementById('question-title-text').textContent = currentQ.question;

    // Preparar botones de respuesta
    this.answerButtons.forEach((btn, index) => {
      btn.disabled = false;
      btn.className = `answer-btn btn-${['red', 'blue', 'yellow', 'green'][index]}`;
      document.getElementById(`ans-text-${index}`).textContent = currentQ.options[index];
    });

    // Iniciar el cronómetro circular
    this.startTimer();
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    const fullCircumference = 264; // r=42 -> 2 * PI * 42 ≈ 263.89
    this.timerCircle.style.strokeDashoffset = '0';
    this.timerCircle.className = 'timer-progress';
    this.timerText.textContent = this.timeLeft;

    const intervalStep = 100; // ms
    const totalDuration = this.timeLimit * 1000;
    let elapsed = 0;

    this.timerInterval = setInterval(() => {
      elapsed += intervalStep;
      const remainingSeconds = Math.max(0, Math.ceil((totalDuration - elapsed) / 1000));
      this.timeLeft = remainingSeconds;
      this.timerText.textContent = remainingSeconds;

      // Actualizar offset del SVG
      const fraction = elapsed / totalDuration;
      const offset = fraction * fullCircumference;
      this.timerCircle.style.strokeDashoffset = offset;

      // Colores de alerta del cronómetro y tics sonoros
      if (remainingSeconds <= 5) {
        this.timerCircle.classList.add('timer-danger');
        if (elapsed % 1000 < intervalStep) sounds.playTick(true);
      } else if (remainingSeconds <= 10) {
        this.timerCircle.classList.add('timer-warning');
        if (elapsed % 1000 < intervalStep) sounds.playTick(false);
      }

      // Tiempo agotado
      if (elapsed >= totalDuration) {
        clearInterval(this.timerInterval);
        this.handleTimeout();
      }
    }, intervalStep);
  }

  /* ========================================================================
     MANEJO DE RESPUESTAS Y PUNTUACIÓN KAHOOT
     ======================================================================== */
  handleAnswerSelect(selectedIndex) {
    if (this.hasAnswered) return;
    this.hasAnswered = true;
    clearInterval(this.timerInterval);

    const currentQ = this.questions[this.currentIndex];
    const isCorrect = selectedIndex === currentQ.correct;
    const timeSpent = (Date.now() - this.questionStartTime) / 1000;

    // Deshabilitar botones y resaltar respuestas
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

      // Fórmula oficial de Kahoot:
      // Puntaje base por velocidad (de 500 a 1000 puntos)
      const speedRatio = Math.max(0, (this.timeLimit - timeSpent) / this.timeLimit);
      const basePoints = Math.round((0.5 + (speedRatio * 0.5)) * 1000);

      // Bono por racha consecutiva
      if (this.streak >= 2) {
        streakBonus = Math.min((this.streak - 1) * 100, 400);
      }

      pointsAwarded = basePoints + streakBonus;
      this.score += pointsAwarded;

      sounds.playCorrect();
      confetti.burst(window.innerWidth / 2, window.innerHeight * 0.4, 50);
    } else {
      this.streak = 0;
      sounds.playWrong();
    }

    // Registrar en el historial para revisión final
    this.userHistory.push({
      question: currentQ.question,
      dish: currentQ.dish,
      country: currentQ.country,
      flag: currentQ.flag,
      userChoice: currentQ.options[selectedIndex],
      correctChoice: currentQ.options[currentQ.correct],
      isCorrect: isCorrect,
      trivia: currentQ.trivia
    });

    // Simular respuestas de los rivales
    this.simulateRivals(isCorrect);

    // Pausa dramática estilo Kahoot antes de mostrar la pantalla de resultado
    setTimeout(() => {
      this.showResultScreen(isCorrect, pointsAwarded, streakBonus, false);
    }, 1200);
  }

  handleTimeout() {
    if (this.hasAnswered) return;
    this.hasAnswered = true;

    const currentQ = this.questions[this.currentIndex];
    this.streak = 0;

    // Resaltar la respuesta que era correcta
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
      trivia: currentQ.trivia
    });

    sounds.playWrong();
    this.simulateRivals(false);

    setTimeout(() => {
      this.showResultScreen(false, 0, 0, true);
    }, 1200);
  }

  // Simulación dinámica y realista de los rivales bot
  simulateRivals(playerAnsweredCorrect) {
    this.rivals.forEach(rival => {
      const willAnswerCorrect = Math.random() < rival.accuracy;
      if (willAnswerCorrect) {
        rival.streak++;
        const simulatedSpeed = Math.random() * 0.7 + 0.3; // ratio
        const base = Math.round((0.5 + (simulatedSpeed * 0.5)) * 950);
        const streakBonus = Math.min((rival.streak - 1) * 80, 300);
        rival.score += (base + streakBonus);
      } else {
        rival.streak = 0;
      }
    });
  }

  /* ========================================================================
     PANTALLAS DE RESULTADO Y MARCADOR
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
        this.resultStreak.textContent = `🔥 ¡Racha de ${this.streak} seguidas! (+${streakBonus} bono)`;
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
      this.resultTitle.textContent = '¡CASI! INCORRECTO';
      this.resultTitle.style.color = '#ef4444';
      this.resultPoints.style.display = 'none';
      this.resultStreak.style.display = 'none';
    }

    this.resultTrivia.textContent = currentQ.trivia;
  }

  showScoreboard() {
    this.switchScreen('scoreboard');

    // Combinar jugador y rivales en una sola lista para ordenar
    const allPlayers = [
      {
        name: this.playerName,
        avatar: this.playerAvatar,
        score: this.score,
        streak: this.streak,
        isPlayer: true
      },
      ...this.rivals.map(r => ({
        name: r.name,
        avatar: r.avatar,
        score: r.score,
        streak: r.streak,
        isPlayer: false
      }))
    ];

    allPlayers.sort((a, b) => b.score - a.score);

    const listContainer = document.getElementById('leaderboard-list');
    listContainer.innerHTML = '';

    allPlayers.slice(0, 5).forEach((item, index) => {
      const row = document.createElement('div');
      row.className = `leaderboard-row ${item.isPlayer ? 'player-row' : ''}`;
      
      const medals = ['🥇', '🥈', '🥉', '4º', '5º'];

      row.innerHTML = `
        <div class="row-rank">${medals[index]}</div>
        <div class="row-avatar">${item.avatar}</div>
        <div class="row-info">
          <div class="row-name">
            ${item.name}
            ${item.isPlayer ? '<span class="row-tag">TÚ</span>' : ''}
          </div>
          ${item.streak >= 2 ? `<div class="row-streak">🔥 Racha x${item.streak}</div>` : ''}
        </div>
        <div class="row-score">${item.score.toLocaleString()} pts</div>
      `;

      listContainer.appendChild(row);
    });

    const isLastQuestion = this.currentIndex >= this.questions.length - 1;
    document.getElementById('btn-continue-text').textContent = 
      isLastQuestion ? 'VER GRAN PODIO FINAL' : 'SIGUIENTE PREGUNTA';
  }

  nextRoundOrFinish() {
    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.startIntroCountdown();
    } else {
      this.showFinalPodium();
    }
  }

  /* ========================================================================
     GRAN PODIO FINAL Y ESTADÍSTICAS
     ======================================================================== */
  showFinalPodium() {
    this.switchScreen('podium');

    const allPlayers = [
      {
        name: this.playerName,
        avatar: this.playerAvatar,
        score: this.score,
        isPlayer: true
      },
      ...this.rivals.map(r => ({
        name: r.name,
        avatar: r.avatar,
        score: r.score,
        isPlayer: false
      }))
    ];

    allPlayers.sort((a, b) => b.score - a.score);

    // 1º, 2º y 3º lugar
    const first = allPlayers[0];
    const second = allPlayers[1];
    const third = allPlayers[2];

    document.getElementById('podium-avatar-1').textContent = first.avatar;
    document.getElementById('podium-name-1').textContent = first.name;
    document.getElementById('podium-score-1').textContent = `${first.score.toLocaleString()} pts`;

    document.getElementById('podium-avatar-2').textContent = second.avatar;
    document.getElementById('podium-name-2').textContent = second.name;
    document.getElementById('podium-score-2').textContent = `${second.score.toLocaleString()} pts`;

    document.getElementById('podium-avatar-3').textContent = third.avatar;
    document.getElementById('podium-name-3').textContent = third.name;
    document.getElementById('podium-score-3').textContent = `${third.score.toLocaleString()} pts`;

    const playerRank = allPlayers.findIndex(p => p.isPlayer) + 1;
    const standingEl = document.getElementById('podium-player-standing');
    if (playerRank === 1) {
      standingEl.textContent = '¡Felicidades! ¡Eres el Campeón Gastronómico indiscutible! 👑';
    } else {
      standingEl.textContent = `¡Gran partida! Has alcanzado el puesto #${playerRank} entre los competidores`;
    }

    // Estadísticas del jugador
    const accuracy = Math.round((this.correctCount / this.questions.length) * 100);
    document.getElementById('final-stat-score').textContent = this.score.toLocaleString();
    document.getElementById('final-stat-accuracy').textContent = `${accuracy}%`;
    document.getElementById('final-stat-streak').textContent = `🔥 ${this.maxStreak}`;
    document.getElementById('final-stat-rank').textContent = `#${playerRank}`;

    // Efectos de celebración
    sounds.playPodiumFanfare();
    confetti.startPodiumCelebration(7000);

    // Guardar récord en localStorage
    this.saveHighscore(accuracy, playerRank);
  }

  saveHighscore(accuracy, rank) {
    try {
      const records = JSON.parse(localStorage.getItem('sabores_highscores') || '[]');
      records.push({
        name: this.playerName,
        avatar: this.playerAvatar,
        score: this.score,
        accuracy: `${accuracy}%`,
        rank: `#${rank}`,
        date: new Date().toLocaleDateString('es-ES')
      });
      records.sort((a, b) => b.score - a.score);
      const top10 = records.slice(0, 10);
      localStorage.setItem('sabores_highscores', JSON.stringify(top10));
    } catch (e) {}
  }

  renderHighscores() {
    const container = document.getElementById('highscores-table-container');
    const records = JSON.parse(localStorage.getItem('sabores_highscores') || '[]');

    if (records.length === 0) {
      container.innerHTML = '<p style="text-align:center; padding:16px; color:rgba(255,255,255,0.7);">Aún no tienes partidas registradas. ¡Sé el primero en jugar!</p>';
      return;
    }

    container.innerHTML = records.map((rec, i) => `
      <div class="record-row">
        <span><strong>#${i + 1}</strong> ${rec.avatar} ${rec.name}</span>
        <span><strong>${rec.score.toLocaleString()} pts</strong> (${rec.accuracy})</span>
        <span class="record-date">${rec.date}</span>
      </div>
    `).join('');
  }

  openReviewModal() {
    const container = document.getElementById('review-list-container');
    container.innerHTML = this.userHistory.map((item, idx) => `
      <div class="review-item ${item.isCorrect ? 'was-correct' : 'was-wrong'}">
        <div class="review-q-title">${idx + 1}. ${item.flag} ${item.question}</div>
        <div class="review-answer-line">
          Tu respuesta: <strong>${item.userChoice}</strong> ${item.isCorrect ? '✅' : '❌'}
        </div>
        ${!item.isCorrect ? `<div class="review-answer-line" style="color:#10b981;">Respuesta correcta: <strong>${item.correctChoice}</strong></div>` : ''}
        <div class="review-trivia">💡 <strong>Curiosidad:</strong> ${item.trivia}</div>
      </div>
    `).join('');

    this.modalReview.showModal();
  }

  shareScore() {
    const accuracy = Math.round((this.correctCount / this.questions.length) * 100);
    const textToShare = `¡Acabo de obtener ${this.score.toLocaleString()} puntos en ¡Sabores Hispanos! 🌮🥘 Quiz con ${accuracy}% de precisión gastronómica. ¿Puedes superarme?`;

    if (navigator.share) {
      navigator.share({
        title: '¡Sabores Hispanos! Trivia',
        text: textToShare,
        url: window.location.href
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(`${textToShare} Juega aquí: ${window.location.href}`).then(() => {
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

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.saboresGame = new SaboresGame();
});
