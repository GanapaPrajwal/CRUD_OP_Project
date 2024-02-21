const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username :{
        type: String,
        require :[true,"Please enter username"]
    },
    email :{
        type : String,
        require : [true,"Please enter email ID"],
        unique :[true, "Email address should be unique"]
    },
    password : {
        type : String,
        required : [true, "Please enter user password"]
    }
}, {timestamaps : true})

module.exports = mongoose.model("User", userSchema);