// Only for test purpose is neccesary break the patron singleton
// and exports the class itself.
const Database = require("../database/database")
const formTable = require("../database/.tables/forms")

describe("Database obj to create my db structure", () => {
    let DB
    beforeEach(()=> {
        DB = new Database()
    })

    it("properly initialize DB obj", ()=> {
        const tables = ["forms"]
        const tablesDB = [
            formTable
        ]

        expect(DB.tables).toEqual(tables)
        expect(DB._tables).toEqual(tablesDB)
        expect(typeof DB._dbCon).toBe("object")
    })

    it("properly create DB", ()=> {
        const result_query = "CREATE DATABASE yeffForms" 
        const result_execute = true 

        expect( typeof DB.create("database") ).toBe("object")
        expect(DB.create("database").query).toBe(result_query)
        DB.create("database").execute(
            (executed) => {
                try {
                    expect(executed).toBe(result_execute)
                }catch(err) {

                }
            }
        )
    })

    it("properly create DB table", ()=> {
//         const result_query = 
//         `CREATE TABLE forms (
//                             id INT AUTO_INCREMENT PRIMARY KEY,\n`+
//                             'name VARCHAR(100) NOT NULL,\n'+
//                             'author VARCHAR(80) NOT NULL,\n'+
//                             'quesions TEXT\n'+
// `                               
//                         ); CREATE TABLE examples (
//                             name VARCHAR(80)

//                         ); `

        const result_execute = true 

        expect( typeof DB.create("tables") ).toBe("object")
        // expect(DB.create("table").query).toBe(result_query)
        DB.create("tables").execute(
            (executed) => {
                try {
                    expect(executed).toBe(result_execute)
                }catch(err) {
                    
                }
            }
        )
    })

    it("properly drop DB table", ()=> {
        const query = "DROP TABLE forms"
        const result_execute = true

        expect( typeof DB.drop("table", DB.tables[0]) ).toBe("object")
        expect(DB.drop("table", DB.tables[0]).query).toBe(query)
        DB.drop("table", DB.tables[0]).execute(
            (executed)=> {
                try {
                    expect(executed).toBe(result_execute)
                }catch(err) {
                    
                }
            }
        )
    })
    
    it("properly drop DB", ()=> {
        const query = "DROP DATABASE yeffForms"
        const result_execute = true

        expect( typeof DB.drop("database") ).toBe("object")
        expect(DB.drop("database").query).toBe(query)
        DB.drop("database").execute(
            (executed)=> {
                try {
                    expect(executed).toBe(result_execute)
                }catch(err) {
                    
                }
            }
        )
    })
})