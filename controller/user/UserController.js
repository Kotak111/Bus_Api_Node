const hashpassword = require("../../helpers/HashPass");
const comparepassword = require("../../helpers/comparepass");
const User = require("../../model/user/UserSchema")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const crypto = require('crypto');
const sendData = require("../../config/mail");

exports.create = async (req,res) =>{
    try {
        const {user_name , user_email , user_mobile , user_password , cpassword , gender}=req.body;
        if(user_password != cpassword){
            res.json("Password Not match....😫😫😫")
        }
        const hashedPassword = await hashpassword(user_password,cpassword);
        const Isvalid = await User.findOne({user_email:user_email})
        if(Isvalid){
           res.json("Email Address Already Exist😫😫😫") 
        }

        
            const Isregister= await User.create({
                    user_name,
                    user_email,
                    user_mobile,
                    user_password,
                    cpassword,
                    gender
            })
            if(!Isregister){
                res.status(400).json({
                    success:false,
                    message:"Something went wrong"
                })
            }
            else{
                res.status(200).json({
                    success:true,
                    message:"Registration Successfully...😍😍🤞😉"
                })
            }
    } catch (error) {
        console.log(error);
    }
}

exports.signin =async(req,res)=>{
    try {
        const {user_email,user_password}=req.body;
    
    
        const IsEmail=await User.findOne({user_email:user_email})
        if(!IsEmail){
            res.status(400).json({
                success:false,
                message:"Invalid Details...😫😫😫😫"
            })
        }
        //comaparing a password
    
        const Ismatch=await comparepassword(user_password,IsEmail.user_password)
        if(!Ismatch){
            res.status(400).json({
                success:false,
                message:"Invalid Crediantial...🤦‍♂️🤦‍♂️🤦‍♀️🤦‍♀️😫"
            })
        }
    
        const token =jwt.sign(
            {
                userrole:IsEmail.role_id,
                useid:IsEmail._id
            },
            process.env.SCREAT_KEY,
            {expiresIn:"24h"}
        )
        res.header("token",token).json({
            success:true,
            message:"Login Successfully...😉😉🙋‍♂️🙋‍♂️"
        })
        console.log(token);
    } catch (error) {
        console.log(error);
    }
}


exports.changePassword = async (req, res) => {
    try {
        const { current_password, new_pass } = req.body;
        const id = req.params.id;

        // Find user by ID
        const finddata = await User.findById(id);
        if (!finddata) {
            return res.status(404).json({ message: "User not found" });
        }

        
        const isMatch = await bcrypt.compare(current_password, finddata.user_password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password not match 😫😫" });
        }

    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_pass, salt);

        
        finddata.user_password = hashedPassword;
        finddata.cpassword = hashedPassword; 

        await finddata.save();

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.resetmail =async(req,res)=>{
    try {
        function generateOtp(length = 6) {
            const otp = crypto.randomInt(0, Math.pow(10, length)).toString();
            return otp.padStart(length, "0");
        }
        const {User_email}=req.body;
        const IsMail= await User.findOne({user_email:User_email})
        if(!IsMail){
            res.status(400).send({
                success:false,
                message:"No User Found.😫😫"
            })
        }
    
    
        const otp=generateOtp();
        const sendOtp=await User.findByIdAndUpdate(
            IsMail._id,
            {otp:otp},
            {new:true}
        )
        if(sendOtp){
            console.log(`send mail to ${IsMail.user_email}`);
            sendData(IsMail.user_email,otp);
            return res.json("OTP send successfully in your mail please check your mail😉😉")
        }
        else{
            return res.json("something went wrong😫😫")
        }
    } catch (error) {
        console.log(error);
    }
   


}


exports.resetpassword =async (req,res)=>{
    const {User_emaail,otp,newPassword}=req.body;
        if(newPassword == ""){
            res.json("please enter New Password🤣🤣")
        }

    const Ismail=await User.findOne({user_email:User_emaail})
    if(!Ismail){
        res.status(400).send("Email Dose Not Exists😫😫😫")
    }
    const IsOtp=await User.findOne({otp:otp})
    if(!IsOtp){
        res.json("wrong Otp please enter correct otp!😫😫")   
    }
    const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(newPassword, salt);
     IsOtp.user_password = hashedPassword;
     IsOtp.cpassword = hashedPassword;
     IsOtp.otp =" ";
     await IsOtp.save();
     res.json("password changed successfully😉😉❤️")
    console.log("done");
}