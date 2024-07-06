const Admin = require("../../model/admin/adminSchema");

exports.createBus = async (req,res)=>{
    try {
        const {bus_name, bus_time , bus_source , bus_destination , bus_type , trip_code ,ticket_price,via_place,bus_no}=req.body;
        console.log(req.body);
        const AddBus= await Admin.create({
            bus_name,
            bus_time,
            bus_source,
            bus_destination,
            bus_type,
            trip_code,
            ticket_price,
            via_place,
            bus_no
        })
        if(AddBus){
            res.json("Bus Added..🚌🚌🚌🚌")
        }
    } catch (error) {
        console.log(error);
    }
}
exports.find= async (req,res)=>{
    try {
        const data=await Admin.find({},{__v:0});
        if(data){
            res.status(200).json({
                success:true,
                message:data
            })
        }
        else{
            res.status(400).json({
                success:false,
                message:"No Data Found..😫😫"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
exports.findbyId = async(req,res)=>{
   try {
     const id=req.params.id;
     const data=await Admin.findById(id)
     if(data){
         res.status(200).json({
             success:true,
             message:data
         })
     }
     else{
         res.status(400).json({
             success:false,
             message:"No Data Found..😫😫"
         })
     }
   } catch (error) {
    console.log(error);
   }

}
exports.trash =async(req,res)=>{
    try {
        const id=req.params.id;
        const data=await Admin.findByIdAndDelete(id)
        if(data){
            res.status(200).json({
                success:true,
                message:"Bus Deleted...🚌🤣😍"
            })
        }
        else{
            res.status(400).json({
                success:true,
                message:"No bus found....😫😫😫😫😫"
            })
        }
    } catch (error) {
        console.log(error);
    }
}
exports.update =async(req,res)=>{   
    try {
        const id=req.params.id;
        const data=await Admin.findByIdAndUpdate(
            id,
            {
                bus_name:req.body.bus_name,
                bus_time:req.body.bus_time,
                bus_source:req.body.bus_source,
                bus_destination:req.body.bus_destination,
                bus_type:req.body.bus_type,
                trip_code:req.body.trip_code,
                via_place:req.body.via_place,
                ticket_price:req.body.ticket_price,
                bus_no:req.body.bus_no
            }
        )
    
        if(data){
            res.status(200).json({
                success:true,
                message:"Bus Updated🚌❤️🚌"
            })
        }
        else{
            res.status(400).json({
                success:false,
                message:"No Bus Found😫😫"
            })
        }
    } catch (error) {
        console.log(error);
    }
}