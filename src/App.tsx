import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
