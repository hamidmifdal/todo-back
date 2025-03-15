import e from "express";
import authenticateToken from '../middleware/authenticateToken.js'
const route = e.Router()

route.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});



export default route;