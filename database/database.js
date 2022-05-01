/*
* MAIN FILE TO BUILD THE DATABASE STRUCTURE. 
*/

// Dependencies
require("dotenv").config()
const mysql = require("mysql")
const tableForms = require("./.tables/forms")

// this is to avoid problems with Jest.
const TESTING = false

class Database {
    tables = [tableForms.table_name]
    _tables = [tableForms]
    _database = ""

    constructor() {
        this._database = process.env.DB_NAME

        const con = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            multipleStatements: true
        })

        this._dbCon = con

        con.on("error", function(err) {
            if(!TESTING) {
                console.log("[mysql error]: ",err);
            }
        })
    }

    get database() {
        return this._database
    }

    create(type) {
        const dbName = this.database     
        const dbCon = this._dbCon

        switch(type.toLowerCase()) {
            case "database":
                return {
                    query: `CREATE DATABASE ${dbName}`,

                    execute: function(callback) {
                        dbCon.connect((err)=> {
                            if(err) {
                                if(!TESTING) {
                                    console.error("DB error - connecting: ", err.message)
                                }
                                callback(false)
                                return;
                            }

                            dbCon.query(this.query, (err, result)=> {
                                if(!err) {                   
                                    callback(true)
                                }else {
                                    if(err.errno == 1007) {
                                        callback(true)
                                        return;
                                    }
                                    if(!TESTING) {
                                        console.error("DB error - excuting: ", err.message)
                                    }
                                    callback(false)
                                }
                            })
                        })

                    }
                }

            case "tables":
                const tables = this._tables
                dbCon.config.database = this.database
                

                return {
                    query: tables.reduce((preItem, current)=> {
                        preItem += `CREATE TABLE ${current.table_name} (
                            ${GetPropValuesOf(current)}
                        ); `
                        return preItem
                    }, ''),

                    execute: function(callback) {
                        dbCon.connect((err)=> {
                            if(err) {
                                if(!TESTING) {
                                    console.error("DB error - connecting: ", err.message)
                                }
                                callback(false)
                                return;
                            }

                            dbCon.query(`${this.query}`, (err, result)=> {
                                if(!err) {                           
                                    callback(true)
                                    // console.log("result: ", result[0])
                                }else {
                                    if(err.errno == 1050) {                                      
                                        callback(true)
                                        return;
                                    }
                                    if(!TESTING) {
                                        console.error("DB error - executing: ", err.errno, err.message)
                                    }
                                    callback(false)
                                }
                            })
                        })
                    }

                }

            default:
                throw new Error("Unknown create type")
        }
    }

    drop(type, tableName = "") {
        const dbName = this.database     
        const dbCon = this._dbCon

        switch(type.toLowerCase()) {
            case "database":
                return {
                    query: `DROP DATABASE ${dbName}`,

                    execute: function(callback) {
                        dbCon.connect((err)=> {
                            if(err) {
                                if(!TESTING) {
                                    console.error("DB error - connecting: ", err.message)
                                }
                                callback(false)
                                return;
                            }

                            dbCon.query(this.query, (err, result)=> {
                                if(!err) {                                    
                                    callback(true)
                                    // console.log(result)
                                }else {
                                    if(!TESTING) {
                                        console.error("DB error - excuting: ", err.message)
                                    }
                                    callback(false)
                                }
                            })
                        })

                    }
                }

            case "table":
                const tables = tableName
                dbCon.config.database = this.database
                
                return {
                    query: `DROP TABLE ${tableName}`,

                    execute: function(callback) {
                        dbCon.connect((err)=> {
                            if(err) {
                                if(!TESTING) {
                                    console.error("DB error - connecting: ", err.message)
                                }
                                callback(false)
                                return;
                            }

                            dbCon.query(`${this.query}`, (err, result)=> {
                                if(!err) {
                                    callback(true)
                                    // console.log("result: ", result)
                                }else {
                                    if(!TESTING) {
                                        console.error("DB error - executing: ", err.errno, err.message)
                                    }
                                    callback(false)
                                }
                            })
                        })

                    }
                }

            default:
                throw new Error("Unknown Drop type")
        }
    }

    closeConnection() {
        this._dbCon.end((err)=> {
            if(err)
                console.error("DB - closing: ", err)
        })
    }
}

function GetPropValuesOf(obj) {
    let result = ""
    for(let key in obj) {
        result += key === "table_name"
            ? "" 
            : `${key} ${obj[key]}\n`
    }

    return result
}


if(TESTING) {
    module.exports = Database
}else {
    module.exports = new Database()
}