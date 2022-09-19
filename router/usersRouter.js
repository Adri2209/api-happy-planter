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


  //**************recup d utilisateurs***********/

usersRouter.get('/users',async (req, res)=>{
    try{
       
        let users = await usersModels.find({},{__v:0, password: 0})
        res.json(users)
    }catch (error){
        console.log(error);
        res.send(error)
    }
})

//***************recup d'un utilisateur avec id*******/

usersRouter.get('/user/findById/:id', async (req, res) => {
    try{
        let user = await usersModels.findOne({_id: req.params.id});
        res.json(user)
    }catch(err) {
        res.send(err)
    }
})

usersRouter.get('/user/findByMail/:mail', async (req, res) => {
    try{
        let user = await usersModels.findOne({_mail: req.params.mail});
        res.json(user)
    }catch(err) {
        res.send(err)
    }
})



export default usersRouter