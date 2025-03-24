"use client";
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { HiHome } from "react-icons/hi2";
import { MdOutlineExplore } from "react-icons/md";
import { GrUpgrade } from "react-icons/gr";
import { TbLogout2 } from "react-icons/tb";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { Progress } from "@/components/ui/progress"

import Link from 'next/link';

function SideBar() {
    const Menu = [
        {
          id: 1,
          name: 'Home',
          icon: <HiHome />,
          path: '/dashboard',
        },
        {
          id: 2,
          name: 'Explore',
          icon: <MdOutlineExplore />,
          path: '/dashboard/explore',
        },
        {
          id: 3,
          name: 'Upgrade',
          icon: <GrUpgrade />,
          path: '/dashboard/upgrade',
        },
        {
          id: 4,
          name: 'Jobs',
          icon: <BsFillSuitcaseLgFill />      ,
          path: '/dashboard/jobs',
        },
        {
          id: 5,
          name: 'Logout',
          icon: <TbLogout2 />,
          path: '/dashboard/logout',
        },
      ];

      const path = usePathname();


  return (
    <div className='fixed h-full md:w-64 p-5 shadow-md'>
        <p className='text-primary'>LEARNEASY</p>
        <hr className='my-5'/>
        <ul>
        {Menu.map((item) => (
          <li key={item.id}>
            <Link href={item.path}>
              <div
                className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3 ${
                  item.path === path && 'bg-gray-100 text-black'
                }`}
              >
                <div className="text-2xl">{item.icon}</div>
                <h2>{item.name}</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className='absolute bottom-10 w-[80%]'>
        <Progress value={33} />
        <h2 className="text-sm my-2">3 out of 5 created</h2>
        <h2 className="text-xs text-gray-500">
          Upgrade your plan for unlimited course generation
        </h2>
      </div>
    </div>
  )
}

export default SideBar