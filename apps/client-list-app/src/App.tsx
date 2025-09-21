import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import ClientList from "./pages/ClientList";

function App() {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // Pega o nome do usuário do localStorage
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* A rota para a tela de clientes. Passamos o nome do usuário como prop */}
        <Route path="/clients" element={<ClientList userName={userName} />} />

        {/*
          Se você quiser testar as duas aplicações juntas,
          pode adicionar a rota para o welcome-app aqui.
          <Route path="/" element={<WelcomeForm />} />
        */}
      </Routes>
    </Router>
  );
}

export default App;
