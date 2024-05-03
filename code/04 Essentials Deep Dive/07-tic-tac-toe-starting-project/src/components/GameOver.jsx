function GameOver({winner,onRematch}) {
  return(
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It's a Draw!</p> }
      <button onClick={onRematch}>Rematch!</button>
    </div>
  );
}

export default GameOver;