/**
 * FRONTEND LOGIC: create question manipulating the DOM and 
 * submit the form to the backend
 */

import APP from "./lib/app.js"

// Global variables:
const cardDeleteBT = document.querySelector(".Card_deleteBT")
const questionTrigger = document.getElementById("questionAdder")
const questionsWrapper = document.getElementById("questionWrapper")
const form = document.getElementById("targetForm")

// main functions
function Start() {
    questionTrigger.addEventListener("click", AddQuestionCreator)
    form.addEventListener("submit", SendFormData)

    if(cardDeleteBT) {
        cardDeleteBT.addEventListener("click", DeleteCard)
    }
}

function AddQuestionCreator() {
    const qCreator = APP.questions.MakeQ_Creator()
    questionsWrapper.appendChild(qCreator)
}

async function SendFormData(e) {
    e.preventDefault()

    const questions = APP.questions.FetchQuestionsOfDom()

    if(questions?.length > 0) {
        const inputQ = document.createElement("input")
        inputQ.name = "questions"
        inputQ.type = "text"
        inputQ.value = JSON.stringify(questions)
        inputQ.hidden = true

        form.appendChild(inputQ)
    }

    form.submit()
}

// ENTRY POINT.
Start()

// utilities functions
function DeleteCard() {
    const cardWrapper = document.getElementById("cardWrapper")
    cardWrapper.addEventListener("animationend", ()=> cardWrapper.remove() )
    cardWrapper.style.animationName = "CardOut"
}