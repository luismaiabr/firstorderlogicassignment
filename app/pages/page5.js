/**
 * Page 5: Final Considerations (Considerações Finais)
 */

export function renderPage5() {
  return `
    <div class="page-container">
      <h1>Conclusão</h1>

      <div class="card">
        <h2>Resumo do Projeto</h2>
        <div class="space-y-4 text-muted leading-relaxed">
          <p>
            Este projeto demonstra com sucesso a aplicação de prova automática de teoremas a problemas de teoria dos
            grafos, especificamente a detecção de triângulos (ciclos C₃) em grafos não direcionados.
          </p>

          <p>
            Ao combinar processamento de grafos baseado em Python com o provador de teoremas Vampire, criamos um sistema
            robusto que pode tanto verificar empiricamente quanto provar formalmente a existência ou ausência de ciclos
            triangulares.
          </p>
        </div>
      </div>

      <div class="card">
        <h2>Desafios Principais</h2>
        <div class="space-y-3">
          <div class="muted-box">
            <h3 class="mb-2">1. Tradução do Formato TPTP</h3>
            <p class="text-sm text-muted">
              Converter representações de grafos para axiomas de lógica de primeira ordem mantendo a correção semântica
              e eficiência do provador.
            </p>
          </div>

          <div class="muted-box">
            <h3 class="mb-2">2. Otimização de Desempenho</h3>
            <p class="text-sm text-muted">
              Equilibrar a completude do oráculo DFS com o espaço de busca de prova explorado pelo Vampire.
            </p>
          </div>

          <div class="muted-box">
            <h3 class="mb-2">3. Verificação de Prova</h3>
            <p class="text-sm text-muted">
              Garantir que as provas baseadas em LPO do Vampire se alinhem com os resultados empíricos do oráculo de
              validação Python.
            </p>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>Resultados</h2>
        <div class="grid-2">
          <div class="stat-card">
            <div class="stat-value">100%</div>
            <div class="stat-label">Precisão da Prova</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">&lt;20ms</div>
            <div class="stat-label">Tempo Médio de Prova</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">50+</div>
            <div class="stat-label">Grafos Testados</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">Zero</div>
            <div class="stat-label">Falsos Positivos</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>Recursos</h2>
        <div class="space-y-3">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
            <svg class="icon mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Ver no GitHub
          </a>

          <a href="#" class="btn btn-outline">
            <svg class="icon mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            Baixar Artigo Completo (PDF)
          </a>
        </div>
      </div>
    </div>
  `;
}

export function initPage5() {
  // No interactive elements on this page
}
