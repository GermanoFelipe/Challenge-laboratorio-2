import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.tsx';
import Characterpage from './pages/character/character.tsx';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/character/:id" element={<Characterpage/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;