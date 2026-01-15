import { sections } from './config.js';

/**
 * Creates the sidebar navigation HTML
 */
export function createSidebar() {
  const nav = document.createElement('nav');
  nav.className = 'sidebar-nav';
  
  nav.innerHTML = `
    <div class="sidebar-header">
      <h2>Grafos Livres de C3</h2>
      <p>Projeto de Lógica Computacional</p>
    </div>
    <div class="sidebar-links" id="nav-links"></div>
  `;
  
  return nav;
}

/**
 * Renders navigation links based on current route
 */
export function renderNavLinks(currentRoute) {
  const container = document.getElementById('nav-links');
  if (!container) return;
  
  container.innerHTML = sections.map(section => {
    const isActive = currentRoute === section.route;
    return `
      <a href="#${section.route}" 
         class="nav-link ${isActive ? 'active' : ''}"
         data-route="${section.route}">
        <div class="nav-link-content">
          <span class="nav-number">${section.number}</span>
          <span>${section.title}</span>
        </div>
      </a>
    `;
  }).join('');
}
