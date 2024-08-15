import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {ToastContainer , toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useData} from '../API/ApiContext'
const ResgisterValue = {
  name:'',
  email:'',
  password:'',
  passwordConfirm:'',
  lastname:'',
  location:'',
}
const Register = () => {
  const Navigate = useNavigate()
  const [register, setRegister] = useState(ResgisterValue);
  const {RegisterApi} = useData()
  
  const RegisterInputValue = (e)=>{
    setRegister({...register , [e.target.name]: e.target.value})
  }

  const isFormValid = () => {
    const { name, email, password, passwordConfirm, lastname, location } = register;
    if (!name || !email || !password || !passwordConfirm || !lastname || !location) {
      return false;
    }
    return true;
  };

  const SubmitRegister = async(e)=>{
    e.preventDefault()
    if (!isFormValid()) {
      toast.error("All fields are required", {
        position: 'top-center',
      });
      return;
    }
    const result = await RegisterApi(register);
    if (result.success) {
      toast.success("User registered successfully",{
        position:'top-center'
      })
      //alert('User registered successfully');
        setTimeout(()=>{
          Navigate('/login')
        },2000)
    } else {
      toast.error("Already have an account",{
        position:"top-center"
      })
      console.log('Signup failed: ' + result.error);
    }
  }
  return (
    <>
<div className="bg-gray-200 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
  <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
    <div className="bg-white shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>

    </div>
    <form className="p-12 md:p-24" method='post'>
      <div className="flex items-center text-lg mb-6 md:mb-8">
        <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
          <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
        </svg>
        <input type="text" name='name' onChange={(e)=> RegisterInputValue(e)} id="name" className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Name" required />
      </div>
      <div className="flex items-center text-lg mb-6 md:mb-8">
        <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
          <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
        </svg>
        <input type="text" name='lastname' id="lastname" onChange={(e)=> RegisterInputValue(e)} className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Last Name" required />
      </div>
      <div className="flex items-center text-lg mb-6 md:mb-8">
      <svg className="absolute ml-3" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12.713l11.985-8.713c-.144-.138-4.136-4-11.985-4-7.847 0-11.843 3.866-11.985 4l11.985 8.713z"/>
        <path d="M12 14.939l-12-8.713v14h24v-14l-12 8.713z"/>
      </svg>
        <input type="email" name='email' id="email" onChange={(e)=> RegisterInputValue(e)} className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Email"  required/>
      </div>
      <div className="flex items-center text-lg mb-6 md:mb-8">
      <svg className="absolute ml-3" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
       <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5c-1.378 0-2.5-1.122-2.5-2.5s1.122-2.5 2.5-2.5 2.5 1.122 2.5 2.5-1.122 2.5-2.5 2.5z"/>
      </svg>
        <input type="text" name='location' id="location" onChange={(e)=> RegisterInputValue(e)} className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Location" required/>
      </div>
      <div className="flex items-center text-lg mb-6 md:mb-8">
        <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
          <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
        </svg>
        <input type="password" name='password' id="password" onChange={(e)=> RegisterInputValue(e)} className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Password" />
      </div>
      <div className="flex items-center text-lg mb-6 md:mb-8">
        <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
          <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
        </svg>
        <input type="password" name='passwordConfirm' id="passwordConfirm" onChange={(e)=> RegisterInputValue(e)} className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Confirm Password" />
      </div>
      <button onClick={SubmitRegister} className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded">SignUp</button>
						<div className="text-center mt-4">
                   <hr className="mb-6 border-t" />
						</div>
						<div className="text-center">
            <p className="text-center inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800">Already have an account?
                    <Link to="/login"
                        className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Login!
                    </Link>
            </p>
						</div>
    </form>
  </div>
  <ToastContainer/>
 </div>
    </>
  )
}

export default Register
