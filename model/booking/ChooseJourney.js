const { Schema, model } = require("mongoose");

const JourneySchema=new Schema({
    Your_source_station:{
        type:String,
        required:false,
        trim:true,
    },
    Your_destination_station:{
        type:String,
        required:false,
        trim:true,
    },
    trip_date:{
        type:String,
        required:true,
        trim:true
    },
    Total_passenger:{
        type:Number,
        required:true,
        trim:true
    },
    child:{
        type:Number,
        required:true,
        trim:true
    }
},
{timestamps:true}
)
const Journey=model("JourneyStart",JourneySchema)
module.exports=Journey;