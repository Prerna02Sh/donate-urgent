// const express=require('express')
// const cors = require("cors");

// const app=express()
// const port=5000;
// const mongoDB=require("./db");
// mongoDB();

// // app.use(cors());

// app.use('/api/webhook', require('./Routes/webhook'));

// app.use(cors({
//   origin: "https://donation-app-urgent.netlify.app",
//   methods: ["GET", "POST"],
//   credentials: true
// }));

// app.use(express.json())

// app.get('/',(req,res)=>{
//     res.send('Hello World');
// })

// app.use('/api',require("./Routes/CreateUser"))

// app.listen(port,()=>{
//     console.log(`App listening on port ${port}`);
// })



const express = require('express');
const cors = require("cors");
const app = express();


const port = process.env.PORT || 5000;

const mongoDB = require("./db");
mongoDB();

// 1. WEBHOOK ROUTE 
app.use('/api/webhook', require('./Routes/webhook'));


// 3. JSON MIDDLEWARE 
app.use(express.json());


// 2. CORS CONFIGURATION
app.use(cors({
  origin: "https://donation-app-urgent.netlify.app",
  methods: ["GET", "POST"],
  credentials: true
}));

// 4.  ROUTES
app.get('/', (req, res) => {
  res.send('Hello World - Backend is Live');
});

app.use('/api', require("./Routes/CreateUser"));

// 5. SERVER START
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});