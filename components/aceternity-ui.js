// Simplified Aceternity UI Components for vanilla JavaScript
window.AceternityUI = (function() {
  // Utility function similar to cn from the React version
  function cn(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  
  // Cover Component
  class Cover {
    constructor(element, options = {}) {
      this.element = element;
      this.options = {
        className: options.className || '',
        ...options
      };
      
      this.init();
    }
    
    init() {
      // Save original content and classes
      this.originalContent = this.element.innerHTML;
      this.originalClasses = this.element.className;
      
      // Create container
      this.container = document.createElement('div');
      this.container.className = cn(
        'relative hover:bg-neutral-900 group inline-block dark:bg-neutral-900 bg-neutral-100 px-2 py-2 transition duration-200 rounded-sm',
        this.options.className
      );
      
      // Create content span
      this.contentSpan = document.createElement('span');
      this.contentSpan.className = 'dark:text-white inline-block text-neutral-900 relative z-20 group-hover:text-white transition duration-200';
      this.contentSpan.innerHTML = this.originalContent;
      
      // Add circle icons
      const positions = [
        { right: '-2px', top: '-2px' },
        { right: '-2px', bottom: '-2px' },
        { left: '-2px', top: '-2px' },
        { left: '-2px', bottom: '-2px' }
      ];
      
      positions.forEach((pos, index) => {
        const circle = document.createElement('div');
        circle.className = 'pointer-events-none animate-pulse group-hover:hidden group-hover:opacity-100 h-2 w-2 rounded-full bg-neutral-600 dark:bg-white opacity-20 group-hover:bg-white absolute';
        Object.entries(pos).forEach(([key, value]) => {
          circle.style[key] = value;
        });
        circle.style.animationDelay = `${index * 0.2}s`;
        this.container.appendChild(circle);
      });
      
      // Create beam container
      this.beamContainer = document.createElement('div');
      this.beamContainer.className = 'absolute inset-0 overflow-hidden opacity-0';
      
      // Replace original element with our container
      this.container.appendChild(this.contentSpan);
      this.container.appendChild(this.beamContainer);
      
      // Replace element content with our container
      this.element.innerHTML = '';
      this.element.appendChild(this.container);
      
      // Add event listeners
      this.addEventListeners();
      
      // Create beams
      this.createBeams();
    }
    
    createBeams() {
      const height = this.container.clientHeight;
      const numberOfBeams = Math.floor(height / 10);
      
      for (let i = 0; i < numberOfBeams; i++) {
        const position = (i + 1) * (height / (numberOfBeams + 1));
        const beam = document.createElement('div');
        
        beam.className = 'beam-line absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent';
        beam.style.top = `${position}px`;
        beam.style.opacity = '0';
        beam.style.transform = 'translateX(-100%)';
        
        this.beamContainer.appendChild(beam);
      }
    }
    
    addEventListeners() {
      this.container.addEventListener('mouseenter', () => this.onMouseEnter());
      this.container.addEventListener('mouseleave', () => this.onMouseLeave());
    }
    
    onMouseEnter() {
      // Show beams container
      this.beamContainer.style.opacity = '1';
      
      // Animate content
      this.contentSpan.style.transform = 'scale(0.8)';
      this.contentSpan.style.color = 'white';
      
      // Start beam animations
      const beams = this.beamContainer.querySelectorAll('.beam-line');
      beams.forEach((beam, index) => {
        beam.style.opacity = '1';
        beam.style.transition = `transform ${1 + Math.random()}s linear ${Math.random() * 0.5}s`;
        beam.style.transform = 'translateX(100%)';
      });
      
      // Add shake animation to content
      this.contentSpan.classList.add('shake-animation');
    }
    
    onMouseLeave() {
      // Hide beams container
      this.beamContainer.style.opacity = '0';
      
      // Reset content
      this.contentSpan.style.transform = '';
      this.contentSpan.style.color = '';
      
      // Reset beam animations
      const beams = this.beamContainer.querySelectorAll('.beam-line');
      beams.forEach(beam => {
        beam.style.opacity = '0';
        beam.style.transform = 'translateX(-100%)';
      });
      
      // Remove shake animation
      this.contentSpan.classList.remove('shake-animation');
    }
  }
  
  // Return public API
  return {
    Cover
  };
})();
