import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Alunos from "./pages/Alunos";
import Disciplinas from "./pages/Disciplinas";
import Matricula from "./pages/Matricula";
import ExibirDisciplinas from "./pages/ExibirDisciplinas";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/disciplinas" element={<Disciplinas />} />
        <Route path="/matricula" element={<Matricula />} />
        <Route path="/disciplinas-aluno" element={<ExibirDisciplinas />} />
      </Routes>
    </Router>
  );
}

export default App;
