import React, { useMemo, useState } from 'react';

// const contacts = [
//   { id: 1, username: "Lisa", avatar: "https://i.pravatar.cc/40?img=1" },
//   { id: 2, username: "Suman", avatar: "https://i.pravatar.cc/40?img=2" },
//   { id: 3, username: "Musk", avatar: "https://i.pravatar.cc/40?img=3" },
//   { id: 4, username: "Kaji", avatar: "https://i.pravatar.cc/40?img=4" },
// ];


const ContactList = ({ currentUser, contacts, active, onSelect }) => {
  
    const [findUser, setUser] = useState('');
    const newMessages = ""

    const searchUser = useMemo(() => {
      const query = findUser.trim().toLowerCase();
      if (!query) return contacts;
      return contacts.filter(user =>
        user.username.toLowerCase().includes(query)
      );
    }, [contacts, findUser]);

  
    return (
    
      <aside className="w-64 shrink-0 border-r bg-gray-100 flex flex-col">

      <nav className="flex-0 overflow-y-auto hover:cursor-pointer" onClick={() => onSelect()}>
          <div className="w-full flex items-center gap-3 p-3 text-lef bg-teal-400">
              <img src={currentUser.avatar} alt={currentUser.username} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium uppercase">{currentUser.username}</p>
                {/* <span className="text-xs text-green-600"> online</span> */}
              </div>
          </div>
      </nav>

        <input
          type="text"
          placeholder="Buscar amigos"
          className="m-2 rounded-md px-3 py-2 text-sm border focus:outline-none"
          value={findUser}
          onChange={e => setUser(e.target.value)}
        />
  
        <nav className="flex-1 overflow-y-auto">
          {searchUser.map((user, index) => (
            <button
              key={index}
              onClick={() => onSelect(user)}
              className={`w-full flex items-center gap-3 p-3 text-left hover:bg-gray-300 ${
                active?.id === user.id ? "bg-gray-300" : ""
              }`}
            >
              <img src={user.avatar} alt="asds" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium">{user.username || "user"} </p>
                <span className="text-xs text-green-700"> {newMessages || 1} Mensaje nuevos</span>
              </div>
            </button>
          ))}
        </nav>
      </aside>
    );
  }

export default ContactList;