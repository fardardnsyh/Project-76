import React, {useState, useEffect} from 'react'
import Headers from './Headers'
import Footer from './Footer'

const Layouts = ({children}) => {
  const [darkMode, setdarkMode] = useState(false);

  useEffect(()=>{
    if(darkMode){
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }

  },[darkMode])

  function toggleTheme(){
  //  document.documentElement.classList.toggle('dark')
   setdarkMode(!darkMode)
  }
  return (
    <>
    <div className={darkMode ? 'bg-black text-white' : ''}>
    <Headers toggleTheme={toggleTheme} darkMode={darkMode}/>
    {children}
    <Footer darkMode={darkMode}/>
    </div>
    </>
    
  )
}

export default Layouts
