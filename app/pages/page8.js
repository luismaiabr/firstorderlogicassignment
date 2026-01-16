/**
 * Page 8: Artifacts (Artefatos)
 */

import { serverConfig } from '../config.js';

// Store artifact files metadata and contents
let artifactFiles = [];
let artifactContents = {};

// Load artifact files from backend
async function loadArtifacts() {
  try {
    const response = await fetch(`${serverConfig.baseURL}/files`, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Store files metadata from FilesResponse
    artifactFiles = data.files || [];
    
    // Load content for each file
    for (const file of artifactFiles) {
      try {
        // If content is already included in the response, use it
        if (file.content) {
          artifactContents[file.name] = file.content;
        } else {
          // Otherwise, fetch from backend artifacts endpoint
          const fileResponse = await fetch(`${serverConfig.baseURL}/artifacts/${file.name}`, {
            headers: {
              'ngrok-skip-browser-warning': 'true'
            }
          });
          if (fileResponse.ok) {
            artifactContents[file.name] = await fileResponse.text();
          }
        }
      } catch (error) {
        console.error(`Erro ao carregar ${file.name}:`, error);
      }
    }
  } catch (error) {
    console.error('Erro ao buscar lista de arquivos do backend:', error);
    // Fallback to empty array if backend is unavailable
    artifactFiles = [];
  }
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

export function renderPage8() {
  return `
    <div class="page-container">
      <h1>Artefatos do Projeto</h1>

      <div class="card">
        <h2>Arquivos Disponíveis</h2>
        <p class="text-muted mb-4">
          Todos os arquivos do projeto estão disponíveis para download. Clique no botão de download ao lado de cada arquivo.
        </p>

        <div class="file-list" id="file-list">
          <div class="text-center text-muted" style="padding: 2rem;">
            Carregando arquivos...
          </div>
        </div>

        <div class="download-all-container" id="download-all-container" style="display: none;">
          <button id="download-all-btn" class="btn btn-primary" style="width: 100%;">
            <svg class="icon mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Baixar Todos os Arquivos
          </button>
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

// Render the file list dynamically
function renderFileList() {
  const fileListContainer = document.getElementById('file-list');
  const downloadAllContainer = document.getElementById('download-all-container');
  
  if (!fileListContainer) return;
  
  if (artifactFiles.length === 0) {
    fileListContainer.innerHTML = `
      <div class="text-center text-muted" style="padding: 2rem;">
        Nenhum arquivo disponível no momento.
      </div>
    `;
    return;
  }
  
  // Render files
  fileListContainer.innerHTML = artifactFiles.map((file, index) => `
    <div class="file-item" data-file-index="${index}">
      <div class="file-info" style="flex: 1; cursor: pointer;" data-file-expand="${index}">
        <div class="file-icon">${file.extension}</div>
        <div style="flex: 1;">
          <div class="file-name">${file.name}</div>
          <div class="file-size">${file.description}</div>
          <div class="file-detailed-description" id="file-desc-${index}" style="display: none; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid var(--border); color: var(--muted-foreground); font-size: 0.875rem; line-height: 1.5;">
            ${file.detailedDescription || file.detailed_description || ''}
          </div>
        </div>
        <svg class="expand-icon" id="expand-icon-${index}" style="width: 1.25rem; height: 1.25rem; margin-left: 1rem; transition: transform 0.2s; color: var(--muted-foreground);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
      <button class="btn-download" data-file="${file.name}" style="margin-left: 1rem;">
        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        Download
      </button>
    </div>
  `).join('');
  
  // Show download all button
  if (downloadAllContainer) {
    downloadAllContainer.style.display = 'block';
  }
  
  // Re-attach event listeners after rendering
  attachFileListeners();
}

// Attach event listeners to file list elements
function attachFileListeners() {
  // Set up expand/collapse for file descriptions
  const expandBtns = document.querySelectorAll('[data-file-expand]');
  expandBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = btn.dataset.fileExpand;
      const description = document.getElementById(`file-desc-${index}`);
      const icon = document.getElementById(`expand-icon-${index}`);
      
      if (description && icon) {
        const isExpanded = description.style.display !== 'none';
        description.style.display = isExpanded ? 'none' : 'block';
        icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
      }
    });
  });
  
  // Set up individual download buttons
  const downloadBtns = document.querySelectorAll('.btn-download[data-file]');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent expanding when clicking download
      const filename = btn.dataset.file;
      const content = artifactContents[filename];
      if (content) {
        downloadFile(filename, content);
      } else {
        alert(`Arquivo ${filename} não disponível para download.`);
      }
    });
  });
}

export async function initPage8() {
  // Load artifacts from backend
  await loadArtifacts();
  
  // Render the file list
  renderFileList();
  
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
