const audioPlayer = document.getElementById('audioPlayer');
const clipLengthSelect = document.getElementById('clipLength');
const answerModeSelect = document.getElementById('answerMode');
const answerCountSelect = document.getElementById('answerCount');
const typedFieldSelect = document.getElementById('typedField');
const textAnswerInput = document.getElementById('textAnswer');
const submitAnswerButton = document.getElementById('submitAnswer');
const stopClipButton = document.getElementById('stopClip');
const restartClipButton = document.getElementById('restartClip');
const skipClipButton = document.getElementById('skipClip');
const audioProgress = document.getElementById('audioProgress');
const currentTimeEl = document.getElementById('currentTime');
const remainingTimeEl = document.getElementById('remainingTime');
const quizTabButton = document.getElementById('quizTab');
const studyTabButton = document.getElementById('studyTab');
const quizView = document.querySelector('.quiz-view');
const studyView = document.querySelector('.study-view');
const studyListContainer = document.getElementById('studyListContainer');
const textAnswerPanel = document.getElementById('textAnswerPanel');
const startQuizButton = document.getElementById('startQuiz');
const nextClipButton = document.getElementById('nextClip');
const playClipButton = document.getElementById('playClip');
const choicesContainer = document.getElementById('choicesContainer');
const messageEl = document.getElementById('message');
const roundCountEl = document.getElementById('roundCount');
const scoreCountEl = document.getElementById('scoreCount');
const totalCountEl = document.getElementById('totalCount');

const songs = [
  {
    title: 'Haydn, Symphony No. 88 in G Major: mvt 1',
    artist: 'Haydn',
    piece: 'Symphony No. 88 in G Major',
    movement: 'mvt 1',
    file: 'audio/Haydn_ Symphony No. 88 in G Major, Hob. I_88_ I. Adagio - Allegro_spotdown.org.mp3',
  },
  {
    title: 'Haydn, Symphony No. 88 in G Major: mvt 2',
    artist: 'Haydn',
    piece: 'Symphony No. 88 in G Major',
    movement: 'mvt 2',
    file: 'audio/Haydn_ Symphony No. 88 in G Major, Hob. I_88_ II. Largo_spotdown.org.mp3',
  },
  {
    title: 'Haydn, Symphony No. 88 in G Major: mvt 3',
    artist: 'Haydn',
    piece: 'Symphony No. 88 in G Major',
    movement: 'mvt 3',
    file: 'audio/Haydn_ Symphony No. 88 in G Major, Hob. I_88_ III. Menuetto - Trio_spotdown.org.mp3',
  },
  {
    title: 'Haydn, Symphony No. 88 in G Major: mvt 4',
    artist: 'Haydn',
    piece: 'Symphony No. 88 in G Major',
    movement: 'mvt 4',
    file: 'audio/Haydn_ Symphony No. 88 in G Major, Hob. I_88_ IV. Finale. Allegro con spirito_spotdown.org.mp3',
  },
  {
    title: 'Mozart, "Der Vogelfänger bin ich ja" from The Magic Flute',
    artist: 'Mozart',
    piece: 'The Magic Flute',
    movement: 'Der Vogelfänger bin ich ja',
    file: "audio/Mozart_ Die Zauberflöte, K. 620, Act I_ 'Der Vogelfänger bin ich ja'_spotdown.org.mp3",
  },
  {
    title: 'Mozart, "Bei Männern, welche Liebe fühlen" from The Magic Flute',
    artist: 'Mozart',
    piece: 'The Magic Flute',
    movement: 'Bei Männern, welche Liebe fühlen',
    file: 'audio/Die Zauberflöte, K.620 _ Act 1_ _Bei Männern, welche Liebe fühlen__spotdown.org.mp3',
  },
  {
    title: 'Mozart, "Der Hölle Rache kocht in meinem Herzen" from The Magic Flute',
    artist: 'Mozart',
    piece: 'The Magic Flute',
    movement: 'Der Hölle Rache kocht in meinem Herzen',
    file: 'audio/Die Zauberflöte, K.620 _ Act 2_ _Der Hölle Rache kocht in meinem Herze__spotdown.org.mp3',
  },
  {
    title: 'Mozart, "Pa-Pa-Pa-Pa-Pa-Pa-Papagena!" from The Magic Flute',
    artist: 'Mozart',
    piece: 'The Magic Flute',
    movement: 'Papagena! Papagena! Papagena!',
    file: 'audio/Die Zauberflöte, K.620 _ Act 2_ _Pa-Pa-Pa-Pa-Pa-Pa-Papagena!__spotdown.org.mp3',
  },
  {
    title: 'Beethoven, Symphony No. 5 in C Minor: mvt 1',
    artist: 'Beethoven',
    piece: 'Symphony No. 5 in C Minor',
    movement: 'mvt 1',
    file: 'audio/Symphony No. 5 in C Minor, Op. 67_ I. Allegro con brio_spotdown.org.mp3',
  },
  {
    title: 'Beethoven, Symphony No. 5 in C Minor: mvt 2',
    artist: 'Beethoven',
    piece: 'Symphony No. 5 in C Minor',
    movement: 'mvt 2',
    file: 'audio/Symphony No. 5 in C Minor, Op. 67_ II. Andante con moto_spotdown.org.mp3',
  },
  {
    title: 'Beethoven, Symphony No. 5 in C Minor: mvt 3',
    artist: 'Beethoven',
    piece: 'Symphony No. 5 in C Minor',
    movement: 'mvt 3',
    file: 'audio/Symphony No. 5 in C Minor, Op. 67_ III. Scherzo. Allegro_spotdown.org.mp3',
  },
  {
    title: 'Beethoven, Symphony No. 5 in C Minor: mvt 4',
    artist: 'Beethoven',
    piece: 'Symphony No. 5 in C Minor',
    movement: 'mvt 4',
    file: 'audio/Symphony No. 5 in C Minor, Op. 67_ IV. Finale. Allegro_spotdown.org.mp3',
  },
  {
    title: 'Brahms, A German Requiem: mvt 4',
    artist: 'Brahms',
    piece: 'A German Requiem',
    movement: 'mvt 4',
    file: 'audio/Brahms_ Ein deutsches Requiem, Op. 45_ IV. Wie lieblich sind deine Wohnungen_spotdown.org.mp3',
  },
  {
    title: 'Wagner, Tristan und Isolde: Prelude',
    artist: 'Wagner',
    piece: 'Tristan und Isolde',
    movement: 'Prelude',
    file: 'audio/Tristan und Isolde, Act I_ Prelude_spotdown.org.mp3',
  },
];

let currentSong = null;
let currentClipLength = Number(clipLengthSelect.value);
let currentRound = 0;
let correctSongs = new Set();
let remainingSongs = [];
let selectedAnswerIndex = null;
let clipEndTimeout = null;
let clipStartTime = 0;
let clipEndTime = 0;
let studyAudioElements = [];

function shuffle(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function getRandomSong(pool) {
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

function getChoices(correctSong, answerCount) {
  if (answerCount === 'all' || Number(answerCount) >= songs.length) {
    return songs.slice();
  }

  const count = Math.max(2, Number(answerCount));
  const otherSongs = songs.filter((song) => song !== correctSong);
  const chosenOthers = shuffle(otherSongs).slice(0, count - 1);
  return shuffle([correctSong, ...chosenOthers]);
}

function formatTime(seconds) {
  const rounded = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(rounded / 60);
  const secs = rounded % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function normalizeAnswer(value) {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/["'’–—­]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseMovementNumber(value) {
  const normalized = normalizeAnswer(value);
  const match = normalized.match(/(\d+)/);
  if (match) {
    return Number(match[1]);
  }

  const romanMap = {
    i: 1,
    ii: 2,
    iii: 3,
    iv: 4,
    v: 5,
    vi: 6,
    vii: 7,
    viii: 8,
  };
  const romanMatch = normalized.match(/\b(i{1,4}|v|vi{0,3}|vii|viii)\b/);
  if (romanMatch) {
    return romanMap[romanMatch[1]] || null;
  }

  return null;
}

function matchesTypedAnswer(expected, guess, field) {
  const expectedNormalized = normalizeAnswer(expected);
  const guessNormalized = normalizeAnswer(guess);

  if (field === 'movement') {
    const expectedNumber = parseMovementNumber(expected);
    const guessNumber = parseMovementNumber(guess);
    if (expectedNumber && guessNumber) {
      return expectedNumber === guessNumber;
    }
    return expectedNormalized === guessNormalized;
  }

  return expectedNormalized === guessNormalized;
}

function updateAudioProgress() {
  if (!currentSong) {
    audioProgress.value = 0;
    currentTimeEl.textContent = '0:00';
    remainingTimeEl.textContent = '0:00';
    return;
  }

  const current = Math.max(clipStartTime, Math.min(audioPlayer.currentTime, clipEndTime));
  const played = current - clipStartTime;
  const duration = Math.max(0, clipEndTime - clipStartTime);
  const percent = duration ? (played / duration) * 100 : 0;

  audioProgress.value = percent;
  currentTimeEl.textContent = formatTime(played);
  remainingTimeEl.textContent = formatTime(duration - played);
}

function updateScoreboard() {
  roundCountEl.textContent = currentRound;
  scoreCountEl.textContent = correctSongs.size;
  totalCountEl.textContent = songs.length;
}

function setMessage(text, variant = 'neutral') {
  messageEl.textContent = text;
  messageEl.dataset.variant = variant;
}

function resetChoices() {
  choicesContainer.innerHTML = '';
  selectedAnswerIndex = null;
}

function updateAnswerModeUI() {
  const textMode = answerModeSelect.value === 'text';
  textAnswerPanel.classList.toggle('hidden', !textMode);
  answerCountSelect.disabled = textMode;
  if (textMode) {
    choicesContainer.innerHTML = '';
  }
}

function setAudioTransportState(enabled) {
  playClipButton.disabled = !enabled;
  stopClipButton.disabled = !enabled;
  restartClipButton.disabled = !enabled;
  skipClipButton.disabled = !enabled;
}

function showQuizTab() {
  quizTabButton.classList.add('active');
  studyTabButton.classList.remove('active');
  quizView.classList.remove('hidden');
  studyView.classList.add('hidden');
}

function showStudyTab() {
  quizTabButton.classList.remove('active');
  studyTabButton.classList.add('active');
  quizView.classList.add('hidden');
  studyView.classList.remove('hidden');
}

function renderStudyList() {
  studyListContainer.innerHTML = '';
  studyAudioElements = [];

  songs.forEach((song, index) => {
    const item = document.createElement('article');
    item.className = 'study-item';

    const title = document.createElement('div');
    title.className = 'study-title';
    title.textContent = song.title;

    const controlsRow = document.createElement('div');
    controlsRow.className = 'study-controls-row';

    const audio = document.createElement('audio');
    audio.src = song.file;
    audio.preload = 'metadata';

    const playButton = document.createElement('button');
    playButton.type = 'button';
    playButton.textContent = 'Play';

    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.textContent = 'Pause';

    const progress = document.createElement('input');
    progress.type = 'range';
    progress.className = 'study-progress';
    progress.min = '0';
    progress.max = '100';
    progress.value = '0';

    const timeLabel = document.createElement('span');
    timeLabel.className = 'study-time';
    timeLabel.textContent = '0:00 / 0:00';

    playButton.addEventListener('click', () => {
      studyAudioElements.forEach((other) => {
        if (other !== audio) {
          other.pause();
        }
      });
      audio.play();
    });

    pauseButton.addEventListener('click', () => {
      audio.pause();
    });

    progress.addEventListener('input', () => {
      if (!isNaN(audio.duration)) {
        audio.currentTime = (progress.value / 100) * audio.duration;
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (!isNaN(audio.duration)) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.value = String(percent);
        timeLabel.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      timeLabel.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
    });

    audio.addEventListener('ended', () => {
      progress.value = '100';
    });

    controlsRow.appendChild(playButton);
    controlsRow.appendChild(pauseButton);
    controlsRow.appendChild(progress);
    controlsRow.appendChild(timeLabel);
    item.appendChild(title);
    item.appendChild(controlsRow);
    item.appendChild(audio);
    studyListContainer.appendChild(item);
    studyAudioElements.push(audio);
  });
}

function setActiveTab(tabName) {
  if (tabName === 'study') {
    showStudyTab();
  } else {
    showQuizTab();
  }
}

function pauseAllStudyAudio() {
  studyAudioElements.forEach((audio) => audio.pause());
}

function updateAnswerModeUI() {
  const textMode = answerModeSelect.value === 'text';
  textAnswerPanel.classList.toggle('hidden', !textMode);
  answerCountSelect.disabled = textMode;
  if (textMode) {
    choicesContainer.innerHTML = '';
  }
}

function disableAnswerButtons(disabled) {
  const buttons = choicesContainer.querySelectorAll('button');
  buttons.forEach((button) => {
    button.disabled = disabled;
  });
}

function renderChoices(answerOptions) {
  resetChoices();
  answerOptions.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'choice-button';
    button.textContent = option.title;
    button.addEventListener('click', () => handleAnswer(index, option));
    choicesContainer.appendChild(button);
  });
}

function submitTypedAnswer() {
  if (!currentSong) {
    setMessage('Start the quiz first to hear a clip.', 'error');
    return;
  }

  const guess = textAnswerInput.value.trim();
  if (!guess) {
    setMessage('Please type an answer before submitting.', 'error');
    return;
  }

  const field = typedFieldSelect.value;
  const expected = field === 'all'
    ? currentSong.title
    : currentSong[field];
  const correct = matchesTypedAnswer(expected, guess, field);

  textAnswerInput.disabled = true;
  submitAnswerButton.disabled = true;

  if (correct) {
    markSongCorrect();
    setMessage('Nice! Your typed answer is correct. Press Next Clip to continue.', 'success');
  } else {
    const hint = field === 'all'
      ? currentSong.title
      : expected;
    setMessage(`Not quite. The correct answer is: ${hint}`, 'error');
  }

  updateScoreboard();
  if (remainingSongs.length > 0) {
    nextClipButton.disabled = false;
    nextClipButton.classList.remove('hidden');
  } else {
    nextClipButton.disabled = true;
    nextClipButton.classList.add('hidden');
    finishQuiz();
  }
}

function markSongCorrect() {
  if (!correctSongs.has(currentSong.title)) {
    correctSongs.add(currentSong.title);
    remainingSongs = remainingSongs.filter((song) => song !== currentSong);
  }
}

function handleAnswer(index, option) {
  if (selectedAnswerIndex !== null) {
    return;
  }

  selectedAnswerIndex = index;
  const buttons = choicesContainer.querySelectorAll('button');
  const correct = option === currentSong;

  buttons.forEach((button, buttonIndex) => {
    if (buttonIndex === index) {
      button.classList.add(correct ? 'correct' : 'wrong');
    }
    if (answerOptions[buttonIndex] === currentSong) {
      button.classList.add('correct');
    }
    button.disabled = true;
  });

  if (correct) {
    markSongCorrect();
    setMessage('Nice! That choice is correct. Press Next Clip to continue.', 'success');
  } else {
    setMessage(`Not quite. The correct answer is: ${currentSong.title}`, 'error');
  }

  updateScoreboard();
  if (remainingSongs.length > 0) {
    nextClipButton.disabled = false;
    nextClipButton.classList.remove('hidden');
  } else {
    nextClipButton.disabled = true;
    nextClipButton.classList.add('hidden');
    finishQuiz();
  }
}

let answerOptions = [];

function chooseNewClip() {
  if (remainingSongs.length === 0) {
    finishQuiz();
    return;
  }

  currentSong = getRandomSong(remainingSongs);
  const answerCount = answerCountSelect.value;
  answerOptions = getChoices(currentSong, answerCount);
  updateAnswerModeUI();
  if (answerModeSelect.value === 'multiple') {
    renderChoices(answerOptions);
  }

  textAnswerInput.value = '';
  textAnswerInput.disabled = false;
  currentClipLength = Number(clipLengthSelect.value);
  playClipButton.disabled = false;
  stopClipButton.disabled = false;
  restartClipButton.disabled = false;
  skipClipButton.disabled = false;
  submitAnswerButton.disabled = answerModeSelect.value !== 'text';
  nextClipButton.disabled = true;
  nextClipButton.classList.add('hidden');
  setAudioTransportState(true);
  audioProgress.disabled = false;
  updateAudioProgress();
  const promptText = answerModeSelect.value === 'text'
    ? `Listen to the clip and type the ${typedFieldSelect.options[typedFieldSelect.selectedIndex].text.toLowerCase()}.`
    : 'Listen to the clip and pick the correct title.';
  setMessage(promptText, 'neutral');
  loadAudioClip();
}

function loadAudioClip() {
  audioPlayer.pause();
  if (clipEndTimeout) {
    clearTimeout(clipEndTimeout);
    clipEndTimeout = null;
  }

  audioPlayer.src = currentSong.file;
  audioPlayer.load();
  audioPlayer.addEventListener('loadedmetadata', onMetadataLoaded, { once: true });
}

function onMetadataLoaded() {
  const duration = audioPlayer.duration || 0;
  const maxStart = Math.max(0, duration - currentClipLength);
  clipStartTime = Math.random() * maxStart;
  clipEndTime = Math.min(duration, clipStartTime + currentClipLength);
  audioPlayer.currentTime = clipStartTime;
  updateAudioProgress();
}

function playClip() {
  if (!currentSong) {
    setMessage('Start the quiz first to hear a clip.', 'error');
    return;
  }

  audioPlayer.pause();
  if (clipEndTimeout) {
    clearTimeout(clipEndTimeout);
  }

  const clipStart = Math.max(clipStartTime, Math.min(audioPlayer.currentTime, clipEndTime));
  audioPlayer.currentTime = clipStart;

  audioPlayer.play().catch((error) => {
    console.error(error);
    setMessage('Unable to play audio automatically. Click Play Clip again.', 'error');
  });

  clipEndTimeout = setTimeout(() => {
    audioPlayer.pause();
  }, (clipEndTime - clipStart) * 1000 + 50);
}

function startQuiz() {
  currentRound = 0;
  correctSongs = new Set();
  remainingSongs = songs.slice();
  updateScoreboard();
  clipLengthSelect.disabled = true;
  answerModeSelect.disabled = true;
  answerCountSelect.disabled = answerModeSelect.value === 'text';
  typedFieldSelect.disabled = answerModeSelect.value !== 'text';
  submitAnswerButton.disabled = answerModeSelect.value !== 'text';
  startQuizButton.textContent = 'Restart Quiz';
  chooseNextRound();
}

function finishQuiz() {
  setMessage(`Excellent! You have identified all ${songs.length} works correctly. Click Restart Quiz to play again.`, 'success');
  nextClipButton.disabled = true;
  nextClipButton.classList.add('hidden');
  stopClipButton.disabled = true;
  restartClipButton.disabled = true;
  playClipButton.disabled = true;
  skipClipButton.disabled = true;
  submitAnswerButton.disabled = true;
  textAnswerInput.disabled = true;
  audioProgress.disabled = true;
  clipLengthSelect.disabled = false;
  answerModeSelect.disabled = false;
  answerCountSelect.disabled = answerModeSelect.value === 'text';
  typedFieldSelect.disabled = answerModeSelect.value !== 'text';
  startQuizButton.disabled = false;
}

function chooseNextRound() {
  currentRound += 1;
  updateScoreboard();
  chooseNewClip();
}

startQuizButton.addEventListener('click', startQuiz);
nextClipButton.addEventListener('click', chooseNextRound);
playClipButton.addEventListener('click', playClip);
stopClipButton.addEventListener('click', () => {
  if (!currentSong) return;
  audioPlayer.pause();
  if (clipEndTimeout) {
    clearTimeout(clipEndTimeout);
    clipEndTimeout = null;
  }
  setMessage('Audio stopped. Press Play to resume or Restart to start over.', 'neutral');
});
restartClipButton.addEventListener('click', () => {
  if (!currentSong) return;
  if (clipEndTimeout) {
    clearTimeout(clipEndTimeout);
    clipEndTimeout = null;
  }
  audioPlayer.currentTime = clipStartTime;
  updateAudioProgress();
  playClip();
});
skipClipButton.addEventListener('click', () => {
  if (!currentSong) return;
  audioPlayer.pause();
  if (clipEndTimeout) {
    clearTimeout(clipEndTimeout);
    clipEndTimeout = null;
  }
  setMessage('Clip skipped. Loading the next one.', 'neutral');
  chooseNextRound();
});
answerModeSelect.addEventListener('change', updateAnswerModeUI);
submitAnswerButton.addEventListener('click', submitTypedAnswer);
textAnswerInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && answerModeSelect.value === 'text') {
    event.preventDefault();
    submitTypedAnswer();
  }
});

audioPlayer.addEventListener('timeupdate', updateAudioProgress);
audioPlayer.addEventListener('pause', updateAudioProgress);

quizTabButton.addEventListener('click', () => {
  setActiveTab('quiz');
  pauseAllStudyAudio();
});
studyTabButton.addEventListener('click', () => {
  setActiveTab('study');
  renderStudyList();
});

audioProgress.addEventListener('input', () => {
  if (!currentSong) return;
  const duration = Math.max(0, clipEndTime - clipStartTime);
  const targetTime = clipStartTime + (audioProgress.value / 100) * duration;
  audioPlayer.currentTime = Math.min(targetTime, clipEndTime);
  updateAudioProgress();
});

updateAnswerModeUI();
renderStudyList();
setMessage('Click Start Quiz to begin.', 'neutral');
