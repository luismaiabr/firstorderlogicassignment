/**
 * Page 2: Vampire Implementation (Implementação Vampire)
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

let solutionCode = '';

export function renderPage2() {
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
        <p class="text-muted mb-4">
          Clique no botão abaixo para carregar a solução TPTP do provador:
        </p>

        <button id="load-solution-btn" class="btn btn-primary mb-4">
          Carregar Solução
        </button>

        <div id="solution-output" class="console-box" style="display: none;"></div>
      </div>
    </div>
  `;
}

export function initPage2() {
  const btn = document.getElementById('load-solution-btn');
  const output = document.getElementById('solution-output');
  
  if (!btn || !output) return;
  
  btn.addEventListener('click', async () => {
    if (isRunning) return;
    
    isRunning = true;
    btn.disabled = true;
    btn.textContent = 'Carregando...';
    output.style.display = 'block';
    output.textContent = '';
    
    // Fetch the solution.tptp file content
    try {
      const baseUrl = window.__SERVER_CONFIG__?.baseURL || 'https://ununique-ladawn-semifurnished.ngrok-free.dev';
      const response = await fetch(`${baseUrl}/artifacts/solution.tptp`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      solutionCode = await response.text();
      
      // Display instantly
      output.textContent = solutionCode;
    } catch (error) {
      output.textContent = 'Erro ao carregar arquivo solution.tptp: ' + error.message;
    }
    
    isRunning = false;
    btn.disabled = false;
    btn.textContent = 'Carregar Solução';
  });
}
