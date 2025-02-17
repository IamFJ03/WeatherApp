import React,{useState, createContext} from 'react'

export const GlobalContext = createContext(null);

export default function GlobalState({children}) {
  const [savedCity, setSavedCity] = useState([]);
  return <GlobalContext.Provider
  value={
    {savedCity, setSavedCity}
  }
  >
    {children}
  </GlobalContext.Provider>
}
