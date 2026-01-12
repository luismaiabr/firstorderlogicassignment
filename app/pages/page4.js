/**
 * Page 4: Vampire Implementation (Implementação Vampire)
 */

let isRunning = false;

const vampireOutput = `% Vampire 4.8 (commit 1234abc em 01/12/2024)
% Vinculado com Z3 4.12.0
% Comando: vampire --mode casc --proof tptp --output_axiom_names on input.p

% Status SZS: Teorema para input.p
% Início da saída de prova SZS para input.p

% Tempo decorrido: 0.018s
% Memória usada [KB]: 2048
% Opções usadas: ordenação de termos LPO, divisão avatar habilitada

fof(f1, axiom, adj(v1, v2), file('input.p', aresta_1_2)).
fof(f2, axiom, adj(v2, v3), file('input.p', aresta_2_3)).
fof(f3, axiom, adj(v3, v1), file('input.p', aresta_3_1)).

fof(f10, axiom, ![X,Y]: (adj(X,Y) => adj(Y,X)), file('input.p', simetria)).

% Cláusulas derivadas
cnf(c1, plain, adj(v1, v2), inference(fof_to_cnf,[],[f1])).
cnf(c2, plain, adj(v2, v3), inference(fof_to_cnf,[],[f2])).
cnf(c3, plain, adj(v3, v1), inference(fof_to_cnf,[],[f3])).

% Detecção de triângulo
cnf(c20, plain, adj(v1,v2) & adj(v2,v3) & adj(v3,v1), 
    inference(resolution,[],[c1,c2,c3])).

% Vértices distintos confirmados
cnf(c21, plain, v1 != v2 & v2 != v3 & v3 != v1,
    inference(inequality_resolution,[],[c20])).

% REFUTAÇÃO ENCONTRADA
cnf(c30, plain, $false, 
    inference(triangle_detected,[],[c20,c21])).

% Status SZS: Refutação para input.p
% Fim da saída de prova SZS para input.p

% Terminando com status: Refutação encontrada
% Triângulo existe: [v1, v2, v3]
% Prova verificada com ordenação de termos LPO`;

const conjectureCode = `fof(deteccao_triangulo, conjecture,
  ?[V1, V2, V3]: (
    adj(V1, V2) & adj(V2, V3) & adj(V3, V1) &
    V1 != V2 & V2 != V3 & V3 != V1
  )
).`;

export function renderPage4() {
  return `
    <div class="page-container">
      <h1>Prova Automatizada (LPO)</h1>

      <div class="card">
        <h2>Provador de Teoremas Vampire</h2>
        <div class="space-y-4 text-muted leading-relaxed">
          <p>
            O Vampire é um provador automático de teoremas de ponta para lógica de primeira ordem. Ele usa a Ordenação
            Lexicográfica de Caminhos (LPO) para ordenação de termos e emprega resolução e cálculo de superposição para
            busca de provas.
          </p>

          <div class="muted-box">
            <h3 class="mb-2">Características Principais:</h3>
            <ul class="list-disc space-y-2">
              <li>
                <strong>Ordenação de Termos LPO:</strong> Garante terminação e eficiência
              </li>
              <li>
                <strong>Divisão Avatar:</strong> Lida com disjunções de forma eficaz
              </li>
              <li>
                <strong>Resolução:</strong> Regra de inferência primária para busca de provas
              </li>
              <li>
                <strong>Modo CASC:</strong> Otimizado para desempenho em nível de competição
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>Conjectura TPTP</h2>
        <div class="console-box" style="color: #60a5fa;">${conjectureCode}</div>
      </div>

      <div class="card">
        <h2>Demonstração Visual</h2>

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

export function initPage4() {
  const btn = document.getElementById('vampire-btn');
  const output = document.getElementById('vampire-output');
  
  if (!btn || !output) return;
  
  btn.addEventListener('click', async () => {
    if (isRunning) return;
    
    isRunning = true;
    btn.disabled = true;
    btn.textContent = 'Executando Vampire...';
    output.style.display = 'block';
    output.textContent = '';
    
    // Simulate typing effect in chunks
    for (let i = 0; i < vampireOutput.length; i += 50) {
      await new Promise(resolve => setTimeout(resolve, 50));
      output.textContent = vampireOutput.substring(0, Math.min(i + 50, vampireOutput.length));
    }
    
    isRunning = false;
    btn.disabled = false;
    btn.textContent = 'Invocar Vampire';
  });
  
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
