import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialsModel {

    public email: string
    public password: string;

    public constructor(user: CredentialsModel) {

        this.email = user.email
        this.password = user.password;
    }

    private static validationSchema = Joi.object({
        email: Joi.string().required().min(5).max(50),
        password: Joi.string().required().min(2).max(50),
    })

    public validate():void{
        const result = CredentialsModel.validationSchema.validate(this)
        if(result.error) throw new ValidationError(result.error.message)
    }

}

export default CredentialsModel;