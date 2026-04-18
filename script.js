document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    const overlay = document.getElementById('overlay');
    const btnOpen = document.getElementById('btn-open');
    const mainContent = document.getElementById('main-invitation');
    const bgMusic = document.getElementById('bgMusic');
    const musicControl = document.getElementById('music-control');
    const musicIcon = document.getElementById('music-icon');
    
    // 1. URL Params for Guest Name
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
        document.getElementById('guestName').innerText = guestName;
    }

    // 2. Open Invitation
    btnOpen.addEventListener('click', () => {
        overlay.style.transform = 'translateY(-100%)';
        mainContent.classList.remove('hidden');
        musicControl.classList.remove('hidden');
        document.getElementById('floating-nav').classList.remove('hidden');
        
        // Play Music
        bgMusic.play().catch(error => {
            console.log("Autoplay prevented. User interaction required.");
        });

        // Start Animations
        spawnLeaves();
        spawnSparkles();
        spawnSakura();

        // Trigger animations for the first section
        setTimeout(() => {
            handleScrollAnimations();
        }, 1000);
    });

    // 3. Music Control
    let isPlaying = true;
    musicControl.addEventListener('click', () => {
        const visualizer = document.getElementById('visualizer');
        if (isPlaying) {
            bgMusic.pause();
            musicControl.style.animationPlayState = 'paused';
            visualizer.querySelectorAll('span').forEach(s => s.style.animationPlayState = 'paused');
            musicIcon.setAttribute('data-lucide', 'music-2');
        } else {
            bgMusic.play();
            musicControl.style.animationPlayState = 'running';
            visualizer.querySelectorAll('span').forEach(s => s.style.animationPlayState = 'running');
            musicIcon.setAttribute('data-lucide', 'music');
        }
        isPlaying = !isPlaying;
        lucide.createIcons();
    });

    // 4. Countdown Timer
    const weddingDate = new Date('Dec 12, 2026 09:00:00').getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById('timer').innerHTML = "<h4>Acara Telah Berlangsung</h4>";
        }
    };

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    // 5. Scroll Reveal Effect
    handleScrollAnimations();

    // 6. Overlay fade-up animations
    setTimeout(() => {
        document.querySelectorAll('.overlay .fade-up').forEach(el => {
            el.classList.add('show');
        });
    }, 100);

    // 7. RSVP Form handling (WhatsApp Integration)
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = rsvpForm.querySelector('input').value;
            const status = rsvpForm.querySelector('select').value;
            const message = rsvpForm.querySelector('textarea').value;
            
            const phoneNumber = "6281234567890"; // Ganti dengan nomor WhatsApp tujuan
            const text = `Halo, saya ${name}. Saya menyatakan akan ${status}. %0A %0APesan: ${message}`;
            
            const waUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${text}`;
            window.open(waUrl, '_blank');

            // Add to wishes display
            const wishesDisplay = document.getElementById('wishes-display');
            const newWish = document.createElement('div');
            newWish.className = 'wish-item';
            newWish.innerHTML = `<strong>${name}</strong><p>${message}</p>`;
            wishesDisplay.prepend(newWish);
            
            rsvpForm.reset();
            showToast('Ucapan Anda Telah Terkirim!');
        });
    }

    // 9. Gallery Lightbox
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            lightboxImg.src = img.src;
            lightbox.classList.remove('hidden');
        });
    });
});

function handleScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
}

// Sakura System
function spawnSakura() {
    const container = document.getElementById('sakura-container');
    
    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        const startX = Math.random() * 100;
        const duration = 7 + Math.random() * 10;
        const delay = Math.random() * 5;
        const size = 10 + Math.random() * 10;
        
        petal.style.left = startX + '%';
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.animationDuration = duration + 's';
        
        container.appendChild(petal);
        
        setTimeout(() => petal.remove(), (duration + delay) * 1000);
    }, 1000);
}

// Leaf System
function spawnLeaves() {
    const container = document.getElementById('leaf-container');
    
    setInterval(() => {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        
        const startX = Math.random() * 100;
        const duration = 5 + Math.random() * 5;
        const delay = Math.random() * 5;
        
        leaf.style.left = startX + '%';
        leaf.style.animationDuration = duration + 's';
        leaf.style.animationDelay = delay + 's';
        
        container.appendChild(leaf);
        
        setTimeout(() => leaf.remove(), (duration + delay) * 1000);
    }, 1000);
}

// Sparkle System
function spawnSparkles() {
    const container = document.body;
    
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight + window.scrollY;
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        container.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }, 300);
}

// Global functions
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Nomor Rekening Berhasil Disalin!');
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}
// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    document.querySelectorAll('.parallax-prop').forEach((el, index) => {
        const speed = (index + 1) * 0.2;
        el.style.transform = `translateY(${scrolled * speed}px) rotate(${(index % 2 === 0 ? -15 : 15)}deg)`;
    });
});
