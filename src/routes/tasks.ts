
import { Router } from "express"
import { TasksControllers } from "../controllers/TasksControllers"
import { EnsureAutenticated } from "../middlewares/EnsureAutenticated"
import { VerifyAuthorization } from "../middlewares/VerifyAuthorization"

const tasksRoutes = Router()
const tasksControllers = new TasksControllers()

tasksRoutes.get("/tasks", EnsureAutenticated, VerifyAuthorization(["member","admin"]), tasksControllers.index)
tasksRoutes.post("/tasks/:teamId", EnsureAutenticated, VerifyAuthorization(["member", "admin"]), tasksControllers.create)
tasksRoutes.put("/tasks/:id", EnsureAutenticated, VerifyAuthorization(["member", "admin"]), tasksControllers.update)

export { tasksRoutes }