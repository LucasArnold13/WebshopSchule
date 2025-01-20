const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");

const backendRoutes = require("./routes/backend");
const frontendRoutes = require("./routes/frontend");
const path = require("path");

const app = express();



app.use(cors({
  origin: ["http://localhost:3001", "http://192.168.156.97:3001", "http://192.168.154.237:3001"],
  credentials: true, 
}));

app.use(express.json());
app.use(bodyParser.json({ limit: "1000mb" })); // Erhöht die Grenze auf 10 MB
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));


app.use("/api/backend/", backendRoutes);
app.use("/api/frontend/", frontendRoutes);






module.exports = app;




