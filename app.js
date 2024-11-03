// Music List Data
const musicList = [
    { 
        id: '1',
        title: "This is", 
        artist: "Aurora", 
        cover: "https://example.com/shape-of-you.jpg", 
        file: "https://example.com/shape-of-you.mp3" 
    },
    { 
        id: '2',
        title: "just", 
        artist: "Aurora", 
        cover: "https://example.com/blinding-lights.jpg", 
        file: "https://example.com/blinding-lights.mp3" 
    },
    { 
        id: '3',
        title: "a", 
        artist: "Aurora", 
        cover: "https://example.com/dance-monkey.jpg", 
        file: "https://example.com/dance-monkey.mp3" 
    },
    { 
        id: '4',
        title: "Test", 
        artist: "Aurora", 
        cover: "https://example.com/someone-you-loved.jpg", 
        file: "https://example.com/someone-you-loved.mp3" 
    }
];

// Prayer Categories Data
const prayerCategories = {
    populares: {
        title: "Orações Populares",
        prayers: [
            {
                title: "Pai Nosso",
                text: "Pai Nosso que estais nos Céus",
                tag: "populares"
            },
            {
                title: "Ave Maria",
                text: "Ave Maria, cheia de graça, o senhor é convosco, bendita sois vos entre as mulheres e bendito e o fruti didchnhcus",
                tag: "populares"
            }
        ]
    },
    novenas: {
        title: "Novenas",
        prayers: [
            {
                title: "Novena à Nossa Senhora Aparecida",
                text: "Ó Senhora Aparecida, Mãe querida...",
                tag: "novenas"
            }
        ]
    },
    tercos: {
        title: "Terços",
        prayers: [
            {
                title: "Terço da Misericórdia",
                text: "Início do Terço da Misericórdia...",
                tag: "tercos"
            }
        ]
    }
};

// Tab Content Templates
const tabs = {
    musicas: () => `
        <div class="music-section">
            <h2><i class="fas fa-music"></i> Músicas</h2>
            <div class="music-grid">
                ${musicList.map((song, index) => `
                    <div class="music-item" data-song-id="${song.id}">
                        <img src="${song.cover}" alt="${song.title}" onclick="playSong(${index})">
                        <div class="song-info">
                            <h3>${song.title}</h3>
                            <p>${song.artist}</p>
                        </div>
                        <button class="download-btn" onclick="downloadSong(${index})">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `,
    
    oracoes: () => `
        <div class="prayers-section">
            <h2><i class="fas fa-pray"></i> Orações</h2>
            ${Object.entries(prayerCategories).map(([key, category]) => `
                <div class="prayer-category" data-category="${key}">
                    <h3>${category.title}</h3>
                    <div class="prayer-list">
                        ${category.prayers.map(prayer => `
                            <div class="prayer-item" onclick="showPrayer('${prayer.title}')">
                                <h4>${prayer.title}</h4>
                                <small>${prayer.tag}</small>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `,
    
    player: () => `
        <div class="player-section">
            <div class="now-playing">
                <img src="${musicList[currentSongIndex].cover}" alt="Current song">
                <div class="song-details">
                    <h3>${musicList[currentSongIndex].title}</h3>
                    <p>${musicList[currentSongIndex].artist}</p>
                </div>
            </div>
            <div class="player-controls">
                <button onclick="previousSong()"><i class="fas fa-step-backward"></i></button>
                <button onclick="togglePlay()" class="play-btn">
                    <i class="fas ${audio.paused ? 'fa-play' : 'fa-pause'}" id="play-pause-icon"></i>
                </button>
                <button onclick="nextSong()"><i class="fas fa-step-forward"></i></button>
            </div>
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
        </div>
    `,
    
    downloads: () => `
        <div class="downloads-section">
            <h2><i class="fas fa-download"></i> Downloads</h2>
            <div class="downloads-list">
                ${downloadedSongs.length ? downloadedSongs.map((song, index) => `
                    <div class="download-item">
                        <img src="${song.cover}" alt="${song.title}">
                        <div class="song-info">
                            <h3>${song.title}</h3>
                            <p>${song.artist}</p>
                        </div>
                        <button onclick="playSong(${index})">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                `).join('') : '<p class="no-downloads">Nenhuma música baixada ainda.</p>'}
            </div>
        </div>
    `
};

// Initialize variables
let currentSongIndex = 0;
let audio = new Audio();
let downloadedSongs = [];

// Core functions
function showTab(tabName) {
    const content = document.getElementById('content');
    content.innerHTML = tabs[tabName]();
    
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(tabName)) {
            btn.classList.add('active');
        }
    });
}

function playSong(index) {
    currentSongIndex = index;
    audio.src = musicList[index].file;
    audio.play();
    showTab('player');
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    document.getElementById('play-pause-icon').className = 
        `fas ${audio.paused ? 'fa-play' : 'fa-pause'}`;
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + musicList.length) % musicList.length;
    playSong(currentSongIndex);
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % musicList.length;
    playSong(currentSongIndex);
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    showTab('musicas');
    
    // Setup search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll('.music-item, .prayer-item').forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? 'block' : 'none';
        });
    });
    
    // Setup audio ended event
    audio.addEventListener('ended', nextSong);
});

// Make functions globally available
window.showTab = showTab;
window.playSong = playSong;
window.togglePlay = togglePlay;
window.previousSong = previousSong;
window.nextSong = nextSong;
