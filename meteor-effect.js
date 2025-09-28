// Meteor Effect Animation
document.addEventListener('DOMContentLoaded', () => {
  const meteorContainer = document.createElement('div');
  meteorContainer.className = 'meteor-container';
  document.body.appendChild(meteorContainer);

  // Configuration
  const config = {
    meteorCount: 20,
    minSpeed: 10,
    maxSpeed: 25,
    minSize: 1,
    maxSize: 4,
    minDelay: 0,
    maxDelay: 10,
    minDuration: 1,
    maxDuration: 3
  };

  // Create meteors
  for (let i = 0; i < config.meteorCount; i++) {
    createMeteor();
  }

  function createMeteor() {
    const meteor = document.createElement('div');
    meteor.className = 'meteor';
    meteorContainer.appendChild(meteor);

    // Random properties
    const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
    const speed = Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed;
    const delay = Math.random() * (config.maxDelay - config.minDelay) + config.minDelay;
    const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
    
    // Random position (top-right to bottom-left trajectory)
    const startX = Math.random() * 100 + 50; // Start from right side
    const startY = Math.random() * 20 - 20; // Start from above the viewport
    const endX = startX - 150 - Math.random() * 100; // End at left side
    const endY = startY + 120 + Math.random() * 60; // End below
    
    // Apply styles
    meteor.style.width = `${size}px`;
    meteor.style.height = `${size * 10}px`; // Longer trail
    meteor.style.left = `${startX}%`;
    meteor.style.top = `${startY}%`;
    meteor.style.opacity = Math.random() * 0.8 + 0.2;
    meteor.style.animationDelay = `${delay}s`;
    meteor.style.animationDuration = `${duration}s`;
    
    // Set custom properties for animation
    meteor.style.setProperty('--end-x', `${endX}%`);
    meteor.style.setProperty('--end-y', `${endY}%`);

    // Reset meteor after animation completes
    meteor.addEventListener('animationend', () => {
      meteor.remove();
      createMeteor();
    });
  }
});
