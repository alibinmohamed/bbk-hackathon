function openPopup(id) {
  document.getElementById(id).style.display = 'flex';
}

function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}

// Apply button
function goHome() {
  alert('Settings applied successfully!');
  // Close all popups
  document.querySelectorAll('.popup-overlay').forEach(popup => popup.style.display = 'none');
}

// Wait for DOM content before running scripts
document.addEventListener('DOMContentLoaded', () => {
  // Slider values update
  const sliders = document.querySelectorAll('input[type="range"]');
  sliders.forEach(slider => {
    const wrapper = document.createElement('div');
    wrapper.className = 'slider-wrapper';

    const label = document.createElement('span');
    label.className = 'slider-value';
    label.textContent = slider.value;

    // Move slider into wrapper and append label
    slider.parentNode.insertBefore(wrapper, slider);
    wrapper.appendChild(slider);
    wrapper.appendChild(label);

    slider.addEventListener('input', () => {
      label.textContent = slider.value;
    });
  });

  // Replace alerts with prompts for PIN and Code
  document.querySelectorAll('#loginPopup .popup-card').forEach(card => {
    const title = card.querySelector('h3').textContent;
    card.addEventListener('click', () => {
      if (title === 'PIN') {
        const pin = prompt('Enter your custom PIN:');
        if (pin) alert(`PIN set: ${'*'.repeat(pin.length)}`);
      } else if (title === 'Code') {
        const code = prompt('Enter your custom Code (letters + numbers):');
        if (code) alert(`Code set: ${code}`);
      }
    });
  });

  // Add click handler for settings button
  const settingsBtn = document.getElementById('settings');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => openPopup('settingsPopup'));
  }
});

function showInfo(message) {
  document.getElementById("infoPopupText").innerText = message;
  openPopup("infoPopup");
};

// Security level options
const securityLevels = document.querySelectorAll('input[name="securityLevel"]');
const slidersList = document.querySelectorAll('#securityPopup input[type="range"]');

const securityConfigs = {
  least: [5000, 20, 1000],
  medium: [2500, 10, 500],
  high: [1000, 5, 100]
};

securityLevels.forEach(radio => {
  radio.addEventListener('change', () => {
    const config = securityConfigs[radio.value];
    slidersList.forEach((slider, index) => {
      slider.value = config[index];
      const label = slider.parentNode.querySelector('.slider-value');
      if (label) label.textContent = config[index];
    });
  });
});
