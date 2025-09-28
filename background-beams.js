// Background Beams with Collision Effect
document.addEventListener('DOMContentLoaded', () => {
  const beamsContainer = document.createElement('div');
  beamsContainer.className = 'background-beams';
  document.body.appendChild(beamsContainer);

  // Configuration
  const config = {
    beamCount: 10,
    maxBeamWidth: 10,
    minBeamWidth: 2,
    maxBeamHeight: 200,
    minBeamHeight: 100,
    maxSpeed: 1.5,
    minSpeed: 0.5,
    maxOpacity: 0.5,
    minOpacity: 0.1,
    colors: ['#4f46e5', '#8b5cf6', '#d946ef', '#2563eb', '#0ea5e9']
  };

  // Beam class
  class Beam {
    constructor() {
      this.element = document.createElement('div');
      this.element.className = 'beam';
      beamsContainer.appendChild(this.element);
      
      this.reset();
    }
    
    reset() {
      // Random position, size, speed, and color
      this.width = Math.random() * (config.maxBeamWidth - config.minBeamWidth) + config.minBeamWidth;
      this.height = Math.random() * (config.maxBeamHeight - config.minBeamHeight) + config.minBeamHeight;
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.speedX = (Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed) * (Math.random() > 0.5 ? 1 : -1);
      this.speedY = (Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed) * (Math.random() > 0.5 ? 1 : -1);
      this.opacity = Math.random() * (config.maxOpacity - config.minOpacity) + config.minOpacity;
      this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
      
      // Apply styles
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
      this.element.style.opacity = this.opacity;
      this.element.style.backgroundColor = this.color;
      this.element.style.boxShadow = `0 0 20px ${this.color}`;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Boundary check
      if (this.x < -this.width) this.x = window.innerWidth;
      if (this.x > window.innerWidth) this.x = -this.width;
      if (this.y < -this.height) this.y = window.innerHeight;
      if (this.y > window.innerHeight) this.y = -this.height;
      
      // Apply new position
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
    }
  }

  // Create beams
  const beams = Array.from({ length: config.beamCount }, () => new Beam());

  // Animation loop
  function animate() {
    beams.forEach(beam => beam.update());
    requestAnimationFrame(animate);
  }
  
  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    beams.forEach(beam => beam.reset());
  });
});
