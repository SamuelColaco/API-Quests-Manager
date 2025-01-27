
import {Request, Response, NextFunction} from "express"
import { prisma } from "../prisma"
import { AppError } from "../utils/AppError"
import z from "zod"

export class TeamsMembersControllers{
     async index(req: Request, res: Response, next: NextFunction){
        try {

            const allTeamsMembers =  await prisma.teamsMembers.findMany()
            
            return res.status(200).json(allTeamsMembers.length > 0 ? allTeamsMembers : "Não tem membro de times")
        
        } catch (error) {
            next(error)
        }
    }

    async  create(req: Request, res: Response, next: NextFunction){

        try {

            const { userId, teamId } = req.params
            
            const paramSchema = z.object({
                userId: z.string().uuid(),
                teamId: z.string().uuid() 
            })

            paramSchema.parse(req.params)

            const userExist = await prisma.users.findFirst({ where: { id: userId }})
            const teamExist = await prisma.teams.findFirst({ where: {id: teamId}})

            if(!userExist){
                throw new AppError("Esse usuário não existe")
            }

            if(!teamExist){
                throw new AppError("Esse time não existe")
            }

            await prisma.teamsMembers.create({ data: {userId, teamId}})
            
            res.status(201).json()

        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction){

        try {

            const { teamMemberId } = req.params
            const { ...all } = req.body
    
            const paramSchema = z.object({
                teamMemberId: z.string().uuid()
            })
    
            paramSchema.parse(req.params)
    
            const teamMemberExist = await prisma.teamsMembers.findFirst({where: {id: teamMemberId}})
    
            if(!teamMemberExist){
                throw new AppError("Esse id não existe")
            }
    
            await prisma.teamsMembers.update({where: {id: teamMemberId}, data: {...all}})
    
            res.status(200).json()
            
        } catch (error) {
            next(error)
        }
    }
}