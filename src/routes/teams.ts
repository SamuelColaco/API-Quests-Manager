
import { Router } from "express"
import { TeamControllers } from "../controllers/TeamsControllers"

const teamsRoutes = Router()
const teamController = new TeamControllers()

teamsRoutes.get("/teams", teamController.index)
teamsRoutes.post("/teams", teamController.create)
teamsRoutes.put("/teams/:id", teamController.update)

export { teamsRoutes }