const User = require('../Model/userModel')
const jwt = require('jsonwebtoken')
const util = require('util')
const moment = require('moment');
const promisify = util.promisify
const {sendMail} = require('../utils/sendEMail')
//1 Create New User Frist of All

const signInToken = (id)=>{
    return jwt.sign({id:id} ,process.env.JWT_TOkEN_KEY,{
        expiresIn:process.env.JWT_EXPRIES_IN
    })
}
exports.signUp = async(req,res)=>{
    try{
        const { name, email} = req.body;
        //const parsedDate = moment(req.body.passwordChangeAt, "DD-MM-YYYY").toDate();
        const newUser  = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            passwordConfirm:req.body.passwordConfirm,
            lastname:req.body.lastname,
            location:req.body.location,
            //passwordChangeAt:parsedDate,
        })
        sendMail(email,"Wellcome to our Jobtrack App",`Hi ${name}, thank you for registering. We hope you enjoy our services!`)
        const token = signInToken(newUser._id)
        //Saved Token In ccokies method 
        const cookieOptions ={
            expires: new Date(Date.now() + process.env.JWT_TOKEN_ESPRIES_IN * 24 * 60 *60 * 1000),
            httpOnly:true ,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https',  
            sameSite: 'strict', // or 'lax', based on your CSRF protection needs
        }
        if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
        res.cookie('jwt', token , cookieOptions)
        newUser.password = undefined
        res.status(200).json({
            status:"user created Successfully",
            token,
            user:{
                user:newUser
            }
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            status:"User Not Created",
            message:"Server Error", error
        })
    }
}
exports.login = async(req,res)=>{
    try{
        const {email, password} = req.body;
        // 1 check the email and password  exist 
        if(!email || !password){
            res.status(404).json({
                status:"Error",
                message:"Please Provide email and password"
            })
            return;
        }
       // 2 check the user email and passowrd are correct
       const user = await User.findOne({email}).select('+password')
       // 3 now Compared database passowrd with user password move to the  Usermodel 
       if(!user || !(await user.correctPassword(password, user.password))){
        res.status(404).json({
            status:"failed",
            message:"Incorrect email or password"
        })
        return;
       }
       // 4 when every think is ok then token send to the client 
       const token = signInToken(user._id)
       const cookieOptions ={
        expires: new Date(Date.now() + process.env.JWT_TOKEN_ESPRIES_IN * 24 * 60 *60 * 1000),
        httpOnly:true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'  
        }
       if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
       res.cookie('jwt', token , cookieOptions)
       // Remove password from output
       user.password = undefined;
       res.status(200).json({
        status:"secuesss",
        token,
        data:{
            user
        } 
       })
    }catch(eror){
        console.log(eror)
        res.status(500).json({
            status:"User Not Created",
            message:"Server Error", eror
        })

    }
}
exports.protect = async(req, res, next)=>{
    //1 Getting the token from the user 
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    //console.log(token)
    if (!token) {
        return res.status(401).json({
            status: 'Failed',
            message: 'You are not logged in! Please log in to get access.',
        });
    }
    //2 verifaction the token
    try{
        const decode = await promisify(jwt.verify)(token, process.env.JWT_TOkEN_KEY)
        //console.log(decode)
        // 3 check user Still Exist
        const fresUser = await User.findById(decode.id)
        //console.log(fresUser)
        if(!fresUser){
            return res.status(401).json({
                status: 'Failed',
                message:"The belong to this token are no longer exist"
            });
        }
        //4 Check id user change the password after  the token was issued
         //fresUser.ChangePassowrdAfter(decode.iat) 
        if(fresUser.ChangePassowrdAfter(decode.iat)){
            return  res.status(401).json({message: ' user recent change password please login again'})
        }
        //4 Granted Access to the routes
        req.user = fresUser;
        res.locals.user = fresUser;
        next();
    }catch(error){
        console.log(error)
        let message = 'Invalid token! Please log in again to get access.';
        
        if (error.name === 'TokenExpiredError') {
            message = 'Your token has expired! Please log in again to get access.';
        }
        return res.status(401).json({
            status: 'Failed',
            message,
        });
    }
}
// get Current user 
exports.getCurrentUser = async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user.id });
        if (currentUser) {
            res.status(200).json({
                status: "success",
                data: {
                    currentUser,
                    location: currentUser.location
                }
            });
        } else {
            res.status(404).json({
                status: "Current user not found",
                message: "User not found"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Current user not retrieved",
            message: "Server error"
        });
    }
};
// Now Create Restricted Role
exports.restrictTo = (role)=>{
    return (req,res,next)=>{
        if(!req.user){
            res.status(401).json({message:"You are not logged in!"})
        }
        if(req.user.role !== role){
            return res.status(403).json({status:"failed",message: "you do not have permission to perform this action"})
        }
    next();
    }
}
//logout funcation 
exports.logout = async(req,res)=>{
    res.cookie('jwt', 'logout',{
        expiresIn: new Date(Date.now() +10 *1000),
        httpOnly:true
    })
    res.status(200).json({ status: 'success' });    
}