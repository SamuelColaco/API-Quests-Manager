
import request from "supertest"
import { app } from "../app"

describe("SessionController", () => {
    
    it("Create a session", async () => {

        const response = await request(app).post("/session").send({
            email: "rodrigo.@gmail",
            password: "12345"
        })

        expect(response.status).toBe(200)
        expect(response.body).toBe(response.body)
    })
})