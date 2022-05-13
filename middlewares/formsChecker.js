/**
 * MIDDLEWARE IN CHARGE TO CHECK THE INFORMATION SENT BEFORE CREATE A FORM
 */

const NAME_CHARS = 2
const AUTHOR_CHARS = 2
const DESCRIPTION_CHARS = 12

module.exports = function (req, res, next) {
    if(req.method.toUpperCase() !== "POST") {
        next()
        return;
    }

    const name = typeof req.body.name === "string" 
        && req.body.name.trim().length >= NAME_CHARS
        ? req.body.name.trim()
        : null
    const author = typeof req.body.author === "string" 
        && req.body.author.trim().length >= AUTHOR_CHARS 
        ? req.body.author.trim()
        : null
    const description = typeof req.body.description === "string"
        && req.body.description.trim().length >= DESCRIPTION_CHARS
        ? req.body.description.trim()
        : null

    let questions
    try {
        JSON.parse(req.body.questions)
        questions = req.body.questions
    } catch {
        questions = null
    }
    // console.log(req.body)

    if(name && author && description) {
        req.formData = {
            name,
            author,
            description,
            questions
        }

        req.isDataCorrect = true
    }else {
        req.failureDetails = {}
        req.failureDetails.name = name ? "" 
                : `Nombre vacío o la cantidad de caracteres es menor a ${NAME_CHARS}`

        req.failureDetails.author = author ? "" 
                : `- Autor vacío o la cantidad de caracteres es menor a ${AUTHOR_CHARS}`

        req.failureDetails.description = description ? "" 
                : `- Descripción vacía o la cantidad de caracteres es menor a ${DESCRIPTION_CHARS}`

        req.failureDetails.message = `${req.failureDetails.name} 
        ${req.failureDetails.author}
        ${req.failureDetails.description}
        `

        req.isDataCorrect = false

        req.sentData = {
            name: req.body.name,
            author: req.body.author,
            description: req.body.description
        }
    }

    next()
}