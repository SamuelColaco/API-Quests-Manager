
import request from "supertest"
import { app } from "../app"

describe("TaksControllers", () => {
    
    it("List All Taks", async () => {

        const authenticated =  await request(app).post("/session").send({
            email: "rodrigo.@gmail",
            password: "12345"
        })

        const token =  authenticated.body.token

        const response = await request(app).get("/tasks").set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(200)
    })

    it("Create a tasks", async () => {
        const authenticated =  await request(app).post("/session").send({
            email: "rodrigo.@gmail",
            password: "12345"
        })

        const token = authenticated.body.token

        const response = await request(app).post("/tasks/d144c2db-b8a2-47b7-8ef9-ef0cbe657f4d").set("Authorization", `Bearer ${token}`).send({
            title: "Criar Modal"
        })

        expect(response.status).toBe(201)
    })
})