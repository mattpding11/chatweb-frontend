import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ContactList from '../components/ContactList';
import ChatBox from '../components/ChatBox';
import useSocket from '../hooks/useSocket';

const Chat = () => {
  
  const socket = useSocket();
  const navigate = useNavigate();
  const [secret, setSecret] = useState('');
  const [activeContact, setActiveContact] = useState(null);

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
  users.forEach((user,index) => {
    if(user.username == currentUser.username){
      users[index].socketId = socket.id;
      currentUser.socketId = socket.id
    }
  });
  localStorage.setItem("users",JSON.stringify(users));
  sessionStorage.setItem("currentUser",JSON.stringify(currentUser));
  localStorage.setItem("newMessages", 0);


  const userList = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) :  [{ id: 2, username: "example Musk", avatar: "https://i.pravatar.cc/40?img=2" }];
  const contacts = userList.filter(user => user.username != currentUser.username);

  useEffect(() => {
    (async () => {
      try {
        const token = sessionStorage.getItem('token');
        const { data } = await api.get('/secret', { headers: { Authorization: `Bearer ${token}` } });
        setSecret(data.msg);
        console.log("token", data.token)
      } catch (err){
        console.log("error",err);
        sessionStorage.removeItem('token');
        navigate('/login');
      }
    })();
  }, [navigate]);

  const logout = async () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("currentUser")
    localStorage.removeItem("users")
    navigate('/login');
  };

  return (
  <div className="h-screen flex">
    <ContactList contacts={contacts} currentUser={currentUser} active={activeContact} onSelect={setActiveContact} />
    {activeContact ? 
    <ChatBox key={currentUser.id} socket={socket} currentUser={currentUser} contact={activeContact} /> :
    <section className="flex-1 flex items-center justify-center text-gray-400">
    Seleccione un contacto para hablar
  </section>}
    <p className="text-gray-700 p-1">{secret} </p>
    <p>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </p>
  </div>
  );

};
export default Chat;

{/* <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <ContactList/>
      <ChatBox/>
      <h1 className="text-3xl font-bold">Chat</h1>
      <p className="text-gray-700">{secret}</p>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div> */}