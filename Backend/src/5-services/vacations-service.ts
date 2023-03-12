import { OkPacket } from "mysql";
import appConfig from "../2-utils/appConfig";
import dal from "../2-utils/dal";
import imageHandler from "../2-utils/image-handler";
import { ResourceNotFoundError } from "../4-models/client-errors";
import UserModel from "../4-models/user-model";
import VacationModel from "../4-models/vacation-model";

async function getAllVacationsForUser(user: UserModel): Promise<VacationModel[]> {

    const sql = `
    SELECT DISTINCT V.*,
    EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId= ? )AS isFollowing,
    COUNT(F.userId) AS followersCount,
    CONCAT('${appConfig.imageUrl}',imageName) AS ImageFile
    FROM vacations AS V LEFT JOIN followers AS F
    ON V.vacationId = F.vacationId
    GROUP BY vacationId
    ORDER BY startDate`;

    const vacations = await dal.execute(sql, user.userId);
    return vacations
}
async function getImageNameFromDB(id: number): Promise<string> {

    const sql = `SELECT imageName FROM vacations WHERE vacationId = ${id}`;

    const vacations = await dal.execute(sql);

    const vacation = vacations[0];

    if (!vacation) return null;

    return vacation.imageName;
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    // Validate:
    vacation.updateValidate

    // Get image name from database: 
    vacation.imageName = await getImageNameFromDB(vacation.vacationId);
    

    // Update existing image:
    if (vacation.imageFile) {
        vacation.imageName = await imageHandler.updateImage(vacation.imageFile, vacation.imageName);
    }

    // Create sql query: 
    const sql = `UPDATE vacations SET 
        destination =?,
        description = ?,
        startDate = ?,
        endDate = ?,
        price = ?,
        imageName = ? 
        WHERE vacationId = ?`;

    // Execute query: 
    const result: OkPacket = await dal.execute(sql,
        vacation.destination, vacation.description,
        vacation.startDate, vacation.endDate, vacation.price,
        vacation.imageName,
        vacation.vacationId);

    // If vacation not exist:
    if (result.affectedRows === 0) throw new ResourceNotFoundError(vacation.vacationId);

    // Delete image property (which is the sent file object) from vacation object:
    delete vacation.imageFile;

    // Return updated vacation:
    return vacation;
}

async function getOneVacation(id: number): Promise<VacationModel[]> {
    const sql = "SELECT * FROM vacations WHERE vacationId =?"
    const vacation = await dal.execute(sql, id);
    return vacation
}

async function follow(userId: number, vacationId: number): Promise<void> {

    const sql = `INSERT INTO followers VALUES (?,?)`
    await dal.execute(sql, userId, vacationId)
}

async function unfollow(userId: number, vacationId: number): Promise<void> {

    const sql = `DELETE FROM followers WHERE userId = ? AND vacationId = ?`
    await dal.execute(sql, userId, vacationId)
}

async function getAllVacationsForAdmin(): Promise<VacationModel[]> {

    const sql = `SELECT * FROM vacations ORDER BY startDate`
    const vacations = await dal.execute(sql);
    return vacations
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.addValidate()
    vacation.imageName = await imageHandler.saveImage(vacation.imageFile);
    const sql = `INSERT INTO vacations VALUES(DEFAULT ,?,?,?,?,?,?)`;
    const result: OkPacket = await dal.execute(sql, vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, vacation.imageName);
    delete vacation.imageFile
    vacation.vacationId = result.insertId

    return vacation
}

async function deleteVacation(vacationId: number): Promise<void> {

    const imageName = await getImageNameFromDB(vacationId);
    imageHandler.deleteImage(imageName)
    const sql = "DELETE FROM vacations WHERE vacationId = ?";
    const result:OkPacket = await dal.execute(sql, vacationId);
    if(result.affectedRows === 0 )throw new ResourceNotFoundError(vacationId)
}

export default {
    getAllVacationsForUser,
    getOneVacation,
    updateVacation,
    addVacation,
    getAllVacationsForAdmin,
    follow,
    unfollow,
    deleteVacation
};
