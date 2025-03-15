import e from 'express'
// import {Auth} from '../middleware/authenticateToken.js'
import { CreateUser, ShowUser, ShowUserById, ShowUserAndUpdate, ShowUserAndDelete, LoginUser } from "../controller/controlle_users.js";

const route = e.Router()

route.post('/user',CreateUser)
route.post('/login',LoginUser)
route.get('/user',ShowUser)
route.get('/user/:id',ShowUserById)
route.delete('/user/:id',ShowUserAndDelete)
route.put('/user/:id',ShowUserAndUpdate)

export default route;