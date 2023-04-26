import bodyParser from "body-parser";
import express from "express";
import router from "./api/router.js";
import dataBase from "./dataBase.js";
import cors from "cors";


const app = express()

dataBase.connect()

app.use(cors())
app.use(bodyParser.json())

app.use('/',router)

app.listen (8000, () => {
    console.log('Server listening at port 8000')
})

