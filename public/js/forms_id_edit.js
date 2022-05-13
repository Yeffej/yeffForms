/**
 * FRONTEND LOGIC: Conect input data with table data, submit edition form
 */

// Global variables:
const cardDeleteBT = document.querySelector(".Card_deleteBT")
const editorForm = document.getElementById("editorForm")

// Entry Point
(function Start() {
    AddListners()
    MatchData()
})()

function AddListners() {
    if(cardDeleteBT) {
        cardDeleteBT.addEventListener("click", DeleteCard)
    }
}

function MatchData() {
    const nameDatasets = document.querySelectorAll(".data-name")
    const authorDatasets = document.querySelectorAll(".data-author")
    const descriptionDatasets = document.querySelectorAll(".data-description")

    nameDatasets.forEach(() => {
        
    })
}

// Utilities 
function DeleteCard() {
    const cardWrapper = document.getElementById("cardWrapper")
    cardWrapper.addEventListener("animationend", ()=> cardWrapper.remove() )
    cardWrapper.style.animationName = "CardOut"
}