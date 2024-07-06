const router=require("express").Router()
const JourneyController=require("../controller/booking/chooseJourneyController")
const { verifyUser, IsUser } = require("../middleware/auth")

router.post("/",verifyUser,IsUser,JourneyController.create)
router.get("/",JourneyController.find)
router.get("/:id",JourneyController.findById)

module.exports=router;