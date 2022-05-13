/**
 * FILE OF THE FORMS MODEL WHICH HAS THE DUTY TO MANAGE THE FORMS DATA.
 */

const Model = require("../model");

class FormsModel extends Model {
    // asume that all data pass has been treated

    getAll(callback) {
        const sql = "SELECT * FROM forms"

        this.sqlFetch(sql, (err, results, fields)=> {
            callback(err, results, fields)
        })
    }
    get(id, callback) {
        const sql = `SELECT * FROM forms WHERE id = ${id}`

        this.sqlFetch(sql, (err, results, fields)=> {
            callback(err, results, fields)
        })  
    }
    create(data, callback) {
        const sql = `INSERT INTO forms (name, author, description, questions)
            VALUES ('${data.name}', '${data.author}', '${data.description}', 
                ${data.questions? `'${data.questions}'` : null})`

        this.sqlFetch(sql, (err)=> {
            callback(err)
        })
    }
    update(id, data) {
        const sql = `UPDATE forms 
            SET name = '${data.name}', author = '${data.author}', 
            description = '${data.description}'
            WHERE id = ${id}`

        this.sqlFetch(sql, (err)=> {
            callback(err)
        })
    }
    delete(id) {
        const sql = `SELECT * FROM forms WHERE id = ${id}`

        this.sqlFetch(sql, (err)=> {
            callback(err)
        })  
    }
}

module.exports = new FormsModel()