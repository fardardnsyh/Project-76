const { default: mongoose } = require('mongoose');
const Job = require('../Model/jobModel');
const User = require('../Model/userModel');
const moment = require('moment');
//Create A job 
exports.createJob = async(req,res)=>{
    try{
    console.log(req.body) 
    const {company,position} = req.body;
    if(!company || !position){
        res.status(404).json({
            status:"failed",
            message:"Please provide complete deatils"
        });
        return;
    }
    req.body.createdBy = req.user._id;
    const job = await Job.create(req.body);
    res.status(201).json({
        status:"Secuess",
        message:"Job Created Secusessfully",
        data: {
            job
        }
    });
    }catch(error){
        console.log(error)
        res.status(404).json({
            status:"failed",
            message:"Api didnot work"
        });
    }
    
}
// get all job 
exports.getAllJob = async(req,res)=>{
    try{
        const { status, jobType, sort, search } = req.query;
        //console.log(status)
        const queryObject = { createdBy: req.user._id};
       // console.log(queryObject)
        if (status && status !== 'all') {
            queryObject.status = status;
          }
          if (jobType && jobType !== 'all') {
            queryObject.jobType = jobType;
          }
          if (search) {
            queryObject.position = { $regex: search, $options: 'i' };
          }
        let result = Job.find(queryObject);
        if (sort === 'latest') {
            result = result.sort('-createdAt');
          } else if (sort === 'oldest') {
            result = result.sort('createdAt');
          } else if (sort === 'a-z') {
            result = result.sort('position');
          } else if (sort === 'z-a') {
            result = result.sort('-position');
          }
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        result = result.skip(skip).limit(limit);
        const jobs = await result;
        const totalJobs = await Job.countDocuments(queryObject);
        const numOfPages = Math.ceil(totalJobs / limit);  
        res.status(200).json({
            message:"this is very good",
            data:{
                jobs, 
                totalJobs, 
                numOfPages
            }
        })
    }catch(eror){
        console.log(eror)
        res.status(404).json({
            status:"failed",
            message:"Internal Server Error",
        });
    }   
}
//Update Controler
exports.updateJob = async(req,res)=>{
  try{
    const {id:jobId} = req.params;
    const {company,position} = req.body; 
    if(!company || !position){
      return res.status(404).json({
        status:"Failed",
        message:"Please provide all values"
      })
    }
    // Find the job and check permissions in one go
    const job = await Job.findOne({_id:jobId})
    if(!job){
      return res.status(403).json({
        status:"Failed",
        message:"No job Data Found"
      })
    }
    // console.log('CreateBy',job.createdBy.toString())
    // console.log('CreateBy',req.user._id.toString())

    // Check if the user has permission to update the job
    if(req.user._id.toString() === job.createdBy.toString()){
       // Update the job
       const updateJob = await Job.findByIdAndUpdate({_id:jobId}, req.body,{
        new: true,
        runValidators: true,
       })
       res.status(200).json({
        status:'seccuess',
        data:{
          updateJob
        }
      });
    }else{
      res.status(404).json({
        status:"Failed",
        message:"Not authorized to access this route"
      });
    }
  }catch(error){
    console.log(error)
        res.status(404).json({
            status:"failed",
            message:"Internal Server Error",
        });
  }
}
//getjobs 
exports.getJob = async(req,res)=>{
  try{
    const {id:jobID} = req.params;
    const  findjob = await Job.findOne({_id:jobID})
    if(!findjob){
      return res.status(404).json({
        status: "Failed",
        message: "No job data found"
        });
        }
    if(req.user._id.toString() === findjob.createdBy.toString()){
      const data = await Job.findById({_id:jobID})
      res.status(200).json({
        status:'seccuess',
        data:{
            data
        }
      });
    }else{
      return res.status(403).json({
        status: "Failed",
        message: "Not authorized to Update this job"
      });
    }
  }catch(error){  
    res.status(500).json({
      status:"Failed",
      message:"An error occurred while deleting the job" + error
    })
  }
}
exports.deleteJob = async (req, res) => {
  try {
    // Extract jobId from req.params
    const { id: jobId } = req.params;
    // Find the job by ID
    const job = await Job.findOne({ _id: jobId });
    // Check if job exists
    if (!job) {
      return res.status(404).json({
        status: "Failed",
        message: "No job data found"
      });
    }
    // Check permissions
    if (req.user._id.toString() !== job.createdBy.toString()) {
      return res.status(403).json({
        status: "Failed",
        message: "Not authorized to delete this job"
      });
    }
    // Remove the job
    await Job.deleteOne({ _id: jobId });
    // Respond with success message
    res.status(200).json({
      status: 'Success',
      message: 'Job removed successfully'
    });
  } catch (error) {
    // Log the error
    console.error(error);
    // Respond with an error message
    res.status(500).json({
      status: 'Failed',
      message: 'An error occurred while deleting the job'
    });
  }
};

//Show Stats of the 
exports.ShowStatus = async(req,res)=>{
  try{
    // Convert user ID to a Mongoose ObjectId
    const userId = new mongoose.Types.ObjectId(req.user._id.toString());
    // Perform the aggregation
    let state = await Job.aggregate([
      { $match: { createdBy: userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    // Transform the state array into an object
    state = state.reduce((acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    }, {});

    const defaultStats = {
      pending: state.pending || 0,
      interview: state.interview || 0,
      declined: state.declined || 0,
    };
    // console.log(state)
    // console.log(defaultStats)
    let monthlyApplications  = await Job.aggregate([
      {$match:{createdBy:userId}},
      {
        $group:{
          _id:{year:{$year:'$createdAt'}, month:{$month:"$createdAt"} },
          count :{$sum:1},
        },
        
      },
        {$sort:{'_id.year': -1, '_id.month':-1}},
        {$limit:6}
        ])
    monthlyApplications = monthlyApplications
    .map((item) => {
      const { _id: { year, month }, count } = item;
      const date = moment()
      .month(month - 1)
      .year(year)
      .format('MMM Y');
    return { date, count };
  }).reverse();
  console.log(monthlyApplications)
    res.status(200).json({
      status:"sucess", 
      message:"Sucessfully!",
      data:{
        defaultStats,
        monthlyApplications
      }
  })
  }catch(error){
    console.error(error);
    res.status(500).json({
      status: 'Failed',
      message: 'An error occurred'
    });
  }
}

