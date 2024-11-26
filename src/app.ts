
import express from "express"
import { ErrorHandling } from "./middlewares/ErrorHandling"
import "express-async-errors"
import { userRoutes } from "./routes/users"

const app = express()

app.use(express.json())
app.use(userRoutes)

app.use(ErrorHandling)

export { app }