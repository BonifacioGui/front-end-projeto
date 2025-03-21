import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home"; // Importando a página principal
import Alunos from "./pages/Alunos"; // Outros componentes já criados
import Disciplinas from "./pages/Disciplinas";
import MinhasDisciplinas from "./pages/MinhasDisciplinas";
import Matriculas from "./pages/Matricula";
import Login from "./pages/Login";
import "./styles/global.css"; // Importando o CSS global



function App() {
  return (
    <Router>
      {/* Header */}
      <Header />

      {/* Layout Principal */}
      <div className="main-layout">

        {/* Conteúdo das Páginas */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alunos" element={<Alunos />} />
            <Route path="/disciplinas" element={<Disciplinas />} />
            <Route path="/minhas-disciplinas" element={<MinhasDisciplinas />} />
            <Route path="/matriculas" element={<Matriculas />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;