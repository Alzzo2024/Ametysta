let currentAudio = null;

function toggleMusicBox(category) {
    const boxes = document.querySelectorAll('.music-box');
    boxes.forEach(box => box.style.display = 'none');
    document.querySelectorAll(`.${category}`).forEach(box => box.style.display = 'flex');
}

function searchMusic() {
    const searchTerm = document.querySelector('.search-bar').value.toLowerCase();
    const musicBoxes = document.querySelectorAll('.music-box');
    musicBoxes.forEach(box => {
        const title = box.querySelector('.title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            box.style.display = 'flex';
        } else {
            box.style.display = 'none';
        }
    });
}

// Inicialmente oculta todas as caixas de música
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.music-box').forEach(box => box.style.display = 'none');
});

function playMusic(category, audioSrc) {
    if (currentAudio) {
        currentAudio.pause();
    }

    const audio = new Audio(audioSrc);
    currentAudio = audio;
    audio.play();
}

function stopMusic() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
}

function restartMusic() {
    if (currentAudio) {
        currentAudio.currentTime = 0;
        currentAudio.play();
    }
}
