const jwt=require("jsonwebtoken")
exports.verifyUser = async (req,res,next)=>{
    try {
        // let token=req.headers.authorization;
        let token = req.headers.authorization;
    
        if(!token){
            return res.status(401).send({
                error: "Access Denied / Unauthorized request"
            })
        }
    
    
        token=token.split(' ')[1];
        if(token === "null" || !token){
            return res.status(401).send({
                error: " Unauthorized request"
            })
        }
    
        const verifyuser=jwt.verify(token,process.env.SCREAT_KEY)
        if(!verifyuser){
                return res.status(401).send({
                    error: "Unauthorized request !"
                })
        }
    
        req.user=verifyuser;
        next();
    
    } catch (error) {
        res.status(400).json({
            error: true,
            message: "Invalid Token"
        })
    }

}

exports.IsUser =async(req,res,next)=>{
        if(req.user.userrole==0){
            next();
        }
        else{
            return res.status(401).send("unauthorized")
        }
}
exports.IsAdmin =async (req,res,next)=>{
    if(req.user.userrole==1){
        next();
    }
    else{
        return res.status(401).send("unauthorized")
    }
}