
import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError"
import { verify } from "jsonwebtoken"
import { authConfig } from "../config/auth"


export function EnsureAutenticated(req: Request, res: Response, next: NextFunction){

    interface TokenPayLoad {
        role: string
        sub: string
    }
    
    const authHeader = req.headers.authorization

    if(!authHeader){
        throw new AppError("Não está autenticado")
    }

    const authHeaderToken = authHeader.slice(7)

     const { sub: userId, role } = verify(authHeaderToken, authConfig.jwt.secret) as TokenPayLoad

     req.user = {
        id: String(userId),
        role
     }

    return next()
}