import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import TeamPage from './pages/TeamPage'; // Asegúrate de tener este componente creado

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/team/:id" element={<TeamPage/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;