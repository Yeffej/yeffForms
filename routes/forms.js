const express = require("express")
const router = express.Router()

router.get("/", (req, res)=> {
    res.render("forms", {title: "Formularios", stylesheet: "forms"})
})
router.get("/create", (req, res)=> {
    res.render("forms_create", {
        title: "Formularios - Crear", 
        stylesheet: "forms_create"
    })
})

module.exports = router