// Project Loading Animation inspired by Aceternity UI
document.addEventListener('DOMContentLoaded', () => {
  // Get projects section and elements
  const projectsSection = document.getElementById('projects');
  const projectsGrid = document.querySelector('.projects-grid');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (projectsSection && projectsGrid && projectCards.length > 0) {
    // Create loading overlay
    createLoadingOverlay(projectsSection, projectsGrid);
    
    // Initialize loading animation immediately
    initializeLoadingAnimation();
    
    // Reveal projects with staggered animation after loading
    setTimeout(() => {
      revealProjects(projectCards);
    }, 1500); // Adjust timing as needed
  }
});

// Create loading overlay with Aceternity-inspired effects
function createLoadingOverlay(projectsSection, projectsGrid) {
  // Create loading container
  const loadingContainer = document.createElement('div');
  loadingContainer.className = 'projects-loading-container';
  
  // Create grid pattern background
  const gridBackground = document.createElement('div');
  gridBackground.className = 'loading-grid-background';
  loadingContainer.appendChild(gridBackground);
  
  // Create dots for grid
  for (let i = 0; i < 100; i++) {
    const dot = document.createElement('div');
    dot.className = 'loading-grid-dot';
    gridBackground.appendChild(dot);
  }
  
  // Create beams container
  const beamsContainer = document.createElement('div');
  beamsContainer.className = 'loading-beams-container';
  loadingContainer.appendChild(beamsContainer);
  
  // Create beams
  for (let i = 0; i < 5; i++) {
    const beam = document.createElement('div');
    beam.className = 'loading-beam';
    beam.style.animationDelay = `${i * 0.2}s`;
    beamsContainer.appendChild(beam);
  }
  
  // Create loading text
  const loadingText = document.createElement('div');
  loadingText.className = 'loading-text';
  loadingText.innerHTML = `
    <span class="loading-letter">L</span>
    <span class="loading-letter">o</span>
    <span class="loading-letter">a</span>
    <span class="loading-letter">d</span>
    <span class="loading-letter">i</span>
    <span class="loading-letter">n</span>
    <span class="loading-letter">g</span>
    <span class="loading-dots">
      <span class="loading-dot"></span>
      <span class="loading-dot"></span>
      <span class="loading-dot"></span>
    </span>
  `;
  loadingContainer.appendChild(loadingText);
  
  // Create loading progress bar
  const progressContainer = document.createElement('div');
  progressContainer.className = 'loading-progress-container';
  
  const progressBar = document.createElement('div');
  progressBar.className = 'loading-progress-bar';
  progressContainer.appendChild(progressBar);
  
  loadingContainer.appendChild(progressContainer);
  
  // Insert loading container before projects grid
  projectsGrid.style.opacity = '0';
  projectsGrid.style.transform = 'translateY(20px)';
  projectsSection.insertBefore(loadingContainer, projectsGrid);
}

// Initialize loading animation
function initializeLoadingAnimation() {
  const progressBar = document.querySelector('.loading-progress-bar');
  const loadingContainer = document.querySelector('.projects-loading-container');
  
  if (progressBar && loadingContainer) {
    // Animate progress bar
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Hide loading overlay with fade out effect
        setTimeout(() => {
          loadingContainer.classList.add('fade-out');
          
          // Remove loading container after animation
          setTimeout(() => {
            loadingContainer.remove();
          }, 500);
        }, 300);
      }
      progressBar.style.width = `${progress}%`;
    }, 150);
    
    // Add active class to loading container for animations
    loadingContainer.classList.add('active');
  }
}

// Reveal projects with staggered animation
function revealProjects(projectCards) {
  const projectsGrid = document.querySelector('.projects-grid');
  
  if (projectsGrid) {
    // Show projects grid
    projectsGrid.style.opacity = '1';
    projectsGrid.style.transform = 'translateY(0)';
    projectsGrid.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // Staggered reveal for each card
    projectCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('reveal');
      }, index * 150);
    });
  }
}
