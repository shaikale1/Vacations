import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import authService from "../../../Services/AuthService";
import "./Register.css";

function Register(): JSX.Element {
    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            alert("Welcome " + user.firstName + " " + user.lastName);
            navigate("/list");
        }
        catch (err: any) {
            alert(err.message);
        }
    }
    return (
        <div className="Register">

            <form onSubmit={handleSubmit(send)}>
                <h2>Register</h2>

                <label>First Name:</label>
                <input type="text"{...register("firstName")} />

                <label>Last Name:</label>
                <input type="text"{...register("lastName")} />

                <label>Email:</label>
                <input type="email" {...register("email")} />

                <label>Password:</label>
                <input type="password" {...register("password")} />

                <button>Register</button>

                <span>already a member?</span>

                <NavLink to="/login">login</NavLink>

            </form>

        </div>
    );
}

export default Register;
