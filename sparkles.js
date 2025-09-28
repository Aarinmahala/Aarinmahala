// Sparkles Animation
document.addEventListener('DOMContentLoaded', () => {
  // Elements that should have sparkles
  const sparkleElements = [
    { selector: 'h1', density: 0.2 },
    { selector: '.hero-text .subtitle', density: 0.1 },
    { selector: 'h2', density: 0.05 },
    { selector: '.highlight', density: 0.1 },
    { selector: '.achievement-highlight', density: 0.1 },
    { selector: '.stat-number', density: 0.15 },
    { selector: '.preferred-badge', density: 0.2 }
  ];
  
  // Sparkle configuration
  const config = {
    sparkleColors: ['#FFD700', '#FFC0CB', '#87CEFA', '#90EE90', '#FFFFFF'],
    minSize: 3,
    maxSize: 8,
    minOpacity: 0.3,
    maxOpacity: 0.8,
    minDuration: 600,
    maxDuration: 1500
  };
  
  // Apply sparkles to elements
  sparkleElements.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    elements.forEach(element => {
      addSparkleEffect(element, item.density);
    });
  });
  
  // Function to add sparkle effect to an element
  function addSparkleEffect(element, density) {
    // Add position relative to parent if not already set
    if (getComputedStyle(element).position === 'static') {
      element.style.position = 'relative';
    }
    
    // Add sparkle container
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-container';
    element.appendChild(sparkleContainer);
    
    // Calculate number of sparkles based on element size and density
    const rect = element.getBoundingClientRect();
    const area = rect.width * rect.height;
    const sparkleCount = Math.max(3, Math.floor(area * density / 1000));
    
    // Create initial sparkles
    for (let i = 0; i < sparkleCount; i++) {
      createSparkle(sparkleContainer);
    }
    
    // Continuously create new sparkles
    setInterval(() => {
      createSparkle(sparkleContainer);
    }, 1000 / density);
  }
  
  // Function to create a single sparkle
  function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    container.appendChild(sparkle);
    
    // Random properties
    const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
    const opacity = Math.random() * (config.maxOpacity - config.minOpacity) + config.minOpacity;
    const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
    const color = config.sparkleColors[Math.floor(Math.random() * config.sparkleColors.length)];
    
    // Random position within container
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    
    // Apply styles
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${left}%`;
    sparkle.style.top = `${top}%`;
    sparkle.style.backgroundColor = color;
    sparkle.style.opacity = opacity;
    sparkle.style.animationDuration = `${duration}ms`;
    
    // Remove sparkle after animation
    setTimeout(() => {
      sparkle.remove();
    }, duration);
  }
});
