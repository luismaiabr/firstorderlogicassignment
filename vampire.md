# Guia Rápido: Instalação Vampire Solver & CMake

## 1. Instalar Dependências
```bash
sudo apt update
sudo apt install git cmake build-essential -y

# Clonar repositório
git clone https://github.com/vprover/vampire.git
cd vampire

# Preparar diretório de build
mkdir build
cd build

# Configurar e Compilar (Modo Release para performance)
cmake -DCMAKE_BUILD_TYPE=Release ..
cmake --build .
sudo cmake --install .
#instalar no sistema (global)
sudo cp vampire /usr/local/bin/

# Se instalou no sistema:
vampire --version

# Se apenas compilou (rodando de dentro da pasta build):
./vampire --version
