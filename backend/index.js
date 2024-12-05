const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors({
  origin: "http://localhost:3001", // URL deines Frontends
  credentials: true, // Cookies und Sessions erlauben
}));
app.use(express.json());




app.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
});

app.post('/api/login', (req, res ) => {
  const { username, password } = req.body;

  if(username == 'lucas' && password == 'test') {
    //req.session.user = { username }; 
    return res.status(200).json({ message: "Login erfolgreich" });
  } else {
    return res.status(401).json({ message: "Ungültige Anmeldedaten" });
  }
  

});