const router=require("express").Router();
const FinalController=require("../controller/booking/finalTicketController")

router.post("/",FinalController.create)
router.get("/",FinalController.find)

module.exports=router;