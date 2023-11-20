
import * as fileServices from "../services/files.services.js"


export const createFiles= async (req,res)=>{

    try{

        const {mineType,fileName,src,size, } = req.body
          const newFile= await fileServices.createFiles({mineType,fileName,src,size})

          res.status(200).send(newFile)
        

    }
    catch{

        res.status(404).send("error creating file")

    }

}

export const getFiles = async (req, res)=>{
    try{
        const allFiles = await fileServices.getFiles()

        res.status(200).send(allFiles)
    }
    catch{
       res.status(404).send("error getting files")
    }
}

export const deleteFile= async (req, res)=>{
    try{
        const {_id}= req.body
        
          const deleteFile= await fileServices.deleteFile({_id})
          res.status(200).send({deleteFile})
    }
    catch{
        res.status(404).send({status:"failure",request:req.body._id, })
    }
}