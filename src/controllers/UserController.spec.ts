
import request from "supertest"
import { app } from "../app"

describe("UserController", () => {
    it("List all Users", async () => {
        const authenticated = await request(app).post("/session").send({
            email: "rodrigo.@gmail",
            password: "12345"
        })

        const token = authenticated.body.token

        const response = await request(app).get("/").set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(401)
    })

    it("Create User", async () => {
        const authenticated = await request(app).post("/session").send({
            email: "rodrigo.@gmail",
            password: "12345"
        })

        const token = authenticated.body.token

        const response = await request(app).post("/user").set("Authorization", `Bearer ${token}`).send({
            name: "Diego Fernandes",
            email : "Diego@gmail",
            password: "12345"
        })

        expect(response.status).toBe(201)
    })
})