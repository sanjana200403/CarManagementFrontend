import { useState } from 'react'
import './App.css'
import Login from './Pages/Login'
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import Register from './Pages/Register'
import AddProduct from './Pages/AddProduct'
import Home from './Pages/Home'
import Navbar from './components/Navbar'
import EditProduct from './Pages/EditProduct'
import CarDetail from './Pages/CarDetails'
import MyCars from './Pages/MyCars'
import { Toaster } from 'react-hot-toast';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/addProduct' element={<AddProduct/>}/>
      <Route path='/:id/update' element={<EditProduct/>}  />
      <Route path='/:id' element={<CarDetail/>}  />
      <Route path='/myCars' element={<MyCars/>} />
      <Route path='/myCars/:id' element={<CarDetail/>} />
    </Routes>
    <Toaster/>
    </BrowserRouter>
   {/* <Login/> */}
    </>
  )
}

export default App
