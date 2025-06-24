// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenuButton2 = document.getElementById('mobileMenuButton2');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const mobileSidebar = document.getElementById('mobileSidebar');

mobileMenuButton.addEventListener('click', () => {
    mobileSidebar.classList.remove('-translate-x-full');
});

mobileMenuButton2.addEventListener('click', () => {
    mobileSidebar.classList.remove('-translate-x-full');
});

closeMobileMenu.addEventListener('click', () => {
    mobileSidebar.classList.add('-translate-x-full');
});

// Tab switching
const tabs = document.querySelectorAll('.border-b button');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active-tab'));
        tab.classList.add('active-tab');
    });
});

// Playlist hover effect
const playlistCards = document.querySelectorAll('.playlist-card');
playlistCards.forEach(card => {
    const img = card.querySelector('img');
    // Substitui imagens quebradas por uma capa padrão de álbum
    img.onerror = function () {
        this.onerror = null;
        this.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_album_cover_art.png';
    };
    card.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Song row hover effect
const songItems = document.querySelectorAll('.song-item');
songItems.forEach(item => {
    const img = item.querySelector('img');
    // Substitui imagens quebradas por uma capa padrão de álbum
    if (img) {
        img.onerror = function () {
            this.onerror = null;
            this.src = 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_album_cover_art.png';
        };
    }
    item.addEventListener('mouseenter', () => {
        const numberCell = item.querySelector('div:first-child');
        if (numberCell) {
            numberCell.querySelector('span').style.display = 'none';
            numberCell.querySelector('button').style.display = 'block';
        }
    });

    item.addEventListener('mouseleave', () => {
        const numberCell = item.querySelector('div:first-child');
        if (numberCell) {
            numberCell.querySelector('span').style.display = 'block';
            numberCell.querySelector('button').style.display = 'none';
        }
    });
});

// Player de áudio
const audioPlayer = document.getElementById('audioPlayer');
let currentSongItem = null;

// Clique para tocar música
songItems.forEach(item => {
    item.addEventListener('click', () => {
        const src = item.getAttribute('data-src');
        if (src) {
            // Troca a música e toca
            audioPlayer.src = src;
            audioPlayer.play();

            // Destaca a música tocando
            if (currentSongItem) currentSongItem.classList.remove('bg-green-900');
            item.classList.add('bg-green-900');
            currentSongItem = item;
        }
    });
});

// Botão play/pause do player
const playPauseBtn = document.querySelector('.fa-pause, .fa-play');
if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.classList.remove('fa-play');
            playPauseBtn.classList.add('fa-pause');
        } else {
            audioPlayer.pause();
            playPauseBtn.classList.remove('fa-pause');
            playPauseBtn.classList.add('fa-play');
        }
    });
}

// Atualiza barra de progresso (exemplo simples)
audioPlayer.addEventListener('timeupdate', () => {
    const progress = document.querySelector('.progress-fill');
    if (progress) {
        progress.style.width = ((audioPlayer.currentTime / audioPlayer.duration) * 100) + '%';
    }
});