/**
 * MAIN FILE TO CONNECT TO THE DATABASE AND CREATE A PROPER MODEL
 */

//dependencies
require("dotenv").config()
const mysql = require("mysql")

class Model {
    constructor() {
        this._dbPool = mysql.createPool({
            connectionLimit : 10,
            host            : process.env.DB_HOST,
            user            : process.env.DB_USER,
            password        : process.env.DB_PASSWORD,
            database        : process.env.DB_NAME
        })
    }

    sqlFetch(query, callback = (results, fields)=> {} ) {
        this._dbPool.getConnection((err, con)=> {
            if(err) throw new Error("Connection error: " + err.message);

            con.query(query, (err, results, fields)=> {
                // release connection to the pool
                con.release()
            
                if(err) throw new Error("Connection error: " + err.message);

                callback(results, fields)
            })
        })
    }

}

module.exports = Model