const express = require("express")
const router = express.Router();
const   {getContact,
        createContact,
        ContectById,
        UpdateContact,
        DeleteContact } =  require( "../controllers/contactControler");
const validaToken = require("../middleware/validateTokenHandler");


router.use(validaToken)
router.route("/").get(getContact).post(createContact)

router.route("/:id").get(ContectById).put(UpdateContact).delete(DeleteContact)

module.exports = router
