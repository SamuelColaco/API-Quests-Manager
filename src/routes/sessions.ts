
import { Router } from "express"
import { SessionsControllers } from "../controllers/SessionsControllers"

const sessionsRoutes = Router()
const sessionsControllers = new SessionsControllers()

sessionsRoutes.post("/session", sessionsControllers.create)

export{ sessionsRoutes }