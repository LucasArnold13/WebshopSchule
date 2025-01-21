const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const customerRoutes = require('./routes/customer');
const categoryRoutes = require('./routes/category');
const statusRoutes = require('./routes/status');
const orderRoutes = require('./routes/order');
const roleRoutes = require('./routes/role');
const dashboardRoutes = require('./routes/dashboard');

app.use(cors({
  origin: ["http://localhost:3001", "http://192.168.156.97:3001", "http://192.168.154.237:3001"],
  credentials: true, 
}));

app.use(express.json());
app.use(bodyParser.json({ limit: "1000mb" })); 
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/dashboard", dashboardRoutes);






module.exports = app;




