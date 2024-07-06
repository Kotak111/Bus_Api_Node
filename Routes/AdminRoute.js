const router=require("express").Router();
const AdminController =require("../controller/admin/adminController");
const { IsAdmin } = require("../middleware/auth");


router.post("/",IsAdmin,AdminController.createBus)
router.get("/",IsAdmin,AdminController.find)
router.get("/:id",IsAdmin,AdminController.findbyId)
router.delete("/:id",IsAdmin,AdminController.trash)
router.patch("/:id",IsAdmin,AdminController.update)






module.exports=router;