"use client";
import React, { useState } from 'react'
import Image from "next/image";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CoachingExpert } from '@/services/Options'
  
function UserInputDialog({children, coachingOption}) {
    const [selectedExpert, setSelectedExpert]=useState();
    const [topic, setTopic]=useState();
    const [loading, setLoading]=useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const onClickNext = async () =>{
      setLoading(true);
      // const result = await create
      setLoading(false);
    }
  return (
    <Dialog>
  <DialogTrigger>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{coachingOption.name}</DialogTitle>
      <DialogDescription asChild>
        <div className='mt-3'>
            <h2 className='text-black'>Enter a topic</h2>
            <Textarea onChange={(e)=>setTopic(e.target.value)} placeholder='Enter your topic here...' className='mt-2'/>
            <h2 className='text-black mt-5'>Select your coaching expert</h2>
            <div className='grid grid-cols-3 md:grid-cols-5 gap-6 mt-3'>
                {CoachingExpert.map((expert, index)=>(
                   <div key={index} onClick={() => setSelectedExpert(expert.name)}>
                   <Image 
                    src={expert.avatar}
                    alt={expert.name}
                    width={100}
                    height={100}
                    className={`w-[80px] h-[80px] rounded-2xl p-1 border-primary object-cover hover:scale-105 transition-all cursor-pointer
                        ${selectedExpert==expert.name && 'border'}`}
                    />
                    <h2 className='text-center'>{expert.name}</h2>
                    </div>
                ))}
            </div>
            <div className='flex gap-5 justify-end mt-5'>
                <DialogClose asChild>
                    <Button variant={'ghost'}>Cancel</Button>
                </DialogClose>
                <Button disabled={!topic || !selectedExpert}>Next</Button>
            </div>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default UserInputDialog