

import React, { useState } from 'react';
import { LogoIcon } from '../constants';


interface LoginProps {
  onLogin: (email: string, password: string) => Promise<string | void>;
  onShowSignUp: () => void;
  onBackToHome: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onShowSignUp, onBackToHome }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setIsLoading(true);
        const result = await onLogin(email, password);
        if (result) {
            setError(result);
        }
        setIsLoading(false);
    };

  return (
    <div className="flex items-center justify-center py-12 sm:py-24">
      <div className="w-full max-w-md space-y-8">
         <div className="flex justify-center items-center flex-col space-y-4">
             <LogoIcon />
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
            </h2>
            <p className="text-center text-sm text-gray-600">
                to continue to MindfulMe
            </p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-200/80">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="email-address" className="text-sm font-medium text-gray-700">Email address</label>
                  <div className="mt-1">
                      <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 bg-white text-gray-900 placeholder-gray-500 focus:z-10 focus:border-brand-blue focus:outline-none focus:ring-brand-blue sm:text-sm"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>
              </div>
              <div>
                  <label htmlFor="password-address" className="text-sm font-medium text-gray-700">Password</label>
                  <div className="mt-1">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 bg-white text-gray-900 placeholder-gray-500 focus:z-10 focus:border-brand-blue focus:outline-none focus:ring-brand-blue sm:text-sm"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-brand-blue hover:text-brand-blue-dark">
                    Forgot your password?
                  </a>
                </div>
              </div>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative flex w-full justify-center rounded-lg border border-transparent bg-brand-blue py-3 px-4 text-base font-semibold text-white hover:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 transition-colors disabled:bg-brand-blue/50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Entrando...' : 'Sign in'}
                </button>
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); onShowSignUp(); }} className="font-medium text-brand-blue hover:text-brand-blue-dark">
                Sign up
              </a>
            </p>
        </div>
        <div className="text-center">
            <button 
                onClick={(e) => { e.preventDefault(); onBackToHome();}}
                className="font-medium text-sm text-gray-600 hover:text-brand-blue transition-colors"
            >
                &larr; Back to Home
            </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
