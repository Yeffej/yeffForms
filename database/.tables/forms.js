const table =  {
    table_name: "forms",
    id: "INT AUTO_INCREMENT PRIMARY KEY,",
    name: "VARCHAR(100) NOT NULL,",
    author: "VARCHAR(80) NOT NULL,",
    description: "VARCHAR(500) NOT NULL,",
    questions: "TEXT"
}

module.exports = table