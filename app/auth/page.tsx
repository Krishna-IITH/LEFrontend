"use client";
import React, {useState, useEffect} from 'react'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/dist/server/api-utils';
import AuthForm  from './_components/AuthForm';


function page() {
    const router = useRouter();
    
    const [mode, setMode] = useState<'signin' | 'signup'>(
        // location.pathname === '/signup' ? 'signup' : 'signin'
      );
        // useEffect(() => {
        //   setMode(location.pathname === '/signup' ? 'signup' : 'signin');
        // }, [location.pathname]);
      
        const handleModeChange = (newMode: 'signin' | 'signup') => {
          setMode(newMode);
        //   router.push(newMode === 'signin' ? '/signin' : '/signup', { replace: true });
        };
  return (
    <div className='flex justify-center items-center align-middle h-[100v]'>
        <GoogleOAuthProvider clientId="789097182476-l7dtpvvl8dfb97ntjqsjo7v3mqqf1lts.apps.googleusercontent.com">
        <AuthForm mode={mode} onModeChange={handleModeChange} />
        </GoogleOAuthProvider>
    </div>
  )
}

export default page
