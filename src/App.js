import React from 'react';
import './App.css';
import {Main} from "./components/Main";
import {GlobalProvider} from "./Context/GlobalState";


function App() {
  return (
    <div className="App">
    <GlobalProvider>
      <h1>Contact Manager</h1>
        <Main />
    </GlobalProvider>
    
    </div>
  );
}

export default App;