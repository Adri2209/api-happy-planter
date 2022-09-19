import { Router } from "express"
import { get } from "http"
import usersModels from "../models/usersModels.js"
import { cryptPassword } from "../customDependances/cryptPassword.js"

const usersRouter = Router()

// Route d'inscription d'utilisateurs

usersRouter.post("/user", async (req, res) =>{
    try {
        let userByMail=await usersModels.findOne({mail:req.body.mail})
        if(!userByMail){
            req.body.password=await cryptPassword(req.body.password)
        let user = new usersModels(req.body)
        await user.save()
        res.json(user)
        }else{
            throw "Ce mail est déjà utilisé";
        }
    }catch (error){
        console.log(error);
        res.status(500).json(error)
    }
})

export default usersRouter