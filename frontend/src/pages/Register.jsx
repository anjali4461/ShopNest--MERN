import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        alert(data.message || 'OTP sent to your email.');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while sending OTP.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (res.ok) {
        login(data);
        alert('Registration successful!');
        navigate('/');
      } else {
        alert(data.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error(error);
      alert('OTP verification failed.');
    }
  };

  return (
    <div className="auth-container">
      {!otpSent ? (
        <form onSubmit={handleRegister} className="auth-form">
          <h2>Register</h2>
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn">Send OTP</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="auth-form">
          <h2>Verify OTP</h2>
          <p>OTP has been sent to <strong>{email}</strong></p>
          <input type="text" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <button type="submit" className="btn">Verify & Register</button>
          <button type="button" className="btn btn-secondary" onClick={() => setOtpSent(false)} style={{ marginTop: '10px', background: '#374151' }}>
            Change Email
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;