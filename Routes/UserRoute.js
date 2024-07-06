const router=require("express").Router()
const UserController=require("../controller/user/UserController")
const { verifyUser, IsUser } = require("../middleware/auth")
router.post("/",UserController.create)
router.post("/login",UserController.signin)
router.post("/changepassword/:id",verifyUser,IsUser,UserController.changePassword)
router.post("/resetmail",verifyUser,IsUser,UserController.resetmail)
router.post("/resetpassword",verifyUser,IsUser,UserController.resetpassword)


module.exports=router;