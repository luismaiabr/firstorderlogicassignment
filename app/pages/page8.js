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
        <h2>Desenvolvedores Responsáveis</h2>
        <div class="space-y-3">
          <div class="muted-box" style="padding: 1rem; display: flex; align-items: center;">
            <img src="/app/photos/Maria.png" alt="Maria Rafaela Costa" style="width: 2.5rem; height: 2.5rem; border-radius: 50%; margin-right: 0.75rem; object-fit: cover; border: 2px solid var(--primary);" />
            <span style="font-size: 1rem; font-weight: 500;">Maria Rafaela Costa</span>
          </div>
          
          <div class="muted-box" style="padding: 1rem; display: flex; align-items: center;">
            <img src="/app/photos/Luis.png" alt="Luis Antônio Maia Sombra" style="width: 2.5rem; height: 2.5rem; border-radius: 50%; margin-right: 0.75rem; object-fit: cover; border: 2px solid var(--primary);" />
            <span style="font-size: 1rem; font-weight: 500;">Luis Antônio Maia Sombra</span>
          </div>
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
