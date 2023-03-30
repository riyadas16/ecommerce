const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt=require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        trim: true,
        required: [true, "please enter your name here"]

    },
    email:
    {
        type: 'string',
        required: [true, "please enter your email here"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "please enter your email here"]
    },
    photo: String,
    password: {
        select:false,
        minlength: 8,
        trim: true,
        type: 'string',
        required: [true, "please enter your password here"]
    },
    confirmpassword: {
        type: 'string',
        required: true,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message:'Password are not same'
        }
    }
},{timestamps: true})

userSchema.pre('save', async function (next){

    if(!this.isModified('password'))return next()

    this.password = await bcrypt.hash(this.password,12)
    this.confirmpassword=undefined

})

userSchema.methods.correctPassword=async function (candidatePassword,userpassword) {
    return await bcrypt.compare(candidatePassword,userpassword)
}

const user = mongoose.model('User', userSchema)
module.exports = user