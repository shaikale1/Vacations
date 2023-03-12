import { CheckBox } from "@mui/icons-material";
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/vacation-model";
import authService from "../../../Services/AuthService";
import vacationService from "../../../Services/VacationsService";
import VacationCard from "../VacationCard/VacationCard";
import VacationUser from "../VacationUser/VacationUser";
import "./VacationDetails.css";

function VacationDetails(): JSX.Element {
    const [vacation, setVacation] = useState<VacationModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(3);

    useEffect(() => {
        {
            authService.isAdmin() ?
                vacationService.getAllVacationsForAdmin(currentPage, itemsPerPage)
                    .then(vacation => setVacation(vacation))
                    .catch(err => alert(err.message)) :
                vacationService.getAllVacationsForUsers(currentPage, itemsPerPage)
                    .then(vacation => setVacation(vacation))
                    .catch(err => alert(err.message))
        }
    }, [currentPage, itemsPerPage]);

    const totalPages = Math.ceil(vacation.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    function filterByFollowed() {
        let filter = (vacation.filter(v => v.follow >= 1))
        setVacation(filter)
    }

    function filterByFutureVacation() {
        const now = new Date();
        let filter = vacation.filter((v) => {
            let vacationDate = new Date(v.startDate);
            return (vacationDate >= now);
        })
        setVacation(filter);
    }

    function filterByActiveVacation() {
        const now = new Date();
        let filter = vacation.filter((v) => {
            let startDate = new Date(v.startDate);
            let endDate = new Date(v.endDate);

            return (startDate <= now &&
                endDate >= now);
        })
        setVacation(filter);
    }

    return (
        <div className="VacationDetails">
            <h1>Vacations</h1>

            {authService.isAdmin() === false && <>
                <div className="checkbox">
                    <span>Vacation in progress</span>
                    <input type="CheckBox" id="filter" onChange={filterByActiveVacation} />
                </div>
                <div className="checkbox">
                    <span>Followed Vacation </span>
                    <input type="CheckBox" id="filter" onChange={filterByFollowed} />
                </div>
                <div className="checkbox">
                    <span>Vacation that not started</span>
                    <input type="CheckBox" id="filter" onChange={filterByFutureVacation} />
                </div>
            </>}

            {authService.isAdmin() ? (
                vacation.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map(v => <VacationCard key={v.vacationId} vacation={v} />)
            ) : (
                vacation.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map(v => <VacationUser key={v.vacationId} vacation={v} />))}
            <br />

            <button id="previous" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <span>{currentPage} / {totalPages}</span>
            <button id="next" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div >
    );
}

export default VacationDetails;
