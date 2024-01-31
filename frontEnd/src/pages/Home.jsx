import {useState, useEffect} from 'react'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md'
import BooksCard from '../components/home/BooksCard'
import BooksTable from '../components/home/BooksTable'

export default function Home() {
  const [books, setBooks] = useState({})
  const [loading, setLoading] = useState(true)
  const [showType, setShowType] = useState('table')
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5555/books")
        if(!response.ok) {`Http errors ${response.status}`}
        const data = await response.json()
        setLoading(false)
        setBooks(data.data)
      } catch(error)
      {
        console.log(error)
        setLoading(false)      
      }
    }
    fetchBooks()
  }, [])
  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button className='bg-sky-300 hover:bg-sky-600 px-2 py-2 rounded-lg '
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button className='bg-sky-300 hover:bg-sky-600 px-2 py-2 rounded-lg '
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Book List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl'/>
        </Link>
      </div>
      {loading ?(
        <Spinner/>
      ) 
      : showType === 'table' ?  (<BooksTable books={books}/>): (<BooksCard books = {books}/>)

      
      }
    </div>
  )
}
