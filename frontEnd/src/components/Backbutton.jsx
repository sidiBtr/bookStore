import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function Backbutton({destination = '/'}) {
  return (
    <div>
      <Link to={destination} className='bg-sky-800 text-black px-4 py-1 rounded-lg w-full'>
        <BsArrowLeft className='text-2xl'/>
      </Link>
    </div>
  )
}
