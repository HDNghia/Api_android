const router = require("express").Router();
const email = require("../controllers/sendEmail.js");
router.get("/:email/:otp", email.sendemail);

module.exports = router;