
let Position = ({position}) => {
  // console.log(position);
  if (position === 0) {
    return (
      <div class="position">{position}</div>
    )
  } else if (position === 1) {
    return (
      <div class="red">{position}</div>
    )
  } else {
    return (
      <div class="blue">{position}</div>
    )
  }
}

module.exports = Position;