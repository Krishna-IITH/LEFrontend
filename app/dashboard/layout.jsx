import React from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'
function DashboardLayout({children}) {
  return (
    <div>
      <Header/>
      <div className='p-10 mt-14 md:px-20 lg:px-32 xl:px-56 2xl:px-72'>
        {children}
      </div>
    </div>
    // <div>
    //     <div className='md:w-64 md-block'>
    //         <SideBar/>
    //     </div>
    //     <div className='md:ml-64'>
    //         <Header/>
    //         <div className='p-10'>
    //         {children}
    //         </div>
    //     </div>
    // </div>
  )
}

export default DashboardLayout