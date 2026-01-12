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
            Um <strong>triângulo</strong> (ou $C_3$) é um ciclo de comprimento 3 em um grafo não direcionado. Formalmente,
            para um grafo $G = (V, E)$:
          </p>

          <div class="muted-box" style="text-align: center; padding: 1.5rem; color: #000000;">
            $$\\exists v_1, v_2, v_3 \\in V : (v_1, v_2) \\in E \\land (v_2, v_3) \\in E \\land (v_3, v_1) \\in E$$
            $$\\text{onde } v_1 \\neq v_2 \\neq v_3$$
          </div>

          <p>
            Um grafo é <strong>livre de $C_3$</strong> (livre de triângulos) se e somente se tal tripla não existe.
          </p>
        </div>
      </div>

      <div class="card">
        <h2>Problema de Decisão em Lógica de Primeira Ordem</h2>
        <div class="space-y-4 text-muted leading-relaxed">
          <p>Podemos formular o problema de detecção de triângulos como um problema de satisfatibilidade em LPO:</p>

          <div class="muted-box" style="text-align: center; padding: 1.5rem; color: #000000;">
            $$\\forall G = (V, E) : \\text{livre\\_triangulos}(G) \\leftrightarrow$$
            $$\\neg \\exists v_1, v_2, v_3 \\in V :$$
            $$\\text{adj}(v_1, v_2) \\land \\text{adj}(v_2, v_3) \\land \\text{adj}(v_3, v_1) \\land$$
            $$v_1 \\neq v_2 \\land v_2 \\neq v_3 \\land v_3 \\neq v_1$$
          </div>

          <p>
            Esta formulação nos permite usar provadores automáticos de teoremas como o Vampire para verificar se um dado
            grafo é livre de $C_3$.
          </p>
        </div>
      </div>
    </div>
  `;
}
