// Study Buddy Mobile Application - Frontend JavaScript
// Modern vanilla JavaScript with mobile-first approach

class StudyBuddyApp {
  constructor() {
    this.currentUser = null;
    this.subjects = [];
    this.userProgress = {};
    this.init();
  }

  // Initialize the application
  async init() {
    console.log('🚀 Study Buddy App Initializing...');
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Load initial data
    await this.loadSubjects();
    
    // Initialize UI components
    this.initializeUI();
    
    console.log('✅ Study Buddy App Ready!');
  }

  // Set up event listeners
  setupEventListeners() {
    // Handle mobile navigation
    document.addEventListener('DOMContentLoaded', () => {
      this.handleMobileNavigation();
    });

    // Handle window resize for responsive design
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));

    // Handle offline/online status
    window.addEventListener('online', () => this.handleOnlineStatus(true));
    window.addEventListener('offline', () => this.handleOnlineStatus(false));

    // Handle visibility change (app focus/blur)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.refreshData();
      }
    });
  }

  // Load subjects from API
  async loadSubjects() {
    try {
      const response = await axios.get('/api/subjects');
      if (response.data.success) {
        this.subjects = response.data.subjects;
        this.renderSubjects();
      }
    } catch (error) {
      console.error('Failed to load subjects:', error);
      this.showNotification('Failed to load subjects', 'error');
    }
  }

  // Render subjects grid
  renderSubjects() {
    const subjectsGrid = document.getElementById('subjects-grid');
    if (!subjectsGrid || !this.subjects.length) return;

    subjectsGrid.innerHTML = this.subjects.map(subject => `
      <div class="subject-card" 
           style="--subject-color: ${subject.color}; --subject-color-dark: ${this.darkenColor(subject.color)}" 
           onclick="app.openSubject('${subject.id}', '${subject.name}')">
        <div class="flex items-center justify-between mb-2">
          <span class="text-2xl">${subject.icon}</span>
          <span class="text-xs opacity-75">${subject.code}</span>
        </div>
        <div>
          <h4 class="font-semibold text-lg leading-tight">${subject.name}</h4>
          <p class="text-xs opacity-90 mt-1 line-clamp-2">${subject.description || ''}</p>
        </div>
        <div class="mt-3">
          <div class="progress-bar bg-white bg-opacity-20">
            <div class="progress-fill bg-white" style="width: ${this.getSubjectProgress(subject.id)}%"></div>
          </div>
          <div class="text-xs mt-1 opacity-90">${this.getSubjectProgress(subject.id)}% Complete</div>
        </div>
      </div>
    `).join('');

    // Add animation
    this.animateElements(subjectsGrid.children);
  }

  // Open subject page
  openSubject(subjectId, subjectName) {
    this.showNotification(`Opening ${subjectName || 'subject'}...`, 'success');
    
    // Navigate to subject detail page
    window.location.href = `/subject/${subjectId}`;
  }

  // Open topic page
  openTopic(topicId, topicTitle) {
    this.showNotification(`Opening ${topicTitle || 'topic'}...`, 'success');
    
    // For now, show coming soon message
    // In future, navigate to topic detail page
    setTimeout(() => {
      this.showNotification('Topic content coming soon! 🚀', 'info');
    }, 1000);
  }

  // Show sign in modal
  showSignIn() {
    this.showNotification('Sign-in functionality coming soon! 🔐', 'info');
    
    // Create a simple modal for demo
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
    modal.innerHTML = `
      <div class="bg-white rounded-lg p-8 max-w-md mx-4">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Sign In to Study Buddy</h3>
        <p class="text-gray-600 mb-6">Create an account or sign in to track your progress and access personalized learning.</p>
        <div class="space-y-4">
          <input type="email" placeholder="Email address" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <input type="password" placeholder="Password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors" onclick="app.mockSignIn()">
            Sign In (Demo)
          </button>
        </div>
        <div class="mt-4 text-center">
          <button class="text-gray-500 hover:text-gray-700 text-sm" onclick="this.closest('.fixed').remove()">
            Close
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Mock sign in for demo
  mockSignIn() {
    this.showNotification('Demo sign-in successful! Welcome to Study Buddy! 🎉', 'success');
    document.querySelector('.fixed.inset-0')?.remove();
  }

  // Show demo functionality
  showDemo() {
    this.showNotification('Demo mode activated! Explore the features below. 🎮', 'success');
    
    // Scroll to features section
    const featuresSection = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Show learn more info
  showLearnMore() {
    this.showNotification('Learn more about Study Buddy features! 📖', 'info');
    
    // Create info modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-lg p-8 max-w-2xl max-h-96 overflow-y-auto">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">About Study Buddy</h3>
        <div class="space-y-4 text-gray-600">
          <p><strong>🎯 Mission:</strong> Empower O-Level students with interactive, mobile-first learning experiences.</p>
          <p><strong>📚 Curriculum:</strong> Complete coverage of Mathematics, English, Science, History, Geography, Chemistry, Physics, and Biology.</p>
          <p><strong>🎮 Gamification:</strong> Earn points, badges, and achievements as you progress through your studies.</p>
          <p><strong>📱 Mobile-First:</strong> Optimized for smartphones and tablets with offline capabilities.</p>
          <p><strong>💬 WhatsApp Integration:</strong> Get study reminders and quick lessons through WhatsApp.</p>
          <p><strong>📊 Analytics:</strong> Detailed progress tracking and performance insights.</p>
        </div>
        <div class="mt-6 flex space-x-4">
          <button class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors" onclick="window.location.href='/dashboard'">
            Start Learning
          </button>
          <button class="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors" onclick="this.closest('.fixed').remove()">
            Close
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Show profile
  showProfile() {
    this.showNotification('Profile management coming soon! 👤', 'info');
  }

  // Get subject progress (mock data for now)
  getSubjectProgress(subjectId) {
    const progressMap = {
      '1': 75, // Math
      '2': 60, // English
      '3': 45, // Science
      '4': 30, // History
      '5': 20, // Geography
      '6': 0,  // Chemistry
      '7': 0,  // Physics
      '8': 0   // Biology
    };
    return progressMap[subjectId] || 0;
  }

  // Initialize UI components
  initializeUI() {
    // Initialize mobile navigation
    this.initMobileNavigation();
    
    // Initialize tooltips
    this.initTooltips();
    
    // Initialize modals
    this.initModals();
    
    // Add smooth scrolling
    this.initSmoothScrolling();

    // Add intersection observer for animations
    this.initScrollAnimations();
  }

  // Initialize mobile navigation
  initMobileNavigation() {
    // Add mobile menu toggle if needed
    const mobileMenuButton = document.querySelector('[data-mobile-menu-toggle]');
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener('click', this.toggleMobileMenu.bind(this));
    }
  }

  // Initialize scroll animations
  initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all cards and sections
    document.querySelectorAll('.card, section, .feature-item').forEach(el => {
      observer.observe(el);
    });
  }

  // Initialize smooth scrolling
  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Initialize tooltips
  initTooltips() {
    // Simple tooltip implementation
    document.querySelectorAll('[data-tooltip]').forEach(el => {
      el.addEventListener('mouseenter', this.showTooltip.bind(this));
      el.addEventListener('mouseleave', this.hideTooltip.bind(this));
    });
  }

  // Initialize modals
  initModals() {
    // Modal close buttons
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', this.closeModal.bind(this));
    });

    // Close modal on backdrop click
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          this.closeModal();
        }
      });
    });
  }

  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="flex items-start">
        <div class="flex-shrink-0">
          ${this.getNotificationIcon(type)}
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium text-gray-900">${message}</p>
        </div>
        <div class="ml-4 flex-shrink-0">
          <button class="text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.parentElement.remove()">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }

  // Get notification icon
  getNotificationIcon(type) {
    const icons = {
      success: '<i class="fas fa-check-circle text-green-500"></i>',
      error: '<i class="fas fa-exclamation-circle text-red-500"></i>',
      warning: '<i class="fas fa-exclamation-triangle text-yellow-500"></i>',
      info: '<i class="fas fa-info-circle text-blue-500"></i>'
    };
    return icons[type] || icons.info;
  }

  // Handle mobile navigation
  handleMobileNavigation() {
    // Detect swipe gestures for mobile navigation
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });
  }

  // Handle swipe gestures
  handleSwipe() {
    const swipeThreshold = 100;
    const swipeDistance = Math.abs(touchEndX - touchStartX);

    if (swipeDistance > swipeThreshold) {
      if (touchEndX < touchStartX) {
        // Swipe left
        this.handleSwipeLeft();
      } else {
        // Swipe right
        this.handleSwipeRight();
      }
    }
  }

  // Handle window resize
  handleResize() {
    // Adjust layout for different screen sizes
    const width = window.innerWidth;
    
    if (width < 640) {
      document.body.classList.add('mobile-view');
    } else {
      document.body.classList.remove('mobile-view');
    }
  }

  // Handle online/offline status
  handleOnlineStatus(isOnline) {
    const statusMessage = isOnline ? 'Connection restored' : 'You are offline';
    const statusType = isOnline ? 'success' : 'warning';
    
    this.showNotification(statusMessage, statusType);
    
    // Update UI based on connection status
    if (isOnline) {
      this.refreshData();
    }
  }

  // Refresh data
  async refreshData() {
    // Reload subjects and other data
    await this.loadSubjects();
  }

  // Animate elements
  animateElements(elements) {
    Array.from(elements).forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  // Darken color utility
  darkenColor(color, amount = 20) {
    const hex = color.replace('#', '');
    const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - amount);
    const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - amount);
    const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - amount);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  // Debounce utility
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Show tooltip
  showTooltip(event) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip bg-gray-900 text-white text-xs rounded px-2 py-1 absolute z-50';
    tooltip.textContent = event.target.getAttribute('data-tooltip');
    
    document.body.appendChild(tooltip);
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
  }

  // Hide tooltip
  hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }

  // Close modal
  closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.classList.add('hidden');
    });
  }

  // Toggle mobile menu
  toggleMobileMenu() {
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
    }
  }

  // Handle swipe left
  handleSwipeLeft() {
    console.log('Swiped left');
    // Implement navigation logic
  }

  // Handle swipe right
  handleSwipeRight() {
    console.log('Swiped right');
    // Implement navigation logic
  }

  // Quiz functionality
  startQuiz(quizId) {
    console.log(`Starting quiz: ${quizId}`);
    // Implement quiz logic
  }

  // Progress tracking
  updateProgress(contentId, progress) {
    console.log(`Updating progress for content ${contentId}: ${progress}%`);
    // Implement progress tracking
  }

  // Study session tracking
  startStudySession(contentId) {
    console.log(`Starting study session for content: ${contentId}`);
    this.studyStartTime = Date.now();
  }

  endStudySession(contentId) {
    if (this.studyStartTime) {
      const duration = Date.now() - this.studyStartTime;
      console.log(`Ending study session for content ${contentId}. Duration: ${duration}ms`);
      // Send to API
    }
  }
}

// Utility functions
const utils = {
  // Format time
  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  },

  // Format date
  formatDate(date) {
    return dayjs(date).format('MMM DD, YYYY');
  },

  // Format relative time
  formatRelativeTime(date) {
    return dayjs(date).fromNow();
  },

  // Generate random ID
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  },

  // Validate email
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Storage helpers
  storage: {
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn('Failed to save to localStorage:', e);
      }
    },

    get(key) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.warn('Failed to read from localStorage:', e);
        return null;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn('Failed to remove from localStorage:', e);
      }
    }
  }
};

// Initialize the app when DOM is ready
let app;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    app = new StudyBuddyApp();
  });
} else {
  app = new StudyBuddyApp();
}

// Make app globally available
window.StudyBuddy = {
  app,
  utils
};

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}