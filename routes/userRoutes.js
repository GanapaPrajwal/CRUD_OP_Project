const express = require("express");
const {registerUser,
    loginUser,
    currentUser
    } = require("../controllers/userControler");
const validaToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register",registerUser)

router.post("/login",loginUser)

router.get("/current",validaToken,currentUser)

module.exports = router;