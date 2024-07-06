const { Schema, model } = require("mongoose");

const Admindata= new Schema({
    bus_name:{
    type:String,
    required:true,
    trim:true
    },
    bus_time:{
        type:String,
        required:true
    },
    bus_source:{
        type:String,
        required:true,
        trim:true
    },
    bus_destination:{
        type:String,
        required:true,
        trim:true
    },
    bus_type:{
        type:String,
        required:true,
        trim:true
    },
    trip_code:{
            type:String,
            required:true,
            trim:true
    },
    via_place:[
       {
        type:String,
        required:true
       }
    ],
    ticket_price:{
            type:Number,
            required:true,
            trim:true
    },
    bus_no:{
            type:String,
            required:true,
            trim:true
    },
    role_id:{
        type:String,
        default:1,
        enum:[0,1,2]
    }
},
{timestamps:true})

const Admin=model("AdminBus",Admindata)
module.exports=Admin;