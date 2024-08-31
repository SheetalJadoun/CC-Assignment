import { useState } from 'react';

interface ChatProps {
  userId: string;
}

const Chat = ({ userId }: ChatProps) => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState<{ role: string; content: string }[]>([]);

  const handleSendMessage = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, message }),
    });

    const data = await res.json();
    setResponses([...responses, { role: 'user', content: message }, { role: 'assistant', content: data.message }]);
    setMessage('');
  };

  return (
    <div>
      <div>
        {responses.map((response, index) => (
          <div key={index} className={response.role === 'user' ? 'user-message' : 'assistant-message'}>
            {response.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
