const express = require('express');
const db = require('./client/dist/db.js');
const port = 3000;
const app = express();

// middleware ================================================
app.use(express.json({type: 'application/json'}));

// routes ====================================================
app.use(express.static('./client/dist'));

app.post('/track_win/', (req, res) => {
  // create a query string
  // let queryStr = `INSERT INTO wins (player, wins) VALUES ('${req.body.player}', 1)`;
  let queryStr = `UPDATE wins SET wins = wins + 1 WHERE player = '${req.body.player}';`
  // send the wins to the database
  db.query(queryStr, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('successfully posted the win');
    }
  })
  res.end('request sent through');
})



app.listen(port, () => {
  console.log(`listening on port ${port}`);
})