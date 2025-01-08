
import {Request, Response, NextFunction} from "express"
import { AppError } from "../utils/AppError"

export function EnsureAutenticated(req: Request, res: Response, next: NextFunction){
    
    const authHeader = req.headers.authorization

    if(!authHeader){
        throw new AppError("Não está autenticado")
    }
    
    return next()
}