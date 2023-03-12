import axios from "axios";
import VacationModel from "../Models/vacation-model";
import { VacationsActionType, VacationsStore, } from "../Redux/VacationState";
import appConfig from "../Utils/appConfig";

class VacationService {

    async getAllVacationsForGraph(): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(appConfig.usersVacationUrl)
        return response.data
    }

    async getAllVacationsForAdmin(n1: number, n2: number): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(appConfig.editVacationUrl)
        return response.data
    }

    async getAllVacationsForUsers(n1: number, n2: number): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(appConfig.usersVacationUrl)
        return response.data
    }

    async getOneVacation(id: number): Promise<VacationModel> {
        let vacations = VacationsStore.getState().vacations;
        let vacation = vacations.find(v => v.vacationId === id)
        if (!vacation) {
            const response = await axios.get<VacationModel>(appConfig.adminVacationUrl + id)
            vacation = response.data
        }
        return vacation
    }

    public async updateVacation(vacation: VacationModel): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.put<VacationModel>(appConfig.adminVacationUrl + vacation.vacationId, vacation, { headers });
        const updatedVacation = response.data;
        VacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation });
    }

    async follow(vacationId: number): Promise<void> {
        await axios.post<number>(appConfig.followUrl + vacationId)
    }

    async unfollow(vacationId: number): Promise<void> {
        await axios.post<number>(appConfig.unfollowUrl + vacationId)
        VacationsStore.dispatch({ type: VacationsActionType.UnfollowVacation, payload: vacationId })
        VacationsStore.dispatch({ type: VacationsActionType.DeleteFollower, payload: vacationId })
    }

    async addVacation(vacation: VacationModel): Promise<void> {
        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.post<VacationModel>(appConfig.addVacationUrl, vacation, { headers })
        const updatedVacation = response.data
        VacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation })
    }

    async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.adminVacationUrl + vacationId)
    }

}


const vacationService = new VacationService()

export default vacationService