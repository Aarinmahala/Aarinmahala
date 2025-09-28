// Exploding Beams Background Effect
document.addEventListener('DOMContentLoaded', () => {
  // Create container for exploding beams
  const beamsContainer = document.createElement('div');
  beamsContainer.className = 'exploding-beams-container';
  document.body.appendChild(beamsContainer);
  
  // Configuration
  const config = {
    beamCount: 5, // Number of beams to create initially
    colors: ['#4f46e5', '#8b5cf6', '#d946ef', '#2563eb', '#0ea5e9', '#06b6d4', '#14b8a6'],
    minWidth: 2,
    maxWidth: 8,
    minHeight: 100,
    maxHeight: 300,
    minDuration: 2000,
    maxDuration: 6000,
    explosionParticleCount: 15,
    explosionRadius: 100,
    explosionDuration: 1000,
    autoExplode: true,
    autoExplodeInterval: 3000,
    clickEnabled: true
  };
  
  // Create initial beams
  for (let i = 0; i < config.beamCount; i++) {
    createBeam();
  }
  
  // Enable click explosions if configured
  if (config.clickEnabled) {
    document.addEventListener('click', (e) => {
      createExplosion(e.clientX, e.clientY);
    });
  }
  
  // Auto explode at random positions if configured
  if (config.autoExplode) {
    setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      createExplosion(x, y);
    }, config.autoExplodeInterval);
  }
  
  // Function to create a beam
  function createBeam() {
    const beam = document.createElement('div');
    beam.className = 'exploding-beam';
    beamsContainer.appendChild(beam);
    
    // Random properties
    const width = Math.random() * (config.maxWidth - config.minWidth) + config.minWidth;
    const height = Math.random() * (config.maxHeight - config.minHeight) + config.minHeight;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
    const color = config.colors[Math.floor(Math.random() * config.colors.length)];
    const rotation = Math.random() * 360;
    const delay = Math.random() * 2000;
    
    // Apply styles
    beam.style.width = `${width}px`;
    beam.style.height = `${height}px`;
    beam.style.left = `${x}px`;
    beam.style.top = `${y}px`;
    beam.style.backgroundColor = color;
    beam.style.boxShadow = `0 0 20px ${color}`;
    beam.style.transform = `rotate(${rotation}deg)`;
    beam.style.animationDuration = `${duration}ms`;
    beam.style.animationDelay = `${delay}ms`;
    
    // Set custom properties for animation
    beam.style.setProperty('--end-x', `${Math.random() * window.innerWidth}px`);
    beam.style.setProperty('--end-y', `${Math.random() * window.innerHeight}px`);
    beam.style.setProperty('--end-rotation', `${rotation + (Math.random() > 0.5 ? 180 : -180)}deg`);
    
    // Store beam data for explosion
    beam.dataset.color = color;
    
    // Add explosion at the end of beam travel
    setTimeout(() => {
      if (beam.parentNode === beamsContainer) {
        const rect = beam.getBoundingClientRect();
        const beamCenterX = rect.left + rect.width / 2;
        const beamCenterY = rect.top + rect.height / 2;
        
        createExplosion(beamCenterX, beamCenterY, color);
        beam.remove();
        
        // Create a new beam to replace the exploded one
        createBeam();
      }
    }, duration + delay);
  }
  
  // Function to create explosion effect
  function createExplosion(x, y, color = null) {
    // Use random color if not specified
    const explosionColor = color || config.colors[Math.floor(Math.random() * config.colors.length)];
    
    // Create explosion container
    const explosion = document.createElement('div');
    explosion.className = 'beam-explosion';
    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;
    beamsContainer.appendChild(explosion);
    
    // Create explosion particles
    for (let i = 0; i < config.explosionParticleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'explosion-particle';
      explosion.appendChild(particle);
      
      // Random properties
      const size = Math.random() * 8 + 2;
      const angle = (i / config.explosionParticleCount) * Math.PI * 2;
      const distance = Math.random() * config.explosionRadius;
      const duration = Math.random() * 1000 + 500;
      
      // Random color variation based on explosion color
      const particleColor = explosionColor;
      
      // Apply styles
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = particleColor;
      particle.style.boxShadow = `0 0 10px ${particleColor}`;
      
      // Set custom properties for animation
      particle.style.setProperty('--angle', angle);
      particle.style.setProperty('--distance', `${distance}px`);
      particle.style.setProperty('--duration', `${duration}ms`);
      
      // Add animation class
      particle.classList.add('explode');
    }
    
    // Create central flash
    const flash = document.createElement('div');
    flash.className = 'explosion-flash';
    flash.style.backgroundColor = explosionColor;
    explosion.appendChild(flash);
    
    // Create shockwave
    const shockwave = document.createElement('div');
    shockwave.className = 'explosion-shockwave';
    shockwave.style.borderColor = explosionColor;
    explosion.appendChild(shockwave);
    
    // Create new beams from explosion
    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        createBeamFromExplosion(x, y, explosionColor);
      }, Math.random() * 200);
    }
    
    // Remove explosion after animation completes
    setTimeout(() => {
      explosion.remove();
    }, config.explosionDuration);
  }
  
  // Function to create a beam from an explosion point
  function createBeamFromExplosion(x, y, color) {
    const beam = document.createElement('div');
    beam.className = 'exploding-beam from-explosion';
    beamsContainer.appendChild(beam);
    
    // Random properties
    const width = Math.random() * (config.maxWidth - config.minWidth) + config.minWidth;
    const height = Math.random() * (config.maxHeight - config.minHeight) + config.minHeight;
    const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
    const rotation = Math.random() * 360;
    
    // Apply styles
    beam.style.width = `${width}px`;
    beam.style.height = `${height}px`;
    beam.style.left = `${x}px`;
    beam.style.top = `${y}px`;
    beam.style.backgroundColor = color;
    beam.style.boxShadow = `0 0 20px ${color}`;
    beam.style.transform = `rotate(${rotation}deg)`;
    beam.style.animationDuration = `${duration}ms`;
    
    // Set custom properties for animation
    beam.style.setProperty('--end-x', `${Math.random() * window.innerWidth}px`);
    beam.style.setProperty('--end-y', `${Math.random() * window.innerHeight}px`);
    beam.style.setProperty('--end-rotation', `${rotation + (Math.random() > 0.5 ? 180 : -180)}deg`);
    
    // Store beam data for explosion
    beam.dataset.color = color;
    
    // Add explosion at the end of beam travel
    setTimeout(() => {
      if (beam.parentNode === beamsContainer) {
        const rect = beam.getBoundingClientRect();
        const beamCenterX = rect.left + rect.width / 2;
        const beamCenterY = rect.top + rect.height / 2;
        
        // 50% chance to create another explosion
        if (Math.random() > 0.5) {
          createExplosion(beamCenterX, beamCenterY, color);
        }
        
        beam.remove();
      }
    }, duration);
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    // Clear all beams
    beamsContainer.innerHTML = '';
    
    // Create new beams
    for (let i = 0; i < config.beamCount; i++) {
      createBeam();
    }
  });
});
