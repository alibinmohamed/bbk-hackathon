// DOM elements
const nextButton = document.querySelector('.btn.signup');
const loginForm = document.querySelector('.signup-form');
const photoStepModal = document.getElementById('photo-step');
const takePhotoButton = document.getElementById('take-photo');
const photoStatus = document.getElementById('photo-status');
const continueToOtbButton = document.getElementById('continue-to-otb');
const camera = document.getElementById('camera');
const snapshotCanvas = document.getElementById('snapshot');
const snapshotContext = snapshotCanvas.getContext('2d');
const otbModal = document.getElementById('otb-modal');
const submitOtpButton = document.getElementById('submit-otb');
const otpInput = document.getElementById('otb-code');

// Step 1: Click "Next" to go to Photo step
nextButton.addEventListener('click', (e) => {
  e.preventDefault();

  // Validate required fields
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const cpr = document.getElementById('cpr').value.trim();
  const address = document.getElementById('address').value.trim();

  if (!name || !email || !phone || !cpr || !address) {
    alert('Please fill in all required fields.');
    return;
  }

  photoStepModal.classList.remove('hidden');
});

// Step 2: Take photo
takePhotoButton.addEventListener('click', () => {
  snapshotCanvas.width = camera.videoWidth;
  snapshotCanvas.height = camera.videoHeight;
  snapshotContext.drawImage(camera, 0, 0, camera.videoWidth, camera.videoHeight);

  photoStatus.textContent = 'Photo captured successfully!';
  continueToOtbButton.disabled = false;
});

// Enable camera stream
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    camera.srcObject = stream;
  })
  .catch((error) => {
    console.error('Camera error:', error);
    photoStatus.textContent = 'Unable to access the camera.';
  });

// Step 3: Click "Continue" to go to OTP
continueToOtbButton.addEventListener('click', () => {
  photoStepModal.classList.add('hidden');
  otbModal.classList.remove('hidden');
});

// Enable "Submit" button when OTP input has enough length
otpInput.addEventListener('input', () => {
  submitOtpButton.disabled = otpInput.value.trim().length < 4;
});

// Step 4: Submit OTP and go to final page
submitOtpButton.addEventListener('click', () => {
  window.location.href = 'security-key.html';
});
