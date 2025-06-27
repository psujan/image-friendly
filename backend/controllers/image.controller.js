import {uploadFile} from "../services/upload.services.js";

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

export {uploadImage}