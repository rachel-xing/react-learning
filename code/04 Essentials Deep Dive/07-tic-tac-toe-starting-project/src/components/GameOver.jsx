function GameOver({winner,onRematch}) {
  return (
    <ol id="game-over">
      <h2>Game Over</h2>
      <p>{winner} won!</p>
      <button onClick={onRematch}>Rematch!</button>
    </ol>
  )
}