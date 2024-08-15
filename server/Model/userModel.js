//1 Import mongoose 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//2 create user Schema In database
const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please Enter Your Name']
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true, 'Please Provid a password'],
        minlength: 8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true, 'Please Provid a password'],
        validate:{
            validator: function(el){
                return el = this.password;
            },
            message:'Passwords are not same'
        }
    },
    lastname:{
        type:String,
        default:'lastname'
    },
    location:{
        type:String,
        default:"my city"
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    avatar:{
        type:String
    },
    avatarPublicId:{
        type:String
    },
    passwordChangeAt:Date,
});
//3 Hash the password before saving the user
userSchema.pre('save', async function(next){
    //Only run this when the password is modified 
    if(!this.isModified('password')) return next()
    //Hash the password with 12 cost 
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    //Delete Conform password fileds 
    this.passwordConfirm = undefined;
    next()
});

// 4 Create Funcation to compared the userpassord and dbpassowrd 
userSchema.methods.correctPassword   = async function(canidatePassword, userPassword){
    return await bcrypt.compare(canidatePassword,userPassword);
}
// 5  if change passowrd after the token is issue
userSchema.methods.ChangePassowrdAfter = function(JWTTimeStamp){
    if(this.passwordChangeAt){
        const changeTimeStamp = parseInt(
            this.passwordChangeAt.getTime() /100 ,
            10
        )
        console.log(changeTimeStamp, JWTTimeStamp)
        return JWTTimeStamp < changeTimeStamp 
    }
    return false;

} 
const User = mongoose.model("User",userSchema);
//Exports this User 
module.exports = User;