const express = require("express");

// below line is like a middleware
const router = express.Router();

const services = require("../controllers/service-controller");

router.route("/service").get(services);

module.exports = router;