const Journey = require("../../model/booking/ChooseJourney");
const Final = require("../../model/booking/finalTicketModel");

exports.create = async (req,res)=>{
    try {
        const {Your_journey_data,ticket_data}=req.body;
    
        const IsJourney= await Journey.findById({_id:Your_journey_data})
        if(!IsJourney){
            res.status(400).json({
                success:false,
                message:"No Journey Id Found😫😫"
            })
        }
    
        const data= await Final.create({
            Your_journey_data,
            ticket_data
        })
    
        if(data){
            res.status(200).json({
                success:true,
                message:"Final Data added👉👉🚌"
            })
        }
        else{
            res.status(400).json({
                success:false,
                message:"Invalid Details Please Check Your Ticket🙋‍♂️"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

exports.find =async (req,res)=>{
   try {
     const data=await Final.find({},{__v:0}).populate({
        path:"Your_journey_data",
        select:"-_id -createdAt -updatedAt -__v"
     }).populate(
        {
            path:"ticket_data",
            select:"-_id -createdAt -updatedAt -__v",
            populate:{
                path:"bus_id",
                select:"-_id -createdAt -updatedAt -__v"
            }
        }
     ).exec();
     if(data){
         res.json(data)
     }
     else{
         res.status(400).send({
             success:false,
             message:"No data Found😫😫😫"
         })
     }
   } catch (error) {
    console.log(error);
   }
}
exports.findbyId= async(req,res)=>{
    
}