/**
 * CLI SCRIPT DROP/DELETE DATABASE, DB TABLES
 */

// dependencies
const DB = require("./database")
const { ParseArgs } = require("./helper")
const readLine = require("readline")
const { argv0 } = require("process")

// Global variables
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

function QuestionProcess(dropper) {
    console.log(`This is the sql query to be executed: 
        ${dropper.query}
    `)
    rl.question("Are you sure to execute this query? (Y/N): ", (answer)=> {
        if(answer.toUpperCase() === "Y") {
            rl.close()
            dropper.execute((executed)=> {
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
    table: () => {
        const args = ParseArgs()
        try {
            if(args[1].length <= 0) {
                throw new Error()
            }

            const dropper = DB.drop("table", args[1])
            QuestionProcess(dropper)
        }catch {
            throw new Error("Insufficient Arguments, table name was expected") 
        }
    },
    database: ()=> {
        const dropper = DB.drop("database")
        QuestionProcess(dropper)
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