
import { Router } from "express"
import { TeamsMembersControllers } from "../controllers/TeamsMembersControllers"
import { EnsureAutenticated } from "../middlewares/EnsureAutenticated"
import { VerifyAuthorization } from "../middlewares/VerifyAuthorization"

const teamsMembersRoutes = Router()
const teamsMembersControllers = new TeamsMembersControllers()

teamsMembersRoutes.get("/teamsMembers", EnsureAutenticated, VerifyAuthorization(["member"]), teamsMembersControllers.index)
teamsMembersRoutes.post("/teamsMembers/:userId/:teamId", EnsureAutenticated, VerifyAuthorization(["member"]), teamsMembersControllers.create)
teamsMembersRoutes.put("/teamsMembers/:teamMemberId", EnsureAutenticated, VerifyAuthorization(["admin"]), teamsMembersControllers.update)

export { teamsMembersRoutes }