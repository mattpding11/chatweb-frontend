import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const useAuth = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  return { token, setToken };
};
export default useAuth;