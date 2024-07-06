const Journey = require("../../model/booking/ChooseJourney");
const Admin=require("D:/Bus_Api/model/admin/adminSchema.js")

exports.create =async (req,res)=>{
    try {
        const {Your_source_station,Your_destination_station,trip_date,Total_passenger,child}=req.body;
    
    
         const source=await Admin.findOne({bus_source:Your_source_station})
         if(!source){
            res.status(400).json(
                "No Root Found..😫😫😫"
            )
         }
    
         const destination=await Admin.findOne({bus_destination:Your_destination_station})
         if(!destination){
            res.status(400).json(
                "No Root Found..😫😫😫"
            )
         }
    
         const data=await Journey.create({
            Your_source_station,
            Your_destination_station,
            trip_date,
            Total_passenger,
            child
         })
         if(data){
            res.json("Yehhh Your Root Found ... see to Buses🚌🚌")
         }
    } catch (error) {
        console.log(error);
    }
    
}

exports.find=async (req,res)=>{
    try {
        const data=await Journey.find();
        if(data){
            res.status(200).json({
                success:true,
                message:data
            })
        }
        else{
            res.status(400).json({
                success:false,
                message:"No Slot Founds...😫😫"
            })
        }
    } catch (error) {
        
    }
}

exports.findById =async(req,res)=>{
 try {
       const  id =req.params.id;
       const data=await Journey.findById(id)
       if(data){
           res.status(200).json({
               success:true,
               message:data
           })
       }
       else{
           res.status(200).json({
               success:false,
               message:"No id Found...😫😫😫"
           })
       }
 } catch (error) {
    console.log(error);
 }
}