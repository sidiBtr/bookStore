import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'
import Home from './pages/Home';
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import ShowBook from './pages/ShowBook';
function App() {

  return (
    <div className='bg-orange-50 text-black'>
      <Router>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/books/create' element={<CreateBook/>}/>
          <Route path='/books/details/:id' element={<ShowBook/>}/>
          <Route path='/books/edit/:id' element={<EditBook/>}/>
          <Route path='/books/delete/:id' element={<DeleteBook/>}/>
        </Routes>
      </Router>
    </div>
      


  )
}

export default App
