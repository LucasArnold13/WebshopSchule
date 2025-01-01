const app = require('./App.js');

const port = 3000;

app.listen(port, () => {
    console.log(`Server läuft unter http://localhost:${port}`);
  });
