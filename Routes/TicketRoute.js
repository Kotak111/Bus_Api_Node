const router=require("express").Router()
const { verify } = require("jsonwebtoken");
const TicketController=require("../controller/booking/TicketDetailsContoller")

router.post("/",verify,TicketController.create)
router.get("/",TicketController.find)

module.exports=router;