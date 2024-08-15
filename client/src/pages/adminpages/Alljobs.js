import React, { useEffect,useState } from 'react'
import AdminLayouts from '../../admincomponents/AdminLayouts'
import {useData} from '../../API/ApiContext'
import {Link} from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';

const Alljobs = () => {
    const [jobs, setJobs] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [loading, setLoading] = useState(true);
    const [numOfPages, setNumOfPages] = useState(1);
    const [status, setStatus] = useState('all');
    const [jobType, setJobType] = useState('all');
    const [sort, setSort] = useState('latest');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const {getAllJobsAPI,deleteJobAPI} = useData();

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };
    const handleJobTypeChange = (e) => {
        setJobType(e.target.value);
    };
    const handleSortChange = (e) => {
        setSort(e.target.value);
    };
    //page handel
    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= numOfPages) {
          setPage(newPage);
      }
  };
    //
    const handelSubmit = async(e)=>{
      setLoading(true)
        const queryParams  = new URLSearchParams({
            status,
            jobType,
            sort,
            search,
            page,
            limit
        })
        setTimeout(async()=>{
          const res = await getAllJobsAPI(queryParams)
          if(res.success){
              const {data} = res;
              console.log(data)
              setJobs(data.data.jobs)
              setTotalJobs(data.data.totalJobs)
              setNumOfPages(data.data.numOfPages)
          }else{
              console.error(res.message || res.error);
          }
          setLoading(false)
        },1500)
    }
    
    // Delete Job
    const deleteJob = async(id)=>{
        const res = await deleteJobAPI(id)
        if(res.success){
           setTimeout(() => {
            toast.success("Job Delete Successfully!",{
                position:"top-center"
            })
           },2000);
           handelSubmit()
        }else{
          console.error(res.message || res.error);
        }
    }
    useEffect(()=>{
        handelSubmit()
    },[status, jobType, sort, search, page, limit])
    
  return (
 <AdminLayouts>
 <section>
<div className="bg-white  rounded-lg shadow relative m-10">
<div className="flex items-start justify-between p-5 border-b rounded-t">
    <h3 className="text-xl font-semibold">
        Search Job
    </h3>
</div>
<div className="p-6 space-y-6">
    <form action="#" method='POST' onSubmit={handelSubmit}>
        <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
                <label for="Search" className="text-sm font-medium text-gray-900 block mb-2">Search</label>
                <input  type="text" onChange={handleSearchChange} value={search}  name="Search" id="Search" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Search" required=""/>
            </div>
            <div className="col-span-6 sm:col-span-3">
            <label for="jobstatus" className="text-sm font-medium text-gray-900 block mb-2">Job Status</label>
  <select  name='jobstatus' onChange={handleStatusChange} value={status}  id="jobstatus" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
    <option value='all'>all</option>
    <option value='interview'>interview</option>
    <option value='declined'>declined</option>
    <option value='pending'>pending</option>
  </select>
            </div>
            <div className="col-span-6 sm:col-span-3">
            <label for="JobType" className="text-sm font-medium text-gray-900 block mb-2">Job Type</label>
  <select  name='jobtype' value={jobType}  id="JobType" onChange={handleJobTypeChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
    <option value='all'>all</option>
    <option value='full-time' >full-time</option>
    <option value='part-time'>part-time</option>
    <option value='internship'>internship</option>
  </select>
            </div>
            <div className="col-span-6 sm:col-span-3">
            <label for="Sort" className="text-sm font-medium text-gray-900 block mb-2">Sort</label>
  <select  name='Sort' value={sort} onChange={handleSortChange} id="Sort" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
  </select>
            </div>
        </div>
    </form>
</div>
<div className="p-6 border-t border-gray-200 rounded-b">
    <button onClick={()=> {
         setSearch('');
         setStatus('all');
         setJobType('all');
         setSort('latest');
         setPage(1);
    }}  className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Reset Search Value</button>
</div>
</div>
 </section>

 {loading ?(
  <>
  <div class="flex items-center justify-center">
    <div class="relative">
        <div class="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
        <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
        </div>
    </div>
</div>
</>
 ):(
 <div className='flex flex-wrap justify-center items-center bg-white  rounded-lg shadow relative m-10'>
 {jobs.map((job,index)=>{
    return(  
    <section class="lg:basis-1/2 p-6 ml-7 mt-7 mb-7 rounded-lg max-w-2xl shadow-lg shadow-gray-300 bg-white">
      <header class="flex items-center mb-6">
      <h1 class="font-medium text-lg">{job.position} ({job.company})</h1><br/>
      </header>
      <section class="py-4 grid grid-cols-2 gap-x-6  border-t border-gray-100">
        <div class="flex items-center py-3">
            <span className="w-8 h-8 shrink-0 mr-4 rounded-full bg-blue-50 flex items-center justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-blue-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 21l-1 -4a7 7 0 1 1 2 0l-1 4z"></path>
                <circle cx="12" cy="11" r="3"></circle>
            </svg>
            </span>
          <div class="space-y-3 flex-1">
            <div class="flex items-center">
              <h4 class="font-medium text-sm mr-auto text-gray-700 flex items-center">
                {job.jobLocation}
              </h4>
            </div>
          </div>
        </div>

        <div class="flex items-center py-3">
        <span className="w-8 h-8 shrink-0 mr-4 rounded-full bg-blue-50 flex items-center justify-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-blue-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <rect x="4" y="5" width="16" height="16" rx="2"></rect>
            <line x1="16" y1="3" x2="16" y2="7"></line>
            <line x1="8" y1="3" x2="8" y2="7"></line>
            <line x1="4" y1="11" x2="20" y2="11"></line>
            <rect x="8" y="15" width="2" height="2"></rect>
        </svg>
        </span>
          <div class="space-y-3 flex-1">
            <div class="flex items-center">
              <h4
                class="font-medium text-sm mr-auto text-gray-700 flex items-center">
                {new Date(job.createdAt).toDateString()}
              </h4>
            </div>
            
          </div>
        </div>
        <div class="flex items-center py-3">
        <span className="w-8 h-8 shrink-0 mr-4 rounded-full bg-blue-50 flex items-center justify-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-blue-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <rect x="6" y="3" width="12" height="7" rx="2"></rect>
            <path d="M9 3v-1a3 3 0 0 1 6 0v1"></path>
            <path d="M12 12v6"></path>
            <path d="M9 18h6"></path>
            <path d="M4 11h16v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
        </svg>
        </span>
          <div class="space-y-3 flex-1">
            <div class="flex items-center">
              <h4 class="font-medium text-sm mr-auto text-gray-700 flex items-center">
               {job.jobType}
              </h4>
            </div>
          </div>
        </div>

        <div class="flex items-center py-3">
            <span className="w-8 h-8 shrink-0 mr-4 rounded-full bg-blue-50 flex items-center justify-center">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-blue-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 20l1.65-3.15a9 9 0 1 1 3.35 3.35L3 20"></path>
            <path d="M9 12h3"></path>
            <path d="M15 12h2"></path>
            </svg>
            </span>
          <div class="space-y-3 flex-1">
            <div class="flex items-center">
              <h4
                class="font-medium text-sm mr-auto text-gray-700 flex items-center">
                {job.status}
              </h4>
            </div>
          </div>
        </div>
        
      </section>
      
      <footer class="border-t border-gray-100 pt-4">
        <Link  to={"/editjob/" + job._id} className="text-white  bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Edit</Link>
        <button onClick={()=> deleteJob(`${job._id}`)}  className="text-white ml-7 bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Delete</button>
      </footer>
    </section>
   )
})} 
</div> 
 )
}

    <div className='border-t border-gray-100 pt-4 flex items-center justify-center'>
      <button  className='p-1 mr-4 rounded border text-black bg-white hover:text-white hover:bg-blue-600 hover:border-blue-600' onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
        </svg>
      </button>
      <span>Page {page} of {numOfPages}</span>
      <button className='p-1 ml-4  rounded border text-black bg-white hover:text-white hover:bg-blue-600 hover:border-blue-600' onClick={() => handlePageChange(page + 1)} disabled={page >= numOfPages}>
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
      </svg>
      </button>
    </div>
<ToastContainer/>
 </AdminLayouts>
  )
}

export default Alljobs
