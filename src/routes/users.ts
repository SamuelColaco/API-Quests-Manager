
import { Router } from "express"
import { UserControllers } from "../controllers/UserController"

const userRoutes = Router()
const userController = new UserControllers()

userRoutes.get("/", userController.index)

export { userRoutes }

