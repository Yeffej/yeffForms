/**
 * FORMS ROUTER
 */

// dependencies
const Forms = require("../models/forms")
const formChecker = require("../middlewares/formsChecker")
const formGetter = require("../middlewares/formGetter")
const express = require("express")
const { questions } = require("../database/.tables/forms")
const router = express.Router()

router.get("/", (req, res)=> {
    Forms.getAll((err, result)=> {
        if(err) {
            res.status(500).render("error500")

        }else {
            // console.log(result)

            res.render("forms", {
                title: "Formularios", 
                stylesheet: "forms",
                forms: result
            })
        }
    })

})

router.get("/create", (req, res)=> {
    res.render("forms_create", {
        title: "Formularios - Crear", 
        stylesheet: "forms_create"
    })
})

router.use("/create", formChecker)
router.post("/create", (req, res)=> {
    // console.log(req.formData)
    const renderView = "forms_create"
    const renderOptions = {
        title: "Formularios - Crear", 
        stylesheet: renderView,
        success: req.isDataCorrect,
        failure: !req.isDataCorrect,
        details: req.failureDetails,
        data: req.sentData
    }

    // Save the form data to the form model.
    if(req.isDataCorrect) {
        Forms.create(req.formData, (err)=> {
            if(err) {
                res.status(500).render(renderView, {
                    ...renderOptions,
                    success: false,
                    failure: true,
                    details: {
                        message: "Ha ocurrido un error en el servidor, por favor intenlo más tarde"
                    },
                })
            }else {
                res.status(200).render(renderView, renderOptions)
            }
        })

    }else {
        res.status(400).render(renderView, renderOptions)
    }

})

router.param('formId', formGetter)
router.get("/:formId", (req, res)=> {
    if(req.formError) return;

    const renderView = "forms_id"    
    res.render(renderView, {
        title: "Formulario",
        stylesheet: renderView,
    })

})
router.get("/:formId/fill", (req, res)=> {
    if(req.formError) return;

    let questions
    try {
        questions = JSON.parse(req.form[0].questions)
    }catch {
        questions = null
    }
    
    const renderView = "forms_id_fill"
    res.render(renderView, {
        title: "Formularios",
        stylesheet: renderView,
        questions: questions,
        formData: req.form[0]
    })
})

router.get("/:formId/edit", (req, res)=> {
    if(req.formError) return;

    const renderView = "forms_id_edit"
    res.render(renderView, {
        title: "Formularios - Editar", 
        stylesheet: renderView,
        form: req.form[0]
    })
})

router.use("/:formId/edit", formChecker)
router.post("/:formId/edit", (req, res)=> {
    const renderView = "forms_id_edit"
    const renderOptions = {
        title: "Formularios - Editar", 
        stylesheet: renderView,
        success: req.isDataCorrect,
        failure: !req.isDataCorrect,
        details: req.failureDetails,
        data: req.sentData
    }

    // Save the form data to the form model.
    if(req.isDataCorrect) {
        Forms.update(req.params.formId, req.formData, (err)=> {
            if(err) {
                res.status(500).render(renderView, {
                    ...renderOptions,
                    success: false,
                    failure: true,
                    details: {
                        message: "Ha ocurrido un error en el servidor, por favor intenlo más tarde"
                    },
                })
            }else {
                res.status(200).render(renderView, renderOptions)
            }
        })

    }else {
        res.status(400).render(renderView, renderOptions)
    }

})

router.get("/:formId/questions", (req, res)=> {
    if(req.formError) return;

    res.send(req.form[0].questions)
})

router.post("/:formId/questions", (req, res)=> {
    if(!Array.isArray(req.body) && req.body.length < 1) return;

    Forms.updateQuestions(req.params.formId, JSON.stringify(req.body), (err)=> {
        if(err) {
            console.log(err)
            res.send().status(500)
        }else {
            res.send().status(200)
        }
    })

})


module.exports = router