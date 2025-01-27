
import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError"
import { verify } from "jsonwebtoken"
import { authConfig } from "../config/auth"


export function EnsureAutenticated(req: Request, res: Response, next: NextFunction){
    
    const authHeader = req.headers.authorization

    if(!authHeader){
        throw new AppError("Não está autenticado")
    }

    const authHeaderToken = authHeader.slice(7)

     const { sub: userId } = verify(authHeaderToken, authConfig.jwt.secret)

     req.user = {
        id: String(userId)
     }

    return next()
}