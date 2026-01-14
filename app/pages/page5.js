/**
 * Page 5: Implementation - Interactive Proof (Implementação - Prova Interativa)
 */

import { serverConfig } from '../config.js';

export function renderPage5() {
  return `
    <div class="page-container">
      <h1>Implementação</h1>

      <div class="card">
        <h2>Prova Interativa</h2>
        <p class="text-muted mb-4">
          Clique abaixo para invocar o provador de teoremas Vampire no grafo de entrada:
        </p>

        <button id="vampire-btn" class="btn btn-primary mb-4">
          Invocar Vampire
        </button>

        <div id="vampire-output" class="console-box" style="display: none;"></div>
      </div>
    </div>
  `;
}

let isRunning = false;

export function initPage5() {
  const btn = document.getElementById('vampire-btn');
  const output = document.getElementById('vampire-output');
  
  if (btn && output) {
    btn.addEventListener('click', async () => {
      if (isRunning) return;
      
      isRunning = true;
      btn.disabled = true;
      btn.textContent = 'Executando Vampire...';
      output.style.display = 'block';
      output.textContent = 'Enviando requisição para o servidor...\n';
      
      try {
        const baseURL = serverConfig.baseURL.replace(/\/$/, ''); // Remove trailing slash
        const solveURL = `${baseURL}${serverConfig.solveEndpoint}`;
        const headers = {
          "ngrok-skip-browser-warning": "true"
        };
        const response = await fetch(solveURL, { headers: headers });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        // Primeiro, pega o texto da resposta
        const responseText = await response.text();
        output.textContent = '';
        
        // Tenta fazer parse como JSON
        let data = null;
        try {
          data = JSON.parse(responseText);
        } catch (jsonError) {
          // Se não for JSON válido, exibe o texto diretamente
          output.textContent = responseText;
          return;
        }
        
        // Se conseguiu fazer parse do JSON, exibe de forma estruturada
        if (data.message) {
          output.textContent = data.message + '\n\n';
        }
        
        // Exibe a saída do Vampire
        if (data.output) {
          output.textContent += data.output;
        } else if (data.result) {
          output.textContent += data.result;
        }
        
      } catch (error) {
        output.textContent = `Erro ao conectar ao servidor: ${error.message}\n\n`;
        output.textContent += `URL: ${serverConfig.baseURL}${serverConfig.solveEndpoint}\n\n`;
        output.textContent += `Certifique-se de que:\n`;
        output.textContent += `1. O servidor está rodando em ${serverConfig.baseURL}\n`;
        output.textContent += `2. A rota ${serverConfig.solveEndpoint} está disponível\n`;
        output.textContent += `3. Configure o endereço do servidor em app/config.js se necessário`;
      } finally {
        isRunning = false;
        btn.disabled = false;
        btn.textContent = 'Invocar Vampire';
      }
    });
  }
}
