import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginButton } from '../components/LoginButton';
import { getStoredAccessToken } from '../utils/auth';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getStoredAccessToken();
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Beat the Intro</h1>
      <LoginButton />
    </div>
  );
};