import { Navigate, Route, Routes } from "react-router-dom";
import Insert from "../../VacationArea/addVacation/addVacation";
import Login from "../../DataArea/Login/Login";
import Register from "../../DataArea/Register/Register";
import EditVacation from "../../VacationArea/EditVacation/EditVacation";
import VacationDetails from "../../VacationArea/VacationDetails/VacationDetails";
import PageNotFound from "../PageNotFound/PageNotFound";
import FollowersGraph from "../../VacationArea/VacationGraph/VacationGraph";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/list" element={<VacationDetails />} />
            <Route path="/graph" element={<FollowersGraph />} />
            <Route path="/add" element={<Insert />} />
            <Route path="/edit/:id" element={<EditVacation/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>

    );
}

export default Routing;
