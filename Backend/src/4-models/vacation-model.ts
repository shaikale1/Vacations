import { UploadedFile } from "express-fileupload";
import Joi from "joi";
import { ValidationError } from "./client-errors";

class VacationModel {

    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public imageFile: UploadedFile;
    public imageName: string;

    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.imageFile = vacation.imageFile;
        this.imageName = vacation.imageName;
    }

    private static AddValidationSchema = Joi.object({
        vacationId: Joi.number().forbidden(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(10).max(10000),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        price: Joi.number().required().min(1).max(1000000),
        imageFile: Joi.object().optional(),
        imageName: Joi.string().forbidden()
    }) 

    private static updateValidationSchema = Joi.object({
        vacationId: Joi.number().required().integer().positive(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(10).max(10000),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        price: Joi.number().required().min(1).max(1000000),
        imageFile: Joi.object().optional(),
        imageName: Joi.string().optional().min(38).max(50)
    }) 

    public addValidate(): void {
        const result = VacationModel.AddValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message)
    }

    public updateValidate(): void {
        const result = VacationModel.updateValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message)
    }
    
}

export default VacationModel;