const cloudinary = require("cloudinary")

const opts = {
    upload_preset: "unsigned_upload",
    allowed_format: ["png", "jpg", "svg", "jpeg"],
    transformation: [
        {
            width: 500,
            height: 400,
            crop: "fill",
            gravity: "auto",
        },
    ],
}

const configCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
    console.log("Connected To Cloudinary")
}

async function handleUpload(file , folder) {
    console.log("FILE UPLOAD" )
    try {
        const res = await cloudinary.v2.uploader.upload(file, {
            resource_type: "auto",
            folder : folder
        });
        console.log("FILE RES",res)
        return res;
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {configCloudinary , opts , handleUpload}