fof(edge_v01_v03, axiom, adj(v01, v03)).
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