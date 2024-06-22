import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number
})

const Users = mongoose.model("Users", userSchema);

export default Users;