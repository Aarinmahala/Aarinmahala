// Container Cover Animation for Aarin Mahala text
// Inspired by Aceternity UI's Container Cover component
document.addEventListener('DOMContentLoaded', () => {
  // Get the name element
  const nameElement = document.querySelector('.hero-text h1');
  
  if (nameElement) {
    // Create the container cover wrapper
    const coverWrapper = document.createElement('div');
    coverWrapper.className = 'container-cover-wrapper';
    
    // Get the original text
    const originalText = nameElement.textContent;
    
    // Clear the original element
    nameElement.textContent = '';
    
    // Create the container cover element
    const containerCover = document.createElement('div');
    containerCover.className = 'container-cover';
    
    // Create the text element
    const textElement = document.createElement('span');
    textElement.className = 'cover-text';
    textElement.textContent = originalText;
    
    // Create the beams container
    const beamsContainer = document.createElement('div');
    beamsContainer.className = 'cover-beams';
    
    // Create individual beams
    const beamCount = 20;
    for (let i = 0; i < beamCount; i++) {
      const beam = document.createElement('div');
      beam.className = 'cover-beam';
      
      // Set random properties for each beam
      const angle = Math.random() * 360;
      const delay = Math.random() * 1.5;
      const duration = 2.5 + Math.random() * 2;
      const width = 1 + Math.random() * 2;
      const opacity = 0.05 + Math.random() * 0.1;
      
      beam.style.setProperty('--angle', `${angle}deg`);
      beam.style.setProperty('--delay', `${delay}s`);
      beam.style.setProperty('--duration', `${duration}s`);
      beam.style.setProperty('--width', `${width}px`);
      beam.style.setProperty('--opacity', opacity);
      
      beamsContainer.appendChild(beam);
    }
    
    // No stars animation - removed as requested
    
    // Create the gradient overlay
    const gradientOverlay = document.createElement('div');
    gradientOverlay.className = 'cover-gradient';
    
    // Assemble the components
    containerCover.appendChild(beamsContainer);
    containerCover.appendChild(gradientOverlay);
    containerCover.appendChild(textElement);
    
    // Add to the wrapper
    coverWrapper.appendChild(containerCover);
    
    // Replace the original content with our new structure
    nameElement.appendChild(coverWrapper);
    
    // Add mouse move effect
    containerCover.addEventListener('mousemove', (e) => {
      const rect = containerCover.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate position as percentage
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      
      // Update beam positions
      beamsContainer.style.setProperty('--mouse-x', `${xPercent}%`);
      beamsContainer.style.setProperty('--mouse-y', `${yPercent}%`);
      
      // Update beam intensity based on mouse position
      const beams = beamsContainer.querySelectorAll('.cover-beam');
      beams.forEach(beam => {
        const distanceFromCenter = Math.sqrt(
          Math.pow((xPercent - 50) / 50, 2) + 
          Math.pow((yPercent - 50) / 50, 2)
        );
        
        // Increase opacity when mouse is closer to beam
        const newOpacity = 0.05 + (0.2 * (1 - distanceFromCenter));
        beam.style.opacity = newOpacity;
      });
    });
    
    // Reset on mouse leave
    containerCover.addEventListener('mouseleave', () => {
      beamsContainer.style.setProperty('--mouse-x', '50%');
      beamsContainer.style.setProperty('--mouse-y', '50%');
      
      // Reset beam opacity
      const beams = beamsContainer.querySelectorAll('.cover-beam');
      beams.forEach(beam => {
        beam.style.opacity = beam.style.getPropertyValue('--opacity');
      });
    });
    
    // Add animation class after a small delay to trigger entrance animation
    setTimeout(() => {
      containerCover.classList.add('animate-in');
    }, 100);
  }
});
