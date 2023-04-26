import express from "express"
import routerusers from "./users/router.js"

const router = express.Router()

router.use('/users',routerusers)

export default router