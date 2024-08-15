import React from 'react'
import Layouts from '../components/Layouts'
import img from '../asset/img.jpg'
import {Link} from 'react-router-dom'
const Home = () => {
  return (  
<Layouts> 
<section className="text-gray-600 body-font">
  <div className="container h-full  min-h-screen w-full mx-auto flex px-5  md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl tracking-wider">Job

      <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 dark:text-white">Tracking</span>
      
      App</h1>
      <p className="mb-8 leading-relaxed text-gray-900 dark:text-white">I'm baby wayfarers hoodie next level taiyaki brooklyn 
      cliche blue bottle single-origin coffee chia. Aesthetic post-ironic venmo, quinoa lo-fi tote bag 
      adaptogen everyday carry meggings +1 brunch narwhal.</p>
      <div className="flex lg:flex-row md:flex-col">
            <Link to="/register" class="mt-8 inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]">
            Register
            </Link>
            <Link to='/login' class="mt-8 ml-8 inline-flex items-center justify-center rounded-xl bg-green-600 py-3 px-6 font-dm text-base font-medium text-white shadow-xl shadow-green-400/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]">
             Login / Demo User
            </Link>
       </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img className="object-cover object-center rounded" alt="hero" src={img}/>
    </div>
  </div>
</section>
    </Layouts>
  )
}
export default Home
