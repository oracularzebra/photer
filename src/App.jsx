import { Routes, Route, useNavigate } from 'react-router-dom'
import NotFound from './routes/404'
import Login from './routes/login/Login'
import Home from './routes/home/Home'
import InsertImages from './routes/insert-images/InsertImages'
import OldUploads from './routes/old-uploads/OldUploads'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/insert-images' element={<InsertImages/>}/>
        <Route path='/old-uploads' element={<OldUploads/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </> 
  )
}

export default App
