
import { Router } from "express"
import { TeamControllers } from "../controllers/TeamsControllers"
import { EnsureAutenticated } from "../middlewares/EnsureAutenticated"
import { VerifyAuthorization } from "../middlewares/VerifyAuthorization"

const teamsRoutes = Router()
const teamController = new TeamControllers()

teamsRoutes.get("/teams", EnsureAutenticated, VerifyAuthorization(["member","admin"]),teamController.index)
teamsRoutes.post("/teams",EnsureAutenticated, VerifyAuthorization(["member","admin"]),  teamController.create)
teamsRoutes.put("/teams/:id",EnsureAutenticated, VerifyAuthorization(["admin"]), teamController.update)


export { teamsRoutes }

