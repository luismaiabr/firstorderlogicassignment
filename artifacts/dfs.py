from __future__ import annotations

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
    
    # --- New Cycle Detection Fields ---
    has_cycle: bool = Field(
        ...,
        description="True if a back-edge was encountered (cycle detected).",
    )
    back_edges: List[Tuple[NodeId, NodeId]] = Field(
        default_factory=list,
        description="List of edges (u, v) that close a cycle (v is ancestor of u).",
    )

    # --- Standard DFS Artifacts ---
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
                # A back-edge is found (not the edge we came from)
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
    #lets load nodes.json
    with open("nodes.json", "r") as f:
        data = json.load(f)
    dfs_input = DFSInput(**data)
    dfs_output = dfs(dfs_input)
    print(dfs_output)