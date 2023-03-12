import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/user-model";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
import "./Menu.css";

function Menu(): JSX.Element {

    const [user, setUser] = useState<UserModel>()

    useEffect(() => {
        setUser(authStore.getState().user);

        authStore.subscribe(() => {
            setUser(authStore.getState().user);
        })
    }, [])

    function isLoggedIn(): boolean {
        if(user) return true;
        else return false;
    }

    function logout() {
        authService.logout();
    }


    return (
        <div className="Menu">
             {isLoggedIn() ?
                <>
                {authService.isAdmin() &&
                <>
                <NavLink to={"/add"}>Add</NavLink>
                    <span> | </span>
                <NavLink to={"/graph"}>Statistics</NavLink>
                    <span> | </span>
                </> }
                    <NavLink to="/list">List</NavLink>
                    <span> | </span>
                    <NavLink to="/login" onClick={logout}>Logout</NavLink>
                </>
                : 
                <>
                <NavLink to="/register">Register</NavLink>
                <span> | </span>
                <NavLink to="/login">Login</NavLink>
                </>
            }

        </div>
    );
}

export default Menu;
