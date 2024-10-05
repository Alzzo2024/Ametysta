document.addEventListener('DOMContentLoaded', function() {
    const playPauseButton = document.getElementById('play-pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const progressBar = document.querySelector('.progress');
    const volumeBar = document.querySelector('.volume-progress');
    const currentTimeSpan = document.querySelector('.current-time');
    const totalTimeSpan = document.querySelector('.total-time');
    const audio = new Audio('musica-lofi.mp3');
    let isPlaying = false;

    // Play e Pause
    playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseButton.classList.replace('fa-pause-circle', 'fa-play-circle');
        } else {
            audio.play();
            playPauseButton.classList.replace('fa-play-circle', 'fa-pause-circle');
        }
        isPlaying = !isPlaying;
    });

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
        
        // Atualizar tempo atual
        const currentMinutes = Math.floor(audio.currentTime / 60);
        const currentSeconds = Math.floor(audio.currentTime % 60);
        currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
    });

    // Definir tempo total quando os metadados do áudio são carregados
    audio.addEventListener('loadedmetadata', () => {
        const totalMinutes = Math.floor(audio.duration / 60);
        const totalSeconds = Math.floor(audio.duration % 60);
        totalTimeSpan.textContent = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
    });

    // Controle de volume
    const volumeIcon = document.querySelector('.fa-volume-up');
    volumeIcon.addEventListener('click', () => {
        if (audio.volume > 0) {
            audio.volume = 0;
            volumeBar.style.width = '0%';
            volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
        } else {
            audio.volume = 0.5;
            volumeBar.style.width = '50%';
            volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
        }
    });

    // Ajustar volume
    const volumeContainer = document.querySelector('.volume-bar');
    volumeContainer.addEventListener('click', (e) => {
        const volumeWidth = volumeContainer.clientWidth;
        const clickX = e.offsetX;
        const volume = clickX / volumeWidth;
        audio.volume = volume;
        volumeBar.style.width = `${volume * 100}%`;
        
        if (volume > 0) {
            volumeIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
        } else {
            volumeIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
        }
    });

    // Login com GitHub
    const loginButton = document.getElementById('login-button');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');
    const headerAvatar = document.getElementById('header-avatar');
    const headerUserName = document.getElementById('header-user-name');

    loginButton.addEventListener('click', async (e) => {
        e.preventDefault();
        // Aqui você precisará implementar a autenticação OAuth com GitHub
        // Este é um exemplo simplificado e não seguro para fins de demonstração
        const clientId = 'SEU_CLIENT_ID_DO_GITHUB';
        const redirectUri = 'http://localhost:3000/callback';
        const scope = 'read:user';

        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    });

    // Função para atualizar o perfil do usuário após o login
    function updateUserProfile(avatarUrl, login) {
        userAvatar.src = avatarUrl;
        userName.textContent = login;
        headerAvatar.src = avatarUrl;
        headerUserName.textContent = login;
        loginButton.style.display = 'none';
    }

    // Adicionar funcionalidade para os itens da playlist
    const playlistItems = document.querySelectorAll('.playlist-item');
    playlistItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log('Playlist selecionada:', item.querySelector('h4').textContent);
        });
    });

    // Adicionar funcionalidade para o botão de curtir
    const likeButton = document.querySelector('.fa-heart');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('fas');
        likeButton.classList.toggle('far');
    });

    // Adicionar funcionalidade para o botão de aleatório
    const shuffleButton = document.querySelector('.fa-random');
    shuffleButton.addEventListener('click', () => {
        shuffleButton.classList.toggle('active');
        // Implementar lógica de reprodução aleatória aqui
    });

    // Adicionar funcionalidade para o botão de repetição
    const repeatButton = document.querySelector('.fa-redo-alt');
    repeatButton.addEventListener('click', () => {
        repeatButton.classList.toggle('active');
        // Implementar lógica de repetição aqui
    });

    // Adicionar funcionalidade para a barra de busca
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchTracks(searchInput.value);
        }
    });

    function searchTracks(query) {
        // Implementar lógica de busca aqui
        console.log('A procura:', query);
        // Você pode fazer uma chamada de API para buscar faixas com base na consulta
    }

    // Adicionar funcionalidade para o menu do usuário
    const userDropdown = document.querySelector('.user-dropdown');
    const userMenu = document.createElement('div');
    userMenu.classList.add('user-menu-dropdown');
    userMenu.style.display = 'none';
    userMenu.innerHTML = `
        <ul>
            <li><a href="#">Perfil</a></li>
            <li><a href="#">Configurações</a></li>
            <li><a href="#" id="logout-button">Sair</a></li>
        </ul>
    `;
    document.body.appendChild(userMenu);

    userDropdown.addEventListener('click', () => {
        userMenu.style.display = userMenu.style.display === 'none' ? 'block' : 'none';
    });

    // Implementar lógica de logout
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Implementar lógica de logout aqui
        console.log('Usuário deslogado');
        updateUserProfile('default-avatar.png', 'Visitante');
        loginButton.style.display = 'inline-flex';
    });

    // Adicionar funcionalidade para reprodução de música
    const audioTracks = [
        { name: 'Lofi Chill Beats', artist: 'Artista Lofi', file: 'musica-lofi.mp3' },
        // Adicione mais faixas aqui
    ];

    let currentTrackIndex = 0;

    function loadTrack(index) {
        const track = audioTracks[index];
        audio.src = track.file;
        document.querySelector('.track-name').textContent = track.name;
        document.querySelector('.artist-name').textContent = track.artist;
    }

    nextButton.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % audioTracks.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) audio.play();
    });

    prevButton.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + audioTracks.length) % audioTracks.length;
        loadTrack(currentTrackIndex);
        if (isPlaying) audio.play();
    });

    // Inicializar a primeira faixa
    loadTrack(currentTrackIndex);

    // Funcionalidade para a navegação inferior em dispositivos móveis
const navItems = document.querySelectorAll('.bottom-nav a');
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        navItems.forEach(navItem => navItem.classList.remove('active'));
        item.classList.add('active');
        // Implementar lógica de navegação aqui
        console.log('Navegação para:', item.querySelector('span').textContent);
    });
});
});
