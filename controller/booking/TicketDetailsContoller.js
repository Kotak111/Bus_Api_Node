const Ticket = require("../../model/booking/ticketSchema");
const crypto = require('crypto');


exports.create =async (req,res)=>{
    try {
        function generateOtp(length = 16) {
            // const otp = crypto.randomInt(0, Math.pow(10, length)).toString();
            // return otp.padStart(length, "0");
            const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
           
            return randomBytes.toString('hex').slice(0, length);
        }
        const {passenger_name,passenger_email,passenger_mobile,payment_type,gender,bus_id}=req.body;
    
        const pnr=generateOtp();
        const data=await Ticket.create({
            passenger_name,
            passenger_email,
            passenger_mobile,
            payment_type,
            gender,
            bus_id,
        })
        await Ticket.findByIdAndUpdate(
            data._id,
            {PNR:pnr}
        )

        if(data){
            res.status(200).json({
                success:true,
                message:"Check The Ticket Status👉👉👉👉",
            })
        }
        else{
            res.status(400).json({
                success:false,
                message:"Something Went Wrong..🤦‍♀️🤦‍♀️🤦‍♂️",
            })
        }
    } catch (error) {
        console.log(error);
    }
}
exports.find= async(req,res)=>{
    try {
        const data=await Ticket.find({},{createdAt:0,updatedAt:0,__v:0}).populate({
            path:"bus_id",
            select:"-_id -role_id -createdAt -updatedAt -__v"
        }).exec()
    
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(400).json({
                success:true,
                message:"No data Found...😫😫"
            })
        }
    } catch (error) {
        
    }
}