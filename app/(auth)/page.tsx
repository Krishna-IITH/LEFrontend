import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './_components/Logo';
import AuthForm from './_components/AuthForm';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>(
    location.pathname === '/signup' ? 'signup' : 'signin'
  );
  
  // Update mode when path changes
  useEffect(() => {
    setMode(location.pathname === '/signup' ? 'signup' : 'signin');
  }, [location.pathname]);

  const handleModeChange = (newMode: 'signin' | 'signup') => {
    setMode(newMode);
    navigate(newMode === 'signin' ? '/signin' : '/signup', { replace: true });
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-brand-400 to-brand-700 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSI+PC9yZWN0PjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSI+PC9yZWN0Pjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="relative z-10">
          <Logo size="lg" className="text-white mb-12" />
          <h1 className="text-4xl font-bold text-white mb-6">Secure, Simple, Seamless</h1>
          <p className="text-white/80 text-lg max-w-md">
            Experience the most elegant authentication system designed for modern applications.
          </p>
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <h3 className="text-white font-medium mb-1">Advanced Security</h3>
              <p className="text-white/70 text-sm">State-of-the-art encryption and protection.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <h3 className="text-white font-medium mb-1">Easy Integration</h3>
              <p className="text-white/70 text-sm">Simple to implement in any application.</p>
            </div>
          </div>
          
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} SecurePortal. All rights reserved.
          </p>
        </div>
        
        {/* Enhanced decorative elements */}
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-brand-300/30 backdrop-blur-sm animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm"></div>
      </div>
      
      {/* Right panel - form */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-8">
        <div className="auth-panel p-8 sm:p-12 w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo className="mx-auto" />
          </div>
          
          <AuthForm mode={mode} onModeChange={handleModeChange} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
