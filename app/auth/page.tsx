import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthForm from './_components/AuthForm';

const Page: React.FC = () => {
  // Get the client ID from environment variables
  const clientId = process.env.REACT_APP_CLIENT_ID;

  if (!clientId) {
    // Handle the case when the client ID is not defined
    return <div>Error: Google Client ID is missing</div>;
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <GoogleOAuthProvider clientId={clientId}>
        <AuthForm />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Page;
