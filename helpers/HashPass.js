const bcrypt=require("bcryptjs")
const hashpassword = async(user_password,cpassword)=>{
    try{
        const sult=await bcrypt.genSalt(10);
        return await bcrypt.hash(user_password,sult)
        return await bcrypt.hash(cpassword,sult)
    }
    catch{
        throw new Error("hasing error",err)
    }
}
module.exports =hashpassword;