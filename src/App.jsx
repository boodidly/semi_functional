import React from 'react';
import Sidebar from './components/Sidebar';
import Terminal from './components/Terminal';

function App() {
  return (
    <div className="flex h-screen bg-[#1a1a1a]">
      <Sidebar />
      <Terminal />
    </div>
  );
}

export default App;