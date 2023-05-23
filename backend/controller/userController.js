import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
import generateToken from '../utils/generateToken.js'
 
//@desc Register a new user
//route POST /api/users
//@access Public
const registerUser = asyncHandler(async  (req, res) => {

    const {name, email, password}= req.body
     const userExist = await User.findOne({email})

     if(userExist){
 res.status(400)
 throw new Error('user with that email exist')
     }

     const user =  await User.create({
        name, 
        email,
        password
     })

     if(user){
        generateToken(res, user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name, 
            email:user.email
        })
     }else{
        res.status(400)
        throw new Error('error creating user')
     }
  
})


//@desc Login USER
//route GET /api/users/login
//@access Public
const authUser = asyncHandler(async  (req, res) => {

    const { email, password}= req.body
    console.log(email, password)
 
    const user = await User.findOne({email}).select('+password')


    console.log(password)

    if(user && (await user.matchPassword(password))){
       generateToken(res, user._id)
       res.status(201).json({
        _id:user._id,
           name:user.name, 
           email:user.email
       })
    }else{
        res.status(401)
        throw new Error('invalid login details')
    }

})



//@desc Register a new user
//route POST /api/users/logout
//@access Public
const logOutUser = asyncHandler(async  (req, res) => {
    res.cookie('jwt', "", {
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({
        message:
        'logged out successfully'
    })
})


//@desc get user profile
//route  GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async  (req, res) => { 

    //better to get user via id or middleware
    // const id = req.params.id

    // const user = User.findById(id)

    // if(user){
    //     res.status(401)
    //     throw new Error('user with id does not exist')
    //         }
       

    
    const user ={
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email
    }
    res.status(200).json(user)
})


//@desc get user profile
//route  GET /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async  (req, res) => {


    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email
    }

    if(req.body.password){
        user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.status(200).json({
       _id:updatedUser._id,
       name:updatedUser.name,
       email:updatedUser.email
    }
    )
    })

export {authUser, registerUser, logOutUser, getUserProfile, updateUserProfile}