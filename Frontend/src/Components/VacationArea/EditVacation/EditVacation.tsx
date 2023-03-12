import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/vacation-model";
import vacationService from "../../../Services/VacationsService";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const [vacation, setVacation] = useState<VacationModel>();
    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();
    const maxDate = new Date().toISOString().substring(0,10)

    useEffect(() => {
        vacationService.getOneVacation(+params.id)
            .then(vacation => {
                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startDate",vacation.startDate)
                setValue("endDate", vacation.endDate);
                setValue("price", vacation.price);
                setVacation(vacation);
            })
            .catch(err => alert(err.message)).catch(err => console.log("check")
            )
            
    }, []);

    async function send(vacation: VacationModel) {
        try {
            vacation.imageFile = (vacation.imageFile as unknown as FileList)[0];
            await vacationService.updateVacation(vacation);
            alert("vacation has been updated.");

            navigate(-1); 
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="EditVacation">
			
            <h2>Edit Vacation</h2>

            <form onSubmit={handleSubmit(send)}>

            <input type="hidden" {...register("vacationId")} />

                <label>Destination: </label>
                <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                <span className="Err">{formState.errors.destination?.message}</span>

                <label>Description: </label>
                <input type="string" {...register("description",VacationModel.descriptionValidation)} />
                <span className="Err">{formState.errors.description?.message}</span>

                <label>Date Start: </label>
                <input type="date" min={maxDate} {...register("startDate",VacationModel.startDateValidation)} />
                <span className="Err">{formState.errors.startDate?.message}</span>

                <label>Date End: </label>
                <input type="date" min={maxDate} {...register("endDate",VacationModel.endDateValidation)} />
                <span className="Err">{formState.errors.endDate?.message}</span>

                <label>Price: </label>
                <input type="number" {...register("price",VacationModel.priceValidation)} />
                <span className="Err">{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("imageFile", VacationModel.imageValidation)} />
                <span className="Err">{formState.errors.imageFile?.message}</span>

                <button>Edit</button>

            </form>
        </div>
    );
}

export default EditVacation;
