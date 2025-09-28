// Modern Timeline Animation
document.addEventListener('DOMContentLoaded', () => {
  // Get the timeline section
  const timelineSection = document.querySelector('.experience .timeline');
  
  if (timelineSection) {
    // Add modern timeline class
    timelineSection.classList.add('modern-timeline');
    
    // Get all timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Add animation classes to timeline items
    timelineItems.forEach((item, index) => {
      // Add staggered animation delay
      item.style.setProperty('--animation-delay', `${index * 0.15}s`);
      item.classList.add('timeline-animate');
      
      // Add hover effect class
      item.classList.add('timeline-hover-effect');
      
      // Add glowing dot effect
      const dot = item.querySelector('.timeline-dot');
      if (dot) {
        dot.classList.add('glowing-dot');
      }
      
      // Add content animation
      const content = item.querySelector('.timeline-content');
      if (content) {
        content.classList.add('content-animate');
        
        // Add inner elements animation
        const innerElements = [
          ...Array.from(content.querySelectorAll('h3, p, .timeline-date, .timeline-achievements, .timeline-skills li, .achievement-list li, .certification-card')),
        ];
        
        innerElements.forEach((element, innerIndex) => {
          element.classList.add('inner-animate');
          element.style.setProperty('--inner-delay', `${innerIndex * 0.1 + 0.3}s`);
        });
      }
    });
    
    // Create timeline progress line
    const progressLine = document.createElement('div');
    progressLine.className = 'timeline-progress-line';
    timelineSection.appendChild(progressLine);
    
    // Update timeline progress line on scroll
    function updateProgressLine() {
      const sectionTop = timelineSection.getBoundingClientRect().top;
      const sectionHeight = timelineSection.offsetHeight;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight - 200)));
        progressLine.style.height = `${progress * 100}%`;
      }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', updateProgressLine);
    
    // Initial update
    updateProgressLine();
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
      createTimelineParticle(timelineSection);
    }
  }
  
  // Function to create floating particles
  function createTimelineParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'timeline-particle';
    container.appendChild(particle);
    
    // Random properties
    const size = Math.random() * 6 + 2;
    const duration = Math.random() * 10 + 10;
    const startPos = Math.random() * 100;
    
    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${startPos}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    
    // Random colors
    const colors = ['#4f46e5', '#8b5cf6', '#d946ef', '#2563eb', '#0ea5e9'];
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Remove and recreate particle after animation
    setTimeout(() => {
      particle.remove();
      createTimelineParticle(container);
    }, duration * 1000);
  }
});
