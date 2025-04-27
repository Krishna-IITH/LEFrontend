import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, Github, X } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onModeChange: (mode: 'signin' | 'signup') => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onModeChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (mode === 'signup' && !name)) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (mode === 'signin') {
        toast({
          title: "Success",
          description: "You have successfully signed in!",
        });
      } else {
        toast({
          title: "Account created",
          description: "Your account has been created successfully!",
        });
      }
    }, 1500);
  };
  
  // Social authentication handler
  const handleSocialAuth = (provider: string) => {
    setIsLoading(true);
    
    // Simulate API call for social authentication
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Social Authentication",
        description: `Authenticating with ${provider}...`,
      });
    }, 1000);
  };

  return (
    <div className="w-full max-w-md animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {mode === 'signin' ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-gray-500">
            {mode === 'signin' 
              ? 'Enter your credentials to access your account' 
              : 'Fill out the form to get started'}
          </p>
        </div>
        
        {/* Social Authentication Buttons */}
        <div className="space-y-3">
          <Button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
            onClick={() => handleSocialAuth('Google')}
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
          
          <Button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 bg-[#24292e] hover:bg-[#2c3339] text-white"
            onClick={() => handleSocialAuth('GitHub')}
            disabled={isLoading}
          >
            <Github size={20} />
            Continue with GitHub
          </Button>
          
          <Button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#0b5fcc] text-white"
            onClick={() => handleSocialAuth('Facebook')}
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="white">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </Button>
        </div>
        
        <div className="relative flex items-center justify-center">
          <Separator className="absolute w-full" />
          <span className="relative px-4 bg-white/70 backdrop-blur-sm text-sm text-gray-500">or continue with email</span>
        </div>
        
        {mode === 'signup' && (
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input pl-10 focus:border-brand-300"
                placeholder="John Doe"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input pl-10 focus:border-brand-300"
              placeholder="your@email.com"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Mail size={20} />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            {mode === 'signin' && (
              <a href="#" className="text-xs font-medium text-brand-600 hover:text-brand-700">
                Forgot password?
              </a>
            )}
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input pl-10 focus:border-brand-300"
              placeholder={mode === 'signin' ? "Enter your password" : "Create a strong password"}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Lock size={20} />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <button
          type="submit"
          className="auth-button mt-6"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin mr-2">
                <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <span>{mode === 'signin' ? 'Signing in...' : 'Creating account...'}</span>
            </div>
          ) : (
            <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
          )}
        </button>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => onModeChange(mode === 'signin' ? 'signup' : 'signin')}
              className="ml-1 font-medium text-brand-600 hover:text-brand-700"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </form>
      
      {/* Terms and privacy */}
      <p className="mt-8 text-center text-xs text-gray-500">
        By continuing, you agree to our{' '}
        <a href="#" className="underline text-brand-600 hover:text-brand-700">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="underline text-brand-600 hover:text-brand-700">Privacy Policy</a>.
      </p>
    </div>
  );
};

export default AuthForm;
