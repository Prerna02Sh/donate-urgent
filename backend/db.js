const mongoose = require('mongoose');
require('dotenv').config();
const mongoDB = async()=>{
    try {
        try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const fetched_data = mongoose.connection.db.collection("donate-info");
        const data = await fetched_data.find({}).toArray();
        console.log(data);

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }

    } catch (error){
        console.error("Error connecting to MongoDB:", error);
    }
};


module.exports=mongoDB;
