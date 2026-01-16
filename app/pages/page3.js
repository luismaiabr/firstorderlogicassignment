/**
 * Page 3: Axiom Generator (Gerador de Axiomas)
 */

let isGenerating = false;
let tptpCode = '';

export function renderPage3() {
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
          Clique no botão abaixo para gerar o conteúdo do arquivo <strong>.p</strong> a partir de um script Python:
        </p>

        <button id="generate-btn" class="btn btn-primary mb-4">
          Gerar Axiomas
        </button>

        <div id="axiom-output" class="console-box" style="display: none;"></div>
      </div>
    </div>
  `;
}

export function initPage3() {
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
    
    // Fetch the actual TPTP file content
    try {
      const baseUrl = window.__SERVER_CONFIG__?.baseURL || 'https://ununique-ladawn-semifurnished.ngrok-free.dev';
      const response = await fetch(`${baseUrl}/artifacts/graph_problem.p`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      tptpCode = await response.text();
      
      // Display instantly
      output.textContent = tptpCode;
    } catch (error) {
      output.textContent = 'Erro ao carregar arquivo TPTP: ' + error.message;
    }
    
    isGenerating = false;
    btn.disabled = false;
    btn.textContent = 'Gerar Axiomas';
  });
}
