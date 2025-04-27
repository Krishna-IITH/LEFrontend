"use client";
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { useGoogleLogin } from '@react-oauth/google';
import { Card } from "@/components/ui/card";
import axios from 'axios';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();


const handleSocialAuth = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      const accessToken = tokenResponse.access_token;
      console.log('Access Token', accessToken);

      const response = await axios.post('http://localhost:8000/auth', 
        {
        access_token: accessToken,
      },
      {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    localStorage.setItem('response', JSON.stringify(response.data));
    setEmail(response.data.email);
    setName(response.data.name);
    router.push('/dashboard');
    }
    catch (error) {
      console.error('Authentication failed:', error);
    }
  },
  onError: error => console.error('Login Failed:', error)
});
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-4xl overflow-hidden flex flex-col md:flex-row shadow-lg py-0">
        {/* Left side - Purple section with illustration */}
        <div className="w-full md:w-1/2 bg-[#7C3AED] flex flex-col items-center justify-center text-white p-8">
          <h1 className="text-4xl font-light mb-8">LEARNEASY</h1>
          <div className="w-80 h-80">
            <img
              src="/medi.png"
              alt="Meditation illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right side - Sign in form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="max-w-sm mx-auto">
            <div className="mb-8">
              <h2 className="text-purple-600 text-lg font-medium mb-2">LEARNEASY</h2>
              <h3 className="text-2xl font-bold mb-6">SIGN UP/ SIGN IN</h3>
              
              {/* Google Sign in Button */}
              <GoogleOAuthProvider clientId="789097182476-l7dtpvvl8dfb97ntjqsjo7v3mqqf1lts.apps.googleusercontent.com">
                
           <Button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
            onClick={() => handleSocialAuth()}
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </Button>
       </GoogleOAuthProvider>

              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  {/* <span className="px-2 bg-white text-gray-500">Or</span> */}
                </div>
              </div>

              {/* Mobile Number Input */}
              {/* <div className="relative">
                <Input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  className="pr-12"
                />
                <Button
                  size="icon"
                  className="absolute right-1 top-1 h-[calc(100%-8px)]"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div> */}

              {/* Forgot Password Link */}
              {/* <a
                href="#"
                className="block mt-4 text-purple-600 hover:underline text-sm"
              >
                Forgot your password? Click here
              </a> */}

              {/* Terms and Conditions */}
              {/* <p className="mt-8 text-sm text-gray-600">
                Terms and Conditions: Pellentesque dapibus libero ut scelerisque
                convallis. Nulla facilisi. Suspendisse vestibulum euismod finibus.
              </p> */}
              <p className="mt-8 text-center text-xs text-gray-500">
                By continuing, you agree to our{' '}
                <a href="#" className="underline text-brand-600 hover:text-brand-700">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="underline text-brand-600 hover:text-brand-700">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AuthForm;
