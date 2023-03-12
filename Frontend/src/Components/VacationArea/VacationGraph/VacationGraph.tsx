import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import VacationModel from "../../../Models/vacation-model";
import vacationsService from "../../../Services/VacationsService";
import "./VacationGraph.css";

function VacationGraph(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [followersData, setFollowersData] = useState<{ name: string; followers: number }[]>([]);

    useEffect(() => {
        vacationsService.getAllVacationsForGraph()
            .then(vacations => {
                setVacations(vacations);
                const followersData = vacations.map((vacation) => ({
                    name: vacation.destination,
                    followers: vacation.followersCount
                }));
                setFollowersData(followersData);
            })
            .catch(err => alert(err.message));
    }, []);

    return (
        <div className="VacationGraph">
            <CSVLink data={followersData}> Download CSVFile</CSVLink>

            <BarChart className="bar" width={1000} height={600} data={followersData} >
                <CartesianGrid strokeDasharray=" 1 1 " />
                <XAxis className="names" dataKey="name" fill="#82ca9d" color="blue" />
                <YAxis dataKey="followers" fill="#8884d8" color="red" />
                <Tooltip />
                <Legend />
                <Bar dataKey="followers" fill="#8884d8" />
                <Bar dataKey="isFollowing" fill="#82ca9d" />
            </BarChart>

        </div>
    )

};

export default VacationGraph;

