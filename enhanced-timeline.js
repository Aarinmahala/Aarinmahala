// Enhanced Timeline Animation with Aceternity UI Effects
document.addEventListener('DOMContentLoaded', () => {
  // Get the timeline section
  const timelineSection = document.querySelector('.experience .timeline');
  
  if (timelineSection) {
    // Add modern timeline class
    timelineSection.classList.add('modern-timeline');
    
    // Create the timeline wrapper for 3D effect
    const timelineWrapper = document.createElement('div');
    timelineWrapper.className = 'timeline-wrapper';
    
    // Move timeline items into the wrapper
    const timelineItems = Array.from(document.querySelectorAll('.timeline-item'));
    timelineSection.innerHTML = '';
    timelineSection.appendChild(timelineWrapper);
    
    // Create timeline progress line
    const progressLine = document.createElement('div');
    progressLine.className = 'timeline-progress-line';
    timelineWrapper.appendChild(progressLine);
    
    // Add magnetic scroll indicator
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'timeline-scroll-indicator';
    scrollIndicator.innerHTML = '<div class="scroll-icon"><i class="fas fa-chevron-down"></i></div>';
    timelineSection.appendChild(scrollIndicator);
    
    // Re-add timeline items to wrapper
    timelineItems.forEach((item, index) => {
      timelineWrapper.appendChild(item);
      
      // Add staggered animation delay
      item.style.setProperty('--animation-delay', `${index * 0.15}s`);
      item.classList.add('timeline-animate');
      
      // Add hover effect class
      item.classList.add('timeline-hover-effect');
      
      // Add glowing dot effect
      const dot = item.querySelector('.timeline-dot');
      if (dot) {
        dot.classList.add('glowing-dot');
        
        // Add magnetic effect to dots
        dot.addEventListener('mousemove', (e) => {
          const rect = dot.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          // Apply magnetic pull (stronger than before)
          dot.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.2)`;
        });
        
        dot.addEventListener('mouseleave', () => {
          dot.style.transform = '';
        });
      }
      
      // Add content animation and 3D effect
      const content = item.querySelector('.timeline-content');
      if (content) {
        content.classList.add('content-animate');
        content.classList.add('content-3d');
        
        // Add 3D tilt effect on hover
        content.addEventListener('mousemove', (e) => {
          const rect = content.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Convert to percentage
          const xPercent = x / rect.width;
          const yPercent = y / rect.height;
          
          // Calculate rotation (max 5 degrees)
          const rotateX = (0.5 - yPercent) * 5;
          const rotateY = (xPercent - 0.5) * 5;
          
          content.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.02, 1.02, 1.02)
            translateY(-5px)
          `;
        });
        
        content.addEventListener('mouseleave', () => {
          content.style.transform = '';
        });
        
        // Add shine effect
        const shineEffect = document.createElement('div');
        shineEffect.className = 'timeline-shine-effect';
        content.appendChild(shineEffect);
        
        content.addEventListener('mousemove', (e) => {
          const rect = content.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // Convert to percentage
          const xPercent = (x / rect.width) * 100;
          const yPercent = (y / rect.height) * 100;
          
          shineEffect.style.background = `
            radial-gradient(
              circle at ${xPercent}% ${yPercent}%,
              rgba(255, 255, 255, 0.3) 0%,
              rgba(255, 255, 255, 0) 80%
            )
          `;
        });
        
        content.addEventListener('mouseleave', () => {
          shineEffect.style.background = 'none';
        });
        
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
    
    // Update timeline progress line on scroll
    function updateProgressLine() {
      const sectionTop = timelineSection.getBoundingClientRect().top;
      const sectionHeight = timelineSection.offsetHeight;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight - 200)));
        progressLine.style.height = `${progress * 100}%`;
        
        // Hide scroll indicator when scrolled
        if (progress > 0.1) {
          scrollIndicator.style.opacity = '0';
        } else {
          scrollIndicator.style.opacity = '1';
        }
      }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', updateProgressLine);
    
    // Initial update
    updateProgressLine();
    
    // Create floating particles
    for (let i = 0; i < 30; i++) {
      createTimelineParticle(timelineWrapper);
    }
    
    // Add glow effect to the timeline section
    const glowEffect = document.createElement('div');
    glowEffect.className = 'timeline-glow-effect';
    timelineSection.appendChild(glowEffect);
    
    // Add section entrance animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineSection.classList.add('section-visible');
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(timelineSection);
  }
  
  // Function to create floating particles with improved physics
  function createTimelineParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'timeline-particle';
    container.appendChild(particle);
    
    // Random properties with more variation
    const size = Math.random() * 8 + 2;
    const duration = Math.random() * 15 + 10;
    const startPos = Math.random() * 100;
    const delay = Math.random() * 5;
    
    // Random movement pattern
    const moveX = (Math.random() - 0.5) * 100;
    const moveY = -100 - Math.random() * 50;
    
    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${startPos}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    
    // Set custom properties for animation
    particle.style.setProperty('--move-x', `${moveX}px`);
    particle.style.setProperty('--move-y', `${moveY}px`);
    
    // Random colors with more variety
    const colors = [
      '#4f46e5', '#8b5cf6', '#d946ef', '#2563eb', '#0ea5e9', 
      '#06b6d4', '#14b8a6', '#10b981', '#84cc16', '#eab308'
    ];
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Add glow effect to some particles
    if (Math.random() > 0.7) {
      const glow = colors[Math.floor(Math.random() * colors.length)];
      particle.style.boxShadow = `0 0 10px ${glow}`;
    }
    
    // Remove and recreate particle after animation
    setTimeout(() => {
      particle.remove();
      createTimelineParticle(container);
    }, (duration + delay) * 1000);
  }
});
