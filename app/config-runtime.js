// Runtime configuration loader
// This script should be loaded BEFORE config.js in index.html
(function() {
  const baseURL = new URLSearchParams(window.location.search).get('baseURL') 
    || localStorage.getItem('serverBaseURL')
    || window.__VERCEL_BASE_URL__
    || 'http://localhost:8000';
  
  window.__SERVER_CONFIG__ = {
    baseURL: baseURL
  };
})();
