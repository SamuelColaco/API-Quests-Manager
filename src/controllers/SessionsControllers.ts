
import { Request, Response, NextFunction } from "express"
import z from "zod"
import { compare } from "bcrypt"
import { prisma } from "../prisma"
import { AppError } from "../utils/AppError"
import { authConfig } from "../config/auth"
import { sign } from "jsonwebtoken"

export class SessionsControllers{

    async create(req: Request, res: Response, next: NextFunction){

        try {

            const { email, password } = req.body
    
            const bodySchema = z.object({
                email: z.string(),
                password: z.string().trim().min(5)
            })
    
            bodySchema.parse(req.body)
    
            const userExist =  await prisma.users.findFirst({ where : { email } })
    
            if(!userExist){
                throw new AppError("Email e/ou senha errados")
            }
    
            const passwordExist =  await compare(password, userExist.password)
    
            if(!passwordExist){
                throw new AppError("Email e/ou senha errados")
            }

            const { secret, expiresIn } = authConfig.jwt
            const token = sign({ role: userExist.role }, secret ,{
                expiresIn,
                subject: userExist.id
            })

            res.status(200).json({ token: token })
            
        } catch (error) {
            next(error)
        }
    }
}