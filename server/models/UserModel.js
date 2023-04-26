require('dotenv').config();
const { model, Schema, default: mongoose } = require("mongoose");
const userDataJSON=require('../sample_data.json');
const { request } = require('express');
const assert=require('assert');

mongoose.connect(process.env.CONNECTION_URL)
.then(function(db){
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
});

const userSchema=Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    id:{
        type:Number,
        required:true,
        unique:true,
    },
    gender:{
        type:String,
    },
    income:{
        type:Number,
        // set: v => parseFloat(v.slice(1))
    },
    quote:{
        type:String,
    },
    car:{
        type:String,
    },
    city:{
        type:String,
    },
    phone_price:{
        type:Number,
    }
},
{ timestamps: true });


const User=model('User',userSchema);

// User.insertMany(userDataJSON);

module.exports=User;

