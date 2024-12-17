const express = require('express');
const cors = require('cors');

const backendRoutes = require("./routes/backend");
const frontendRoutes = require("./routes/frontend");

const app = express();
const port = 3000;


app.use(cors({
  origin: "http://localhost:3001",
  credentials: true, 
}));

app.use(express.json());


app.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
});


app.use("/api/backend/", backendRoutes);
app.use("/api/frontend/", frontendRoutes);











