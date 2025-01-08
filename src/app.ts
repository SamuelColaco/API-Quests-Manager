
import express from "express"
import { ErrorHandling } from "./middlewares/ErrorHandling"
import { userRoutes } from "./routes/users"
import { teamsRoutes } from "./routes/teams"
import 'express-async-errors'

const app = express()

app.use(express.json())

app.use(userRoutes)
app.use(teamsRoutes)

app.use(ErrorHandling)

export { app }