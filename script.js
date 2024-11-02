document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('nameInput');
  const submitBtn = document.getElementById('submitBtn');

  // Enable or disable the submit button based on input
  nameInput.addEventListener('input', () => {
      submitBtn.disabled = nameInput.value.trim() === '';
  });

  // Save the name to localStorage and redirect when the button is clicked
  submitBtn.addEventListener('click', () => {
      const userName = nameInput.value.trim();
      if (userName) {
          localStorage.setItem('userName', userName);
          window.location.href = 'start.html';
      }
  });
});


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




//Photo.html javascript code
  document.addEventListener('DOMContentLoaded', () => {
  const heading = document.getElementById('photoheading');
  const cameraFrame = document.getElementById('camera-frame');
  const webcam = document.getElementById('webcam');
  const capturedPhoto = document.getElementById('captured-photo');
  const cameraButton = document.getElementById('camera-button');
  const redoButton = document.getElementById('redo-button');
  const confirmButton = document.getElementById('confirm-button');
  const photoframe = document.getElementById('photoframe');

  let webcamStream = null;  // Store the webcam stream

  // Function to open the webcam
  function openWebcam() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        webcamStream = stream;  // Save the stream for later use
        webcam.srcObject = stream;
        webcam.classList.remove('hidden');
      })
      .catch(error => {
        console.error('Webcam error:', error);
        alert('Unable to access the camera. Please grant permission.');
      });
  }

  // Move heading to the top and show the camera frame after 2 seconds
  setTimeout(() => {
    heading.classList.remove('photoheading-center');
    heading.classList.add('photoheading-top');
    photoframe.classList.remove('hidden');
    cameraButton.classList.remove('hidden');
    openWebcam();
  }, 2000);

  // Capture photo on camera button click
  cameraButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = webcam.videoWidth;
    canvas.height = webcam.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(webcam, 0, 0);

    // Convert the captured image to a Data URL
    const imageDataUrl = canvas.toDataURL('image/png');

    // Save the image in localStorage with the key 'userImg'
    localStorage.setItem('userImg', imageDataUrl);

    // Show the captured photo
    capturedPhoto.src = imageDataUrl;
    capturedPhoto.classList.remove('hidden');

    // Hide the webcam and camera button, show redo and confirm buttons
    webcam.classList.add('hidden');
    cameraButton.classList.add('hidden');
    redoButton.classList.remove('hidden');
    confirmButton.classList.remove('hidden');
  });

  // Redo the photo by restarting the webcam
  redoButton.addEventListener('click', () => {
    capturedPhoto.classList.add('hidden');
    webcam.classList.remove('hidden');
    redoButton.classList.add('hidden');
    confirmButton.classList.add('hidden');
    cameraButton.classList.remove('hidden');
    openWebcam();
  });

  // Confirm the photo and stop the webcam stream
  confirmButton.addEventListener('click', () => {
    console.log('Photo confirmed!');

    // Stop the webcam stream and release the camera
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      webcamStream = null;  // Clear the stream reference
    }

    // Hide the camera frame
    cameraFrame.classList.add('hidden');
  });
});




document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('emailInput');
  const submitButton = document.getElementById('submitButton');

  // Email validation function using regex
  function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }

  // Enable or disable the submit button based on valid email input
  emailInput.addEventListener('input', () => {
      const email = emailInput.value.trim();
      submitButton.disabled = !isValidEmail(email);
  });

  // Save the email to localStorage and redirect when the button is clicked
  submitButton.addEventListener('click', () => {
      const userMail = emailInput.value.trim();
      if (isValidEmail(userMail)) {
          localStorage.setItem('userMail', userMail);
          window.location.href = 'sendmail.html';
      }
  });
});





// Dynamically updating the Awadhi Playlist Webpage
document.addEventListener('DOMContentLoaded', () => {
  // Fetch the userName from localStorage or use a default name
  const userName = localStorage.getItem('userName') || 'प्रणय';
  document.getElementById('playlist-heading').textContent = `${userName} की अवधी प्लेलिस्ट`;

  // Array of YouTube video embed URLs
  const videos = [
      "https://www.youtube.com/embed/jY8mAWdQFOA?si=-CkBb5AzaIx7obdb",
      "https://www.youtube.com/embed/D61BvxAOxm0?si=-CkBb5AzaIx7obdb",
      "https://www.youtube.com/embed/AETFvQonfV8?si=-CkBb5AzaIx7obdb",
      "https://www.youtube.com/embed/6kgiD0NDQu8?si=-CkBb5AzaIx7obdb",
      "https://www.youtube.com/embed/IptC7oeTNkE?si=-CkBb5AzaIx7obdb",
      "https://www.youtube.com/embed/aUNx5YQuX-Y?si=-CkBb5AzaIx7obdb",
      "https://www.youtube.com/embed/87FYp3YLEBM?si=-CkBb5AzaIx7obdb",
      "https://www.youtube.com/embed/1_WaSnOnu1Q?si=-CkBb5AzaIx7obdb"
  ];

  // Load heartStatus array from localStorage or initialize with false
  const heartStatus = JSON.parse(localStorage.getItem('heartStatus')) || Array(videos.length).fill(false);

  // Get the playlist container
  const playlistContainer = document.getElementById('playlist-container');

  // Loop through the videos and add only those with heartStatus as true
  videos.forEach((videoUrl, index) => {
      if (heartStatus[index]) { // Check if heartStatus for the video is true
          // Create an iframe element for the video
          const iframe = document.createElement('iframe');
          iframe.width = "560";
          iframe.height = "315";
          iframe.src = videoUrl;
          iframe.title = "YouTube video player";
          iframe.frameBorder = "0";
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
          iframe.referrerPolicy = "strict-origin-when-cross-origin";
          iframe.allowFullscreen = true;

          // Append the iframe to the playlist container
          playlistContainer.appendChild(iframe);
      }
  });

  
  // Fetch the user photo from localStorage and display it
  const userImg = localStorage.getItem('userImg');
  if (userImg) {
      document.getElementById('user-photo').src = userImg;
  }
});








//QR Code generation Code






//Photo integration with QR Code to send as attachment in email




