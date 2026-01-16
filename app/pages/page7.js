/**
 * Page 7: Conclusion (Conclusão)
 */

export function renderPage7() {
  return `
    <div class="page-container">
      <h1>Conclusão do Projeto</h1>

      <div class="card">
        <h2>1. Resumo do Projeto</h2>
        <div class="space-y-4 text-muted leading-relaxed">
          <p>
            Este projeto implementa uma solução para detecção de ciclos e triângulos em grafos utilizando Lógica de 
            Primeira Ordem (FOL). O sistema combina o provador automático de teoremas Vampire com um DFS em Python 
            para fins de validação com. O sistema foi implementado com um container gratuito no Vercel (front-end em 
            nuvem) e um servidor caseiro Ubuntu Server para o back-end (Vampire e outras aplicações).
          </p>
        </div>
      </div>

      <div class="card">
        <h2>2. Desafios Principais</h2>
        <div class="overflow-x-auto" style="margin-top: 1rem;">
          <table style="width: 100%; border-collapse: collapse; border: 1px solid var(--border); border-radius: 8px; overflow: hidden;">
            <thead>
              <tr style="background: var(--muted); border-bottom: 2px solid var(--border);">
                <th style="text-align: left; padding: 1rem 1.25rem; font-weight: 600; width: 200px; border-right: 1px solid var(--border);">Desafio</th>
                <th style="text-align: left; padding: 1rem 1.25rem; font-weight: 600;">Descrição</th>
              </tr>
            </thead>
            <tbody style="font-size: 0.925rem; color: var(--muted-foreground);">
              <tr style="border-bottom: 1px solid var(--border);">
                <td style="padding: 1rem 1.25rem; vertical-align: top; font-weight: 500; border-right: 1px solid var(--border); background: var(--muted); opacity: 0.8;">Modelagem em FOL</td>
                <td style="padding: 1rem 1.25rem; line-height: 1.6;">
                  Traduzir a estrutura de um grafo (nós e arestas) para axiomas de lógica de primeira ordem no 
                  formato TPTP.
                </td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border);">
                <td style="padding: 1rem 1.25rem; vertical-align: top; font-weight: 500; border-right: 1px solid var(--border); background: var(--muted); opacity: 0.8;">Axioma de Distinção</td>
                <td style="padding: 1rem 1.25rem; line-height: 1.6;">
                  Garantir que o provador de teoremas reconheça que cada vértice é único, exigindo a geração de 
                  todos os pares de axiomas v<sub>i</sub> ≠ v<sub>j</sub> para evitar colapso de constantes.
                </td>
              </tr>
              <tr style="border-bottom: 1px solid var(--border);">
                <td style="padding: 1rem 1.25rem; vertical-align: top; font-weight: 500; border-right: 1px solid var(--border); background: var(--muted); opacity: 0.8;">Detecção de Ciclos via DFS</td>
                <td style="padding: 1rem 1.25rem; line-height: 1.6;">
                  Implementar busca em profundidade com detecção de back-edges para identificar ciclos, mantendo 
                  timestamps de descoberta e finalização.
                </td>
              </tr>
              <tr>
                <td style="padding: 1rem 1.25rem; vertical-align: top; font-weight: 500; border-right: 1px solid var(--border); background: var(--muted); opacity: 0.8;">Formulação da Conjectura</td>
                <td style="padding: 1rem 1.25rem; line-height: 1.6;">
                  Expressar corretamente a conjectura de existência de triângulo de forma que o Vampire possa prová-la.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card">
        <h2>Resultado Principal: Prova Formal da Existência de Triângulo (C₃)</h2>
        <div class="space-y-4 text-muted leading-relaxed">
          <p>
            O provador automático de teoremas Vampire 5.0.0 validou com sucesso a conjectura de existência de um 
            triângulo no grafo, utilizando o método de refutação:
          </p>

          <p style="margin: 1rem 0;">
            <code style="font-family: 'Courier New', monospace; color: var(--primary); font-weight: 600; font-size: 0.95rem; background: rgba(0, 0, 0, 0.1); padding: 0.25rem 0.5rem; border-radius: 4px; display: inline-block;">% Termination reason: Refutation</code>
          </p>

          <p>
            Assim, o Vampire provou a conjectura negando-a e derivando uma contradição. 
            Isso significa que a fórmula existencial:
          </p>

          <div style="margin: 1.5rem 0; padding: 1rem; background: var(--muted); border-radius: 8px; text-align: center;">
            <p style="margin: 0; font-size: 1.05rem;">
              $$\\exists X, Y, Z: (\\text{adj}(X,Y) \\land \\text{adj}(Y,Z) \\land \\text{adj}(Z,X) \\land X \\neq Y \\land Y \\neq Z \\land X \\neq Z)$$
            </p>
          </div>

          <p>
            é teorema do sistema axiomático definido — ou seja, existe pelo menos um triângulo no grafo.
          </p>
        </div>
      </div>
    </div>
  `;
}

export function initPage7() {
  // No interactive elements on this page
}
