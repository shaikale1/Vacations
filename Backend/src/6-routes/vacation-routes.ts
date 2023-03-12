import express, { Request, Response, NextFunction } from "express";
import cyber from "../2-utils/cyber";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import verifyAdmin from "../3-middleware/verify-admin";
import VacationModel from "../4-models/vacation-model";
import vacationsService from "../5-services/vacations-service";
import imageHandler from "../2-utils/image-handler";

const router = express.Router();

router.get("/users/vacations", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request)
        const vacations = await vacationsService.getAllVacationsForUser(user)
        response.json(vacations)
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/users/follow/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request)
        const vacationId = +request.params.vacationId
        await vacationsService.follow(user.userId, vacationId)
        response.sendStatus(201)
    }
    catch (err: any) {
        next(err);
    }
});
router.put("/admin/vacations/", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.vacationId = +request.params.id;
        request.body.imageFile = request.files?.imageFile;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationsService.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/users/unfollow/:vacationId", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request)
        const vacationId = +request.params.vacationId
        await vacationsService.unfollow(user.userId, vacationId)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/admin/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = cyber.getUserFromToken(request)
        const vacations = await vacationsService.getAllVacationsForAdmin()
        response.json(vacations)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/admin/vacations/:id([0-9]+)", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacations = await vacationsService.getOneVacation(id)
        response.json(vacations)
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/add/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.imageFile = request.files?.imageFile
        const vacation = new VacationModel(request.body)
        const addedVacation = await vacationsService.addVacation(vacation)
        response.status(201).json(addedVacation)
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/vacations/images/:imageFile", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageFile = request.params.imageFile
        const absolutePath = imageHandler.getAbsolutePath(imageFile)
        response.sendFile(absolutePath)
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/admin/vacations/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId
        await vacationsService.deleteVacation(vacationId)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err);
    }
});


export default router;