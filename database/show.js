/**
 * CLI SCRIPT SHOW DATABASE PROPERTIES
 */

// dependencies
const DB = require("./database")
const { ParseArgs } = require("./helper")

// Global variables
const options = {
    tables: () => {
        console.log(`Database tables are:
            ${DB.tables.toString()}
        `)
    },
    database: ()=> {
        console.log(`Database name is:
            ${DB.database}
        `)
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