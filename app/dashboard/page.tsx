"use client";
import React from 'react'
import AddCourse from './_components/AddCourse'
import History from './_components/History'
import FeedBack from './_components/FeedBack'
import { useRouter } from 'next/navigation';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <AddCourse/> */}
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
        <History/>
        <FeedBack/>
      </div>
    </div>
  )
}

export default Dashboard