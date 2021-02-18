const express = require('express');
const port = 3000;

const app = express();

app.use(express.json({type: 'application/json'}));


app.get('/', (req, res) => {
  res.end('request sent through');
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})