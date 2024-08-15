import React,{ useEffect, useState } from 'react'
import AdminLayouts from '../../admincomponents/AdminLayouts'
import {useData} from '../../API/ApiContext'
import { ToastContainer,toast } from 'react-toastify';
const EditUuserValue ={
    name:'',
    lastname:'',
    email:'',
    location:''
  }
const ImageUpload = {
  avatar: null
}  
const UpdateProfile = () => {
    const {CurrentUser,updateUser} = useData()
    const [currentUser, setcurrentUser] = useState([])
    const [updateValue , setupdateValue] = useState(EditUuserValue)
    const [Profile, setProfile] = useState(ImageUpload)


    const getUserUpdateValue = (e)=>{
        setupdateValue({...updateValue, [e.target.name]: e.target.value})
    }

    const handleImageChange = (e) => {
      setProfile({...Profile,
           avatar: e.target.files[0]
        });
      };

    const getCurrentUSer = async()=>{
        const res = await CurrentUser()
        if(res.success){
          const {data} = res;
          setcurrentUser(data.data.currentUser)
          setupdateValue(data.data.currentUser)
        }else{
          console.error(res.message || res.error);
        }
    }

    const UserSubmit = async(e)=>{
        e.preventDefault();
        const res = await updateUser(updateValue,Profile);
        if (res.success) {
          toast.success('User updated successfully',{
            position:"top-center"
          })
          setcurrentUser(res.data);
        } else {
          console.error(res.message || res.error);
          toast.error('Failed to update user',{
            position:'top-center'
          })
        }
    }
    useEffect(()=>{
        getCurrentUSer()
      },[])
  return (
    <AdminLayouts>
       <section>
<div className="bg-white  rounded-lg shadow relative m-10">
<div className="flex items-start justify-between p-5 border-b rounded-t">
    <h3 className="text-xl font-semibold">
        Update Profile
    </h3>
</div>
<div className="p-6 space-y-6">
    <form   onSubmit={UserSubmit} enctype="multipart/form-data" method="post" action="/uploads">
        <div className="grid grid-cols-10 gap-6">
            <div className="col-span-6 sm:col-span-3">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Select An Image File (Max 0.5 MB)</label>
            <input  onChange={(e) => handleImageChange(e)} name='avatar' class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" aria-describedby="file_input_help" id="file_input" type="file" />
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
            </div>
            <div className="col-span-6 sm:col-span-3">
                <label for="name" className="text-sm font-medium text-gray-900 block mb-2">Name</label>
                <input type="text" value={currentUser.name} onChange={(e)=> getUserUpdateValue(e)}  name="name" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Name" required=""/>
            </div>
            <div className="col-span-6 sm:col-span-3">
                <label for="lname" className="text-sm font-medium text-gray-900 block mb-2">Last Name</label>
                <input type="text" value={currentUser.lastname}  onChange={(e)=> getUserUpdateValue(e)}  name="lname" id="lname" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Last Name" required=""/>
            </div>
            <div className="col-span-6 sm:col-span-3">
                <label for="email" className="text-sm font-medium text-gray-900 block mb-2">Email</label>
                <input type="email" value={currentUser.email}  onChange={(e)=> getUserUpdateValue(e)} name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Email" required=""/>
            </div>
            <div className="col-span-6 sm:col-span-3">
                <label for="location" className="text-sm font-medium text-gray-900 block mb-2">Location</label>
                <input type="text"  value={currentUser.location} onChange={(e)=> getUserUpdateValue(e)} name="location" id="location" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Location" required=""/>
            </div>
        </div>
        {/* <div className="grid grid-cols-8 gap-12">
            <div className="col-span-6 sm:col-span-3">
                <label for="email" className="text-sm font-medium text-gray-900 block mb-2">Email</label>
                <input type="text"  name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Email" required=""/>
            </div>
            <div className="col-span-6 sm:col-span-3">
                <label for="location" className="text-sm font-medium text-gray-900 block mb-2">Location</label>
                <input type="text"  name="location" id="location" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Location" required=""/>
            </div>
        </div> */}
<div className="p-6 border-t border-gray-200 rounded-b">
    <button  type="submit"  className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Update User</button>
</div>
    </form>
</div>
<ToastContainer/>
</div>
 </section> 
    </AdminLayouts>
  )
}

export default UpdateProfile
