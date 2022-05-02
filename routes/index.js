/**
 * HOME ROUTER
 */

const express = require("express")
const router = express.Router()

router.get("/", (req, res)=> {
    res.render("index", {title: "Inicio", stylesheet: "home"})
})

module.exports = router