const React = require('react');

let Board = ({board}) => {



  return (
    <table>
      {board.map((row) => {
        // want to return a row full of individual positions
        return row.map((position) => {
          return <Position player={position}/>
        })
      })}
    </table>
  )
}