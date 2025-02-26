import { HashRouter, Routes, Route } from 'react-router';

import Index from "./pages/index.jsx";
import Random from "./pages/random.jsx";
import Popular from "./pages/popular.jsx";
import New_ from "./pages/new.jsx";
import Id from "./pages/id.jsx";

export function RouterView () {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/random" element={<Random />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/new" element={<New_ />} />
        <Route path="/id/:id" element={<Id />} />
      </Routes>
    </HashRouter>
  )
}
