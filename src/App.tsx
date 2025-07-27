import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';
import Header from './Components/Header/Header';


function App() {
  return (
    <div className="App">
            <Header/>
            
     <Router>

        <AppRoutes/>

     </Router>
    </div>
  );
}

export default App;
