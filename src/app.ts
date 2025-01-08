
import express from "express"
import { ErrorHandling } from "./middlewares/ErrorHandling"
import { userRoutes } from "./routes/users"
import { teamsRoutes } from "./routes/teams"
import { sessionsRoutes } from "./routes/sessions"
import 'express-async-errors'

const app = express()

app.use(express.json())

app.use(userRoutes)
app.use(teamsRoutes)
app.use(sessionsRoutes)

app.use(ErrorHandling)

export { app }