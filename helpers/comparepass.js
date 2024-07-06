const bcrypt =require("bcryptjs")
const comparepassword = async(inputpassword,hashpass)=>{
    return await bcrypt.compare(inputpassword,hashpass)
}
module.exports=comparepassword;