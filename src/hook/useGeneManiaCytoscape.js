import { useEffect, useRef } from 'react'
import Cytoscape from 'cytoscape'

// Constants
const EDGE_COLORS = [
  { code: 'coexp', color: '#d0b7d5' },
  { code: 'coloc', color: '#a0b3dc' },
  { code: 'gi', color: '#90e190' },
  { code: 'path', color: '#9bd8de' },
  { code: 'pi', color: '#eaa2a2' },
  { code: 'predict', color: '#f6c384' },
  { code: 'spd', color: '#dad4a2' },
  { code: 'spd_attr', color: '#D0D0D0' },
  { code: 'reg', color: '#D0D0D0' },
  { code: 'reg_attr', color: '#D0D0D0' },
  { code: 'user', color: '#f0ec86' },
  { code: 'other', color: '#bbbbbb' }
]

const NODE_STYLE = {
  'width': 'mapData(score, 0, 1, 20, 60)',
  'height': 'mapData(score, 0, 1, 20, 60)',
  'content': 'data(symbol)',
  'font-size': 12,
  'text-valign': 'center',
  'text-halign': 'center',
  'background-color': '#666',
  'text-outline-color': '#666',
  'text-outline-width': 1.75,
  'color': '#fff',
  'overlay-padding': 6,
}

const QUERY_NODE_STYLE = {
  'background-color': '#333',
  'text-outline-color': '#333',
}

const EDGE_STYLE = {
  'curve-style': 'haystack',
  'haystack-radius': 0.5,
  'opacity': 0.4,
  'line-color': '#bbb',
  'width': 'mapData(weight, 0, 1, 1.5, 16)',
  'overlay-padding': 3,
}

export function useGeneManiaCytoscape(containerId, data) {
  const cyRef = useRef(null)

  useEffect(() => {
    if (!data || !document.getElementById(containerId)) return

    // Initialize Cytoscape
    const cy = new Cytoscape({
      container: document.getElementById(containerId),
      styleEnabled: true,
      userZoomingEnabled: false,
      userPanningEnabled: false,
      boxSelectionEnabled: false,
      selectionType: 'single',
    })
    cyRef.current = cy

    // Add Styles
    cy.style().selector('node').style(NODE_STYLE)
    cy.style().selector('node[?query]').style(QUERY_NODE_STYLE)
    cy.style().selector('edge').style(EDGE_STYLE)
    
    EDGE_COLORS.forEach(ec => {
      cy.style().selector('edge[group="' + ec.code + '"]').style({
        'line-color': ec.color,
      })
    })

    // Add Nodes
    data.resultGenes.forEach(el => {
      cy.add({
        data: {
          id: el.gene.id,
          symbol: el.gene.symbol,
          score: el.score,
          query: el.queryGene
        }
      })
    })

    // Add Edges
    let id = 0
    data.resultNetworkGroups.forEach(ng => {
      const netGroup = ng.networkGroup
      ng.resultNetworks?.forEach(rn => {
        rn.resultInteractions?.forEach(ri => {
          const source = ri.fromGene?.gene
          const target = ri.toGene?.gene
          const weight = ri.interaction?.weight
          if (source && target) {
            cy.add({
              group: 'edges',
              data: {
                id: `e${++id}`,
                source: source.id,
                target: target.id,
                weight: weight,
                group: netGroup.code,
              },
            })
          }
        })
      })
    })

    // Run Layout
    cy.layout({
      name: 'fcose',
      animate: false,
      idealEdgeLength: 40,
      nodeOverlap: 30,
      nodeRepulsion: 100000,
      padding: 10,
    }).run()

    // Cleanup
    return () => {
      if (cyRef.current) {
        cyRef.current.destroy()
        cyRef.current = null
      }
    }
  }, [containerId, data])

  return cyRef
}