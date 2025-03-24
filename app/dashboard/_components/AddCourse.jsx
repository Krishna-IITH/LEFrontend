import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from "next/image";
import { CoachingOptions } from '../../../services/Options';


function AddCourse() {
  const user = 'NewUser';
  return (
    <div>
        <div className='flex items-center justify-between'>
        <div>
            <div className='text-2xl'>Hi, 
            <span className='font-bold'> {user}</span></div>
            <p className='text-sm text-gray-500'>Create new course with AI, Share with friends and Earn from it</p>
        </div>
        {/* <Link href={'/create-course'}>
            <Button>+ Create AI Course</Button>
        </Link> */}
    </div>
    <div className='grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-10'>
          {CoachingOptions.map((option, index)=>(
            <div key={index} className='p-3 bg-secondary rounded-3xl flex flex-col justify-center items-center'>
              <Image
              src={option.icon}
              alt={option.name}
              width={150}
              height={150}
              className='h-[70px] w-[70px]'
              priority
              />
              <h2>{option.name}</h2>
            </div>
          ))}
        </div>
    </div>
  )
}

export default AddCourse