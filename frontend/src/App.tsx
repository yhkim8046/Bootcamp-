import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>도커 실습</h1>
            <Link to="/practice">
                <button>도커 실습 시작</button>
            </Link>
        </div>
    );
}

function Practice() {
    return <h2>도커 실습 화면</h2>;
}

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/practice" element={<Practice />} />
            </Routes>
        </Router>
    );
};

export default App;
