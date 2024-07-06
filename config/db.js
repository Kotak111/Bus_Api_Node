const { default: mongoose } = require("mongoose");
require('dotenv').config();

const db=  mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("database connected🤞🤞😍");
})
.catch((error)=>{
    console.log(error);
    console.log("database error😫😫😫");
})

module.exports=db