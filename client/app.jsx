const React = require('react');
const reactDom = require('react-dom');

// building client app in here

class App extends React.component {
  constructor(props) {
    super(props)

    // board is 9 by 8
    // player 1 will be shown with a 1, player 2 with a 2
    this.state = {
      board: [
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null]
      ]
    };

    this.checkRow = this.checkRow.bind(this);
    this.checkColumn = this.checkColumn.bind(this);
    this.checkMajorDiagonal = this.checkMajorDiagonal.bind(this);
    this.checkMinorDiagonal = this.checkMinorDiagonal.bind(this);
    this.checkBoard = this.checkBoard.bind(this);
  }

  // should just check from the place of the most recently placed piece
  checkRow = (board, yPos, xPos) => {
    // access the 2d array at the location of yPos, xPos.
    // grab the board at the yPos
    let row = board[yPos];
    let player = row[xPos]; // will be 1 or 2
    let inARow = 0;
    let ele;

    // run a function on an array to look for 4 in a row
    for (let i = 0; i < row.length; i++) {
      ele = row[i];
      if (ele === player) {
        inARow++;
      } else {
        inARow = 0;
      }
      if (inARow >= 4) {
        return player;
      }
    }
    console.log('no match in row ', yPos);
    return undefined;
  }

  checkColumn = (state, yPos, xPos) => {
    // look at each row in xPos for comparisons
    let player = board[yPos][xPos];
    let inARow = 0;
    let ele;

    for (let i = 0; i < board.length; i++) {
      ele = board[i][xPos];
      if (ele === player) {
        inARow++;
      } else {
        inARow = 0;
      }
      if (inARow >= 4) {
        return player;
      }
    }
    console.log('no match in column ', xPos);
    return undefined;
  }

  checkMajorDiagonal = (state, yPos, xPos) => {
    // determine where row 0 start of the diagonal is or would be (if out of bounds)
    // iterate over the major diagonal
    // do the same stuff
  }

  checkMinorDiagonal = (state, yPos, xPos) => {
    // returns the winning player or undefined if no winner
  }
  // calls all checks
  checkBoard = (state) => {
    if(this.checkRow(state)) {return this.checkRow(state)};
    if(this.checkColumn(state)) {return this.checkColumn(state)};
    if(this.checkMajorDiagonal(state)) {return this.checkMajorDiagonal(state)};
    if(this.checkMinorDiagonal(state)) {return this.checkMinorDiagonal(state)};
  }

  render() {
    return (
      <div>
        <h1>APP GOES HERE</h1>
      </div>
    )
  }
}

reactDom.render(<App />, document.getElementById('app'));