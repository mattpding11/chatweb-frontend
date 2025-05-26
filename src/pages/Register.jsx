import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username: username.toLocaleLowerCase(), password, avatar: "https://i.pravatar.cc/60?img=" });
      alert('Registrado!');
      navigate('/login');
    } catch (err) {
      console.log("error",err);
      alert(err.response.data?.msg || 'Registro fallido');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80">
        <h1 className="text-2xl mb-4 text-center font-semibold">Registro</h1>
        <input className="border w-full p-2 mb-3" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="border w-full p-2 mb-3" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-green-600 text-white py-2 rounded mb-2" type="submit">Crear</button>
        <Link className="text-blue-600 text-sm" to="/login">ir al login</Link>
      </form>
    </div>
  );
};
export default Register;

