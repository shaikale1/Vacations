import { useState } from "react";
import UserModel from "../../../Models/user-model";
import VacationModel from "../../../Models/vacation-model";
import vacationService from "../../../Services/VacationsService";
import appConfig from "../../../Utils/appConfig";
import "./VacationUser.css";

interface VacationUserProps {
    vacation: VacationModel
}

function VacationUser(props: VacationUserProps, user: UserModel): JSX.Element {

    const [isFollowing] = useState<boolean>(props.vacation.follow === 1)
    const [followCount] = useState<number>(props.vacation.followersCount)

    async function toFollow(vacationId: number): Promise<void> {
        await vacationService.follow(vacationId)
    }

    async function unFollow(vacationId: number): Promise<void> {
        await vacationService.unfollow(vacationId)
    }

    function formatTime(time: string): string {
        const d = new Date(time);
        return d.toLocaleDateString("he-IL");
    }

    return (
        <div className="VacationUser">
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
                    <div id="like">
                        <button onChange={isFollowing ?
                            () => unFollow(props.vacation.vacationId)
                            :
                            () => toFollow(props.vacation.vacationId)}>
                            follow
                            {" " + followCount}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VacationUser;
