import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const currentUser = {
  //   username: username,
  //   avatar: "https://i.pravatar.cc/60?img=0"
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { username: username.toLowerCase() , password });
      localStorage.setItem("users",JSON.stringify(data.userList));
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('currentUser',JSON.stringify(data.user));
      navigate('/chat');
    } catch (err) {
      console.log("error",err);
      alert(err.response?.data?.msg || 'Login fallido');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80">
        <h1 className="text-2xl mb-4 text-center font-semibold">Iniciar Sesion</h1>
        <input className="border w-full p-2 mb-3" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="border w-full p-2 mb-3" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-500 text-white py-2 rounded mb-2" type="submit">Enter</button>
        <Link className="text-blue-600 text-sm" to="/register">Crear cuenta</Link>
      </form>
    </div>
  );
};
export default Login;