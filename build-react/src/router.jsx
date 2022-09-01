import { HashRouter, Routes, Route } from 'react-router-dom';

import Index from "./pages/index.jsx";
import Random from "./pages/random.jsx";
import Popular from "./pages/popular.jsx";
import New_ from "./pages/new.jsx";
import Id from "./pages/id.jsx";

export function RouterView () {return (
    <HashRouter>
        <Routes>
            <Route path="/" exact element={<Index />} />
            <Route path="/random" exact element={<Random />} />
            <Route path="/popular" exact element={<Popular />} />
            <Route path="/new" exact element={<New_ />} />
            <Route path="/id/:id" exact element={<Id />} />
        </Routes>
    </HashRouter>
)}