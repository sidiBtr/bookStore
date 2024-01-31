import {useState, useEffect} from 'react'
import Backbutton from '../components/Backbutton'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'

export default function CreateBook() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const postDataToBackEnd = async (formData) => {
    try{
        const res = await fetch("http://localhost:5555/books", {
          method: "Post",
          headers: {"Content-Type": "application/json" },
          body: JSON.stringify(formData)
        })
        if(!res.ok){throw new Error(`HTTP error ${res.status}`)}
        setLoading(false)
        navigate('/')
    } catch(error){
      console.log(error)
      setLoading(false)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    // extract the data to be sent to the backend
    const formData = {
      title,
      author,
      publishYear
    }
    await postDataToBackEnd(formData)
  }
  return (
    <div className='p-4'>
      <Backbutton/>
      <h1 className='text-3xl my-4'>Create a Book</h1>
      {loading? <Spinner/> : ''}
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Title</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border-3 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Author</label>
        <input
          type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='border-3 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
        <input
          type='number'
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
          className='border-3 border-gray-500 px-4 py-2 w-full'
        />
      </div>
      <button className='p-2 bg-sky-300 m-8' onClick={handleSubmit}>Save</button>
    </div>
  )
}
