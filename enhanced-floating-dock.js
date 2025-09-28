// Enhanced Floating Dock Navigation
document.addEventListener('DOMContentLoaded', () => {
  // Get the existing navbar
  const navbar = document.querySelector('.navbar');
  
  // Remove any existing floating dock to prevent duplicates
  const existingDock = document.querySelector('.floating-dock');
  if (existingDock) {
    existingDock.remove();
  }
  
  if (navbar) {
    // Create floating dock container
    const floatingDock = document.createElement('div');
    floatingDock.className = 'floating-dock';
    document.body.appendChild(floatingDock);
    
    // Create inner container for dock items
    const dockInner = document.createElement('div');
    dockInner.className = 'dock-inner';
    floatingDock.appendChild(dockInner);
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Create dock items based on existing navigation
    navLinks.forEach(link => {
      const dockItem = document.createElement('a');
      dockItem.className = 'dock-item';
      dockItem.href = link.getAttribute('href');
      
      // Copy icon from original nav
      const icon = link.querySelector('i').cloneNode(true);
      dockItem.appendChild(icon);
      
      // Add label
      const label = document.createElement('span');
      label.className = 'dock-label';
      label.textContent = link.querySelector('span:not(.nav-tooltip)').textContent;
      dockItem.appendChild(label);
      
      // Add to dock
      dockInner.appendChild(dockItem);
    });
    
    // Get all dock items
    const dockItems = document.querySelectorAll('.dock-item');
    
    // Add click event listeners to dock items
    dockItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // Prevent default anchor behavior
        e.preventDefault();
        
        // Get target section ID
        const targetId = item.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Get the target's position with offset for fixed header
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          // Smooth scroll to target
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update active state in both navigation systems
          updateActiveState(targetId);
        }
      });
    });
    
    // Function to update active state in both navigation systems
    function updateActiveState(targetId) {
      // Update dock items
      dockItems.forEach(item => {
        if (item.getAttribute('href') === targetId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      
      // Update original nav links
      navLinks.forEach(link => {
        if (link.getAttribute('href') === targetId) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      });
    }
    
    // Function to update active link based on scroll position
    function updateActiveLinks() {
      // Get all sections
      const sections = document.querySelectorAll('section');
      
      // Get current scroll position
      const scrollPosition = window.scrollY + 100; // Add offset for header
      
      // Find the current section
      let currentSectionId = '';
      
      // Check each section's position
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // If the scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = `#${section.id}`;
        }
      });
      
      // If we found a current section, update active states
      if (currentSectionId) {
        updateActiveState(currentSectionId);
      }
    }
    
    // Add scroll event listener to show/hide dock and update active links
    let lastScrollTop = 0;
    let isScrollingUp = false;
    let scrollTimeout;
    
    // Throttled scroll handler
    window.addEventListener('scroll', () => {
      // Clear the timeout if it's set
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Set a timeout to run after scrolling ends
      scrollTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Determine scroll direction
        isScrollingUp = scrollTop < lastScrollTop;
        
        // Show dock when scrolling up or at top of page
        if (isScrollingUp || scrollTop < 100) {
          floatingDock.classList.add('visible');
        } else {
          floatingDock.classList.remove('visible');
        }
        
        // Update last scroll position
        lastScrollTop = scrollTop;
        
        // Update active links
        updateActiveLinks();
      }, 10); // Small delay for better performance
    }, { passive: true });
    
    // Initialize dock visibility
    setTimeout(() => {
      floatingDock.classList.add('visible');
      
      // Initial update of active links
      updateActiveLinks();
    }, 500);
    
    // Add magnetic effect to dock items with improved performance
    dockItems.forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate distance from center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Apply magnetic pull effect (subtle)
        requestAnimationFrame(() => {
          item.style.transform = `
            scale(1.2)
            translateX(${(x - centerX) / 10}px)
            translateY(${(y - centerY) / 10}px)
          `;
        });
      });
      
      item.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
          item.style.transform = '';
        });
      });
    });
    
    // Update active links when page is loaded
    window.addEventListener('load', updateActiveLinks);
    
    // Update active links when hash changes
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;
      if (hash) {
        updateActiveState(hash);
      }
    });
  }
});
