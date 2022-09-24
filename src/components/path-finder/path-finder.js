import { useState, useEffect } from "react"
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../../algorithms/dijkstra"
import Node from "../node/node"
import "./path-finder.css"

const START_NODE_ROW = 10
const START_NODE_COL = 15
const FINISH_NODE_ROW = 10
const FINISH_NODE_COL = 35

const initGrid = () => {
  const grid = []
  for (let row = 0; row < 20; row++) {
    const currentRow = []
    for (let col = 0; col < 50; col++) {
      currentRow.push(initNode(col, row))
    }
    grid.push(currentRow)
  }
  return grid
}

const initNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  }
}

const initNewGrid = (grid, row, col) => {
  const newGrid = grid.slice()
  const node = newGrid[row][col]
  const newNode = {
    ...node,
    isWall: !node.isWall,
  }
  newGrid[row][col] = newNode
  return newGrid
}

const PathFinder = () => {
  const [grid, setGrid] = useState([])
  const [mouseIsPressed, setMouseIsPressed] = useState(false)

  useEffect(() => {
    setGrid(initGrid)
  }, [])

  const handleMouseDown = (row, col) => {
    const newGrid = initNewGrid(grid, row, col)
    setGrid(newGrid)
    setMouseIsPressed(true)
  }

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return
    const newGrid = initNewGrid(grid, row, col)
    setGrid(newGrid)
  }

  const handleMouseUp = () => {
    setMouseIsPressed(false)
  }

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder)
        }, 10 * i)
        return
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i]
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited"
      }, 10 * i)
    }
  }

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i]
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path"
      }, 50 * i)
    }
  }

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL]
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder)
  }

  const clearGrid = () => window.location.reload(false)

  return (
    <>
      <button className="btn" onClick={() => visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      <button className="btn-l" onClick={() => clearGrid()}>
        Clear
      </button>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    row={row}
                  ></Node>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}
export default PathFinder
