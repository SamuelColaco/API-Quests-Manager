

import { Request, Response, NextFunction  } from "express"
import { AppError } from "../utils/AppError"

export function VerifyAuthorization(role: string[]){
    return (req: Request, res: Response, next : NextFunction) => {

        if(!req.user){
            throw new AppError("Usuário não existe")
        }

        if(!role.includes(req.user.role)){
            throw new AppError("Você não é autorizado",401)
        }

        return next()
    }
}