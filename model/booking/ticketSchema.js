const { Schema, default: mongoose, Types, model } = require("mongoose");

const TicketSchema  = new Schema({
    passenger_name:{
        type:String,
        required:true,
        trim:true
    },
    passenger_email:{
        type:String,
        required:true,
        trim:true
    },
    passenger_mobile:{
        type:String,
        required:true,
        trim:true,
    },
    payment_type:{
        type:String,
        required:true,
        trim:true,
    },
    gender:{
        type:String,
        required:true,
        trim:true
    },
    PNR:{
        type:String,
        required:false,
    },
    bus_id:{
        type:mongoose.Types.ObjectId,
        ref:'AdminBus'
    },
    


},{timestamps:true})


const Ticket=model("TicketDetails",TicketSchema)
module.exports=Ticket;