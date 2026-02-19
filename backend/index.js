const express=require('express')
const cors = require("cors");

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