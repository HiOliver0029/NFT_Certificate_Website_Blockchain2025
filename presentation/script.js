// Presentation navigation
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideNumber = document.getElementById('slideNumber');

// Show initial slide
showSlide(currentSlide);

// Event listeners
prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    } else if (e.key === 'Home') {
        currentSlide = 0;
        showSlide(currentSlide);
    } else if (e.key === 'End') {
        currentSlide = totalSlides - 1;
        showSlide(currentSlide);
    }
});

// Show specific slide
function showSlide(n) {
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });

    // Show current slide
    slides[n].classList.add('active');

    // Update slide counter
    slideNumber.textContent = `${n + 1} / ${totalSlides}`;

    // Update button states
    prevBtn.disabled = n === 0;
    nextBtn.disabled = n === totalSlides - 1;

    // Scroll to top
    window.scrollTo(0, 0);
}

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next slide
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - previous slide
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    }
}

// Fullscreen toggle (F11 or double click)
document.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

// Add visual feedback for keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Home', 'End'].includes(e.key)) {
        const presentation = document.querySelector('.presentation');
        presentation.style.transform = 'scale(0.98)';
        setTimeout(() => {
            presentation.style.transform = 'scale(1)';
        }, 100);
    }
});

// Smooth transition
const presentation = document.querySelector('.presentation');
presentation.style.transition = 'transform 0.1s ease';

// Console log for presentation mode tips
console.log('%c🎤 Presentation Mode Tips:', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%c• Use Arrow Keys or Space to navigate', 'color: #764ba2; font-size: 14px;');
console.log('%c• Press F11 for fullscreen', 'color: #764ba2; font-size: 14px;');
console.log('%c• Double-click to toggle fullscreen', 'color: #764ba2; font-size: 14px;');
console.log('%c• Swipe on mobile devices', 'color: #764ba2; font-size: 14px;');
console.log('%c• Home/End keys jump to first/last slide', 'color: #764ba2; font-size: 14px;');
