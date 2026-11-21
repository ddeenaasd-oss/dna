const rounds = [
  {
    city: 'Kyoto, Jepang', lat: 35.0116, lon: 135.7681,
    title: 'Gerbang menuju ketenangan',
    clue: 'Di kota ini, ribuan gerbang merah membentuk jalan setapak menuju kuil di tengah hutan. Musim semi membawa bunga sakura ke setiap sudut.',
    tags: ['Asia Timur', 'Kuil & tradisi', 'Bunga sakura'], icon: '⛩️', foreground: '🌸', sky: 'linear-gradient(180deg, #b6dcdf 0%, #f2e4c5 65%, #98b88e 66%, #547c5b 100%)'
  },
  {
    city: 'Santorini, Yunani', lat: 36.3932, lon: 25.4615,
    title: 'Putih, biru, dan laut lepas',
    clue: 'Rumah-rumah putih beratap kubah biru bertengger di tebing kaldera. Pulau ini berada di Laut Aegea, jauh di tenggara daratan utama.',
    tags: ['Eropa Selatan', 'Pulau vulkanik', 'Laut Aegea'], icon: '🏛️', foreground: '🌊', sky: 'linear-gradient(180deg, #8bc9df 0%, #d7edf0 56%, #4cacc0 57%, #25849e 100%)'
  },
  {
    city: 'Marrakesh, Maroko', lat: 31.6295, lon: -7.9811,
    title: 'Warna rempah di kota tua',
    clue: 'Di balik tembok merah bata, labirin pasar dipenuhi rempah, karpet, dan lentera. Pegunungan Atlas tampak di kejauhan saat langit cerah.',
    tags: ['Afrika Utara', 'Kota bersejarah', 'Pegunungan Atlas'], icon: '🕌', foreground: '🌴', sky: 'linear-gradient(180deg, #f5c98d 0%, #f9e4ad 59%, #c68454 60%, #8f5b45 100%)'
  },
  {
    city: 'Rio de Janeiro, Brasil', lat: -22.9068, lon: -43.1729,
    title: 'Kota di antara gunung dan laut',
    clue: 'Patung raksasa dengan tangan terbuka mengawasi teluk, pantai, dan puncak-puncak hijau. Kota ini terkenal dengan karnaval dan ritme samba.',
    tags: ['Amerika Selatan', 'Pantai tropis', 'Samba'], icon: '⛰️', foreground: '🏖️', sky: 'linear-gradient(180deg, #8bd2d0 0%, #dbefc8 55%, #62a77a 56%, #27745e 100%)'
  },
  {
    city: 'Reykjavík, Islandia', lat: 64.1466, lon: -21.9426,
    title: 'Di negeri api dan es',
    clue: 'Rumah-rumah berwarna cerah menghadap Atlantik Utara. Tak jauh dari sini ada mata air panas, ladang lava, dan peluang melihat cahaya utara.',
    tags: ['Eropa Utara', 'Atlantik Utara', 'Cahaya utara'], icon: '🏠', foreground: '❄️', sky: 'linear-gradient(180deg, #a9c4d6 0%, #dce9e4 62%, #aabeb3 63%, #6e9288 100%)'
  },
  {
    city: 'Cape Town, Afrika Selatan', lat: -33.9249, lon: 18.4241,
    title: 'Di bawah gunung berpuncak datar',
    clue: 'Sebuah gunung bersiluet datar menjadi latar kota pelabuhan ini. Dua samudra bertemu tidak jauh dari sini, di ujung selatan benua.',
    tags: ['Afrika Selatan', 'Kota pesisir', 'Table Mountain'], icon: '⛰️', foreground: '🌊', sky: 'linear-gradient(180deg, #a8d6dd 0%, #e9e8cf 58%, #92a779 59%, #568176 100%)'
  },
  {
    city: 'Jaipur, India', lat: 26.9124, lon: 75.7873,
    title: 'Kota merah muda',
    clue: 'Benteng megah, istana, dan fasad berwarna merah muda memenuhi kota di wilayah Rajasthan. Salah satu istananya punya banyak jendela kecil seperti sarang lebah.',
    tags: ['Asia Selatan', 'Istana', 'Rajasthan'], icon: '🏰', foreground: '🌺', sky: 'linear-gradient(180deg, #f3c9a6 0%, #f3e1bc 58%, #c88968 59%, #93614e 100%)'
  },
  {
    city: 'New York, Amerika Serikat', lat: 40.7128, lon: -74.006,
    title: 'Cakrawala yang tak pernah tidur',
    clue: 'Pulau-pulau, jembatan ikonis, dan gedung pencakar langit membentuk kota yang dijuluki Big Apple. Taman besar berada tepat di tengah hiruk-pikuknya.',
    tags: ['Amerika Utara', 'Kota metropolitan', 'Big Apple'], icon: '🏙️', foreground: '🚕', sky: 'linear-gradient(180deg, #9dc2dc 0%, #e3e7d9 57%, #768f83 58%, #3e5d54 100%)'
  }
];

const ROUND_COUNT = 5;
const roundNumber = document.getElementById('roundNumber');
const scoreElement = document.getElementById('score');
const roundScoreElement = document.getElementById('roundScore');
const distanceElement = document.getElementById('distance');
const distanceNoteElement = document.getElementById('distanceNote');
const clueTitle = document.getElementById('clueTitle');
const clueText = document.getElementById('clueText');
const clueTags = document.getElementById('clueTags');
const sceneArt = document.getElementById('sceneArt');
const sceneLandmark = document.getElementById('sceneLandmark');
const sceneForeground = document.getElementById('sceneForeground');
const mapHitArea = document.getElementById('mapHitArea');
const mapMarkers = document.getElementById('mapMarkers');
const mapWrap = document.getElementById('mapWrap');
const guessCoords = document.getElementById('guessCoords');
const mapInstruction = document.getElementById('mapInstruction');
const actionButton = document.getElementById('actionButton');
const actionLabel = document.getElementById('actionLabel');
const playerForm = document.getElementById('playerForm');
const playerNameInput = document.getElementById('playerName');
const playerDisplay = document.getElementById('playerDisplay');
const gameLayout = document.querySelector('.game-layout');

let gameRounds = [];
let roundIndex = 0;
let totalScore = 0;
let currentGuess = null;
let roundRevealed = false;
let finished = false;
let playerName = '';

function startGame() {
  gameRounds = [...rounds].sort(() => Math.random() - 0.5).slice(0, ROUND_COUNT);
  roundIndex = 0;
  totalScore = 0;
  finished = false;
  scoreElement.textContent = '0';
  playerDisplay.textContent = playerName;
  gameLayout.hidden = false;
  playerForm.hidden = true;
  showRound();
}

function showRound() {
  const round = gameRounds[roundIndex];
  currentGuess = null;
  roundRevealed = false;
  roundNumber.textContent = roundIndex + 1;
  clueTitle.textContent = round.title;
  clueText.textContent = round.clue;
  clueTags.replaceChildren(...round.tags.map((tag) => {
    const chip = document.createElement('span');
    chip.textContent = tag;
    return chip;
  }));
  sceneLandmark.textContent = round.icon;
  sceneForeground.textContent = round.foreground;
  sceneArt.style.background = round.sky;
  sceneArt.dataset.place = roundIndex;
  roundScoreElement.textContent = '—';
  distanceElement.textContent = 'Tebak lokasinya';
  distanceNoteElement.textContent = 'Makin dekat, makin tinggi skor';
  guessCoords.textContent = 'Belum ada tebakan';
  mapInstruction.textContent = 'Klik peta untuk meletakkan tebakanmu';
  mapMarkers.replaceChildren();
  actionLabel.textContent = 'Kunci tebakan';
  actionButton.querySelector('.button-arrow').textContent = '→';
  actionButton.disabled = true;
  actionButton.hidden = false;
}

function placeGuess(event) {
  if (roundRevealed || finished) return;
  const rect = mapHitArea.getBoundingClientRect();
  const x = Math.max(0, Math.min(1000, ((event.clientX - rect.left) / rect.width) * 1000));
  const y = Math.max(0, Math.min(500, ((event.clientY - rect.top) / rect.height) * 500));
  currentGuess = { x, y, lat: 90 - y * 180 / 500, lon: x * 360 / 1000 - 180 };
  drawMarkers();
  guessCoords.textContent = `${currentGuess.lat.toFixed(1)}°, ${currentGuess.lon.toFixed(1)}°`;
  mapInstruction.textContent = 'Pin sudah terpasang — yakin dengan tebakanmu?';
  actionButton.disabled = false;
}

function lockGuess() {
  if (finished) {
    startGame();
    return;
  }
  if (roundRevealed) {
    roundIndex += 1;
    if (roundIndex >= ROUND_COUNT) showFinalScore();
    else showRound();
    return;
  }
  if (!currentGuess) return;

  const round = gameRounds[roundIndex];
  const distance = distanceKm(currentGuess.lat, currentGuess.lon, round.lat, round.lon);
  const isCorrect = distance <= 100;
  const points = Math.round(5000 * Math.exp(-distance / 2000));
  totalScore += points;
  scoreElement.textContent = totalScore.toLocaleString('id-ID');
  roundScoreElement.textContent = `+${points.toLocaleString('id-ID')}`;
  distanceElement.textContent = isCorrect ? 'Jawaban benar!' : 'Belum tepat';
  distanceNoteElement.textContent = `${formatDistance(distance)} · Lokasi: ${round.city}`;
  mapInstruction.textContent = isCorrect ? `Benar! Lokasinya ${round.city}` : `Belum tepat — lokasi sebenarnya: ${round.city}`;
  roundRevealed = true;
  drawMarkers({ x: (round.lon + 180) * 1000 / 360, y: (90 - round.lat) * 500 / 180 });
  actionLabel.textContent = roundIndex === ROUND_COUNT - 1 ? 'Lihat hasil akhir' : 'Ronde berikutnya';
  actionButton.querySelector('.button-arrow').textContent = '→';
  actionButton.disabled = false;
}

function drawMarkers(answerPoint) {
  mapMarkers.replaceChildren();
  const ns = 'http://www.w3.org/2000/svg';
  if (answerPoint && currentGuess) {
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', currentGuess.x);
    line.setAttribute('y1', currentGuess.y);
    line.setAttribute('x2', answerPoint.x);
    line.setAttribute('y2', answerPoint.y);
    line.setAttribute('class', 'guess-line');
    mapMarkers.appendChild(line);
  }
  if (answerPoint) addMarker(answerPoint.x, answerPoint.y, 'answer-marker');
  if (currentGuess) addMarker(currentGuess.x, currentGuess.y, 'guess-marker');
}

function addMarker(x, y, className) {
  const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  marker.setAttribute('cx', x);
  marker.setAttribute('cy', y);
  marker.setAttribute('r', '9');
  marker.setAttribute('class', className);
  mapMarkers.appendChild(marker);
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const radians = (degrees) => degrees * Math.PI / 180;
  const dLat = radians(lat2 - lat1);
  const dLon = radians(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(radians(lat1)) * Math.cos(radians(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(distance) {
  return distance < 1000 ? `${Math.round(distance)} km jauhnya` : `${(distance / 1000).toFixed(1)} ribu km jauhnya`;
}

function showFinalScore() {
  finished = true;
  roundNumber.textContent = '5';
  clueTitle.textContent = 'Petualangan selesai!';
  clueText.textContent = `${playerName}, kamu berhasil menjelajahi ${ROUND_COUNT} tempat di dunia. Total skormu ${totalScore.toLocaleString('id-ID')} poin.`;
  clueTags.replaceChildren();
  sceneLandmark.textContent = '🌍';
  sceneForeground.textContent = '✈️';
  sceneArt.style.background = 'linear-gradient(180deg, #b4d9db 0%, #e8edcd 60%, #83b88d 61%, #378765 100%)';
  mapMarkers.replaceChildren();
  mapInstruction.textContent = 'Siap menjelajahi dunia lagi?';
  roundScoreElement.textContent = 'Selesai';
  distanceElement.textContent = totalScore >= 15000 ? 'Penjelajah andal!' : 'Perjalanan yang seru!';
  distanceNoteElement.textContent = 'Skor akhir dari 5 ronde';
  actionLabel.textContent = 'Main lagi';
  actionButton.querySelector('.button-arrow').textContent = '↻';
  actionButton.disabled = false;
}

playerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const enteredName = playerNameInput.value.trim();
  if (!enteredName) {
    playerNameInput.focus();
    return;
  }
  playerName = enteredName;
  startGame();
});

mapHitArea.addEventListener('click', placeGuess);
actionButton.addEventListener('click', lockGuess);
