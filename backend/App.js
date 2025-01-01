const express = require('express');
const cors = require('cors');

const backendRoutes = require("./routes/backend");
const frontendRoutes = require("./routes/frontend");

const app = express();



app.use(cors({
  origin: "http://localhost:3001",
  credentials: true, 
}));

app.use(express.json());


app.use("/api/backend/", backendRoutes);
app.use("/api/frontend/", frontendRoutes);






module.exports = app;




