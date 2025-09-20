import React, { useState } from 'react';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { EnvelopeIcon } from './icons/EnvelopeIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    // Simulate successful login
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <ShieldCheckIcon className="w-16 h-16 text-cyan-400 mx-auto" />
          <h1 className="text-3xl font-bold tracking-tight text-white mt-4">Welcome to SafeJourney</h1>
          <p className="text-slate-400 mt-2">Log in to access your safety dashboard.</p>
        </div>
        
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email Address</label>
              <div className="mt-1 relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password"className="block text-sm font-medium text-slate-300">Password</label>
              <div className="mt-1 relative">
                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            {error && <p className="text-sm text-red-400 text-center">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-cyan-500 disabled:bg-slate-600 transition-all duration-200"
              >
                Log In
              </button>
            </div>
          </form>
          
          <div className="text-center mt-6">
            <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
