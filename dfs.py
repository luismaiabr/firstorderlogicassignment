from __future__ import annotations

from typing import Annotated, Dict, List, Optional
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
    start: NodeId = Field(..., description="Start node id for DFS.")

class DFSOutput(BaseModel):
    """Response payload containing common DFS artifacts."""
    traversal: List[NodeId] = Field(
        ...,
        description="Discovery order (preorder) of visited nodes starting from `start`.",
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
