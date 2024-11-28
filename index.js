const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hallo, Express!');
});

app.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
});
