"""
Graph visualization script for cycles.json
Plots a normal graph version, one with all cycles highlighted,
and individual cycle visualizations
"""

import json
import matplotlib.pyplot as plt
import networkx as nx
import numpy as np
from pathlib import Path

# Modern color palette matching the app brand
COLORS = {
    'background': '#ffffff',
    'foreground': '#171717',
    'muted': '#737373',
    'border': '#e5e5e5',
    'node_default': '#f5f5f5',
    'node_stroke': '#171717',
    'edge_default': '#e5e5e5',
    'label_default': '#171717',
    'label_highlight': '#ffffff',
    # Cycle highlight colors - modern gradient palette
    'cycle_colors': [
        '#6366f1',  # Indigo
        '#ec4899',  # Pink
        '#14b8a6',  # Teal
        '#f59e0b',  # Amber
    ],
    'cycle_node': '#171717',
}

# Figure size for all plots
FIG_SIZE = (10, 10)


def load_data():
    """Load nodes and cycles from JSON files"""
    artifacts_dir = Path(__file__).parent
    
    with open(artifacts_dir / 'nodes.json', 'r') as f:
        nodes_data = json.load(f)
    
    with open(artifacts_dir / 'cycles.json', 'r') as f:
        cycles_data = json.load(f)
    
    return nodes_data, cycles_data


def create_graph(nodes_data):
    """Create NetworkX graph from nodes data"""
    G = nx.Graph()
    
    # Add nodes
    for node in nodes_data['nodes']:
        G.add_node(node)
    
    # Add edges from adjacency list
    for node, neighbors in nodes_data['adjacency'].items():
        for neighbor in neighbors:
            G.add_edge(node, neighbor)
    
    return G


def get_node_labels(G):
    """Create labels for nodes (01, 02, 03, ...)"""
    labels = {}
    for node in G.nodes():
        # Extract number from node name (e.g., 'v01' -> '01')
        labels[node] = node[1:]  # Remove 'v' prefix
    return labels


def get_cycle_edges_and_nodes(cycles_data):
    """Extract all edges and nodes involved in cycles"""
    cycle_edges = {}
    cycle_nodes = set()
    
    for i, cycle in enumerate(cycles_data['cycles']):
        color_idx = i % len(COLORS['cycle_colors'])
        for edge in cycle['edges']:
            edge_key = tuple(sorted(edge))
            if edge_key not in cycle_edges:
                cycle_edges[edge_key] = color_idx
        for node in cycle['nodes']:
            cycle_nodes.add(node)
    
    return cycle_edges, cycle_nodes


def setup_single_figure():
    """Create a single figure"""
    fig, ax = plt.subplots(1, 1, figsize=FIG_SIZE, facecolor=COLORS['background'])
    ax.set_facecolor(COLORS['background'])
    ax.set_aspect('equal')
    ax.axis('off')
    plt.tight_layout(pad=1)
    return fig, ax


def draw_normal_graph(G, pos, ax):
    """Draw the normal graph without cycle highlights"""
    labels = get_node_labels(G)
    
    # Draw edges
    nx.draw_networkx_edges(
        G, pos, ax=ax,
        edge_color=COLORS['edge_default'],
        width=2,
        alpha=0.8
    )
    
    # Draw nodes
    nx.draw_networkx_nodes(
        G, pos, ax=ax,
        node_color=COLORS['node_default'],
        node_size=800,
        edgecolors=COLORS['node_stroke'],
        linewidths=2
    )
    
    # Draw labels
    nx.draw_networkx_labels(
        G, pos, ax=ax,
        labels=labels,
        font_size=10,
        font_weight='bold',
        font_color=COLORS['label_default']
    )


def draw_highlighted_graph(G, pos, ax, cycles_data):
    """Draw the graph with all cycles highlighted"""
    cycle_edges, cycle_nodes = get_cycle_edges_and_nodes(cycles_data)
    labels = get_node_labels(G)
    
    # Separate edges into cycle and non-cycle
    all_edges = list(G.edges())
    non_cycle_edges = []
    cycle_edge_lists = {i: [] for i in range(len(COLORS['cycle_colors']))}
    
    for edge in all_edges:
        edge_key = tuple(sorted(edge))
        if edge_key in cycle_edges:
            color_idx = cycle_edges[edge_key]
            cycle_edge_lists[color_idx].append(edge)
        else:
            non_cycle_edges.append(edge)
    
    # Draw non-cycle edges (dimmed)
    if non_cycle_edges:
        nx.draw_networkx_edges(
            G, pos, ax=ax,
            edgelist=non_cycle_edges,
            edge_color=COLORS['border'],
            width=1.5,
            alpha=0.4
        )
    
    # Draw cycle edges with colors
    for color_idx, edges in cycle_edge_lists.items():
        if edges:
            nx.draw_networkx_edges(
                G, pos, ax=ax,
                edgelist=edges,
                edge_color=COLORS['cycle_colors'][color_idx],
                width=3,
                alpha=0.9
            )
    
    # Separate nodes into cycle and non-cycle
    all_nodes = list(G.nodes())
    non_cycle_nodes = [n for n in all_nodes if n not in cycle_nodes]
    cycle_nodes_list = [n for n in all_nodes if n in cycle_nodes]
    
    # Draw non-cycle nodes (dimmed)
    if non_cycle_nodes:
        nx.draw_networkx_nodes(
            G, pos, ax=ax,
            nodelist=non_cycle_nodes,
            node_color=COLORS['node_default'],
            node_size=700,
            edgecolors=COLORS['border'],
            linewidths=1.5,
            alpha=0.5
        )
    
    # Draw cycle nodes (highlighted)
    if cycle_nodes_list:
        nx.draw_networkx_nodes(
            G, pos, ax=ax,
            nodelist=cycle_nodes_list,
            node_color=COLORS['cycle_node'],
            node_size=850,
            edgecolors=COLORS['foreground'],
            linewidths=2.5
        )
    
    # Draw labels for non-cycle nodes
    non_cycle_labels = {n: labels[n] for n in non_cycle_nodes}
    nx.draw_networkx_labels(
        G, pos, ax=ax,
        labels=non_cycle_labels,
        font_size=10,
        font_weight='bold',
        font_color=COLORS['label_default']
    )
    
    # Draw labels for cycle nodes (white on dark background)
    cycle_labels = {n: labels[n] for n in cycle_nodes_list}
    nx.draw_networkx_labels(
        G, pos, ax=ax,
        labels=cycle_labels,
        font_size=10,
        font_weight='bold',
        font_color=COLORS['label_highlight']
    )


def draw_single_cycle(G, pos, ax, cycle_data, cycle_index):
    """Draw the graph with a single cycle highlighted"""
    labels = get_node_labels(G)
    color = COLORS['cycle_colors'][cycle_index % len(COLORS['cycle_colors'])]
    
    # Get cycle edges and nodes
    cycle_edges_set = set()
    for edge in cycle_data['edges']:
        cycle_edges_set.add(tuple(sorted(edge)))
    
    cycle_nodes_set = set(cycle_data['nodes'])
    
    # Separate edges
    all_edges = list(G.edges())
    non_cycle_edges = []
    cycle_edges_list = []
    
    for edge in all_edges:
        edge_key = tuple(sorted(edge))
        if edge_key in cycle_edges_set:
            cycle_edges_list.append(edge)
        else:
            non_cycle_edges.append(edge)
    
    # Draw non-cycle edges (dimmed)
    if non_cycle_edges:
        nx.draw_networkx_edges(
            G, pos, ax=ax,
            edgelist=non_cycle_edges,
            edge_color=COLORS['border'],
            width=1.5,
            alpha=0.3
        )
    
    # Draw cycle edges
    if cycle_edges_list:
        nx.draw_networkx_edges(
            G, pos, ax=ax,
            edgelist=cycle_edges_list,
            edge_color=color,
            width=4,
            alpha=0.95
        )
    
    # Separate nodes
    all_nodes = list(G.nodes())
    non_cycle_nodes = [n for n in all_nodes if n not in cycle_nodes_set]
    cycle_nodes_list = [n for n in all_nodes if n in cycle_nodes_set]
    
    # Draw non-cycle nodes (dimmed)
    if non_cycle_nodes:
        nx.draw_networkx_nodes(
            G, pos, ax=ax,
            nodelist=non_cycle_nodes,
            node_color=COLORS['node_default'],
            node_size=700,
            edgecolors=COLORS['border'],
            linewidths=1.5,
            alpha=0.4
        )
    
    # Draw cycle nodes (highlighted with cycle color)
    if cycle_nodes_list:
        nx.draw_networkx_nodes(
            G, pos, ax=ax,
            nodelist=cycle_nodes_list,
            node_color=color,
            node_size=900,
            edgecolors=COLORS['foreground'],
            linewidths=2.5
        )
    
    # Draw labels for non-cycle nodes
    non_cycle_labels = {n: labels[n] for n in non_cycle_nodes}
    nx.draw_networkx_labels(
        G, pos, ax=ax,
        labels=non_cycle_labels,
        font_size=10,
        font_weight='bold',
        font_color=COLORS['muted']
    )
    
    # Draw labels for cycle nodes (white on colored background)
    cycle_labels = {n: labels[n] for n in cycle_nodes_list}
    nx.draw_networkx_labels(
        G, pos, ax=ax,
        labels=cycle_labels,
        font_size=10,
        font_weight='bold',
        font_color=COLORS['label_highlight']
    )


def save_figure(fig, filename):
    """Save figure to file"""
    output_path = Path(__file__).parent / filename
    plt.savefig(
        output_path,
        dpi=150,
        bbox_inches='tight',
        facecolor=COLORS['background'],
        edgecolor='none'
    )
    plt.close(fig)
    print(f"Saved: {output_path}")


def main():
    """Main function to generate the graph visualizations"""
    # Load data
    nodes_data, cycles_data = load_data()
    
    # Create graph
    G = create_graph(nodes_data)
    
    # Calculate layout (using spring layout for organic appearance)
    pos = nx.spring_layout(G, k=2, iterations=100, seed=42)
    
    # 1. Draw and save normal graph
    fig, ax = setup_single_figure()
    draw_normal_graph(G, pos, ax)
    save_figure(fig, 'graph_normal.png')
    
    # 2. Draw and save graph with all cycles highlighted
    fig, ax = setup_single_figure()
    draw_highlighted_graph(G, pos, ax, cycles_data)
    save_figure(fig, 'graph_all_cycles.png')
    
    # 3. Draw and save each individual cycle
    for i, cycle in enumerate(cycles_data['cycles']):
        fig, ax = setup_single_figure()
        draw_single_cycle(G, pos, ax, cycle, i)
        save_figure(fig, f'graph_cycle_{i + 1}.png')
    
    print(f"\nGenerated {2 + len(cycles_data['cycles'])} graph images.")


if __name__ == '__main__':
    main()
