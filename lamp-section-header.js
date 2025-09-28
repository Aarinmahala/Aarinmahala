// Lamp Section Header Effect from Aceternity UI
document.addEventListener('DOMContentLoaded', () => {
  // Get all section headers
  const sectionHeaders = document.querySelectorAll('section > h2');
  
  sectionHeaders.forEach(header => {
    // Create lamp header container
    const lampContainer = document.createElement('div');
    lampContainer.className = 'lamp-header';
    
    // Get the parent section
    const section = header.parentNode;
    
    // Insert lamp container before the header
    section.insertBefore(lampContainer, header);
    
    // Move header inside lamp container
    lampContainer.appendChild(header);
    
    // Create lamp light effect
    const lampLight = document.createElement('div');
    lampLight.className = 'lamp-light';
    lampContainer.appendChild(lampLight);
    
    // Create lamp glow effect
    const lampGlow = document.createElement('div');
    lampGlow.className = 'lamp-glow';
    lampContainer.appendChild(lampGlow);
    
    // Create lamp shine lines
    for (let i = 0; i < 3; i++) {
      const shineLine = document.createElement('div');
      shineLine.className = `lamp-shine-line line-${i + 1}`;
      lampContainer.appendChild(shineLine);
    }
    
    // Create lamp cord
    const lampCord = document.createElement('div');
    lampCord.className = 'lamp-cord';
    lampContainer.appendChild(lampCord);
    
    // Create lamp shade
    const lampShade = document.createElement('div');
    lampShade.className = 'lamp-shade';
    lampContainer.appendChild(lampShade);
    
    // Add intersection observer to animate lamp when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          lampContainer.classList.add('lamp-visible');
          
          // Disconnect after animation is triggered
          setTimeout(() => {
            observer.disconnect();
          }, 1000);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(lampContainer);
    
    // Add mouse interaction for dynamic lighting effect
    lampContainer.addEventListener('mousemove', (e) => {
      const rect = lampContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate position as percentage
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
      
      // Update light position
      lampLight.style.background = `
        radial-gradient(
          circle at ${xPercent}% ${yPercent}%,
          rgba(255, 255, 255, 0.8) 0%,
          rgba(255, 255, 255, 0) 50%
        )
      `;
      
      // Update glow position
      lampGlow.style.background = `
        radial-gradient(
          circle at ${xPercent}% ${yPercent}%,
          rgba(79, 70, 229, 0.3) 0%,
          rgba(79, 70, 229, 0) 70%
        )
      `;
      
      // Update shine lines
      const shineLines = lampContainer.querySelectorAll('.lamp-shine-line');
      shineLines.forEach((line, index) => {
        const angle = Math.atan2(yPercent - 50, xPercent - 50) * (180 / Math.PI);
        const distance = Math.sqrt(Math.pow(xPercent - 50, 2) + Math.pow(yPercent - 50, 2)) / 100;
        
        line.style.transform = `
          rotate(${angle + index * 30}deg)
          scaleX(${0.8 + distance * 0.4})
        `;
        
        line.style.opacity = Math.max(0.3, Math.min(0.8, 0.5 + distance * 0.5));
      });
    });
    
    // Reset light effect on mouse leave
    lampContainer.addEventListener('mouseleave', () => {
      // Reset light
      lampLight.style.background = `
        radial-gradient(
          circle at 50% 0%,
          rgba(255, 255, 255, 0.8) 0%,
          rgba(255, 255, 255, 0) 50%
        )
      `;
      
      // Reset glow
      lampGlow.style.background = `
        radial-gradient(
          circle at 50% 0%,
          rgba(79, 70, 229, 0.3) 0%,
          rgba(79, 70, 229, 0) 70%
        )
      `;
      
      // Reset shine lines
      const shineLines = lampContainer.querySelectorAll('.lamp-shine-line');
      shineLines.forEach((line, index) => {
        line.style.transform = `
          rotate(${index * 45}deg)
          scaleX(1)
        `;
        
        line.style.opacity = 0.5;
      });
    });
    
    // Initial light state
    lampLight.style.background = `
      radial-gradient(
        circle at 50% 0%,
        rgba(255, 255, 255, 0.8) 0%,
        rgba(255, 255, 255, 0) 50%
      )
    `;
    
    lampGlow.style.background = `
      radial-gradient(
        circle at 50% 0%,
        rgba(79, 70, 229, 0.3) 0%,
        rgba(79, 70, 229, 0) 70%
      )
    `;
  });
});
