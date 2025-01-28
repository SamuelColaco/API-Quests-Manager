
import { Router } from "express"
import { UserControllers } from "../controllers/UserController"
import { EnsureAutenticated } from "../middlewares/EnsureAutenticated"
import { VerifyAuthorization } from "../middlewares/VerifyAuthorization"

const userRoutes = Router()
const userController = new UserControllers()

userRoutes.get("/", EnsureAutenticated, VerifyAuthorization(["admin"]), userController.index)
userRoutes.post("/user", userController.create)
userRoutes.put("/user/:id", userController.update)


export { userRoutes }

