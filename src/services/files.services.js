import { Files } from "../models/files.models.js"

export const createFiles= async({fileName,mineType, src, size})=>{

    const newFile= await Files.create({fileName,mineType,src,size})
    newFile.save()
    return newFile  


}

export const getFiles= async( )=>{
    const getFiles= await Files.find()
    return getFiles
}