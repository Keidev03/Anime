import * as stream from 'stream';
import Jimp from "jimp";
import { google } from "googleapis";
import { resolve } from "path";

export class GoogleDriveService {

    private readonly drive;

    constructor() {
        this.drive = this.initDrive();
    }
    private initDrive() {
        const keyFilePath = resolve('secrect.json');
        const scopes = ["https://www.googleapis.com/auth/drive"];           

        const auth = new google.auth.GoogleAuth({
            keyFile: keyFilePath,
            scopes: scopes,
        });
        return google.drive({ version: "v3", auth: auth });
    }

    async UploadImage(fileImage: any, nameImage: string, width: number, height: number, idFolder: string) {
        try {
            // Convert image into binary form
            const image = await Jimp.read(fileImage.buffer);
            // Resize the image to 500x500 pixels
            const buffer: any = await image.resize(width, height).getBufferAsync(Jimp.MIME_JPEG);
            // Create an intermediate stream to convert data from the buffer into a usable stream
            const bufferStream = new stream.PassThrough();
            // Write data to the stream
            bufferStream.end(buffer);
            const response: any = await this.drive.files.create({
                media: {
                    mimeType: "image/jpeg",
                    body: bufferStream
                },
                requestBody: {
                    name: nameImage,
                    parents: [idFolder]
                }
            });
            const idImage: any = response.data.id;
            return idImage;
        } catch (error) {
            console.log(error);
        }
    }

    async PublicFile(id: string) {
        try {
            const permissions = await this.drive.permissions.create({
                fileId: id,
                requestBody: {
                    role: "reader",
                    type: "anyone",
                },
            });
        } catch (error) {
            console.error("Error making file public: ", error);
        }
    }

    async DeleteFile(id: string) {
        try {
            await this.drive.files.delete({ fileId: id });
        } catch (error) {
            console.error("Error delete file: ", error);
        }
    }
}