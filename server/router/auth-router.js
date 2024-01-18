// Use the express.Router class to create modular, mountable route handlers. A router
// instance is a complete middleware and routing system; for this reason, it is often
// referred to as :"mini -app".


const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");

const { signupSchema, loginSchema} = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

// router.get("/", (req, res)=>{
//     res.status(200).send("Router concept in mern stack");
// });
// both the same code

router.route("/").get(authcontrollers.home);

router.route("/register").post(validate(signupSchema), authcontrollers.register);
router.route("/login").post(validate(loginSchema), authcontrollers.login);

router.route("/user").get(authMiddleware, authcontrollers.user);


module.exports = router;