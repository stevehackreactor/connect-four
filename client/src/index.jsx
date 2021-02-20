const React = require('react');
const reactDom = require('react-dom');
const axios = require('axios');

const Board = require('./components/board.jsx');
// import/require statements are still needed even if using webpack. webpack uses this info for bundling purposes

// building client app in here

class App extends React.Component {
  constructor(props) {
    super(props)

    // board is 9 by 8
    // player 1 will be shown with a 1, player 2 with a 2
    this.state = {
      board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      turn: 1,
      gameOver: false
    };

    this.checkRow = this.checkRow.bind(this);
    this.checkColumn = this.checkColumn.bind(this);
    this.checkMajorDiagonal = this.checkMajorDiagonal.bind(this);
    this.checkMinorDiagonal = this.checkMinorDiagonal.bind(this);
    this.checkBoard = this.checkBoard.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (event) => {
    event.preventDefault();
    if (this.state.gameOver === true) {
      return;
    }
    let column = event.target.id.slice(-1);
    var yPos;
    var audio = new Audio('./assets/SoundEffect4.m4a');
    audio.play();
    board = this.state.board;
    if (this.state.turn === 2) {
      var player = 'blue';
    } else {
      var player = 'red';
    }

    for (let i = board.length - 1; i >= 0; i--) {
      let row = board[i];
      if (row[column] === 0) {
        yPos = i;
        board[i][column] = this.state.turn;
        this.setState({
          board: board
        })
        if (this.state.turn === 1) {
          this.setState({
            turn: 2
          })
        } else {
          this.setState({
            turn: 1
          })
        }
        break;
      }
    }
    if(this.checkBoard(this.state.board, yPos, column)) {
      alert(`Congratulations, ${player}! You Won!!!!`);
      var celebration = new Audio('./assets/SoundEffect3.m4a');
      celebration.play();
      this.setState({
        gameOver: true
      })
      // perform axios post request to post win to sql database
      axios.post('/track_win/', {
        player: player
      })
      .then((response) => {
        console.log('sent the info to sql and now, back in index got: ', response);
      }, (error) => {
        console.log('sent the info to sql but got the following error: ', error);
      })

    }
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

  checkColumn = (board, yPos, xPos) => {
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

  checkMajorDiagonal = (board, yPos, xPos) => {
    // determine where row 0 start of the diagonal is or would be (if out of bounds)
    let player = board[yPos][xPos];
    let xPosWhenyPosZero = xPos - yPos;
    let inARow = 0;
    // increment both positions until x or y is out of bounds
    for (let i = 0; i < 8; i++) {
      // iterate over the major diagonal
      if (board[i][xPosWhenyPosZero + i] === player) {
        inARow++;
      } else {
        inARow = 0;
      }
      if (inARow >= 4) {
        return player;
      }
    }
    console.log('no match in major diagonal starting in row 0 at column ', xPosWhenyPosZero);
    return undefined;
  }

  checkMinorDiagonal = (board, yPos, xPos) => {
    // returns the winning player or undefined if no winner
    // determine where row 0 start of the diagonal is or would be (if out of bounds)
    let player = board[yPos][xPos];
    let xPosWhenyPosZero = Number(xPos) + Number(yPos);
    let inARow = 0;
    // increment both positions until x or y is out of bounds
    for (let i = 0; i < 8; i++) {
      // iterate over the major diagonal
      if (board[i][xPosWhenyPosZero - i] === player) {
        inARow++;
      } else {
        inARow = 0;
      }
      if (inARow >= 4) {
        return player;
      }
    }
    console.log('no match in minor diagonal starting in row 0 at column ', xPosWhenyPosZero);
    return undefined;
  }
  // calls all checks
  checkBoard = (state, yPos, xPos) => {
    if(this.checkRow(state, yPos, xPos)) {return this.checkRow(state, yPos, xPos)};
    if(this.checkColumn(state, yPos, xPos)) {return this.checkColumn(state, yPos, xPos)};
    if(this.checkMajorDiagonal(state, yPos, xPos)) {return this.checkMajorDiagonal(state, yPos, xPos)};
    if(this.checkMinorDiagonal(state, yPos, xPos)) {return this.checkMinorDiagonal(state, yPos, xPos)};
  }

  render() {
    return (
      <div>
        <h1 class="title">Connect Four (from index.jsx file)</h1>
        <Board board={this.state.board} handleClick={this.handleClick}/>
      </div>
    )
  }
}

reactDom.render(<App />, document.getElementById('app'));