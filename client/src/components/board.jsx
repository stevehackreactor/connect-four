// const React = require('react');
const Position = require('./positions.jsx');

let Board = ({board, handleClick}) => {

  let positionId = 0;
  let className;

  let renderButtons = () => {
    let returnButtons = [];
    for (let i = 0; i < 9; i++) {
      idName = 'column' + i;
      returnButtons.push(<button id={idName} class="column" onClick={handleClick}>Drop Piece</button>);

    }
    return returnButtons;
  }

  return (
    <div>
      {renderButtons()}
      <table>
        <tbody>
        {board.map((row) => {
          // want to return a row full of individual positions
          return (
          <tr>
            {
              row.map((position) => { // want this to return a table row
                positionId++;
                return (
                  <td>
                    <Position position={position} key={positionId}/>
                  </td>
                )
              })
            }
          </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

module.exports = Board;