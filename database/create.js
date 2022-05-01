/**
 * CLI SCRIPT CREATE DATABASE, DB TABLES
 */

// dependencies
const DB = require("./database")
const { ParseArgs } = require("./helper")
const readLine = require("readline")

// Global variables
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

function QuestionProcess(create) {
    console.log(`This is the sql query to be executed: 
        ${create.query}
    `)
    rl.question("Are you sure to execute this query? (Y/N): ", (answer)=> {
        if(answer.toUpperCase() === "Y") {
            rl.close()
            create.execute((executed)=> {
                if(executed) {
                    console.log("Executed succesfully")
                }else {
                    console.log("Execution Unsuccesful")
                }
                DB.closeConnection()
            })
        }else {
            console.log("creation canceled")
            rl.close()
        }
    })
}

const options = {
    tables: () => {
        const create = DB.create("tables")
        QuestionProcess(create)
    },
    database: ()=> {
        const create = DB.create("database")
        QuestionProcess(create)
    }
} 


function StartScript() {
    const args = ParseArgs()
    const action = options[args[0]]

    if(typeof action === "undefined") {
        throw new Error("Unknown option was passed")
    }

    action()
}

StartScript()