import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import Backbutton from '../components/Backbutton';
import { useParams } from 'react-router-dom';

export default function ShowBook() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  console.log("ID:", id)

  useEffect(() => {
      
      const fetchBooks = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:5555/books/${id}`);
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          const data = await response.json();
          setBook(data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
      fetchBooks();
    
  }, [id]);

  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {book ? (
            <div className='flex flex-col border-2 border-sky-400 round-x w-fit p-4'>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Id</span>
                <span>{book._id}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Title</span>
                <span>{book.title}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Author</span>
                <span>{book.author}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
                <span>{book.publishYear}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>Create Time</span>
                <span>{new Date(book.createdAt).toString()}</span>
              </div>
              <div className='my-4'>
                <span className='text-xl mr-4 text-gray-500'>last Updated Time</span>
                <span>{new Date(book.updatedAt).toString()}</span>
              </div>
            </div>
          ) : (
            <p>No data found</p>
          )}
        </>
      )}
    </div>
  );
}
