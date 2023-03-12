import RoleModel from "./role-model";
import Joi from "joi";
import { ValidationError } from "./client-errors";


class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: RoleModel;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    private static validationSchema = Joi.object({
        userId: Joi.number().optional().positive().integer(),
        firstName: Joi.string().optional().min(2).max(50),
        lastName: Joi.string().optional().min(2).max(50),
        email: Joi.string().optional().min(5).max(100),
        password: Joi.string().optional().min(2).max(30),
    })

    public validate(): void {
        const result = UserModel.validationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message)
    }

}

export default UserModel;