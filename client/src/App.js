import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './API/ProtectedRoute'
import Login from './Auth/Login';
import Register from './Auth/Register';
import AdminHome from './pages/adminpages/AdminHome'
import Addjob from './pages/adminpages/Addjob'
import Alljobs from './pages/adminpages/Alljobs';
import EditJob from './pages/adminpages/EditJob';
import UpdateProfile from './pages/adminpages/UpdateProfile'
function App() {

  return (
   <>
    <BrowserRouter>
    <Routes>
    <Route  path='/' element={<Home/>}/>
    <Route  path='/register' element={<Register/>}/>
    <Route  path='/login' element={<Login/>}/>
    <Route  path='/adminhome' element={<ProtectedRoute><AdminHome/></ProtectedRoute>}/>
    <Route  path='/addjob' element={<ProtectedRoute><Addjob/></ProtectedRoute>}/>
    <Route  path='/alljob' element={<ProtectedRoute><Alljobs/></ProtectedRoute>}/>
    <Route  path='/editjob/:id' element={<ProtectedRoute><EditJob/></ProtectedRoute>}/>
    <Route  path='/updateprifile' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
