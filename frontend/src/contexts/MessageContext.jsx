import { createContext, useContext, useState } from 'react';

// 1. Create the context
const MessageContext = createContext();

// 2. Create the hook
export const useMessage = () => useContext(MessageContext);

// 3. Create the provider
export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
