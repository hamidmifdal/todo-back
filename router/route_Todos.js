import e from "express";
import { Createtodos, Showtodos, ShowtodosById, ShowtodosAndDelete, ShowtodosAndUpdate } from "../controller/controlle_todos.js";
const route = e.Router()

route.post('/post',Createtodos)
route.get('/post',Showtodos)
route.get('/post/:id',ShowtodosById)
route.delete('/post/:id',ShowtodosAndDelete)
route.put('/post/:id',ShowtodosAndUpdate)



export default route;