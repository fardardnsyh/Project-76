import react , {createContext, useContext, useEffect, useState} from 'react'
import {jwtDecode} from 'jwt-decode'
const ApiContext = createContext();
const token = localStorage.getItem('token')
export const ApiProvider = ({ children })=>{
    const YOUR_PERSONAL_TOKEN = 'malikaleemraza';
    //Auth Check State
    const [isAuthenticated, setIsAuthenticated] = useState(()=>{
        return !! localStorage.getItem('token')
    })
    useEffect(()=>{
        setIsAuthenticated(!!localStorage.getItem('token'));
    })
    // 1)User Register Api
    const RegisterApi = async(register)=>{
        const {name,email,password,passwordConfirm,lastname,location} = register;
        try{
            const res = await fetch('http://127.0.0.1:8080/api/v1/user/sigup', {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${YOUR_PERSONAL_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name:name,
                    email:email,
                    password:password,
                    passwordConfirm:passwordConfirm,
                    lastname:lastname,
                    location:location
                })
            });
            const res_data = await res.json();
            console.log(res_data)
            if (res.ok) {
                const { token } = res_data;
                console.log('Received token:', token);
                localStorage.setItem('token', token);
                // Show success message and redirect or any other logic
                return { success: true, token };
            } else {
                console.error('Signup failed:', res_data.error);
                return { success: false, error: res_data.error };
            }
        }catch(eror){
            console.error('Error:', eror);
            return { success: false, error: eror.message };
        }
    };
    // 2) Login Api
    const LoginApi = async(login)=>{
        const {email, password} = login;
        try{
            const res  = await fetch('http://127.0.0.1:8080/api/v1/user/login',{
                method:'POST',
                headers:{
                    'Authorization': `Bearer ${YOUR_PERSONAL_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email:email,
                    password:password
                })
            })
            const res_data = await res.json();
            if(res.ok){
                const { token } = res_data;
                setIsAuthenticated(true)
                localStorage.setItem('token', token);
                console.log('login successfully !')
                return { success: true};
            }else{
                console.log('login Failed!', res_data.error)
                return { success: false, error: res_data.error };
            }
        }catch(error){
            console.error('Error', error)
            return { message: false , error: error.message}
        }
    }
    //3) Logout Api

    const LogoutAPI = async()=>{
        try{
            const res = await fetch('http://127.0.0.1:8080/api/v1/user/logout',{
                method:"GET",
                headers:{
                 'Content-Type': 'application/json',
                }
            })
            if(res.ok){
                setIsAuthenticated(false)
                localStorage.removeItem('token')
                return {success:true};
            }else{
                console.error('Failed to logout:', res);
                return { success: false, message: 'Failed to logout' };
            }
        }catch(error){
            console.error("Error:", error);
            return { success: false, error: error.message };
        }

    }
    // add Job API
    const addJobAPI = async(addJob)=>{
       // const token = localStorage.getItem('token');

        if (!token) {
            console.log("Token not found");
            return { success: false, error: "Token not found" };
        }
        let user;
        try {
            const decode = jwtDecode(token);
            user = decode.id;
        } catch (err) {
            console.log("Invalid token");
            return { success: false, error: "Invalid token" };
        }
        if (!user) {
            console.log("User is invalid");
            return { success: false, error: "User is invalid" };
        }
        const {company,position,status,jobType,jobLocation} = addJob;
        try {
            const res = await fetch('http://127.0.0.1:8080/api/v1/jobs', {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' // Added Content-Type header
                },
                body: JSON.stringify({
                    company: company,
                    position: position,
                    status: status,
                    jobType: jobType,
                    jobLocation: jobLocation,
                    createdBy: user
                })
            });
            const data = await res.json();
            if (res.ok) {
                console.log("Job added successfully");
                return { success: true, message: "Job added successfully" };
            } else {
                console.log("Failed to add job", data.error);
                return { success: false, error: data.error || "Failed to add job" };
            }
        } catch (error) {
            console.log("Error", error);
            return { success: false, error: error.message || "An error occurred" };
        }
    }
    //getAll Jobs
    const getAllJobsAPI = async(queryParams)=>{
        try{
            const res = await fetch(`http://127.0.0.1:8080/api/v1/jobs?${queryParams.toString()}`,{
                method:"GET",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if(res.ok){
                const res_data = await res.json();
                console.log("All jobs get")
                return {success:true, data:res_data};
            }else{
                console.error("Jobs are not get")
                return {success:false ,message:"failed to get jobs"}
            }
        }catch(eror){
            console.error("Error", eror)
            return {success:false, error:eror.message || "An Error Occurred"}
        }
    }
    //Edit Job API
    const editJobAPI = async(id, editJob)=>{
        const {company,position,status,jobType,jobLocation} = editJob;
        try{
            const res = await fetch(`http://127.0.0.1:8080/api/v1/jobs/${id}`,{
                method:"PATCH",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    company: company,
                    position: position,
                    status: status,
                    jobType: jobType,
                    jobLocation: jobLocation,
                })
            })
            if(res.ok){
                const res_data = await res.json();
                return {success:true , data:res_data}

            }else{
                return {success:false , message:"Failed to edit"}
            }
        }catch(error){
            return {success:false , error}
        }
    }
    // getOneAPI
    const getOneJobAPI = async(id)=>{
        try{
            const res = await fetch(`http://127.0.0.1:8080/api/v1/jobs/${id}`,{
                method:"GET",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            if(res.ok){
                const res_data = await res.json();
                console.log("jobs get")
                return {success:true, data:res_data};
            }else{
                console.error("Jobs are not get")
                return {success:false ,message:"failed to get jobs"}
            }
        }catch(eror){
            console.error("Error", eror)
            return {success:false, error:eror.message || "An Error Occurred"}
        }
    }
    //Show State API
    const StateJobAPI = async()=>{
        try{
            const res = await fetch(`http://127.0.0.1:8080/api/v1/jobs/stats`,{
                method:"GET",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if(res.ok){
                const res_data = await res.json();
                return {success:true, message:"Job State are  get Sucessfully",data:res_data}
            }else{
                console.error("Error")
                return {success:false, message:"Failed To State"}
            }
        }catch(error){
            console.error("Error", error)
            return {success:false , error:error.message || "An Error Is Accoured"}
        }
    } 
    //Delete Job
    const deleteJobAPI = async(id)=>{
        try{
            const res = await fetch(`http://127.0.0.1:8080/api/v1/jobs/${id}`,{
                method:"DELETE",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if(res.ok){
                return {success:true, message:"Job are Delete"}
            }else{
                console.error("Jobs Are Delete")
                return {success:false, message:"Failed To Delete a job"}
            }
            

        }catch(error){
            console.error("Error", error)
            return {success:false , error:error.message || "An Error Is Accoured"}
        }
    }

    const CurrentUser = async()=>{
        try{
            const res = await fetch('http://127.0.0.1:8080/api/v1/user/currentUser',{
                method:"GET",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if(res.ok){
                const res_data = await res.json()
                return {success:true, message:"User get Sucessfully", data:res_data}
            }else{
                console.error("Error")
                return {success:false, message:"Failed Get Current User"}
            }
        }catch(error){
            console.error("Error",error)
            return {success:false , error:error.message || "An Error Is Accoured"}
        }
    }

    const updateUser = async(updateValue,Profile)=>{
        try{
            const {name,lastname,email,location} = updateValue;
            const {avatar} = Profile;
            const formData = new FormData();
            formData.append('name', name);
            formData.append('lastname', lastname);
            formData.append('email', email);
            formData.append('location', location);
            if (avatar) {
              formData.append('avatar', avatar);
            }
        
            const res = await fetch('http://127.0.0.1:8080/api/v1/user/updateUser',{
                method:"PATCH",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    //'Content-Type': 'application/json'
                },
                body: formData
                // JSON.stringify({
                //     name:name,
                //     lastname:lastname,
                //     email:email,
                //     location:location,
                //     avatar:avatar
                // })
            });
            console.log(res)
            if(res.ok) {
                const res_data = await res.json();
                return { success: true, message: "User updated successfully", data: res_data };
            } else {
                console.error("Error updating user");
                return { success: false, message: "Failed to update user" };
            }
        }catch(error){
            console.error("Error", error);
            return { success: false, error: error.message || "An error occurred" };

        }
    }
    return (
        <ApiContext.Provider value={{isAuthenticated,RegisterApi,LoginApi, LogoutAPI, addJobAPI, 
        getAllJobsAPI, deleteJobAPI , editJobAPI , getOneJobAPI ,StateJobAPI, CurrentUser,updateUser}}>
            {children}
        </ApiContext.Provider>
    )
}
export const useData = ()=>{
    const context = useContext(ApiContext)
    if(!context){
        throw new Error ("useData must be used within a API Privider")
    }
    return context;
};