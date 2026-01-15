/**
 * Artifact file contents - embedded for browser compatibility
 */

const axiomGeneratorPy = `from __future__ import annotations
import json
from typing import List, Optional

# Fallback imports if 'models' is not available
try:
    from models import DFSInput
except ImportError:
    from pydantic import BaseModel, Field, StringConstraints
    from typing import Annotated, Dict
    NodeId = Annotated[str, StringConstraints(min_length=3, max_length=3)]
    
    class DFSInput(BaseModel):
        nodes: Annotated[List[NodeId], Field(min_length=1)]
        adjacency: Dict[NodeId, List[NodeId]]
        start: Optional[str] = None

class VampireProblemGenerator:
    """Generates a minimalist .p file containing only edge facts and the conjecture."""
    
    def __init__(self, input_data: DFSInput):
        self.data = input_data

    def _generate_edge_axioms(self) -> List[str]:
        """
        Generates explicit bidirectional adjacency facts.
        Since we removed the symmetry axiom, we must explicitly state:
        adj(a,b) AND adj(b,a).
        """
        axioms = []
        seen_edges = set()

        for u, neighbors in self.data.adjacency.items():
            for v in neighbors:
                if (u, v) not in seen_edges:
                    u_lower = u.lower()
                    v_lower = v.lower()
                    axioms.append(f"fof(edge_{u}_{v}, axiom, adj({u_lower}, {v_lower})).")
                    seen_edges.add((u, v))
                
                if (v, u) not in seen_edges:
                    v_lower = v.lower()
                    u_lower = u.lower()
                    axioms.append(f"fof(edge_{v}_{u}, axiom, adj({v_lower}, {u_lower})).")
                    seen_edges.add((v, u))
        
        return axioms

    def _generate_conjecture(self) -> List[str]:
        """
        Minimalist conjecture: Exists a Triangle?
        """
        return [
            "fof(exists_triangle, conjecture,",
            "    ? [X,Y,Z] : (",
            "        adj(X,Y) & adj(Y,Z) & adj(Z,X) &",
            "        X != Y & Y != Z & X != Z",
            "    )",
            ")."
        ]

    def generate_file(self, output_path: str = "problem.p"):
        content = []
        content.extend(self._generate_edge_axioms())
        content.extend(self._generate_conjecture())
        
        with open(output_path, "w") as f:
            f.write("\\n".join(content))
        
        print(f"✅ Minimalist Vampire file generated: {output_path}")

if __name__ == "__main__":
    try:
        with open("nodes.json", "r") as f:
            raw_data = json.load(f)
        
        dfs_input = DFSInput(**raw_data)
        generator = VampireProblemGenerator(dfs_input)
        generator.generate_file("graph_problem.p")
        
    except FileNotFoundError:
        print("Error: nodes.json not found.")
`;

const dfsPy = `from __future__ import annotations

from typing import Annotated, Dict, List, Optional, Tuple
from pydantic import BaseModel, Field, StringConstraints

# A graph node id is a string with exactly 3 characters
NodeId = Annotated[str, StringConstraints(min_length=3, max_length=3)]

class DFSInput(BaseModel):
    """Request payload for a DFS run over an adjacency-list graph."""
    nodes: Annotated[List[NodeId], Field(min_length=1)] = Field(
        ...,
        description="All node ids in the graph.",
    )
    adjacency: Dict[NodeId, List[NodeId]] = Field(
        ...,
        description="Adjacency list: node -> list of neighbor nodes.",
    )
    start: Optional[NodeId] = Field(
        None, 
        description="Start node id for DFS. If None, runs on all components."
    )

class DFSOutput(BaseModel):
    """Response payload containing DFS artifacts and cycle detection info."""
    
    has_cycle: bool = Field(
        ...,
        description="True if a back-edge was encountered (cycle detected).",
    )
    back_edges: List[Tuple[NodeId, NodeId]] = Field(
        default_factory=list,
        description="List of edges (u, v) that close a cycle (v is ancestor of u).",
    )
    traversal: List[NodeId] = Field(
        ...,
        description="Discovery order (preorder) of visited nodes.",
    )
    discovered_at: Dict[NodeId, int] = Field(
        ...,
        description="Discovery timestamp/order d[u] for each visited node.",
    )
    finished_at: Dict[NodeId, int] = Field(
        ...,
        description="Finish timestamp/order f[u] for each visited node.",
    )
    parent: Dict[NodeId, Optional[NodeId]] = Field(
        ...,
        description="DFS parent pointers (root maps to None).",
    )

def dfs(input_data: DFSInput) -> DFSOutput:
    """Performs Depth-First Search on the given graph and detects cycles."""
    adjacency = input_data.adjacency
    start_node = input_data.start
    nodes = input_data.nodes

    discovered_at: Dict[NodeId, int] = {}
    finished_at: Dict[NodeId, int] = {}
    parent: Dict[NodeId, Optional[NodeId]] = {}
    traversal: List[NodeId] = []
    back_edges: List[Tuple[NodeId, NodeId]] = []
    time = 0
    has_cycle = False

    def dfs_visit(u: NodeId):
        nonlocal time, has_cycle
        time += 1
        discovered_at[u] = time
        traversal.append(u)

        for v in adjacency.get(u, []):
            if v not in discovered_at:
                parent[v] = u
                dfs_visit(v)
            elif v not in finished_at and v != parent.get(u):
                has_cycle = True
                back_edges.append((u, v))

        time += 1
        finished_at[u] = time

    if start_node:
        if start_node in nodes:
            parent[start_node] = None
            dfs_visit(start_node)
    else:
        for node in nodes:
            if node not in discovered_at:
                parent[node] = None
                dfs_visit(node)

    return DFSOutput(
        has_cycle=has_cycle,
        back_edges=back_edges,
        traversal=traversal,
        discovered_at=discovered_at,
        finished_at=finished_at,
        parent=parent,
    )

if __name__ == "__main__":
    import json
    with open("nodes.json", "r") as f:
        data = json.load(f)
    dfs_input = DFSInput(**data)
    dfs_output = dfs(dfs_input)
    print(dfs_output)
`;

const graphProblemP = `fof(edge_v01_v03, axiom, adj(v01, v03)).
fof(edge_v03_v01, axiom, adj(v03, v01)).
fof(edge_v01_v04, axiom, adj(v01, v04)).
fof(edge_v04_v01, axiom, adj(v04, v01)).
fof(edge_v02_v13, axiom, adj(v02, v13)).
fof(edge_v13_v02, axiom, adj(v13, v02)).
fof(edge_v02_v15, axiom, adj(v02, v15)).
fof(edge_v15_v02, axiom, adj(v15, v02)).
fof(edge_v03_v08, axiom, adj(v03, v08)).
fof(edge_v08_v03, axiom, adj(v08, v03)).
fof(edge_v03_v12, axiom, adj(v03, v12)).
fof(edge_v12_v03, axiom, adj(v12, v03)).
fof(edge_v03_v14, axiom, adj(v03, v14)).
fof(edge_v14_v03, axiom, adj(v14, v03)).
fof(edge_v04_v14, axiom, adj(v04, v14)).
fof(edge_v14_v04, axiom, adj(v14, v04)).
fof(edge_v05_v09, axiom, adj(v05, v09)).
fof(edge_v09_v05, axiom, adj(v09, v05)).
fof(edge_v05_v12, axiom, adj(v05, v12)).
fof(edge_v12_v05, axiom, adj(v12, v05)).
fof(edge_v05_v14, axiom, adj(v05, v14)).
fof(edge_v14_v05, axiom, adj(v14, v05)).
fof(edge_v06_v10, axiom, adj(v06, v10)).
fof(edge_v10_v06, axiom, adj(v10, v06)).
fof(edge_v06_v13, axiom, adj(v06, v13)).
fof(edge_v13_v06, axiom, adj(v13, v06)).
fof(edge_v07_v11, axiom, adj(v07, v11)).
fof(edge_v11_v07, axiom, adj(v11, v07)).
fof(edge_v08_v11, axiom, adj(v08, v11)).
fof(edge_v11_v08, axiom, adj(v11, v08)).
fof(edge_v08_v12, axiom, adj(v08, v12)).
fof(edge_v12_v08, axiom, adj(v12, v08)).
fof(edge_v09_v13, axiom, adj(v09, v13)).
fof(edge_v13_v09, axiom, adj(v13, v09)).
fof(edge_v12_v15, axiom, adj(v12, v15)).
fof(edge_v15_v12, axiom, adj(v15, v12)).
fof(exists_triangle, conjecture,
    ? [X,Y,Z] : (
        adj(X,Y) & adj(Y,Z) & adj(Z,X) &
        X != Y & Y != Z & X != Z
    )
).
`;

const nodesJson = `{
  "nodes": [
    "v01", "v02", "v03", "v04", "v05", "v06", "v07", "v08", "v09", "v10", 
    "v11", "v12", "v13", "v14", "v15"
  ],
  "adjacency": {
    "v01": ["v03", "v04"],
    "v02": ["v13", "v15"],
    "v03": ["v01", "v08", "v12", "v14"],
    "v04": ["v01", "v14"],
    "v05": ["v09", "v12", "v14"],
    "v06": ["v10", "v13"],
    "v07": ["v11"],
    "v08": ["v03", "v11", "v12"],
    "v09": ["v05", "v13"],
    "v10": ["v06"],
    "v11": ["v07", "v08"],
    "v12": ["v03", "v05", "v08", "v15"],
    "v13": ["v02", "v06", "v09"],
    "v14": ["v03", "v04", "v05"],
    "v15": ["v02", "v12"]
  }
}
`;

const solutionTptp = `% Solution file - empty (to be filled by Vampire output)
`;

const readmeMd = `# Graph Analysis Report

**Graph Size:** 15 nodes, 18 edges

---

## 🔄 Cycle Detection Analysis

**Cycles Detected:** ✅ YES

**Number of Back Edges:** 4

**Number of Distinct Cycles:** 4

### Detailed Cycle Information

#### Cycle #1
- **Length:** 3 edges
- **Path:** v12 → v08 → v03 → v03
- **Back Edge:** (v03 → v03)
- **Nodes in Cycle:** v03, v08, v12

#### Cycle #2
- **Length:** 6 edges
- **Path:** v15 → v02 → v13 → v09 → v05 → v12 → v12
- **Back Edge:** (v12 → v12)
- **Nodes in Cycle:** v02, v05, v09, v12, v13, v15

#### Cycle #3
- **Length:** 5 edges
- **Path:** v14 → v05 → v12 → v08 → v03 → v03
- **Back Edge:** (v03 → v03)
- **Nodes in Cycle:** v03, v05, v08, v12, v14

#### Cycle #4
- **Length:** 7 edges
- **Path:** v04 → v14 → v05 → v12 → v08 → v03 → v01 → v01
- **Back Edge:** (v01 → v01)
- **Nodes in Cycle:** v01, v03, v04, v05, v08, v12, v14

### All Back Edges

| From | To | Cycle Created |
|------|-----|---------------|
| v12 | v03 | Cycle #1 |
| v15 | v12 | Cycle #2 |
| v14 | v03 | Cycle #3 |
| v04 | v01 | Cycle #4 |

---

## 🔗 Strongly Connected Components (SCCs)

**Number of SCCs:** 1

**Largest SCC Size:** 15

### SCC Details (sorted by size)

#### SCC #1
- **Size:** 15 nodes
- **Nodes:** v01, v02, v03, v04, v05, v06, v07, v08, v09, v10, v11, v12, v13, v14, v15
- **Contains Cycles:** Yes ✅

---

## 📊 Node Degree Analysis

### Top 10 Most Connected Nodes

| Rank | Node | In-Degree | Out-Degree | Total Degree |
|------|------|-----------|------------|--------------|
| 1 | v03 | 4 | 4 | 8 |
| 2 | v12 | 4 | 4 | 8 |
| 3 | v05 | 3 | 3 | 6 |
| 4 | v08 | 3 | 3 | 6 |
| 5 | v13 | 3 | 3 | 6 |
| 6 | v14 | 3 | 3 | 6 |
| 7 | v01 | 2 | 2 | 4 |
| 8 | v02 | 2 | 2 | 4 |
| 9 | v04 | 2 | 2 | 4 |
| 10 | v06 | 2 | 2 | 4 |

---

## 📈 Graph Statistics Summary

- **Total Nodes:** 15
- **Total Edges:** 18
- **Graph Density:** 0.1714
- **Average Degree:** 4.80
- **Has Cycles:** Yes ✅
- **Number of Cycles:** 4
- **Strongly Connected Components:** 1
- **Weakly Connected:** Yes ✅

---

*Analysis generated by analysis.py*
`;

export function getArtifactContents() {
  return {
    'axiom_generator.py': axiomGeneratorPy,
    'dfs.py': dfsPy,
    'graph_problem.p': graphProblemP,
    'nodes.json': nodesJson,
    'solution.tptp': solutionTptp,
    'README.md': readmeMd,
  };
}
