/**
 * Page 2: Axiom Generator (Gerador de Axiomas)
 */

let isGenerating = false;

const tptpCode = `% Formato TPTP - Axiomas de Grafos Livres de C3
% Gerado a partir de representação de grafo em JSON

fof(aresta_1_2, axiom, adj(v1, v2)).
fof(aresta_2_3, axiom, adj(v2, v3)).
fof(aresta_3_4, axiom, adj(v3, v4)).
fof(aresta_1_4, axiom, adj(v1, v4)).

% Axioma de simetria para arestas não direcionadas
fof(simetria, axiom, ![X, Y]: (adj(X, Y) => adj(Y, X))).

% Anti-reflexividade
fof(sem_auto_loops, axiom, ![X]: ~adj(X, X)).

% Conjectura de detecção de triângulo
fof(triangulo_existe, conjecture, 
  ?[V1, V2, V3]: (
    adj(V1, V2) & adj(V2, V3) & adj(V3, V1) &
    V1 != V2 & V2 != V3 & V3 != V1
  )
).

% Fim da geração de axiomas`;

export function renderPage2() {
  return `
    <div class="page-container">
      <h1>Tradução de JSON para TPTP</h1>

      <div class="card">
        <h2>Gerador de Axiomas em Python</h2>
        <div class="space-y-4 text-muted leading-relaxed">
          <p>
            Nosso script Python converte dados de grafos do formato JSON para o formato TPTP (Thousands of Problems for
            Theorem Provers), que pode ser consumido por provadores automáticos de teoremas como o Vampire.
          </p>

          <div class="muted-box">
            <h3 class="mb-2">Processo de Tradução:</h3>
            <ul class="list-disc space-y-2">
              <li>Analisar representação de grafo em JSON (nós e arestas)</li>
              <li>
                Gerar axiomas de arestas como predicados
                <code class="font-mono">adj(v1, v2)</code>
              </li>
              <li>Adicionar axiomas estruturais (simetria, anti-reflexividade)</li>
              <li>Formular a conjectura de detecção de triângulos</li>
              <li>Gerar sintaxe TPTP válida</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>Demonstração Interativa</h2>
        <p class="text-muted mb-4">
          Clique no botão abaixo para gerar axiomas TPTP a partir de um grafo de exemplo:
        </p>

        <button id="generate-btn" class="btn btn-primary mb-4">
          Gerar Axiomas
        </button>

        <div id="axiom-output" class="console-box" style="display: none;"></div>
      </div>
    </div>
  `;
}

export function initPage2() {
  const btn = document.getElementById('generate-btn');
  const output = document.getElementById('axiom-output');
  
  if (!btn || !output) return;
  
  btn.addEventListener('click', async () => {
    if (isGenerating) return;
    
    isGenerating = true;
    btn.disabled = true;
    btn.textContent = 'Gerando...';
    output.style.display = 'block';
    output.textContent = '';
    
    // Simulate typing effect
    for (let i = 0; i < tptpCode.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 10));
      output.textContent = tptpCode.substring(0, i + 1);
    }
    
    isGenerating = false;
    btn.disabled = false;
    btn.textContent = 'Gerar Axiomas';
  });
}
