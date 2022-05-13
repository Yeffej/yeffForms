/**
 * FRONTEND LOGIC: create question manipulating the DOM and 
 * submit the form to the backend
 */

// Global variables:
const cardDeleteBT = document.querySelector(".Card_deleteBT")
const questionTrigger = document.getElementById("questionAdder")
const questionsWrapper = document.getElementById("questionWrapper")
const form = document.getElementById("targetForm")
const QUESTIONS_TYPES = ["text"]
const TYPES_TRASNLATOR = {text: "Texto"}

// main functions
function Start() {
    questionTrigger.addEventListener("click", AddQuestionCreator)
    form.addEventListener("submit", SendFormData)

    if(cardDeleteBT) {
        cardDeleteBT.addEventListener("click", DeleteCard)
    }
}

function AddQuestionCreator() {
    const qCreator = MakeQ_Creator()
    questionsWrapper.appendChild(qCreator)
}

async function SendFormData(e) {
    e.preventDefault()

    // const formData = new FormData(form)
    const questions = FetchQuestions()

    if(questions?.length > 0) {
        // formData.set("questions", JSON.stringify(questions) )
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
function MakeQ_Creator() {
    const wrapper = document.createElement("div")
    wrapper.className = "QuestionWrapper_question"

    const label = document.createElement("label")
    label.textContent = "Pregunta:"

    const input = document.createElement("input")
    input.type = "text"
    input.placeholder = "Escribe tu pregunta"
    input.className = "questionID"

    const select = document.createElement("select")
    select.className = "questionTypeSelector"

    QUESTIONS_TYPES.forEach((type)=> {
        const opt = document.createElement("option")
        opt.value = type
        opt.textContent = TYPES_TRASNLATOR[type]
        select.appendChild(opt)
    })

    wrapper.append(label, input, select)

    return wrapper
}

function FetchQuestions() {
    const qElements = document.querySelectorAll(".questionID")
    const result = []

    if(qElements) {
        for(let i = 1; i <= qElements.length; i++) {
            const typeSelector = qElements[i-1].nextElementSibling.className === "questionTypeSelector"
                ? qElements[i-1].nextElementSibling
                : null
            const question = {
                type: typeSelector? typeSelector.value : "text",
                value: qElements[i-1].value,
                order: i
            }

            result.push(question)
        }
    }

    return result
}

function DeleteCard() {
    const cardWrapper = document.getElementById("cardWrapper")
    cardWrapper.addEventListener("animationend", ()=> cardWrapper.remove() )
    cardWrapper.style.animationName = "CardOut"
}