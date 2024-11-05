
// Carousel.html and feedplaylist.html javascript code
// Initial song heart status - load from localStorage or initialize
const heartStatus = JSON.parse(localStorage.getItem('heartStatus')) || Array(8).fill(false);

// Save heart status to localStorage
function saveHeartStatus() {
    localStorage.setItem('heartStatus', JSON.stringify(heartStatus));
}

// Update heart button on Carousel page
function updateHeartButtonCarousel(index) {
    const heartButton = document.getElementById('heart-button');
    heartButton.src = heartStatus[index] ? 'assets/heart3.png' : 'assets/heart1.png';
}

// Update heart buttons on Feed Playlist page
function updateHeartButtonsFeed() {
    const heartContainers = document.querySelectorAll('.heart-container');
    heartContainers.forEach((container, index) => {
        const heartImg = container.querySelector('.heart-button');
        heartImg.classList.toggle('active', heartStatus[index]);
        heartImg.classList.toggle('inactive', !heartStatus[index]);
    });
}

// Carousel page functionality
function initializeCarousel() {
    const heartButton = document.getElementById('heart-button');
    heartButton.addEventListener('click', () => {
        heartStatus[currentIndex] = !heartStatus[currentIndex];
        updateHeartButtonCarousel(currentIndex);
        saveHeartStatus();
    });

    updateHeartButtonCarousel(currentIndex); // Initial update
}

// Feed Playlist page functionality
function initializeFeedPlaylist() {
    const heartContainers = document.querySelectorAll('.heart-container');
    heartContainers.forEach((container, index) => {
        container.addEventListener('click', () => {
            heartStatus[index] = !heartStatus[index];
            saveHeartStatus();
            updateHeartButtonsFeed();
        });
    });

    updateHeartButtonsFeed(); // Initial update
}

// Detect which page is loaded and initialize accordingly
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('heart-button')) {
        initializeCarousel(); // Initialize Carousel page
    } else if (document.querySelectorAll('.heart-container').length > 0) {
        initializeFeedPlaylist(); // Initialize Feed Playlist page
    }
});
//END OF THIS



