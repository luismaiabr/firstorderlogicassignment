/**
 * Page 5: Final Considerations (Considerações Finais)
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

      <div class="card">
        <h2>Demonstração Visual (Oráculo)</h2>

        <div class="mb-6">
          <h3 class="mb-3" id="graph-title">Grafo Normal</h3>
          <div class="image-container" id="graph-container" style="text-align: center; position: relative; display: inline-block; width: 100%;">
            <img id="graph-image" src="app/assets/graph_normal.png" alt="Grafo Normal" style="max-width: 100%; height: auto; border-radius: var(--radius); transition: opacity 0.3s ease; display: block;">
            <button id="prev-graph" class="btn" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); padding: 0.75rem 1rem; background: rgba(23, 23, 23, 0.85); color: white; border: none; border-radius: 50%; width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.25rem; transition: all 0.2s; backdrop-filter: blur(4px);" title="Anterior">
              ←
            </button>
            <button id="next-graph" class="btn" style="position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); padding: 0.75rem 1rem; background: rgba(23, 23, 23, 0.85); color: white; border: none; border-radius: 50%; width: 3rem; height: 3rem; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.25rem; transition: all 0.2s; backdrop-filter: blur(4px);" title="Próximo">
              →
            </button>
          </div>
        </div>
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
        const solveURL = `${serverConfig.baseURL}${serverConfig.solveEndpoint}`;
        const response = await fetch(solveURL);
        
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
  
  // Image navigation
  const graphImage = document.getElementById('graph-image');
  const graphTitle = document.getElementById('graph-title');
  const prevBtn = document.getElementById('prev-graph');
  const nextBtn = document.getElementById('next-graph');
  
  if (!graphImage || !graphTitle || !prevBtn || !nextBtn) return;
  
  const graphs = [
    { src: 'app/assets/graph_normal.png', title: 'Grafo Normal' },
    { src: 'app/assets/graph_cycle_1.png', title: 'Ciclo 1 (Comprimento 3)' },
    { src: 'app/assets/graph_cycle_2.png', title: 'Ciclo 2 (Comprimento 6)' },
    { src: 'app/assets/graph_cycle_3.png', title: 'Ciclo 3 (Comprimento 5)' },
    { src: 'app/assets/graph_cycle_4.png', title: 'Ciclo 4 (Comprimento 7)' },
    { src: 'app/assets/graph_all_cycles.png', title: 'Todos os Ciclos' }
  ];
  
  let currentIndex = 0;
  
  function updateGraph() {
    graphImage.style.opacity = '0';
    setTimeout(() => {
      graphImage.src = graphs[currentIndex].src;
      graphImage.alt = graphs[currentIndex].title;
      graphTitle.textContent = graphs[currentIndex].title;
      graphImage.style.opacity = '1';
    }, 150);
    
    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === graphs.length - 1;
    prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
    nextBtn.style.opacity = currentIndex === graphs.length - 1 ? '0.3' : '1';
    prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
    nextBtn.style.cursor = currentIndex === graphs.length - 1 ? 'not-allowed' : 'pointer';
  }
  
  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateGraph();
    }
  });
  
  nextBtn.addEventListener('click', () => {
    if (currentIndex < graphs.length - 1) {
      currentIndex++;
      updateGraph();
    }
  });
  
  // Initialize button states
  updateGraph();
}
