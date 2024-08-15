import React,{useState} from 'react'
import AdminLayouts from '../../admincomponents/AdminLayouts'
import {useData} from '../../API/ApiContext'
import {useNavigate} from 'react-router-dom'
import {ToastContainer , toast} from 'react-toastify'
const addJobValue ={
  company:'',
  position:'',
  status:'',
  jobType:'',
  jobLocation:''
}
const Addjob = () => {
  const [addJob, setaddJob] = useState(addJobValue);
  const Navigate = useNavigate()
  const {addJobAPI} = useData()

  const getAddJobValue = (e)=>{
    setaddJob({...addJob , [e.target.name]: e.target.value})
  }

  const isFormValid = () => {
    const {company, position,status,jobType,jobLocation} = addJob;
    if ( !company || !position ||!status ||!jobType ||!jobLocation) {
      return false;
    }
    return true;
  };

  const Submit_AddJob = async(e)=>{
    e.preventDefault()
    if (!isFormValid()) {
      toast.error("All fields are required", {
        position: 'top-center',
      });
      return;
    }
    const res = await addJobAPI(addJob);
    if(res.success){
      setTimeout(()=>{
        toast.success("Job Add Sucessssfully",{
          position:"top-center"
        })
      },1000)
      Navigate('/alljob')
    }else{
      toast.error("Failed To add Job",{
        position:"top-center"
      })
      console.log("Failed to Add Job", + res.error)
    }
  }
  return (
<AdminLayouts>
<div className="bg-white  rounded-lg shadow relative m-10">
<div className="flex items-start justify-between p-5 border-b rounded-t">
    <h3 className="text-xl font-semibold">
        Add Job
    </h3>
</div>
<div className="p-6 space-y-6">
    <form action="#" method='POST'>
        <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
                <label for="position" className="text-sm font-medium text-gray-900 block mb-2">Position</label>
                <input type="text" onChange={(e)=> getAddJobValue(e)} name="position" id="position" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Position" required=""/>
            </div>
            <div className="col-span-6 sm:col-span-3">
                <label for="company" className="text-sm font-medium text-gray-900 block mb-2">Company</label>
                <input type="text" onChange={(e)=> getAddJobValue(e)} name="company" id="company" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Company" required=""/>
            </div>
            <div className="col-span-6 sm:col-span-3">
                <label for="jobLocation" className="text-sm font-medium text-gray-900 block mb-2">Job Location</label>
                <input type="text" onChange={(e)=> getAddJobValue(e)} name="jobLocation" id="jobLocation" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Job Location" required=""/>
            </div>
            <div className="col-span-full">
            <label for="jobstatus" className="text-sm font-medium text-gray-900 block mb-2">Job Status</label>
  <select  name='status' onChange={(e)=> getAddJobValue(e)} id="jobstatus" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
    <option selected>Job Status</option>
    <option>interview</option>
    <option>declined</option>
    <option>pending</option>
  </select>
            </div>
            <div className="col-span-full">
            <label for="jobtype" className="text-sm font-medium text-gray-900 block mb-2">Job Type</label>
  <select name='jobType' onChange={(e)=> getAddJobValue(e)} id="jobtype" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
    <option selected>Job Type</option>
    <option >full-time</option>
    <option>part-time</option>
    <option>remote</option>
    <option>internship</option>
  </select>
            </div>
        </div>
    </form>
</div>
<div className="p-6 border-t border-gray-200 rounded-b">
    <button onClick={Submit_AddJob} className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Add Job</button>
</div>
<ToastContainer/>
</div>
    </AdminLayouts>
  )
}

export default Addjob
