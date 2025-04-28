import React from 'react'
import Link from 'next/link';
import { BlurFade } from '@/components/magicui/blur-fade';
import { Button } from '@/components/ui/button';
import UserInputDialog  from '../_components/UserInputDialog';
import Image from "next/image";
import { CoachingOptions } from '../../../services/Options';


function AddCourse() {
  return (
    <div>
    <div className='grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-10 mt-10'>
          {CoachingOptions.map((option, index)=>(
             <BlurFade key={option.icon} delay={0.25 + index * 0.05} inView>
            <div key={index} className='p-3 bg-secondary rounded-3xl flex flex-col justify-center items-center'>
            <UserInputDialog coachingOption={option}>
              <Image
              src={option.icon}
              alt={option.name}
              width={150}
              height={150}
              className='h-[70px] w-[70px] hover:rotate-12 cursor-pointer transition-all'
              priority
              />
              <h2 className='mt-2'>{option.name}</h2>
              </UserInputDialog>
            </div>
            </BlurFade>
          ))}
        </div>
    </div>
  )
}

export default AddCourse