// Project Preloader - Ensures animation starts immediately on page load
(function() {
  // Create a small script to be executed before DOM is fully loaded
  // This ensures the loading animation starts as early as possible
  
  // Function to check if DOM is ready enough to start preloading
  function checkReadyState() {
    if (document.readyState === 'loading') {
      // If still loading, wait a bit and check again
      setTimeout(checkReadyState, 10);
    } else {
      // DOM is ready enough to start preloading
      initializePreloader();
    }
  }
  
  // Initialize preloader as soon as possible
  function initializePreloader() {
    // Get projects section - if it exists already
    const projectsSection = document.getElementById('projects');
    
    if (projectsSection) {
      // Projects section already exists, initialize immediately
      setupPreloader(projectsSection);
    } else {
      // Projects section doesn't exist yet, set up mutation observer
      setupMutationObserver();
    }
  }
  
  // Set up mutation observer to detect when projects section is added to DOM
  function setupMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            if (node.id === 'projects') {
              // Found projects section, initialize preloader
              setupPreloader(node);
              observer.disconnect();
              break;
            } else if (node.querySelector && node.querySelector('#projects')) {
              // Found projects section inside added node
              setupPreloader(node.querySelector('#projects'));
              observer.disconnect();
              break;
            }
          }
        }
      });
    });
    
    // Start observing document body for projects section
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  // Set up preloader for projects section
  function setupPreloader(projectsSection) {
    // Create preloader element
    const preloader = document.createElement('div');
    preloader.className = 'projects-preloader';
    preloader.innerHTML = `
      <div class="preloader-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <div class="preloader-text">Initializing Projects</div>
    `;
    
    // Insert preloader at the beginning of projects section
    projectsSection.insertBefore(preloader, projectsSection.firstChild);
    
    // Force layout recalculation to trigger immediate animation
    preloader.offsetHeight;
    
    // Add active class to start animation
    preloader.classList.add('active');
    
    // Remove preloader when main loading animation is ready
    document.addEventListener('DOMContentLoaded', () => {
      // Keep preloader visible for a short time to ensure smooth transition
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          if (preloader.parentNode) {
            preloader.parentNode.removeChild(preloader);
          }
        }, 500);
      }, 300);
    });
  }
  
  // Start checking if DOM is ready
  checkReadyState();
})();
