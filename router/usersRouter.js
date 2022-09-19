import { Router } from "express"
import { get } from "http"
import usersModels from "../models/usersModels.js"
import { cryptPassword } from "../customDependances/cryptPassword.js"

const usersRouter = Router()


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