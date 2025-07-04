

import React, { useState } from 'react';
import { LogoIcon } from '../constants';

interface SignUpProps {
  onSignUp: (firstName: string, lastName: string, email: string, password: string) => Promise<string | void>;
  onBackToLogin: () => void;
  onBackToHome: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, onBackToLogin, onBackToHome }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== repeatPassword) {
            setError('As senhas não coincidem.');
            return;
        }
        setError(null);
        setIsLoading(true);
        const result = await onSignUp(firstName, lastName, email, password);
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
                Create your account
            </h2>
            <p className="text-center text-sm text-gray-600">
                to start your journey with MindfulMe
            </p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-gray-200/80">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex space-x-4">
                  <div className="w-1/2">
                      <label htmlFor="first-name" className="text-sm font-medium text-gray-700">First Name</label>
                      <div className="mt-1">
                          <input
                            id="first-name"
                            name="first-name"
                            type="text"
                            autoComplete="given-name"
                            required
                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 bg-white text-gray-900 placeholder-gray-500 focus:z-10 focus:border-brand-blue focus:outline-none focus:ring-brand-blue sm:text-sm"
                            placeholder="John"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                      </div>
                  </div>
                  <div className="w-1/2">
                      <label htmlFor="last-name" className="text-sm font-medium text-gray-700">Last Name</label>
                      <div className="mt-1">
                          <input
                            id="last-name"
                            name="last-name"
                            type="text"
                            autoComplete="family-name"
                            required
                            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 bg-white text-gray-900 placeholder-gray-500 focus:z-10 focus:border-brand-blue focus:outline-none focus:ring-brand-blue sm:text-sm"
                            placeholder="Doe"
                             value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                      </div>
                  </div>
              </div>
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
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                  <div className="mt-1">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 bg-white text-gray-900 placeholder-gray-500 focus:z-10 focus:border-brand-blue focus:outline-none focus:ring-brand-blue sm:text-sm"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
              </div>
               <div>
                  <label htmlFor="repeat-password" className="text-sm font-medium text-gray-700">Repeat Password</label>
                  <div className="mt-1">
                    <input
                        id="repeat-password"
                        name="repeat-password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 bg-white text-gray-900 placeholder-gray-500 focus:z-10 focus:border-brand-blue focus:outline-none focus:ring-brand-blue sm:text-sm"
                        placeholder="••••••••"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
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
                  {isLoading ? 'Criando conta...' : 'Create Account'}
                </button>
              </div>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); onBackToLogin(); }} className="font-medium text-brand-blue hover:text-brand-blue-dark">
                Sign in
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
export default SignUp;
