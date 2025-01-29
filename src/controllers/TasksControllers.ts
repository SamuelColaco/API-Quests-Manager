
import { Request, Response, NextFunction } from "express"
import { prisma } from "../prisma"
import z, { map } from "zod"
import { AppError } from "../utils/AppError"

export class TasksControllers{
     async index(req: Request, res: Response, next: NextFunction){
        try {
            const tasks =  await prisma.tasks.findMany()

            res.status(200).json(tasks.length > 0 ? tasks : "Não tem tarefas")

        } catch (error) {
            next(error)
        }
    }

    async create(req: Request, res: Response, next: NextFunction){
        try {

            const { title, description } = req.body
            
            const { teamId } = req.params

            const userId = String(req.user?.id)
            
            const bodySchema = z.object({
                title: z.string().min(6).trim(),
            })

            bodySchema.parse(req.body)

            const paramSchema = z.object({
                teamId: z.string().uuid()
            })

            paramSchema.parse(req.params)

            const teamExist = await prisma.teams.findFirst({ where: { id: teamId }})

            if(!teamExist){
                throw new AppError("Esse time não existe")
            }

            const userExist = await prisma.users.findFirst({ where: { id: userId }})

            if(!userExist){
                throw new AppError("Esse usuário não existe")
            }
            
            await prisma.tasks.create({ data: { title, description, assignedTo: userId, teamId }})

            res.status(201).json()
            
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction){
        try {
            const { ...all } = req.body

            const { id } = req.params

            const paramSchema = z.object({
                id: z.string().uuid()
            })
            
            paramSchema.parse(req.params)

            const taskExist = await prisma.tasks.findFirst({ where: { id }})
            
            if(!taskExist){
                throw new AppError("Essa tarefa não existe")
            }

            await prisma.tasks.update({ where : { id }, data: { ...all }})

            res.status(200).json()
            
        } catch (error) {
            next(error)
        }

    }

    async indexForId(req: Request, res: Response, next: NextFunction){

        try {

            const { teamId } = req.params

            const paramSchema = z.object({
                teamId: z.string().uuid()
            })

            paramSchema.parse(req.params)

            const userId = String(req.user?.id)

            const teamExist = await prisma.teams.findFirst({ where: { id: teamId }})

            if(!teamExist){
                throw new AppError("Esse time não existe")
            }

            const teamMembers = await prisma.teamsMembers.findMany({where: { teamId }})

            if(!teamMembers){
                throw new AppError("Não tem membros nesse time")
            }
            
            for (let i = 0; i < teamMembers.length; i++) {
                if(userId === teamMembers[i].userId){
                    const tasks = await prisma.tasks.findMany({ where : { teamId }})
                    res.status(200).json(tasks.length > 0 ? tasks : "Não tem tarefas")
                }
            }

            throw new AppError("Esse usuário não pertence a tal time")


            
        } catch (error) {
            next(error)
        }
    }

     async updateForId(req: Request, res: Response, next: NextFunction){
        try {

            const { id } = req.params

            const { ...all } = req.body

            const user = String(req.user?.id)

            const paramSchema = z.object({
                id: z.string().uuid()
            })
            
            paramSchema.parse(req.params)

            const taskExist = await prisma.tasks.findFirst({where: { id }})

            if(!taskExist){
                throw new AppError("Essa tarefa não existe")
            }

            if(user !== taskExist.assignedTo){
                throw new AppError("Essa tarefa você não pode editar")
            }

            await prisma.tasks.update({where: { id }, data: { ...all}})

            res.status(200).json()
            
        } catch (error) {
            next(error)
        }

    }
}