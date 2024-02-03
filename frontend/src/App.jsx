import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/home/Home'
import EditRoom from './components/room/EditRoom';
import ExistingRooms from './components/room/ExistingRooms';
import AddRoom from './components/room/AddRoom';
import NavBar from './components/layout/NavBar/NavBar';
import Footer from './components/layout/Footer/Footer';
import Login from './components/auth/Login/Login';

function App(){
  return (
    <>
    <main>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/existing-rooms" element={<ExistingRooms />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <Footer />
    </main>
    </>
  );
}
export default App




// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/
