import "./node.css"

const Node = ({
  col,
  row,
  isFinish,
  isStart,
  isWall,
  onMouseEnter,
  onMouseUp,
  onMouseDown,
}) => {
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : ""

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  )
}
export default Node
