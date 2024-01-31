import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Backbutton from '../components/Backbutton';
import Spinner from '../components/Spinner';

const DeleteBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5555/books/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const deleteBook = async () => {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:5555/books/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      // Handle success, e.g., show confirmation or redirect
      navigate('/'); // Redirect to the book list or another page
    } catch (error) {
      console.error('Error deleting book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <p>Are you sure you want to delete the book "{book.title}"?</p>
          <div className='flex'>
            <button className='p-2 bg-red-500 m-2' onClick={deleteBook}>
              Yes, Delete
            </button>
            <button className='p-2 bg-sky-300 m-2' onClick={() => navigate(`/books/details/${id}`)}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteBook;
