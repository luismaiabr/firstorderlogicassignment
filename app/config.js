// Navigation sections configuration
export const sections = [
  { number: 1, title: "Base Teórica", route: "/" },
  { number: 2, title: "Gerador de Axiomas", route: "/2" },
  { number: 3, title: "Engenharia e Validação", route: "/3" },
  { number: 4, title: "Implementação Vampire", route: "/4" },
  { number: 5, title: "Considerações Finais", route: "/5" },
  { number: 6, title: "Artefatos", route: "/6" },
];

// Artifacts files data
export const artifactFiles = [
  {
    name: "axiom_generator.py",
    description: "Python script to generate TPTP axioms from JSON graph",
    extension: "PY",
  },
  {
    name: "dfs.py",
    description: "Depth-First Search implementation for cycle detection",
    extension: "PY",
  },
  {
    name: "graph_problem.p",
    description: "TPTP format problem file for Vampire",
    extension: "P",
  },
  {
    name: "nodes.json",
    description: "JSON representation of the graph structure",
    extension: "JSON",
  },
  {
    name: "solution.tptp",
    description: "TPTP solution file",
    extension: "TPTP",
  },
  {
    name: "README.md",
    description: "Graph analysis report documentation",
    extension: "MD",
  },
];
