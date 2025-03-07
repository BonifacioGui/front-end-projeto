import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./Sidebar";
import Home from "./pages/Home";  // Importando a página principal
import Alunos from "./pages/Alunos";  // Outros componentes já criados
import Disciplinas from "./pages/Disciplinas";
import Matriculas from "./pages/Matriculas";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alunos" element={<Alunos />} />
            <Route path="/disciplinas" element={<Disciplinas />} />
            <Route path="/matriculas" element={<Matriculas />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
