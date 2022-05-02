/**
 * FORMS ROUTER
 */

// dependencies
const FormsModel = require("../models/forms")
const formChecker = require("../middlewares/formsChecker")
const express = require("express")
const router = express.Router()

const formsModel = new FormsModel()

router.get("/", (req, res)=> {
    res.render("forms", {
        title: "Formularios", 
        stylesheet: "forms"
    })
})
router.get("/create", (req, res)=> {
    res.render("forms_create", {
        title: "Formularios - Crear", 
        stylesheet: "forms_create"
    })
})

router.use(formChecker)
router.post("/create", (req, res)=> {
    // Save the form data to the form model.
    formsModel.create(req.formData)

    console.log(req.formData)
    res.render("forms_create", {
        title: "Formularios - Crear", 
        stylesheet: "forms_create",
        success: req.isDataCorrect,
        failure: !req.isDataCorrect,
        details: req.failureDetails,
        data: req.sentData
    })

})

module.exports = router