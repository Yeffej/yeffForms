/**
 * FILE OF THE FORMS MODEL WHICH HAS THE DUTY TO MANAGE THE FORMS DATA.
 */

const Model = require("../model");

class FormsModel extends Model {
    // asume that all data pass has been treated

    getAll(callback) {
        const sql = "SELECT * FROM forms"

        this.sqlFetch(sql, (results, fields)=> {
            callback(results)
        })
    }
    get(id, callback) {
        const sql = `SELECT * FROM forms WHERE id = ${id}`

        this.sqlFetch(sql, (results, fields)=> {
            callback(results)
        })  
    }
    create(formData) {
        const sql = `SELECT * FROM forms WHERE id = ${id}`

        this.sqlFetch(sql)  
    }
    update(id, formData) {
        const sql = `SELECT * FROM forms WHERE id = ${id}`

        this.sqlFetch(sql)  
    }
    delete(id) {
        const sql = `SELECT * FROM forms WHERE id = ${id}`

        this.sqlFetch(sql)  
    }
}

module.exports = FormsModel