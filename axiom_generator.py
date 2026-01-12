from __future__ import annotations
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
        # Use a set to avoid duplicating (u,v) if the input adjacency list 
        # already contains both u->v and v->u.
        seen_edges = set()

        for u, neighbors in self.data.adjacency.items():
            for v in neighbors:
                # Store as a directed pair to track what we've written
                if (u, v) not in seen_edges:
                    # Input format: predicates/constants must be lowercase
                    u_lower = u.lower()
                    v_lower = v.lower()
                    
                    # Generate Fact 1: u is adjacent to v
                    axioms.append(f"fof(edge_{u}_{v}, axiom, adj({u_lower}, {v_lower})).")
                    seen_edges.add((u, v))
                
                # Ensure the reverse edge exists (v, u)
                if (v, u) not in seen_edges:
                    v_lower = v.lower()
                    u_lower = u.lower()
                    
                    # Generate Fact 2: v is adjacent to u (explicit symmetry)
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
        
        # 1. Adjacency Facts (The Graph)
        content.extend(self._generate_edge_axioms())
        
        # 2. The Conjecture (The Question)
        content.extend(self._generate_conjecture())
        
        with open(output_path, "w") as f:
            f.write("\n".join(content))
        
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
