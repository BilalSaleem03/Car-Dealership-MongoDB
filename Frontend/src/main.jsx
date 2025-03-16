import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import UserContextProvider from './context/UserContextProvider.jsx'
import LoginContextProvider from './context/LoginContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginContextProvider>

    <UserContextProvider>
      <App />
    </UserContextProvider>
    
    </LoginContextProvider>
  </StrictMode>,
)
