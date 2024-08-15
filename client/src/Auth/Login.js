import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useData} from '../API/ApiContext'
import {ToastContainer , toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const SetLoginValue = {
  email:'',
  password:''
}
const Login = () => {
  //Get Value from user Input using UseState Hook
  const [login, setLogin] = useState(SetLoginValue);
  //Custome Hook to Fetch Api
  const {LoginApi} = useData()
  // Navigate Page 
  const navigate = useNavigate()
  // funcation to update userinput
  const getLoginInput = (e)=>{
    setLogin({...login, [e.target.name]:e.target.value})
  }

  const isFormValid = () => {
    const {email, password} = login;
    if ( !email || !password) {
      return false;
    }
    return true;
  };

  //Submit Login Deatils 
  const SubmtLogin = async(e)=>{
    e.preventDefault()
    if (!isFormValid()) {
      toast.error("All fields are required", {
        position: 'top-center',
      });
      return;
    }
    const results = await LoginApi(login)
    if(results.success){
      toast.success("User Login successfully",{
        position:"top-center"
      })
      //alert('User Login successfully');
      setTimeout(()=>{
        navigate('/adminhome')
      },2000)
    }else{
      toast.error("Email or password are Wrong Please Try Again",{
        position:"top-center"
      })
      console.log('Login Failed failed: ' + results.error);
    }
  }

  return (
   <>
<div className="bg-gray-200 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
  <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
    <div className="bg-white shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
</svg>

    </div>
    <form className="p-12 md:p-24" method='post'>
      <div className="flex items-center text-lg mb-6 md:mb-8">
        <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
          <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
        </svg>
        <input type="email" onChange={(e) => getLoginInput(e)} name='email' id="email" className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Email" required/>
      </div>
      <div className="flex items-center text-lg mb-6 md:mb-8">
        <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
          <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
        </svg>
        <input type="password" onChange={(e) => getLoginInput(e)} name='password' id="password" className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Password" />
      </div>
      <button onClick={SubmtLogin} className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded">Login</button>
      <div className="text-center mt-4">
                   <hr className="mb-6 border-t" />
						</div>
			<div className="text-center">
      <p className="text-center inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800">Don&#x27;t have an account yet?
                    <Link to="/register"
                        className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Sign
                        up
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

export default Login
