import React from 'react'
import { Button } from '@/components/ui/button'

function Header() {
  return (
    <div className='flex justify-between p-5 shadow-sm'>
        {/* <Image src={'/globe.svg'} width={50} height={100} alt='no logo'/> */}
        <p className='text-primary'>LEARNEASY</p>
        <Button>Profile</Button>
    </div>
  )
}

export default Header