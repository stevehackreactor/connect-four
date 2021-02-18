const express = require('express');
const port = 3000;

const app = express();

// middleware ================================================
app.use(express.json({type: 'application/json'}));

// routes ====================================================
app.use(express.static('client'));

app.post('/', (req, res) => {
  res.end('request sent through');
})



app.listen(port, () => {
  console.log(`listening on port ${port}`);
})