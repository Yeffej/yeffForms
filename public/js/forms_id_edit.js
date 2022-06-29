/**
 * FRONTEND LOGIC: Conect input data with table data, submit edition form
 */

import APP from "./lib/app.js"

const cardDeleteBT = document.querySelector(".Card_deleteBT")
const Q_SaveBT = document.getElementById("questionsSaveBT")
const questionsWrapper = document.getElementById("questionsWrapper")

// Entry Point
function Start() {
    AddListners()
    ActivateEditorQuestions()
}

function AddListners() {
    if(cardDeleteBT) {
        cardDeleteBT.addEventListener("click", DeleteCard)
    }

    const nameDataset = document.querySelector("input.data-name")
    const authorDataset = document.querySelector("input.data-author")
    const descriptionDataset = document.querySelector("textarea.data-description")
    const questionAddBT = document.getElementById("questionsAddBT")

    nameDataset.addEventListener("input", MatchData)
    authorDataset.addEventListener("input", MatchData)
    descriptionDataset.addEventListener("input", MatchData)
    questionAddBT.addEventListener("click", AddQuestion)
    Q_SaveBT.addEventListener("click", SaveQuestions)
}

function MatchData({ target }) {
    const Datasets = document.querySelectorAll(`.data-${target.name}`)

    Datasets.forEach((el) => {
        const elTag = el.tagName.toLowerCase()

        if(elTag === "input") {
            return el.value = target.value
        }

        el.textContent = target.value
    })
}

async function ActivateEditorQuestions() {
    const questions = await APP.questions.FetchAll()

    if(!questions) {
        const p = document.createElement("p")
        p.textContent = "No se ha creado ninguna pregunta para este formulario."
        return questionsWrapper.appendChild(p)
    }

    const htmlQuestions =  APP.questions.TransformToHTMLQuestion(questions)
    questionsWrapper.append(...htmlQuestions)
}

function AddQuestion() {
    const Question = APP.questions.MakeQ_Creator()

    if(questionsWrapper.firstElementChild.tagName.toLowerCase() === "p") {
        questionsWrapper.firstElementChild.remove()
    }
    
    questionsWrapper.append(Question)
}


function SaveQuestions() {
    const arrQuestions = APP.questions.FetchQuestionsOfDom()
    const formID = window.location.href.match(/.*\/(\d+)\//)[1]

    APP.questions.Save(arrQuestions, formID)
}


Start()

// Utilities 
function DeleteCard() {
    const cardWrapper = document.getElementById("cardWrapper")
    cardWrapper.addEventListener("animationend", ()=> cardWrapper.remove() )
    cardWrapper.style.animationName = "CardOut"
}
