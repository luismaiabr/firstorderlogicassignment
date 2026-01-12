/**
 * Page 6: Artifacts (Artefatos)
 */

import { artifactFiles } from '../config.js';
import { getArtifactContents } from '../artifacts-data.js';

// Store artifact contents for download
let artifactContents = {};

// Load artifact files
async function loadArtifacts() {
  artifactContents = getArtifactContents();
}

// Download a single file
function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Download all files as a zip (using simple approach without external library)
async function downloadAllFiles() {
  // Since we can't use JSZip without external library, download each file individually
  for (const [filename, content] of Object.entries(artifactContents)) {
    if (content) {
      downloadFile(filename, content);
      await new Promise(resolve => setTimeout(resolve, 300)); // Small delay between downloads
    }
  }
}

export function renderPage6() {
  return `
    <div class="page-container">
      <h1>Artefatos do Projeto</h1>

      <div class="card">
        <h2>Arquivos Disponíveis</h2>
        <p class="text-muted mb-4">
          Todos os arquivos do projeto estão disponíveis para download. Clique no botão de download ao lado de cada arquivo.
        </p>

        <div class="file-list" id="file-list">
          ${artifactFiles.map(file => `
            <div class="file-item">
              <div class="file-info">
                <div class="file-icon">${file.extension}</div>
                <div>
                  <div class="file-name">${file.name}</div>
                  <div class="file-size">${file.description}</div>
                </div>
              </div>
              <button class="btn-download" data-file="${file.name}">
                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                Download
              </button>
            </div>
          `).join('')}
        </div>

        <div class="download-all-container">
          <button id="download-all-btn" class="btn btn-primary" style="width: 100%;">
            <svg class="icon mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Baixar Todos os Arquivos
          </button>
        </div>
      </div>

      <div class="card">
        <h2>Descrição dos Arquivos</h2>
        <div class="space-y-3">
          <div class="muted-box">
            <h3 class="mb-2">axiom_generator.py</h3>
            <p class="text-sm text-muted">
              Script Python que converte representações de grafos em JSON para o formato TPTP compatível com o Vampire.
            </p>
          </div>

          <div class="muted-box">
            <h3 class="mb-2">dfs.py</h3>
            <p class="text-sm text-muted">
              Implementação do algoritmo de Busca em Profundidade (DFS) para detecção de ciclos em grafos.
            </p>
          </div>

          <div class="muted-box">
            <h3 class="mb-2">graph_problem.p</h3>
            <p class="text-sm text-muted">
              Arquivo de problema no formato TPTP pronto para ser processado pelo provador de teoremas Vampire.
            </p>
          </div>

          <div class="muted-box">
            <h3 class="mb-2">nodes.json</h3>
            <p class="text-sm text-muted">
              Representação JSON do grafo de exemplo com nós e lista de adjacência.
            </p>
          </div>

          <div class="muted-box">
            <h3 class="mb-2">solution.tptp</h3>
            <p class="text-sm text-muted">
              Arquivo de solução TPTP gerado pelo provador de teoremas.
            </p>
          </div>

          <div class="muted-box">
            <h3 class="mb-2">README.md</h3>
            <p class="text-sm text-muted">
              Relatório de análise do grafo com detalhes sobre ciclos detectados, componentes conectados e estatísticas.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function initPage6() {
  // Load artifacts first
  await loadArtifacts();
  
  // Set up individual download buttons
  const downloadBtns = document.querySelectorAll('.btn-download[data-file]');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filename = btn.dataset.file;
      const content = artifactContents[filename];
      if (content) {
        downloadFile(filename, content);
      } else {
        alert(`Arquivo ${filename} não disponível para download.`);
      }
    });
  });
  
  // Set up download all button
  const downloadAllBtn = document.getElementById('download-all-btn');
  if (downloadAllBtn) {
    downloadAllBtn.addEventListener('click', async () => {
      downloadAllBtn.disabled = true;
      downloadAllBtn.textContent = 'Baixando...';
      await downloadAllFiles();
      downloadAllBtn.disabled = false;
      downloadAllBtn.innerHTML = `
        <svg class="icon mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        Baixar Todos os Arquivos
      `;
    });
  }
}
