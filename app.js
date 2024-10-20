const musicList = [
    { title: "Musica1Template", artist: "...", cover: "https://example.com/shape-of-you.jpg", file: "https://example.com/shape-of-you.mp3" },
    { title: "Musica1Template", artist: "...", cover: "https://example.com/blinding-lights.jpg", file: "https://example.com/blinding-lights.mp3" },
    { title: "Musica1Template", artist: "...", cover: "https://example.com/dance-monkey.jpg", file: "https://example.com/dance-monkey.mp3" },
    { title: "Musica1Template", artist: "...", cover: "https://example.com/someone-you-loved.jpg", file: "https://example.com/someone-you-loved.mp3" },
];

const prayerList = [
    "Padre Nosso",
    "Ave Maria",
    "Salve Rainha",
    "Oração da Serenidade",
    "Oração de São Francisco",
    "Anjo da Guarda",
    "Sancto Rosario",
];

let currentSongIndex = 0;
let audio = new Audio(musicList[currentSongIndex].file);

const tabs = {
    musicas: () => `
        <h2><i class="fas fa-music"></i> Músicas</h2>
        <div class="music-grid">
            ${musicList.map((song, index) => `
                <div class="music-item" onclick="playSong(${index})">
                    <img src="${song.cover}" alt="${song.title}">
                    <p>${song.title} - ${song.artist}</p>
                </div>
            `).join('')}
        </div>
    `,
    oracoes: `
        <h2><i class="fas fa-pray"></i> Orações</h2>
        <ul class="prayer-list">
            ${prayerList.map(prayer => `<li>${prayer}</li>`).join('')}
        </ul>
    `,
    player: () => `
        <h2><i class="fas fa-play-circle"></i> Player de Música</h2>
        <div class="player-controls">
            <button onclick="previousSong()"><i class="fas fa-step-backward"></i></button>
            <button onclick="togglePlay()"><i class="fas fa-play" id="play-pause-icon"></i></button>
            <button onclick="nextSong()"><i class="fas fa-step-forward"></i></button>
        </div>
        <p id="current-song">Música atual: ${musicList[currentSongIndex].title} - ${musicList[currentSongIndex].artist}</p>
        <audio id="audio-player" src="${musicList[currentSongIndex].file}" controls></audio>
    `
};

function showTab(tabName) {
    const content = document.getElementById('content');
    content.innerHTML = typeof tabs[tabName] === 'function' ? tabs[tabName]() : tabs[tabName];
    
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    
    const selectedTab = document.querySelector(`.tab[data-tab="${tabName}"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    if (tabName === 'player') {
        updatePlayerUI();
    }
}

function playSong(index) {
    currentSongIndex = index;
    audio.src = musicList[currentSongIndex].file;
    audio.play();
    showTab('player');
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    updatePlayerUI();
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + musicList.length) % musicList.length;
    playSong(currentSongIndex);
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % musicList.length;
    playSong(currentSongIndex);
}

function updatePlayerUI() {
    const playPauseIcon = document.getElementById('play-pause-icon');
    if (playPauseIcon) {
        playPauseIcon.className = audio.paused ? 'fas fa-play' : 'fas fa-pause';
    }
    const currentSongElement = document.getElementById('current-song');
    if (currentSongElement) {
        currentSongElement.textContent = `Música atual: ${musicList[currentSongIndex].title} - ${musicList[currentSongIndex].artist}`;
    }
}

audio.addEventListener('ended', () => {
    nextSong();
});

// Mostrar a aba de músicas por padrão
showTab('musicas');
