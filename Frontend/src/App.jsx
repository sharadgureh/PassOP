import './App.css'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Footer from './Components/Footer'
function App() {
  return (
  <div>
<div className="absolute inset-0 -z-10 h-full w-full bg-purple-50  bg-[size:6rem_4rem]"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5fa,transparent)]"></div></div>
  <Navbar/> 
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/about' element={<About/>}/>
  </Routes>
  <Footer/>
  </div>
  )
}

export default App
