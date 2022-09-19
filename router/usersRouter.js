import { Router } from "express"
import { get } from "http"
import usersModels from "../models/usersModels.js"
import { cryptPassword } from "../customDependances/cryptPassword.js"

const usersRouter = Router()

export default usersRouter