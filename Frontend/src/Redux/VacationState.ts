import { createStore } from "redux";
import VacationModel from "../Models/vacation-model";

// 1. App State - application level state:
export class VacationsState {
    public vacations: VacationModel[] = [];
}

// 2. Action Type - list of actions needed on the data:
export enum VacationsActionType {
    FetchVacations = "FetchVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    FollowVacation = "FollowVacation",
    UnfollowVacation = "UnfollowVacation",
    DeleteFollower = "DeleteFollower"
}

// 3. Action - a single object describing single operation on the data:
export interface VacationsAction {
    type: VacationsActionType; // What we need to do?
    payload: any; // What is the data needed?
}

// 4. Reducer - function performing the needed actions (the action object is the one sent via dispatch function):
export function vacationsReducer(currentState = new VacationsState(), action: VacationsAction): VacationsState {

    const newState: VacationsState = { ...currentState };

    switch (action.type) {

        case VacationsActionType.FetchVacations: // Here the payload is the product list fetch by the server
            newState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation: // Here the payload is the added product
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation: // Here the payload is the updated product
            const indexToUpdate = newState.vacations.findIndex(p => p.vacationId === action.payload.vacationId);            
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload;
            }
            break;

        case VacationsActionType.DeleteVacation: // Here the payload is id to delete
            const indexToDelete = newState.vacations.findIndex(p => p.vacationId === action.payload);
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
            break;

        case VacationsActionType.FollowVacation:
            const follow = newState.vacations.find(v => v.vacationId === action.payload)
            follow.follow = 1
            follow.followersCount += 1
            break

        case VacationsActionType.UnfollowVacation:
            const unFollow = newState.vacations.find(v => v.vacationId === action.payload)
            if (unFollow.follow === 1)
                unFollow.followersCount = 0
            break

        case VacationsActionType.DeleteFollower:
            const DeleteFollower = newState.vacations.find(v => v.vacationId === action.payload)
                DeleteFollower.followersCount -= 1
            break
    }

    return newState;
}

// 5. Store - Redux manager:
export const VacationsStore = createStore(vacationsReducer);
