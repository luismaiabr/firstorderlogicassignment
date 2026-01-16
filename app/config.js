// Server configuration
export const serverConfig = {
  baseURL: window.__SERVER_CONFIG__?.baseURL || 'http://localhost:8000',
  solveEndpoint: '/solve'
};

// Navigation sections configuration
export const sections = [
  { number: 1, title: "Base Teórica", route: "/" },
  { number: 2, title: "Gerador de Axiomas", route: "/2" },
  { number: 3, title: "Prova Automatizada (LPO)", route: "/3" },
  { number: 4, title: "Engenharia e Validação", route: "/4" },
  { number: 5, title: "Implementação", route: "/5" },
  { number: 6, title: "Demonstração Visual", route: "/6" },
  { number: 7, title: "Conclusão", route: "/7" },
  { number: 8, title: "Artefatos", route: "/8" },
];

// Artifacts files data
export const artifactFiles = [
  {
    name: "axiom_generator.py",
    description: "Gera arquivo de problema em formato TPTP com axiomas bidirecionais de arestas",
    detailedDescription: "Gera arquivo de problema em formato TPTP para o provador de teoremas Vampire, criando axiomas bidirecionais de arestas a partir de um grafo e uma conjectura para detectar existência de triângulos.",
    extension: "PY",
  },
  {
    name: "dfs.py",
    description: "Algoritmo DFS com detecção de ciclos, tempos de descoberta/finalização, ponteiros de pais e back edges",
    detailedDescription: "Implementa o algoritmo de busca em profundidade (DFS) com detecção de ciclos, rastreando tempos de descoberta/finalização, ponteiros de pais e back edges.",
    extension: "PY",
  },
  {
    name: "find_cycles.py",
    description: "Arquivo vazio (sem conteúdo)",
    detailedDescription: "Arquivo vazio (sem conteúdo).",
    extension: "PY",
  },
  {
    name: "plot.py",
    description: "Script de visualização usando NetworkX e Matplotlib com paleta de cores moderna",
    detailedDescription: "Script de visualização para criar gráficos do grafo com destaque de ciclos usando NetworkX e Matplotlib com paleta de cores moderna.",
    extension: "PY",
  },
  {
    name: "nodes.json",
    description: "Dados do grafo com 15 nós (v01-v15) e listas de adjacência",
    detailedDescription: "Armazena dados do grafo com 15 nós (v01-v15) e suas listas de adjacência definindo a estrutura do grafo.",
    extension: "JSON",
  },
  {
    name: "cycles.json",
    description: "Contém 4 ciclos detectados com back edges, nós, listas de arestas e comprimentos",
    detailedDescription: "Contém ciclos detectados no grafo com seus back edges, nós, listas de arestas e comprimentos (4 ciclos encontrados no total).",
    extension: "JSON",
  },
  {
    name: "results.json",
    description: "Resultados da execução DFS com status de ciclos, back edges, ordem de travessia e timestamps",
    detailedDescription: "Resultados da execução DFS contendo status de detecção de ciclos, back edges, ordem de travessia de nós e timestamps de descoberta/finalização.",
    extension: "JSON",
  },
  {
    name: "graph_problem.p",
    description: "Problema TPTP para o Vampire",
    detailedDescription: "Arquivo no formato TPTP contendo axiomas de adjacência bidirecionais para todas as arestas do grafo e a conjectura de existência de triângulos. Pronto para processamento pelo provador de teoremas Vampire.",
    extension: "P",
  },
  {
    name: "solution.tptp",
    description: "Solução do provador Vampire",
    detailedDescription: "Arquivo de saída gerado pelo Vampire contendo a prova formal ou refutação da conjectura. Inclui passos de inferência, resolução e resultado final (Theorem/CounterSatisfiable).",
    extension: "TPTP",
  },
  {
    name: "README.md",
    description: "Relatório de análise do grafo",
    detailedDescription: "Relatório completo em Markdown com estatísticas do grafo (15 nós, 18 arestas), análise detalhada dos 4 ciclos detectados, tabela de back-edges e informações sobre componentes conectados.",
    extension: "MD",
  },
];
