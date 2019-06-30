import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Renders a single <button>
 */
// class Square extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       value: null,
//     };
//   }

//   render() {
//     return (
//       /*
//       Notice how with onClick={() => alert('click')}, we’re passing
//       a function as the onClick prop. React will only call this function
//       after a click. Forgetting () => and writing onClick={alert('click')}
//       is a common mistake, and would fire the alert every time the component
//       re-renders.
//       */
//       <button
//         className="square"
//         // onClick={() => this.setState({value: 'X'})}
//         onClick={() => this.props.onClick()} //onClick function provided by Board
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }

/**
 * Square as a function component.
 * Only contains a render method and don't have their own state
 */
function Square(props) {
  return (
    <button
      className = "square"
      onClick = {props.onClick} //note lack of () after onClick
    >
      {props.value}
    </button>
  );
}


/**
 * Renders 9 squares
 */
class Board extends React.Component {
  //Lifted up into Game component
  // constructor(props){
  //   super(props);
  //   this.state = { //private, cannot be updated from child classes
  //     squares: Array(9).fill(null), //squares = new array of size 9 filled with null
  //     xIsNext: true,
  //   };
  // }

  renderSquare(i) {
    return (
      <Square
        // passing 2 props from board to square
        value={this.props.squares[i]}
        // onClick={() => this.handleClick(i)} //board's handleClick() method
        onClick={() => this.props.onClick(i)} //Game's handleClick() method
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

/**
 * Renders a board with placeholder values to be modified
 */
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice(); //create a copy to be modified
    if (calculateWinner(squares) || squares[i]) { //if someone has won, ignore clicks
      return;
    }
    squares[i] = this.state.xIsNext? 'X': 'O';
    this.setState({
      history: history.concat([{ //concat does not mutate original array
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 
        'Go to move #' + move : //if move is not zero
        'Go to game start'; // if move is zero
      return (
        // list item <li> that contains a button that executes jumpTo()
        <li>
          <button onClick = {() => this.jumpTo(move)}> {desc} </button>
        </li>
      )
    })

    let status; //initialises letter variable
    if (winner) { //winner != null
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext? 'X' : 'O');
    }
    
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

/**
 * calculatesWinner of the game
 * @param {*} squares 3x3 game state
 * @returns a string which shows the winner, null if no winner
 */
function calculateWinner(squares) {
  //lines is the positions of boxes in squares that form a line
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    //if squares[a] checks that squares[a] is not empty
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}