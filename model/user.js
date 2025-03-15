import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const SchemaUser = mongoose.Schema({
    username :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
},{timestamps : true})

// Hash password before saving
// SchemaUser.pre("save", async function (next) {
//     if (!this.isModified("password")) return next(); // Skip if password is unchanged

//     try {
//         const saltRounds = 12;
//         this.password = await bcrypt.hash(this.password, saltRounds);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// Method to compare passwords
SchemaUser.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("user",SchemaUser)

export default User;