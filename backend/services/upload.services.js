const uploadFile = (file) => {
    if(!file){
        throw new Error("No file uploaded");
    }


    // save image to database
    return {
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
    };
}


export {uploadFile}