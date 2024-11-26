
import { Request, Response } from  "express"

export class UserControllers{
    index(req: Request, res: Response){
        
        return res.status(200).json()
    }
}