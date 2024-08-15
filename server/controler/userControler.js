const User = require('../Model/userModel')
const Job = require('../Model/jobModel')
const cloudinary = require('cloudinary')
const {formatImage}  = require('../middleware/multerMiddleware')

exports.getApplicationStats = async(req,res)=>{
    try{
        const user = await User.countDocuments()
        const job = await Job.countDocuments()
        res.status(200).json({
            message:"this is very good",
            data:{
                user, 
                job
            }
        })
    }catch(error){
        console.log(error)
        res.status(404).json({
            status:"failed",
            message:"Internal Server Error",
        });
    }
};
exports.updateUser = async(req,res)=>{
    try{
        // Create a new user object excluding password and role
        const newUser = {...req.body};
        delete newUser.password
        delete newUser.role
        // If there's a file in the request, handle image upload
         // If there's a file in the request, handle image upload
        if (req.file) {
            newUser.avatar = req.file.filename;
        }
        const updatedUser = await User.findByIdAndUpdate(req.user._id, newUser, { new: true });
           // Send a success response
         res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
          });
    }catch(error){
        res.status(500).json({
            status: 'Error updating user',
            error: error.message
          });
  }
}
