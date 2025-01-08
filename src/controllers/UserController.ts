
import { Request, Response, NextFunction } from  "express"
import { prisma } from "../prisma"
import { hash } from "bcrypt"
import z from "zod"
import { AppError } from "../utils/AppError"


export class UserControllers{
     async index(req: Request, res: Response){
        const users = await prisma.users.findMany()

        return res.status(200).json(users.length > 0 ? users : "Não tem usuários cadastrados")
    }

    async create(req: Request, res: Response, next: NextFunction){

        try {
            
            const { name, email, password } = req.body
    
            const bodySchema = z.object({
                name: z.string().trim().min(1),
                email: z.string().trim().min(1),
                password: z.string().trim().min(5)
            })
    
            bodySchema.parse(req.body)
    
            const hashedPassword =  await hash(password, 8)
    
    
            const emailExists = await prisma.users.findUnique({ where: { email }})
    
            if(emailExists){
                throw new AppError("Esse email já foi cadastrado")
            }
    
            await prisma.users.create({ data: { name, email, password: hashedPassword }})
    
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
            
            const userExist = await prisma.users.findUnique({where: { id }})
    
            if(!userExist){
                throw new AppError("Usuario não existe")
            }
            
    
            await prisma.users.update({ where: { id }, data: { ...all }})
    
            res.status(200).json()
            
        } catch (error) {
            next(error)
        }

    }
}