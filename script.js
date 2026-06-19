// ==========================================================================
// CONFIGURATION & PLACEHOLDERS (Bisa diubah dengan mudah)
// ==========================================================================
const config = {
    // Teks Ucapan Maksimal 100 kata (Efek Mengetik)
    birthdayMessage: "Selamat ulang tahun sayangku, Terimakasih telah hadir dan mewarnai hari-hari aku dengan kebahagiaan. Semoga di usia yang baru ini, semua impianmu menjadi kenyataan, kesehatan selalu menyertaimu, dan senyummu yang aku suka tak pernah pudar. Aku akan selalu menemanimu dalam setiap langkah perjalanan hidupmu. Hari ini adalah tentangmu sayang, dan kamu pantas mendapatkan semua hal terbaik di dunia termasuk dapat aku selamanya. I love you every day, every moment, and I want you to know that you are my heart ❤️",
    
    typingSpeed: 40 // Kecepatan mengetik (dalam milidetik per karakter)
};

// ==========================================================================
// INITIALIZATION / LOADING SCREEN
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loading-screen');
    
    // Memberikan jeda 1.5 detik untuk loading screen romantis
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    }, 1500);

    // Jalankan background partikel hati
    createHeartParticles();
});

// ==========================================================================
// MUSIC & NAVIGATION LOGIC
// ==========================================================================
const bgMusic = document.getElementById('bg-music');
const video = document.getElementById('birthday-video');

// Navigasi Halaman 1 ke Halaman 2
document.getElementById('btn-to-page2').addEventListener('click', () => {
    // Mencoba Memutar Musik (Autoplay bypass setelah interaksi user)
    playAudio();
    
    // Transisi Halaman
    switchPage('page-1', 'page-2');
    
    // Mulai animasi efek mengetik setelah transisi halaman selesai
    setTimeout(() => {
        startTypingEffect();
    }, 800);
});

// Navigasi Halaman 2 ke Halaman 3 (BAGIAN YANG DIUBAH)
document.getElementById('btn-to-page3').addEventListener('click', () => {
    // 1. Matikan/Pause musik latar belakang agar tidak bertabrakan dengan audio video
    bgMusic.pause();
    
    // 2. Berpindah halaman
    switchPage('page-2', 'page-3');
    
    // Trigger Efek Confetti saat Halaman 3 terbuka
    setTimeout(() => {
        triggerConfettiSurprise();
    }, 500);
});

// Tombol Ulangi Perjalanan (Replay)
document.getElementById('btn-replay').addEventListener('click', () => {
    // Reset video & musik
    video.pause();
    video.currentTime = 0;
    bgMusic.currentTime = 0;
    
    // Putar kembali musik latar belakang saat kembali ke Halaman 1
    playAudio();

    // Reset teks mengetik
    document.getElementById('typing-text').innerHTML = "";
    document.getElementById('btn-to-page3').classList.remove('show');

    // Kembali ke Halaman 1
    switchPage('page-3', 'page-1');
});

// Fungsi Fungsi Pembantu Transisi Halaman
function switchPage(currentId, nextId) {
    const currentPage = document.getElementById(currentId);
    const nextPage = document.getElementById(nextId);
    
    currentPage.classList.remove('active');
    currentPage.classList.add('hidden');
    
    nextPage.classList.remove('hidden');
    nextPage.classList.add('active');
}

// Fungsi Memutar Audio dengan Aman
function playAudio() {
    bgMusic.play().catch(error => {
        console.log("Autoplay dicegah oleh browser, memutar setelah interaksi berikutnya:", error);
    });
}

// ==========================================================================
// ANIMATION EFFECTS (TYPING, PARTICLES, CONFETTI)
// ==========================================================================

// 1. Efek Mengetik (Typing Effect)
function startTypingEffect() {
    const textContainer = document.getElementById('typing-text');
    const nextBtn = document.getElementById('btn-to-page3');
    let i = 0;
    
    textContainer.innerHTML = ""; // Bersihkan teks lama

    function type() {
        if (i < config.birthdayMessage.length) {
            textContainer.innerHTML += config.birthdayMessage.charAt(i);
            i++;
            setTimeout(type, config.typingSpeed);
        } else {
            // Tampilkan tombol "See My Gift" saat mengetik selesai
            nextBtn.classList.add('show');
        }
    }
    type();
}

// 2. Efek Partikel Hati Bergerak Perlahan di Background
function createHeartParticles() {
    const container = document.getElementById('particles-container');
    const heartSymbols = ['❤️', '💖', '💝', '💕'];
    const particleCount = 20; // Batasi jumlah partikel agar tidak berat

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'heart-particle';
        particle.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        // Atur posisi dan ukuran acak
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.fontSize = (Math.random() * 15 + 10) + 'px';
        
        // Atur durasi dan delay animasi acak
        const duration = Math.random() * 10 + 10; // 10s sampai 20s
        const delay = Math.random() * -20; // Mulai langsung dari posisi acak tengah jalan
        
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        container.appendChild(particle);
    }
}

// 3. Efek Confetti (Menggunakan Canvas-Confetti Library)
function triggerConfettiSurprise() {
    // Confetti tembakan kiri
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.1, y: 0.6 }
    });
    // Confetti tembakan kanan
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.9, y: 0.6 }
    });
    
    // Efek kembang api kecil terus menerus selama 3 detik
    let duration = 3 * 1000;
    let end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}