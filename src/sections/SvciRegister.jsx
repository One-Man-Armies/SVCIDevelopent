import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SvciRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    clanCode: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        clanCode: formData.clanCode
      });

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(/backgrounds/SvciLogin.png)` }}>
      
      {/* Main Container - No Navbar needed based on screenshots */}
      <div className="w-full max-w-md p-8 backdrop-blur-[30px] bg-black/60 rounded-lg">
        <h2 className="text-4xl font-bold text-white mb-8 text-center" style={{ fontFamily: 'serif' }}>Register</h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-3xl text-white mb-3 text-center" style={{ fontFamily: 'serif' }}>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-neutral-600 text-white border-none focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-3xl text-white mb-3 text-center" style={{ fontFamily: 'serif' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-neutral-600 text-white border-none focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-3xl text-white mb-3 text-center" style={{ fontFamily: 'serif' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-neutral-600 text-white border-none focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-3xl text-white mb-3 text-center" style={{ fontFamily: 'serif' }}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-neutral-600 text-white border-none focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="clanCode" className="block text-3xl text-white mb-3 text-center" style={{ fontFamily: 'serif' }}>Clan Code</label>
            <input
              type="text"
              id="clanCode"
              name="clanCode"
              value={formData.clanCode}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-neutral-600 text-white border-none focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-3 px-4 rounded hover:bg-yellow-500 transition-colors mt-4 text-2xl"
            style={{ fontFamily: 'serif' }}
          >
            Register
          </button>

          <p className="text-white text-center mt-4">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-yellow-500 hover:text-yellow-400"
              style={{ fontFamily: 'serif' }}
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SvciRegister;
