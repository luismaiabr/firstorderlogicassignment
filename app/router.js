import { createSidebar, renderNavLinks } from './sidebar.js';
import { 
  renderPage1, 
  renderPage2, initPage2,
  renderPage3, initPage3,
  renderPage4, initPage4,
  renderPage5, initPage5,
  renderPage6, initPage6
} from './pages/index.js';

/**
 * Router - handles hash-based navigation
 */
class Router {
  constructor() {
    this.routes = {
      '/': { render: renderPage1, init: null },
      '/2': { render: renderPage2, init: initPage2 },
      '/3': { render: renderPage3, init: initPage3 },
      '/4': { render: renderPage4, init: initPage4 },
      '/5': { render: renderPage5, init: initPage5 },
      '/6': { render: renderPage6, init: initPage6 },
    };
    
    this.mainContent = null;
  }
  
  init(mainContent) {
    this.mainContent = mainContent;
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // Handle initial route
    this.handleRoute();
  }
  
  getCurrentRoute() {
    const hash = window.location.hash.slice(1) || '/';
    return hash;
  }
  
  async handleRoute() {
    const route = this.getCurrentRoute();
    const routeConfig = this.routes[route] || this.routes['/'];
    
    // Render the page content
    this.mainContent.innerHTML = routeConfig.render();
    
    // Update navigation links
    renderNavLinks(route);
    
    // Initialize page-specific functionality
    if (routeConfig.init) {
      await routeConfig.init();
    }
    
    // Scroll to top
    this.mainContent.scrollTop = 0;
  }
}

/**
 * Initialize the application
 */
export function initApp() {
  const appContainer = document.getElementById('app');
  
  if (!appContainer) {
    console.error('App container not found');
    return;
  }
  
  // Create app structure
  appContainer.className = 'app-container';
  appContainer.innerHTML = '';
  
  // Create main content area
  const mainContent = document.createElement('main');
  mainContent.className = 'main-content';
  
  // Create sidebar
  const sidebar = createSidebar();
  
  // Append elements
  appContainer.appendChild(mainContent);
  appContainer.appendChild(sidebar);
  
  // Initialize router
  const router = new Router();
  router.init(mainContent);
}
