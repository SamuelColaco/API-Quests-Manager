
export class AppError{
    message: string
    statusCode: number

    constructor(message: string, statuscode: number = 400){
        this.message = message
        this.statusCode = statuscode
    }
}