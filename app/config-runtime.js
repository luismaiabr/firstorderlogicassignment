// Runtime configuration loader
// This script should be loaded BEFORE config.js in index.html
(async function() {
  try {
    // Busca configuração do endpoint serverless do Vercel
    const headers = {
      "ngrok-skip-browser-warning": "true"
    };
    const response = await fetch('/api/config', { headers: headers });
    if (response.ok) {
      const config = await response.json();
      window.__SERVER_CONFIG__ = {
        baseURL: config.baseURL
      };
      return;
    }
  } catch (error) {
    console.log('Usando configuração local');
  }
  
  // Fallback para desenvolvimento local
  const baseURL = new URLSearchParams(window.location.search).get('baseURL') 
    || localStorage.getItem('serverBaseURL')
    || 'https://ununique-ladawn-semifurnished.ngrok-free.dev';
  
  window.__SERVER_CONFIG__ = {
    baseURL: baseURL
  };
})();
