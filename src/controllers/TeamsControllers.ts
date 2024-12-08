
import { Request, Response } from "express"
import { prisma } from "../prisma"
import z from "zod"
import { AppError } from "../utils/AppError"

export class TeamControllers{
     async index(req: Request, res: Response){

        const teams = await prisma.teams.findMany()

        res.status(200).json(teams.length > 0 ? teams : "Não tem times")
    }

    async create(req: Request, res: Response){

        const { name, description } = req.body

        const bodySchema = z.object({
            name: z.string().trim().min(1),
            description: z.string().trim().min(6)
        })

        bodySchema.parse(req.body)

        await prisma.teams.create({ data: { name, description }})

        res.status(201).json()

    }

    async update(req: Request, res: Response){

        const { ...all } = req.body

        const { id } = req.params

        const paramSchema = z.object({
            id: z.string().uuid()
        })

        paramSchema.parse(req.params)

        const teamsExist = await prisma.teams.findMany({ where: { id }})

        if(!teamsExist){
            throw new AppError("Esse time não existe")
        }

        await prisma.teams.update({ where: { id }, data: { ...all }})

        res.status(200).json()
    }
}