import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * Renders a single <button>
 */
class Square extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      /*
      Notice how with onClick={() => alert('click')}, we’re passing
      a function as the onClick prop. React will only call this function
      after a click. Forgetting () => and writing onClick={alert('click')}
      is a common mistake, and would fire the alert every time the component
      re-renders.
      */
      <button
        className="square"
        // onClick={() => this.setState({value: 'X'})}
        onClick={() => this.props.onClick()} //onClick function provided by Board
      >
        {this.props.value}
      </button>
    );
  }
}

/**
 * Renders 9 squares
 */
class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = { //private, cannot be updated from child classes
      squares: Array(9).fill(null), //squares = new array of size 9 filled with null
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        // passing 2 props from board to square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)} //board's handleClick() method
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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
