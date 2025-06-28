import {uploadFile} from "../services/upload.services.js";
import {compressService, resizeService} from "../services/image.services.js";

const uploadImage = (req, res, next) => {
    try {
        const fileInfo = uploadFile(req.file);
        res.status(200).json({
            message: 'File uploaded successfully',
            file: fileInfo,
        });
    } catch (err) {
        console.error(err)
        next(err)
    }
}

const resizeImage = async (req, res, next) => {
    try {
        const {imageName, width, height, fit} = req.body;
        const buffer = await resizeService(
            {imageName, width, height, fit}
        );
        const outputFormat = imageName.split('.')[1];
        res.set('Content-Type', `image/${outputFormat}`);
        res.send(buffer);
    } catch (err) {
        next(err)
    }
}

const compressImage = async (req, res, next) => {
    try {
        return await compressService(req, res);
    } catch (err) {
        next(err)
    }
}

export {uploadImage, resizeImage, compressImage}