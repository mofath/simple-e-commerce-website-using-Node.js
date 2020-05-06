const router = require("express").Router();

const adminController = require("../controllers/admin.controller");
const adminGuard = require("./guards/admin.guard");

router.get("/add", adminGuard, adminController.getAddProduct);

module.exports = router;
