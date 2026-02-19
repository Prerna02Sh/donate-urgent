const mongoose=require('mongoose');
const {Schema}=mongoose;

const DonateSchema=new Schema({
    name:{
        type: String, 
        required:true   //for validation check
    },
    amount:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('user', DonateSchema,'donate-info');  //user for connection create