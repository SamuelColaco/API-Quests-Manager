
import request from "supertest"
import { app  } from "../app"

describe("TeamsMembersController", () => {
    it("List all Members", async () => {
        const authenticated = await request(app).post("/session").send({
            email: "rodrigo.@gmail",
            password: "12345"
        })

        const token = authenticated.body.token

        const response = await request(app).get("/teamsMembers").set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(401)
    })

    it("Team member add", async () => {

        const authenticated = await request(app).post("/session").send({
            email: "rodrigo.@gmail",
            password: "12345"
        })

        const token = await authenticated.body.token

        const response = await request(app).post("/teamsMembers/c249bfa3-4f5a-4a66-b31c-59d667e01256/d144c2db-b8a2-47b7-8ef9-ef0cbe657f4d").set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(401)
    })
})