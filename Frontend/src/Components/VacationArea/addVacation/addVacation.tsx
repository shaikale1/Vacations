import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/vacation-model";
import vacationService from "../../../Services/VacationsService";
import "./addVacation.css";

function AddVacation(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const navigate = useNavigate();
    const maxDate = new Date().toISOString().substring(0, 10)

    async function send(vacation: VacationModel) { 
        try {
            vacation.imageFile = (vacation.imageFile as unknown as FileList)[0];
            await vacationService.addVacation(vacation);
            alert("vacation has been added.");
            navigate("/list");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="AddVacation">

            <h2>Add Vacation</h2>
            <form onSubmit={handleSubmit(send)}>

                <label>Destination: </label>
                <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                <span className="Err">{formState.errors.destination?.message}</span>

                <label>Description: </label>
                <input type="string" {...register("description", VacationModel.descriptionValidation)} />
                <span className="Err">{formState.errors.description?.message}</span>

                <label>Date Start: </label>
                <input type="date" min={maxDate} {...register("startDate", VacationModel.startDateValidation)} />
                <span className="Err">{formState.errors.startDate?.message}</span>

                <label>Date End: </label>
                <input type="date" min={maxDate} {...register("endDate", VacationModel.endDateValidation)} />
                <span className="Err">{formState.errors.endDate?.message}</span>

                <label>Price: </label>
                <input type="number" {...register("price", VacationModel.priceValidation)} />
                <span className="Err">{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("imageFile", VacationModel.imageValidation)} />
                <span className="Err">{formState.errors.imageFile?.message}</span>

                <button>Add</button>

            </form>

        </div>
    );
}

export default AddVacation;
