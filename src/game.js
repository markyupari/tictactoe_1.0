const Square = ({id, newState, winner}) => {
  const [color, setColor] = React.useState('green');
  const [status, setStatus] = React.useState(null);
  const XorO = ["O", "X"];

  const palet = ['green', 'red', 'blue'];
  //const getRandomColor = () => palet[Math.floor(Math.random()*3)];

  React.useEffect(() => {
    console.log(`Render ${id}`); //Message when render occurs
    // Here is defined what happens when the component is unmounted
    return () => console.log(`unmounting Square ${id}`);
  });

  return (
    <button
      disabled={winner !== null ? true : false }
      onClick={e => {
        //let col = getRandomColor();
        let nextPlayer = newState(id);
        setStatus(nextPlayer);
        let col = palet[nextPlayer];
        setColor(col);
        e.target.style.background = col;
      }}
    >
      <h1>{XorO[status]}</h1>
    </button>
  );
};

const Board = () => {
  const [player, setPlayer] = React.useState(1); // initializes to 1 => Player 1 starts
  const [state, setState] = React.useState(Array(9).fill(null)); //game state of all squares
  // const [mounted, setMounted] = React.useState(true);
  // const [render, setRender] = React.useState(0);

  let status = `Player ${player}`;
  let winner = checkWinner(state);
  if (winner != null) status = `Player ${winner} wins`

  const newState = idOfSquare => {
    let thePlayer = player;
    state[idOfSquare] = player;  // player present on this square is store in its corresponding place at the state array
    //[0, 1, 2,
    // 3, 4, 5,
    // 6, 7, 8]
    // each number on the array corresponds to the square id
    setState(state); // updates the array of the game state
    let nextPlayer = (player + 1) % 2; // switching between player 0 and 1
    setPlayer(nextPlayer); // setting the next player because the setPlayer won't be effective on this line of code until the next render
    return thePlayer; // return current player
  };

  // const toggle = () => setMounted(!mounted);
  // const reRender = () => setRender(Math.random());

  function renderSquare(i) {
    return <Square id={i} newState={newState} winner={winner}></Square>;
  }
  
  return (
    <div
      className="game-board"
      // onClick={(e) => {
      //   setPlayer((player + 1)%2);
      //   status = `Player ${player}`;
      //   e.target.style.background = 'red';
      //   e.target.style.width = '400px';
      // }}
    >
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {/* {mounted && renderSquare(0)}
        {mounted && renderSquare(1)}
        {mounted && renderSquare(2)} */}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
      {/* <button onClick={toggle}>Show/Hide Row</button>
      <button onClick={reRender}>Re-Render</button> */}
        <h1> {status} </h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
