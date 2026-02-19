const express=require('express')
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config(); 

const app=express()
const port=5000;
const mongoDB=require("./db");
mongoDB();

app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/api',require("./Routes/CreateUser"))




app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
})