// Enhanced Sparkles Animation with Aceternity UI Effects
document.addEventListener('DOMContentLoaded', () => {
  // Elements that should have sparkles with enhanced configuration
  const sparkleElements = [
    { selector: 'h1', density: 0.3, size: { min: 3, max: 8 }, colors: ['#FFD700', '#FFC0CB', '#87CEFA'] },
    { selector: '.hero-text .subtitle', density: 0.2, size: { min: 2, max: 6 }, colors: ['#90EE90', '#FFD700', '#FFFFFF'] },
    { selector: 'h2', density: 0.1, size: { min: 2, max: 5 }, colors: ['#4f46e5', '#8b5cf6', '#d946ef'] },
    { selector: '.highlight', density: 0.15, size: { min: 2, max: 4 }, colors: ['#FFD700', '#FFFFFF', '#87CEFA'] },
    { selector: '.achievement-highlight', density: 0.15, size: { min: 2, max: 4 }, colors: ['#FFD700', '#FFA07A', '#FFFFFF'] },
    { selector: '.stat-number', density: 0.2, size: { min: 3, max: 6 }, colors: ['#4f46e5', '#8b5cf6', '#FFFFFF'] },
    { selector: '.preferred-badge', density: 0.25, size: { min: 2, max: 4 }, colors: ['#4f46e5', '#FFFFFF', '#90EE90'] },
    { selector: '.achievement-badge', density: 0.3, size: { min: 3, max: 8 }, colors: ['#FFD700', '#FFA07A', '#FFFFFF'] }
  ];
  
  // Global sparkle configuration
  const config = {
    minOpacity: 0.3,
    maxOpacity: 0.8,
    minDuration: 600,
    maxDuration: 1500,
    minDelay: 0,
    maxDelay: 2000,
    sparkleTypes: ['circle', 'star', 'dot', 'plus'],
    glowIntensity: 0.5,
    mouseInteraction: true
  };
  
  // Apply sparkles to elements
  sparkleElements.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    elements.forEach(element => {
      addSparkleEffect(element, item.density, item.size, item.colors);
    });
  });
  
  // Function to add sparkle effect to an element
  function addSparkleEffect(element, density, size, colors) {
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
      createSparkle(sparkleContainer, size, colors);
    }
    
    // Continuously create new sparkles
    const interval = setInterval(() => {
      if (document.body.contains(element)) {
        createSparkle(sparkleContainer, size, colors);
      } else {
        clearInterval(interval);
      }
    }, 1000 / density);
    
    // Add mouse interaction if enabled
    if (config.mouseInteraction) {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create sparkles at mouse position
        createSparkleAtPosition(sparkleContainer, x, y, size, colors);
      });
    }
  }
  
  // Function to create a sparkle at a specific position
  function createSparkleAtPosition(container, x, y, size, colors) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle mouse-sparkle';
    container.appendChild(sparkle);
    
    // Random properties
    const sparkleSize = Math.random() * (size.max - size.min) + size.min;
    const opacity = Math.random() * (config.maxOpacity - config.minOpacity) + config.minOpacity;
    const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const sparkleType = config.sparkleTypes[Math.floor(Math.random() * config.sparkleTypes.length)];
    
    // Set position
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    // Apply styles based on sparkle type
    sparkle.style.width = `${sparkleSize}px`;
    sparkle.style.height = `${sparkleSize}px`;
    
    if (sparkleType === 'circle') {
      sparkle.style.borderRadius = '50%';
      sparkle.style.backgroundColor = color;
    } else if (sparkleType === 'star') {
      sparkle.innerHTML = '★';
      sparkle.style.color = color;
      sparkle.style.fontSize = `${sparkleSize * 1.5}px`;
      sparkle.style.lineHeight = '1';
      sparkle.style.textAlign = 'center';
    } else if (sparkleType === 'plus') {
      sparkle.innerHTML = '+';
      sparkle.style.color = color;
      sparkle.style.fontSize = `${sparkleSize * 1.5}px`;
      sparkle.style.lineHeight = '1';
      sparkle.style.textAlign = 'center';
    } else {
      // Default dot
      sparkle.style.borderRadius = '50%';
      sparkle.style.backgroundColor = color;
    }
    
    sparkle.style.opacity = opacity;
    sparkle.style.boxShadow = `0 0 ${sparkleSize * config.glowIntensity}px ${color}`;
    sparkle.style.animationDuration = `${duration}ms`;
    
    // Remove sparkle after animation
    setTimeout(() => {
      sparkle.remove();
    }, duration);
  }
  
  // Function to create a random sparkle within the container
  function createSparkle(container, size, colors) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    container.appendChild(sparkle);
    
    // Random properties
    const sparkleSize = Math.random() * (size.max - size.min) + size.min;
    const opacity = Math.random() * (config.maxOpacity - config.minOpacity) + config.minOpacity;
    const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
    const delay = Math.random() * (config.maxDelay - config.minDelay) + config.minDelay;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const sparkleType = config.sparkleTypes[Math.floor(Math.random() * config.sparkleTypes.length)];
    
    // Random position within container
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    
    // Apply styles based on sparkle type
    sparkle.style.left = `${left}%`;
    sparkle.style.top = `${top}%`;
    sparkle.style.width = `${sparkleSize}px`;
    sparkle.style.height = `${sparkleSize}px`;
    
    if (sparkleType === 'circle') {
      sparkle.style.borderRadius = '50%';
      sparkle.style.backgroundColor = color;
    } else if (sparkleType === 'star') {
      sparkle.innerHTML = '★';
      sparkle.style.color = color;
      sparkle.style.fontSize = `${sparkleSize * 1.5}px`;
      sparkle.style.lineHeight = '1';
      sparkle.style.textAlign = 'center';
      sparkle.style.backgroundColor = 'transparent';
    } else if (sparkleType === 'plus') {
      sparkle.innerHTML = '+';
      sparkle.style.color = color;
      sparkle.style.fontSize = `${sparkleSize * 1.5}px`;
      sparkle.style.lineHeight = '1';
      sparkle.style.textAlign = 'center';
      sparkle.style.backgroundColor = 'transparent';
    } else {
      // Default dot
      sparkle.style.borderRadius = '50%';
      sparkle.style.backgroundColor = color;
    }
    
    sparkle.style.opacity = opacity;
    sparkle.style.boxShadow = `0 0 ${sparkleSize * config.glowIntensity}px ${color}`;
    sparkle.style.animationDuration = `${duration}ms`;
    sparkle.style.animationDelay = `${delay}ms`;
    
    // Set custom properties for animation
    sparkle.style.setProperty('--opacity', opacity);
    
    // Remove sparkle after animation
    setTimeout(() => {
      if (sparkle.parentNode === container) {
        sparkle.remove();
      }
    }, duration + delay);
  }
});
