/**
 * MIDDLEWARE IN CHARGE TO GET A FORM FROM DATABASE
 */


// dependencies
const Forms = require("../models/forms")

module.exports = function (req, res, next, id) {    
    if( isNaN(id) || Number(id) === 0 ) {
        req.formError = true

        const renderView = "badRequest"
        res.status(400).render(renderView, {
            title: "Error del Servidor",
            stylesheet: renderView,
        })

        next()
        return;
    }

    Forms.get(id, (err, result)=> {
        if(err) {
            console.log(err)
            req.formError = true

            const renderView = "serverError"
            res.status(500).render(renderView, {
                title: "Error del Servidor",
                stylesheet: renderView,
            })
        }else {
            if(result.length < 1) {
                req.formError = true
                const renderView = "notFound"

                res.status(404).render(renderView, {
                    title: "Formulario Inexistente",
                    stylesheet: renderView,
                })
            }else {
                req.form = result
            }

        }

        next()
    })
}