import { useState } from 'react'
 
import './App.css'
import Header from './Components/Header'
import Main from './Components/Main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Header />
       <Main />
    </>
  )
}

export default App
