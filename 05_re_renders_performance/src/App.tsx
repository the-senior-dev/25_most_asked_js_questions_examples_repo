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
      <div className="mb-2 mt-2 w-48 mx-auto">
        <img src="/the_senior_dev_white.png" alt="" className='max-w-full mx-auto w-12 ' width={100} height={18}/>
      </div>
      <ExcelForm />
    </div>
  );
}

export default App;
