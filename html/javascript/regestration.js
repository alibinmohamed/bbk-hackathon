// Get elements from the DOM
const loginTypeSelect = document.getElementById('login-type');
const securityKeyGroup = document.getElementById('security-key-group');
const securityKeyInput = document.getElementById('security-key');
const loginForm = document.querySelector('.signup-form');
const nextButton = document.querySelector('.btn.signup');
const photoStepModal = document.getElementById('photo-step');
const takePhotoButton = document.getElementById('take-photo');
const photoStatus = document.getElementById('photo-status');
const continueToOtbButton = document.getElementById('continue-to-otb');
const camera = document.getElementById('camera');
const snapshotCanvas = document.getElementById('snapshot');
const snapshotContext = snapshotCanvas.getContext('2d');

// Handle "Next" button click
nextButton.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent form submission

  // Validate form fields
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const cpr = document.getElementById('cpr').value.trim();
  const address = document.getElementById('address').value.trim();

  if (!name || !email || !phone || !cpr || !address) {
    alert('Please fill in all required fields.');
    return;
  }

  // Show the photo-step modal
  photoStepModal.classList.remove('hidden');
});

// Handle "Take Photo" button click
takePhotoButton.addEventListener('click', () => {
  // Capture the photo from the video stream
  snapshotCanvas.width = camera.videoWidth;
  snapshotCanvas.height = camera.videoHeight;
  snapshotContext.drawImage(camera, 0, 0, camera.videoWidth, camera.videoHeight);

  // Update the status and enable the "Continue" button
  photoStatus.textContent = 'Photo captured successfully!';
  continueToOtbButton.disabled = false;
});

// Start the camera stream
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    camera.srcObject = stream;
  })
  .catch((error) => {
    console.error('Error accessing the camera:', error);
    photoStatus.textContent = 'Unable to access the camera. Please check your device settings.';
  });

// Handle login type selection change
loginTypeSelect?.addEventListener('change', () => {
  const selected = loginTypeSelect.value;

  if (selected === 'bbsk' || selected === 'pin') {
    // Show security key input
    securityKeyGroup.style.display = 'block';
    securityKeyInput.setAttribute('required', 'required');
  } else {
    // Hide security key input for biometric
    securityKeyGroup.style.display = 'none';
    securityKeyInput.removeAttribute('required');
  }
});

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const loginType = loginTypeSelect?.value;
  const securityKey = securityKeyInput?.value.trim();

  if (!email || !loginType || ((loginType === 'bbsk' || loginType === 'pin') && !securityKey)) {
    alert('Please fill in all required fields.');
    return;
  }
  
  // Handle "Continue" button click
continueToOtbButton.addEventListener('click', () => {
  // Hide the photo-step modal
  photoStepModal.classList.add('hidden');

  // Show the OTB modal
  const otbModal = document.getElementById('otb-modal');
  otbModal.classList.remove('hidden');
});

  // Simulate successful login
  window.location.href = 'home.html';
});