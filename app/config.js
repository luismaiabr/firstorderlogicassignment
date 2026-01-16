// Server configuration
export const serverConfig = {
  baseURL: window.__SERVER_CONFIG__?.baseURL || 'http://localhost:8000',
  solveEndpoint: '/solve'
};

// Navigation sections configuration
export const sections = [
  { number: 1, title: "Base Teórica", route: "/" },
  { number: 2, title: "Prova Automatizada (LPO)", route: "/2" },
  { number: 3, title: "Gerador de Axiomas", route: "/3" },
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
    description: "TPTP format problem file generator",
    detailedDescription: "Generates a TPTP format problem file for the Vampire theorem prover, creating bidirectional edge axioms from a graph and a conjecture to detect triangle existence.",
    extension: "PY",
  },
  {
    name: "dfs.py",
    description: "Depth-first search algorithm",
    detailedDescription: "Implements depth-first search (DFS) algorithm with cycle detection, tracking discovery/finish times, parent pointers, and back edges.",
    extension: "PY",
  },
  {
    name: "find_cycles.py",
    description: "Empty file",
    detailedDescription: "Empty file (no content).",
    extension: "PY",
  },
  {
    name: "plot.py",
    description: "Graph visualization script",
    detailedDescription: "Visualization script for creating graph plots with cycle highlighting using NetworkX and Matplotlib with a modern color palette.",
    extension: "PY",
  },
  {
    name: "nodes.json",
    description: "Graph data structure",
    detailedDescription: "Stores graph data with 15 nodes (v01-v15) and their adjacency lists defining the graph structure.",
    extension: "JSON",
  },
  {
    name: "cycles.json",
    description: "Detected cycles data",
    detailedDescription: "Contains detected cycles in the graph with their back edges, nodes, edge lists, and lengths (4 total cycles found).",
    extension: "JSON",
  },
  {
    name: "results.json",
    description: "DFS execution results",
    detailedDescription: "DFS execution results containing cycle detection status, back edges, node traversal order, and discovery/finish timestamps.",
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
