const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name:{type:String },
    email: { type: String ,unique:true},
    password: { type: String },
})
const UserModel = mongoose.model("user", userSchema);

module.exports =  UserModel


