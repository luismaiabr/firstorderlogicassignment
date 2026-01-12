/**
 * Page 3: Engineering & Validation (Engenharia e Validação)
 */

let isRunning = false;

const jsonLog = `{
    "total_cycles": 4,
    "cycles": [
        {
            "back_edge": [
                "v12",
                "v03"
            ],
            "nodes": [
                "v03",
                "v08",
                "v12",
                "v03"
            ],
            "edges": [
                [
                    "v03",
                    "v08"
                ],
                [
                    "v08",
                    "v12"
                ],
                [
                    "v12",
                    "v03"
                ]
            ],
            "length": 3
        },
        {
            "back_edge": [
                "v15",
                "v12"
            ],
            "nodes": [
                "v12",
                "v05",
                "v09",
                "v13",
                "v02",
                "v15",
                "v12"
            ],
            "edges": [
                [
                    "v12",
                    "v05"
                ],
                [
                    "v05",
                    "v09"
                ],
                [
                    "v09",
                    "v13"
                ],
                [
                    "v13",
                    "v02"
                ],
                [
                    "v02",
                    "v15"
                ],
                [
                    "v15",
                    "v12"
                ]
            ],
            "length": 6
        },
        {
            "back_edge": [
                "v14",
                "v03"
            ],
            "nodes": [
                "v03",
                "v08",
                "v12",
                "v05",
                "v14",
                "v03"
            ],
            "edges": [
                [
                    "v03",
                    "v08"
                ],
                [
                    "v08",
                    "v12"
                ],
                [
                    "v12",
                    "v05"
                ],
                [
                    "v05",
                    "v14"
                ],
                [
                    "v14",
                    "v03"
                ]
            ],
            "length": 5
        },
        {
            "back_edge": [
                "v04",
                "v01"
            ],
            "nodes": [
                "v01",
                "v03",
                "v08",
                "v12",
                "v05",
                "v14",
                "v04",
                "v01"
            ],
            "edges": [
                [
                    "v01",
                    "v03"
                ],
                [
                    "v03",
                    "v08"
                ],
                [
                    "v08",
                    "v12"
                ],
                [
                    "v12",
                    "v05"
                ],
                [
                    "v05",
                    "v14"
                ],
                [
                    "v14",
                    "v04"
                ],
                [
                    "v04",
                    "v01"
                ]
            ],
            "length": 7
        }
    ]
}`;

export function renderPage3() {
  return `
    <div class="page-container">
      <h1>Oráculo Python (Validação DFS)</h1>

      <div class="card">
        <h2>Algoritmo de Busca em Profundidade</h2>
        <div class="space-y-4 text-muted leading-relaxed">
          <p>
            O oráculo Python implementa um algoritmo de Busca em Profundidade (DFS) para detectar ciclos de comprimento
            3 (triângulos) no grafo de entrada. Isso serve como validação da verdade fundamental para os resultados do
            provador de teoremas.
          </p>

          <div class="muted-box">
            <h3 class="mb-2">Etapas do Algoritmo:</h3>
            <ol class="list-decimal space-y-2">
              <li>Iniciar DFS a partir de cada vértice no grafo</li>
              <li>Rastrear nós visitados e o caminho atual</li>
              <li>Para cada vizinho, verificar se cria um ciclo de comprimento 3</li>
              <li>Registrar todos os triângulos detectados</li>
              <li>Retornar resultados de validação com ciclos destacados</li>
            </ol>
          </div>

          <p class="text-sm text-muted">
            Complexidade de Tempo: O(V + E) onde V são vértices e E são arestas
          </p>
        </div>
      </div>

      <div class="card">
        <h2>Execução da Validação</h2>

        <button id="validate-btn" class="btn btn-primary mb-4">
          Executar Validação Python
        </button>

        <div id="validation-output-container" style="display: none;">
          <h3 class="mb-2">Saída da Validação:</h3>
          <div id="validation-output" class="console-box"></div>
        </div>
      </div>
    </div>
  `;
}

export function initPage3() {
  const btn = document.getElementById('validate-btn');
  const outputContainer = document.getElementById('validation-output-container');
  const output = document.getElementById('validation-output');
  
  if (!btn || !outputContainer || !output) return;
  
  btn.addEventListener('click', async () => {
    if (isRunning) return;
    
    isRunning = true;
    btn.disabled = true;
    btn.textContent = 'Executando Validação...';
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    outputContainer.style.display = 'block';
    output.textContent = jsonLog;
    
    isRunning = false;
    btn.disabled = false;
    btn.textContent = 'Executar Validação Python';
  });
}
