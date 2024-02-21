const asyncHandler = require("express-async-handler")
const User = require("../models/user.models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { use } = require("../routes/contactRoutes");


const registerUser = asyncHandler(async(req,res)=>{
    const {username, email, password} = req.body;
    if(!username|| !email && !password){
        res.status(400);
        throw new Error("Please Enter mandatory fields")
    }
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("User Already exist")
    }
    
    const hashedPassword = await bcrypt.hash(password,10)
    console.log("Hashed password:",hashedPassword)
    const user = await User.create({
        username,
        email,
        password : hashedPassword,
    })
    console.log(`User created Successfully${user}`);
    if(user){
        res.status(201).json({_id : user.id,email : user.email})
    }else{
        res.status(400)
        throw new Error("User data is not valid");
    }
    res.json({message :"Register the user"});
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are required")
    }
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email : user.email,
                id : user.id
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : "15m"})
        res.status(200).json({accessToken})
    }else{
        res.status(401);
        throw new Error("email or password is not valid")
    }
})

const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.user);
})

module.exports = {registerUser,loginUser,currentUser}