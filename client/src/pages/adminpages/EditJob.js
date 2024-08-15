import React, { useEffect,useState } from 'react'
import AdminLayouts from '../../admincomponents/AdminLayouts'
import {useParams} from 'react-router-dom'
import { useData } from '../../API/ApiContext'
import {useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'

const EditJobValue ={
  company:'',
  position:'',
  status:'',
  jobType:'',
  jobLocation:''
}
const EditJob = () => {
  const {id} = useParams()
  const [editJob, seteditJob] = useState(EditJobValue);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate()
  const {getOneJobAPI,editJobAPI} = useData()
  
  const getEditJobValue = (e)=>{
    seteditJob({...editJob , [e.target.name]: e.target.value})
  }
  useEffect(()=>{
    const fetchJob = async () => {
      const res = await getOneJobAPI(id);
      if (res.success) {
          const { data } = res;
          seteditJob(data.data.data);
          setLoading(false);
      } else {
          console.error(res.message || res.error);
      }
  };
  fetchJob();
  },[id,getOneJobAPI])
  // Update Job 
  const saveJob = async(e)=>{
    e.preventDefault()
    const res = await editJobAPI(id,editJob)
    if(res.success){
      setTimeout(()=>{
        toast.success("Job Updated Successfully!", {
          position: "top-center"
      });
      },1000)
    Navigate('/alljob')
  }else{
    console.error(res.message || res.error)
  }
}
  return (
    <AdminLayouts>
        <div className="bg-white  rounded-lg shadow relative m-10">
<div className="flex items-start justify-between p-5 border-b rounded-t">
    <h3 className="text-xl font-semibold">
        Edit Job
    </h3>
</div>
<div className="p-6 space-y-6">
    <form action="#" method='POST'>
        <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
                <label for="position" className="text-sm font-medium text-gray-900 block mb-2">Position</label>
                <input type="text" onChange={(e)=> getEditJobValue(e)} value={editJob.position} name="position" id="position" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Position" required=""/>
            </div>
            <div className="col-span-6 sm:col-span-3">
                <label for="company" className="text-sm font-medium text-gray-900 block mb-2">Company</label>
                <input type="text" onChange={(e)=> getEditJobValue(e)} value={editJob.company} name="company" id="company" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Company" required=""/>
            </div>
            <div className="col-span-6 sm:col-span-3">
                <label for="jobLocation" className="text-sm font-medium text-gray-900 block mb-2">Job Location</label>
                <input type="text" onChange={(e)=> getEditJobValue(e)} value={editJob.jobLocation} name="jobLocation" id="jobLocation" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Job Location" required=""/>
            </div>
            <div className="col-span-full">
            <label for="jobstatus" className="text-sm font-medium text-gray-900 block mb-2">Job Status</label>
  <select  name='status' onChange={(e)=> getEditJobValue(e)} id="jobstatus" value={editJob.status} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
    <option selected>Job Status</option>
    <option>interview</option>
    <option>declined</option>
    <option>pending</option>
  </select>
            </div>
            <div className="col-span-full">
            <label for="jobtype" className="text-sm font-medium text-gray-900 block mb-2">Job Type</label>
  <select name='jobType' onChange={(e)=> getEditJobValue(e)} value={editJob.jobType} id="jobtype" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
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
    <button onClick={saveJob} className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Edit Job</button>
</div>
<ToastContainer/>
</div>
    </AdminLayouts>
  )
}

export default EditJob
