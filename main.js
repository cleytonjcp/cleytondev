// Alternância do menu mobile
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Fechar menu mobile ao clicar em um link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// Rolagem suave para todos os links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Efeito typewriter no subtítulo do nome
document.addEventListener("DOMContentLoaded", function() {
    const roles = ["Designer", "Developer"];
    let currentRole = 0;
    let isDeleting = false;
    let txt = '';
    let wait = 1200;
    const el = document.getElementById('typewriter-role');

    function type() {
        const fullTxt = roles[currentRole];
        if (isDeleting) {
            txt = fullTxt.substring(0, txt.length - 1);
        } else {
            txt = fullTxt.substring(0, txt.length + 1);
        }
        el.textContent = txt;

        let typeSpeed = isDeleting ? 60 : 120;

        if (!isDeleting && txt === fullTxt) {
            typeSpeed = wait;
            isDeleting = true;
        } else if (isDeleting && txt === '') {
            isDeleting = false;
            currentRole = (currentRole + 1) % roles.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    type();
});

// Loader animation
window.addEventListener('load', function() {
    const loaderBg = document.getElementById('loader-bg');
    if(loaderBg) {
        setTimeout(() => {
            loaderBg.style.transition = 'opacity 0.6s';
            loaderBg.style.opacity = '0';
            setTimeout(() => loaderBg.style.display = 'none', 600);
        }, 1500); // Loader visível por 1,5s antes de sumir suavemente
    }
});