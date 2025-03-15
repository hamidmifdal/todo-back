import Users from "../model/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const CreateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please complete the form" });
        }

        // Await the findOne() operation
        const verify = await Users.findOne({ username });

        if (verify) {
            return res.status(400).json({ message: "username is already used" });
        }
        const mathPassword = await bcrypt.hash(password,12)
        // Correct way to create a new document
        const item = new Users({ username, email, password : mathPassword });

        await item.save();

        return res.status(201).json({ message: "Todo created successfully", item });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const LoginUser= async (req, res) => {
    try {
        const {username, password} = req.body
        if(!username || !password){
            return res.status(401).json({message:"complete form"})
        }
        const verify = await Users.findOne({username})
        const isPasswordValid = await bcrypt.compare(password, verify.password);
        if(!verify){
            return res.status(500).json({message:"user is not found"})
        }
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            {userId: verify._id, username:verify.username},
            process.env.JWT_SECRET,
            {expiresIn:"3m"}
        )
        return res.status(200).json({message:"is login", token, user : {username : verify.username ,_id : verify._id}})
    } catch (error) {
        console.log({message:`${error}`})
        return res.status(400).json({message:`${error}`})
    }
}

export const ShowUser = async (req, res) => {
    try {
        // Await the find() operation
        const items = await Users.find();

        return res.status(200).json(items);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const ShowUserById = async (req, res) => {
    try {
        // Await the find() operation
        const { id } = req.params
        const item = await Users.findById(id);

        if(!item){
            return res.status(400).json({ message: "user is not founds"});
        }

        return res.status(200).json(item);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const ShowUserAndUpdate = async (req, res) => {
    try {
        // Await the find() operation
        const { id } = req.params
        const { username, email, password } = req.body
        const mathPassword = await bcrypt.hash(password,12)
        const item = await Users.findByIdAndUpdate(id,
            {
                username, email, password :mathPassword
            },
            {
                new : true, runValidators: true
            }
        );

        if(!item){
            return res.status(404).json({ message: "user is not founds"});
        }
        
        return res.status(200).json({message:"User updated successfully",item});
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const ShowUserAndDelete = async (req, res) => {
    try {
        // Await the find() operation
        const { id } = req.params
        const item = await Users.findByIdAndDelete(id);

        if(!item){
            return res.status(400).json({ message: "user is not founds"});
        }
        
        return res.status(200).json(item);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
};