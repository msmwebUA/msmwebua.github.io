let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.carousel-indicator');
const totalSlides = slides.length;
let autoPlayInterval;

const infoDiv = document.querySelectorAll('.project-info');

// Show specific slide
function showSlide(index) {
    // Wrap around
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    infoDiv.forEach(infodiv => infodiv.classList.remove('active'));


    // Add active class to current slide and indicator
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    let activeSlideIdSeq = slides[currentSlide].id.slice(-1);
    document.getElementById("info-slide" + activeSlideIdSeq).classList.add('active');
}

// Move to next/previous slide
function moveSlide(direction) {
    showSlide(currentSlide + direction);
    resetAutoPlay();
}

// Go to specific slide
function goToSlide(index) {
    showSlide(index);
    resetAutoPlay();
}

// Auto play
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 10000); // Change slide every 10 seconds
}

// Reset auto play when user interacts
function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveSlide(-1);
    } else if (e.key === 'ArrowRight') {
        moveSlide(1);
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const carousel = document.querySelector('.custom-carousel');

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left
        moveSlide(1);
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right
        moveSlide(-1);
    }
}

// Start auto play on page load
startAutoPlay();

// Pause auto play when page is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(autoPlayInterval);
    } else {
        startAutoPlay();
    }
});