import path from "path";
import sharp from "sharp";

const resizeService = async ({imageName, width, height, fit})=>{
   try{
       const originalPath = path.join(process.cwd(), 'backend', 'public', 'uploads', imageName);
       const resizeOptions = {
           width: width,
           height: height,
           fit:fit,
           withoutEnable: true,
       }
       return sharp(originalPath).resize(resizeOptions).toBuffer();
   }catch(err){
       throw err;
   }
}

export {resizeService};

