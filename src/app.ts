
import express from "express"
import { ErrorHandling } from "./middlewares/ErrorHandling"
import { userRoutes } from "./routes/users"
import "express-async-errors"
import { teamsRoutes } from "./routes/teams"

const app = express()

app.use(express.json())
app.use(userRoutes)
app.use(teamsRoutes)

app.use(ErrorHandling)

export { app }