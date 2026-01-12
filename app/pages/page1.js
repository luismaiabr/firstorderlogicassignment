/**
 * Page 1: Theoretical Basis (Base Teórica)
 */
export function renderPage1() {
  return `
    <div class="page-container">
      <h1>O Problema de Grafos Livres de C3</h1>

      <div class="card">
        <h2>Definição Matemática</h2>
        <div class="space-y-4 text-muted leading-relaxed">
          <p>
            Um <strong>triângulo</strong> (ou C₃) é um ciclo de comprimento 3 em um grafo não direcionado. Formalmente,
            para um grafo G = (V, E):
          </p>

          <div class="muted-box font-mono">
            <p>∃ v₁, v₂, v₃ ∈ V : (v₁, v₂) ∈ E ∧ (v₂, v₃) ∈ E ∧ (v₃, v₁) ∈ E</p>
            <p class="mt-2">onde v₁ ≠ v₂ ≠ v₃</p>
          </div>

          <p>
            Um grafo é <strong>livre de C₃</strong> (livre de triângulos) se e somente se tal tripla não existe.
          </p>
        </div>
      </div>

      <div class="card">
        <h2>Problema de Decisão em Lógica de Primeira Ordem</h2>
        <div class="space-y-4 text-muted leading-relaxed">
          <p>Podemos formular o problema de detecção de triângulos como um problema de satisfatibilidade em LPO:</p>

          <div class="muted-box font-mono">
            <p>∀ G = (V, E) : livre_triangulos(G) ↔</p>
            <p class="ml-4">¬∃ v₁, v₂, v₃ ∈ V :</p>
            <p class="ml-8">adj(v₁, v₂) ∧ adj(v₂, v₃) ∧ adj(v₃, v₁) ∧</p>
            <p class="ml-8">v₁ ≠ v₂ ∧ v₂ ≠ v₃ ∧ v₃ ≠ v₁</p>
          </div>

          <p>
            Esta formulação nos permite usar provadores automáticos de teoremas como o Vampire para verificar se um dado
            grafo é livre de C₃.
          </p>
        </div>
      </div>

      <div class="card">
        <h2>Representação Visual</h2>
        <div class="image-container">
          <div style="text-align: center; color: var(--muted-foreground);">
            <svg width="300" height="200" viewBox="0 0 300 200">
              <!-- Graph nodes -->
              <circle cx="150" cy="40" r="20" fill="var(--primary)" opacity="0.8"/>
              <circle cx="80" cy="140" r="20" fill="var(--primary)" opacity="0.8"/>
              <circle cx="220" cy="140" r="20" fill="var(--primary)" opacity="0.8"/>
              
              <!-- Triangle edges -->
              <line x1="150" y1="60" x2="80" y2="120" stroke="var(--primary)" stroke-width="2"/>
              <line x1="80" y1="140" x2="220" y2="140" stroke="var(--primary)" stroke-width="2"/>
              <line x1="220" y1="120" x2="150" y2="60" stroke="var(--primary)" stroke-width="2"/>
              
              <!-- Node labels -->
              <text x="150" y="45" fill="white" text-anchor="middle" font-size="14" font-weight="bold">v₁</text>
              <text x="80" y="145" fill="white" text-anchor="middle" font-size="14" font-weight="bold">v₂</text>
              <text x="220" y="145" fill="white" text-anchor="middle" font-size="14" font-weight="bold">v₃</text>
            </svg>
            <p class="mt-4">Exemplo: Um triângulo (ciclo C₃) com três vértices</p>
          </div>
        </div>
        <p class="text-sm text-muted text-center mt-4">
          Exemplo: Um grafo com ciclos triangulares destacados
        </p>
      </div>
    </div>
  `;
}
