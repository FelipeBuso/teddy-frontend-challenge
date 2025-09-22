import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WelcomePage } from "./components/WelcomePage";

const ClientList = () => <div>Client List Page - To be implemented</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/clients" element={<ClientList />} />
      </Routes>
    </Router>
  );
}

export default App;
