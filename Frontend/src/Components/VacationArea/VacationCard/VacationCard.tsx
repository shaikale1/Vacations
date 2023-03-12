import { ChangeEvent, SyntheticEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/vacation-model";
import vacationService from "../../../Services/VacationsService";
import appConfig from "../../../Utils/appConfig";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel[]>([]);

    function formatTime(time: string): string {
        const d = new Date(time);
        return d.toLocaleDateString("he-IL");
    }

    async function deleteVacation(vacationId: number) {
        try {
            if (!window.confirm("Are you sure?")) return;
            await vacationService.deleteVacation(vacationId);
            alert("Vacation has been deleted");

            const duplicateVacations = [...vacation];
            const index = duplicateVacations.findIndex(v => v.vacationId === vacationId);
            duplicateVacations.splice(index, 1);
            setVacation(duplicateVacations);

        }
        catch (err: any) {
            alert(err);
        }
    }

    return (
        <div className="VacationCard">
            <div>
                <div>
                    <img src={appConfig.imagesVacationUrl + props.vacation.imageName} />
                    <br />
                    <div id="destination">
                        {props.vacation.destination}
                    </div>
                    <br />
                    <div id="date">
                        📅 {formatTime(props.vacation.startDate) + " - " + formatTime(props.vacation.endDate)}
                    </div>
                    <div id="description">
                        {props.vacation.description}<br />
                    </div>
                    <div id="price">
                        ₪{props.vacation.price}<br />
                    </div>
                    <div>
                        <NavLink to={"/edit/" + props.vacation.vacationId}>
                            <button id="edit">Edit</button>
                        </NavLink>
                        <button id="delete" onClick={() => deleteVacation(props.vacation.vacationId)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VacationCard;
