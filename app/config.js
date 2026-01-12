// Navigation sections configuration
export const sections = [
  { number: 1, title: "Base Teórica", route: "/" },
  { number: 2, title: "Gerador de Axiomas", route: "/2" },
  { number: 3, title: "Engenharia e Validação", route: "/3" },
  { number: 4, title: "Prova Automatizada (LPO)", route: "/4" },
  { number: 5, title: "Implementação", route: "/5" },
  { number: 6, title: "Conclusão", route: "/6" },
  { number: 7, title: "Artefatos", route: "/7" },
];

// Artifacts files data
export const artifactFiles = [
  {
    name: "axiom_generator.py",
    description: "Gerador de axiomas TPTP",
    detailedDescription: "Script Python que converte representações de grafos em JSON para o formato TPTP compatível com o provador Vampire. Gera axiomas bidirecionais de adjacência (adj/2) e a conjectura para detecção de triângulos no grafo.",
    extension: "PY",
  },
  {
    name: "dfs.py",
    description: "Algoritmo de Busca em Profundidade",
    detailedDescription: "Implementação completa do algoritmo DFS (Depth-First Search) para detecção de ciclos em grafos. Rastreia timestamps de descoberta e finalização, identifica back-edges e gera informações detalhadas sobre a estrutura de ciclos.",
    extension: "PY",
  },
  {
    name: "find_cycles.py",
    description: "Script de detecção de ciclos",
    detailedDescription: "Script auxiliar para encontrar e enumerar todos os ciclos do grafo usando DFS. Identifica back-edges e reconstrói os caminhos cíclicos completos.",
    extension: "PY",
  },
  {
    name: "plot.py",
    description: "Visualizador de grafos",
    detailedDescription: "Script de visualização que gera imagens PNG do grafo usando NetworkX e Matplotlib. Cria versões separadas para: grafo normal, grafo com todos os ciclos destacados, e grafos individuais para cada ciclo detectado.",
    extension: "PY",
  },
  {
    name: "nodes.json",
    description: "Estrutura do grafo em JSON",
    detailedDescription: "Representação JSON do grafo com 15 nós (v01-v15) e lista de adjacência. Serve como entrada para todos os scripts de análise, geração de axiomas e validação DFS.",
    extension: "JSON",
  },
  {
    name: "cycles.json",
    description: "Ciclos detectados pelo DFS",
    detailedDescription: "Resultado da análise DFS contendo 4 ciclos detectados no grafo. Inclui comprimento, nós, arestas e back-edges de cada ciclo. Usado para visualização e validação.",
    extension: "JSON",
  },
  {
    name: "results.json",
    description: "Resultados completos da análise DFS",
    detailedDescription: "Saída detalhada do algoritmo DFS incluindo: indicador de ciclos, back-edges, ordem de descoberta (traversal), timestamps de descoberta e finalização, e árvore de pais para cada nó visitado.",
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
