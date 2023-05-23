// const validator = require('validator')
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Please enter a your name'],
        maxLength:[300, 'Your Name cannot exceed 30 characters'],


    },
    email: {
        type:String,
        required:[true, 'Please enter  your email'],
        unique:true,
        validate:[validator.isEmail, 'Please enter a valid email']
    },

    password:{
        type:String,
        required:[true, 'Please enter your password'],
        minLength:[6, 'Your password should be longer than 6 characters'],
        select:false //wont display password of the user
  
    },
  
   
    
},
{ timestamps: true }
)

//compare password during log in and checks if the password is correct 
userSchema.methods.matchPassword = async function(enteredPassword){
    console.log(this.password)
    return  await bcrypt.compare(enteredPassword, this.password)
    
}

//Encrypt password before saving the user

userSchema.pre('save', async function(next) {

    //checks if the password has been changed
if(!this.isModified('password')){
    next()
}
//enable us to encrypt  the users password
const salt = await bcrypt.genSalt(10)
this.password = await bcrypt.hash(this.password,salt)
console.log(this.password)
})



// //generate jwt token
// userSchema.methods.generateToken = function (){
//     return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
//         expiresIn:process.env.JWT_EXPIRERS_TIME
//     })
// }

// //generate  password reset token

// userSchema.methods.generateResetPasswordToken = function (){
//     //generate token

//     const resetToken = crypto.randomBytes(20).toString('hex');

//     //hash and set the reset password token

//     this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

//     //set token time expire
//     this.resetPasswordExpire = Date.now() + 30 *60 *1000


//     return resetToken
// }

const User = mongoose.model('User' ,userSchema)

export default User