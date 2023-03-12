import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/credentials-model";
import RoleModel from "../../../Models/role-model";
import UserModel from "../../../Models/user-model";
import authService from "../../../Services/AuthService";
import appConfig from "../../../Utils/appConfig";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            alert("Welcome back!");
            navigate("/list")


        }
        catch (err: any) {
            alert(err);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(send)}>
                <h2>Login</h2>

                <label htmlFor="">Email:</label>
                <input type="email"{...register("email")} />

                <label htmlFor="">Password:</label>
                <input type="password" {...register("password")} />

                <button>Login</button>

                <span>don't have account?</span>

                <NavLink to="/register">register</NavLink>

            </form>

        </div>
    );
}

export default Login;
