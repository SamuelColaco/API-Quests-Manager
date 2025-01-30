
import request from "supertest"
import { app } from "../app"

describe("TeamsControllers", () => {
    
    it("List all Teams", async () => {

        const authenticated = await request(app).post("/session").send({
            email: "rodrigo.@gmail",
            password: "12345"
        })

        const token = authenticated.body.token

        const response = await request(app).get("/teams").set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(401)
    })

    it("Create a Team", async () => {

        const authenticated = await request(app).post("/session").send({
            email: "rodrigo.@gmail",
            password: "12345"
        })

        const token = authenticated.body.token

        const response = await request(app).post("/teams").set("Authorization", `Bearer ${token}`).send({
            name: "Time do Front",
		    description: "Decidir o design e faze-lo"
        })

        expect(response.status).toBe(201)

    })

})