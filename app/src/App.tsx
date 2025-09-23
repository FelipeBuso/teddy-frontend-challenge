import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import ClientList from "./pages/ClientList";
import { WelcomePage } from "./pages/WelcomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<WelcomePage />} />
        <Route path="/clients" element={<ClientList />} />
      </Routes>
    </Router>
  );
}

export default App;
