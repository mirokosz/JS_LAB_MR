document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const pauseButton = document.getElementById('pause');
    const resumeButton = document.getElementById('resume');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close');

    let currentIndex = 0;
    let isPaused = false;
    let slideInterval;
    let animationType = 'slide';

    function showSlide(index) {
        if (animationType === 'slide') {
            slider.style.transform = `translateX(${-index * 100}%)`;
        } else if (animationType === 'fade') {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        indicators.forEach(indicator => indicator.classList.remove('active'));
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    function pauseSlideShow() {
        clearInterval(slideInterval);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    pauseButton.addEventListener('click', () => {
        isPaused = true;
        pauseSlideShow();
    });
    resumeButton.addEventListener('click', () => {
        if (isPaused) {
            isPaused = false;
            startSlideShow();
        }
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showSlide(index);
            if (!isPaused) {
                pauseSlideShow();
                startSlideShow();
            }
        });
    });

    slides.forEach(slide => {
        slide.querySelector('img').addEventListener('click', function () {
            lightbox.style.display = 'block';
            lightboxImg.src = this.src;
            pauseSlideShow();
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        if (!isPaused) {
            startSlideShow();
        }
    });

    startSlideShow();
});