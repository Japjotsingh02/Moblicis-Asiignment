const express=require("express");
const { UsersIncomeCarFilter, UsersPhPriceFilter, UserslNameEmailFilter, CarEmailFilter, getTop10Cities } = require("../controller/UserController");

const userRouter=express.Router();

userRouter
    .route('/IncomeCarFilter')
    .post(UsersIncomeCarFilter);

userRouter
    .route('/PhonePriceFilter')
    .post(UsersPhPriceFilter);

userRouter
    .route('/lNameEmailFilter')
    .post(UserslNameEmailFilter);

userRouter
    .route('/CarEmailFilter')
    .post(CarEmailFilter);

userRouter
    .route('/Top10Cities')
    .post(getTop10Cities);

module.exports=userRouter;


