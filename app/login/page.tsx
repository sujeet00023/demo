'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ParticleBackground from '../components/ParticleBackground';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login check
    if (email && password) {
      // Redirect to dashboard
      router.push('/dashboard'); // make sure you have a route for /dashboard
    } else {
      alert('Please fill in both fields');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white bg-gradient-to-br from-sky-100 via-white to-blue-100 text-deepblue overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Login Form Card */}
      <div className="relative z-10 w-full max-w-md px-6 py-10 bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-2xl space-y-6">
        <h2 className="text-3xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-400 drop-shadow-md">
          Welcome
        </h2>
        <p className="text-center text-sm text-blue-300">Login to your CRM account</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••••"
            />
          </div>
          <div className="text-right text-sm text-purple-500 hover:underline cursor-pointer">
            Forgot password?
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full text-white font-semibold hover:opacity-90 transition duration-300 cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
