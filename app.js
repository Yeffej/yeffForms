// dependencies
require("dotenv").config()
const path = require("path")
const express = require("express")
const logger = require("./middlewares/logger")
const indexRouter = require("./routes/index")
const formsRouter = require("./routes/forms")

const app = express()

// configurations
app.set("view engine", "ejs")
app.use(logger)
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set routers
app.use("/", indexRouter)
app.use("/forms", formsRouter)

app.listen(process.env.PORT).on("listening", ()=> {
    console.log("Application is listening in: http://localhost:" + 
        process.env.PORT)
})