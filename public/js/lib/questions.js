/*
* Library question: object where questions functions will live.
*/

const QUESTIONS_TYPES = ["text"]
const TYPES_TRASNLATOR = {text: "Texto"}

const Questions = {
    MakeQ_Creator(WrapperClassName = "Question") {
        const wrapper = document.createElement("div")
        wrapper.className = WrapperClassName

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
    },

    FetchQuestionsOfDom() {
        const qElements = document.querySelectorAll(".questionID")
        const result = []

        if(qElements) {
            for(let i = 1; i <= qElements.length; i++) {
                if(qElements[i-1].value.length < 1) continue;

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
    },

    async FetchAll() {
        const url = window.location.href.toLowerCase().replace("edit", "questions")
        const fetched = await fetch(url)

        try {
            const res = await fetched.json()
            return res
        }
        catch(err) {
            console.log(err)
            return null
        }
    },

    TransformToHTMLQuestion(questionsArrayOfObj) {
        const questionsHTML = []

        questionsArrayOfObj.forEach((Q) => {
            const wrapper = document.createElement("div")
            wrapper.className = "Question"
    
            const label = document.createElement("label")
            label.textContent = "Pregunta:"
    
            const input = document.createElement("input")
            input.type = "text"
            input.placeholder = "Escribe tu pregunta"
            input.value = Q.value
            input.className = "questionID"
    
            const select = document.createElement("select")
            select.className = "questionTypeSelector"
    
            QUESTIONS_TYPES.forEach((type)=> {
                const opt = document.createElement("option")
                opt.value = type
                opt.textContent = TYPES_TRASNLATOR[type]

                if(type === Q.type) {
                    opt.selected = true
                }

                select.appendChild(opt)
            })

            wrapper.append(label, input, select)
            questionsHTML.push(wrapper)
        })

        return questionsHTML

    },

    Save(arrayOfQuestionsAsObjects, formID) { 
        if(!Array.isArray(arrayOfQuestionsAsObjects) && 
        arrayOfQuestionsAsObjects.length < 1) {
            throw new Error("Argument invalid. The first arg has to be an array of objects")
        }

        const Questions = JSON.stringify(arrayOfQuestionsAsObjects)
        const url = `${window.location.origin}/forms/${formID}/questions`

        fetch(url, {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer',
            body: Questions
        })
        .then(() => window.location.reload())
        .catch((err)=> console.error(err))
    }
    
}

export default Questions