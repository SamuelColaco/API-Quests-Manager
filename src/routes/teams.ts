
import { Router } from "express"
import { TeamControllers } from "../controllers/TeamsControllers"
import { EnsureAutenticated } from "../middlewares/EnsureAutenticated"

const teamsRoutes = Router()
const teamController = new TeamControllers()

teamsRoutes.get("/teams", teamController.index)
teamsRoutes.post("/teams", EnsureAutenticated, teamController.create)
teamsRoutes.put("/teams/:id", teamController.update)

export { teamsRoutes }
