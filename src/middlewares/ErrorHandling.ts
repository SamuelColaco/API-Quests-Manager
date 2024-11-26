
import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/AppError"

export function ErrorHandling(err: any, req: Request, res: Response, next: NextFunction){
    if(err instanceof AppError){
        return res.status(err.statusCode).json({message:  err.message})
    }

}