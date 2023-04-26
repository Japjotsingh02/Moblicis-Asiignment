const express=require("express");
const app=express();
const cors=require("cors");
const userRouter = require("./Routers/userRouter");
// const { default: mongoose } = require("mongoose");

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(5000);

app.use("/user",userRouter);