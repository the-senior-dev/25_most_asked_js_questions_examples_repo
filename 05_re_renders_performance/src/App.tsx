import React from 'react';
import './App.css';
import { ExcelForm } from './components/ExcelForm';

function App() {
  // Enable dark theme by adding 'dark' class to document element
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="App">
      <ExcelForm />
    </div>
  );
}

export default App;
