'use client';
import React, { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Header from './_components/Header';
import AddCourse from './_components/AddCourse'


interface DashboardLayoutProps {
  children: ReactNode;
}

interface UserData {
  name: string;
  picture: string;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const localData = localStorage.getItem('response');
    // console.log(localData);
    if (localData) {
      try {
        const data = JSON.parse(localData);
        // console.log(data);
        setUser({
          name: data.name,
          picture: data.picture,
        });
        setLoading(false);
      } catch (error) {
        console.error('Invalid JSON:', error);
        router.push('/auth');
      }
    } else {
      router.push('/auth');
    }
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header name={user?.name} profile={user?.picture} />
      <main className="mx-auto">
        {/* <AddCourse/> */}
        {children}
      </main>
      {/* <div className="p-10 mt-14 md:px-20 lg:px-32 xl:px-56 2xl:px-72">
      </div> */}
    </div>
  );
}
