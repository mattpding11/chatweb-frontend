import { useState, useEffect, useLayoutEffect, useRef } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// eslint-disable-next-line no-unused-vars
const sampleMessages = [
  { id: 1, from: "Lisa", text: "Testing" },
  { id: 2, from: "me", text: "Hi Lisa! How are you?" },
  { id: 3, from: "Lisa", text: "This is a message" },
];

const ChatBox = ({socket, currentUser , contact }) => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const strName = [currentUser.username, contact.username]
  strName.sort();

  let initial = []
  if(localStorage.getItem("messageData_"+strName[0]+"_"+strName[1])){
    initial = JSON.parse(localStorage.getItem("messageData_"+strName[0]+"_"+strName[1]))
  }

  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const [messagesList, setMessagesList] = useLocalStorage("messageData_"+strName[0]+"_"+strName[1], initial)

  const c = currentUser;
  c.socketId = socket.id;
  sessionStorage.setItem('currentUser', JSON.stringify(c));

  useEffect(() => {

    const refreshMessages = (msg) => {
      if(msg.to == currentUser.username || msg.toID == socket.id ){
        console.log("xxx",msg)
        setMessagesList(JSON.parse(localStorage.getItem("messageData_"+strName[0]+"_"+strName[1])));
      }else{
        return;
      }
      // const stored = JSON.parse(localStorage.getItem('messagesData'));
      // localStorage.setItem('messagesData', JSON.stringify(stored));
      // setMessagesList(stored);  
    };

    // event listener
    socket.on("server-message",refreshMessages);

    return () => socket.off('server-message', refreshMessages);

  }, [contact, currentUser, setMessagesList, socket, strName]);


  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    // salto instantáneo
    node.scrollTop = node.scrollHeight
    setMessage("");
  }, [contact, messagesList]);

  console.log("My SocketID", socket.id)

  const handleSubmit = (e) =>{

    e.preventDefault()

    if (!message.trim()) return;

    // event emit 
    if(contact.socketId) {
      socket.emit("client-message",
        {from: currentUser.username, fromID:socket.id , to: contact.username, toID: contact.socketId, text: message});

      setMessagesList((prev) => [
        ...prev,
        { id: prev.length + 1, from: currentUser.username, fromID:socket.id , to: contact.username,toID: contact.socketId, text: message, },
      ]);
      setCount(c=>c+1)
    }

    setMessage('');
  }

  console.log("count", count)
 

  return (
    <section className="flex-1 flex flex-col">
      {/* Header */}
      <header className="h-14 flex items-center gap-3 px-4 border-b shadow-sm">
        <img src={contact.avatar} alt="" className="w-8 h-8 rounded-full" />
        <h2 className="font-semibold">{contact.username}</h2>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-gray-50 scroll" ref={containerRef}>
        {messagesList.map((message) => (
          <div
            key={message.id}
            className={`max-w-xs ${
              message.from === currentUser.username ? "self-end text-right" : "self-start"
            }`}
          >
            <p
              className={`inline-block px-4 py-2 rounded-lg ${
                message.from === currentUser.username ? "bg-teal-200" : "bg-gray-200"
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </main>

      {/* Input */}
        <form onSubmit={handleSubmit} className="h-16 flex items-center gap-2 px-4 border-t" action="">
          <input
            placeholder="Type a message…"
            className="flex-1 px-4 py-2 rounded-full border focus:outline-none"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button
            className="px-4 py-2 bg-teal-600 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!contact.socketId || !message}
          >
            Enviar
          </button>
        </form>
    </section>
  );
};

export default ChatBox;
