import { UploadedFile } from "express-fileupload";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

const vacationImagesFolder = "./src/1-assets/images/";

async function saveImage(image: UploadedFile): Promise<string> {

    try {

        const uniqueImageName = createImageName(image.name);

        // Create unique image name:
        const absolutePath = vacationImagesFolder + uniqueImageName;

        // Save to disk:
        await image.mv(absolutePath); // mv = move

        // Return new name:
        return uniqueImageName;
    } catch (error: any) {
        console.log(error.message);

    }

}

// Update existing image:
async function updateImage(image: UploadedFile, existingImageName: string): Promise<string> {

    // Delete existing image:
    await deleteImage(existingImageName);

    // Save new image to disk:
    const uniqueImageName = await saveImage(image);

    return uniqueImageName;
}

// Delete existing image:
async function deleteImage(existingImageName: string): Promise<void> {
    try {

        // if no image sent:
        if (!existingImageName) return;

        // Delete image from disk:
        await fsPromises.unlink(vacationImagesFolder + existingImageName);
    }
    catch (err: any) {
        console.log(err.message);

    }
}

function createImageName(originalImageName: string): string {

        // Take original name's extension:
        const extension = originalImageName.substring(originalImageName.lastIndexOf("."));

        // Create unique name including original extension (v4 = 36 chars uuid):
        const uniqueImageName = uuid() + extension;
        // Return unique name:
        return uniqueImageName;

}

function getAbsolutePath(imageName: string): string {
    let absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
    if (!fs.existsSync(absolutePath)) {
        absolutePath = path.join(__dirname, "..", "1-assets", "images", "vacation-not-found.jpg");
    }
    return absolutePath;
}

export default {
    saveImage,
    updateImage,
    deleteImage,
    getAbsolutePath
};