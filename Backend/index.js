const express = require("express");
const app =express();
const cors = require("cors");
const connection = require("./database/db");
const path = require('path');



app.use(express.json());
app.use(cors());
app.use("/uploads",express.static(path.join(__dirname,"uploads")));


const authRouter = require("./routes/auth.router");
const categoryRouter = require("./routes/category.router");
const productRouter = require("./routes/product.router");
const basketRouter = require("./routes/basket.router");

app.use("/api/auth",authRouter);
app.use("/api/category",categoryRouter);
app.use("/api/product",productRouter);
app.use("/api/basket",basketRouter);
 

 connection();


const port = process.env.PORT | 5000;
app.listen(port,()=>console.log("running"));