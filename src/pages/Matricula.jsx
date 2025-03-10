import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/global.css";

function Matricula() {
  const [alunoId, setAlunoId] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);

  // Recuperando o ID do aluno do localStorage
  useEffect(() => {
    const storedAlunoId = localStorage.getItem("alunoId");
    if (storedAlunoId) {
      setAlunoId(storedAlunoId);
    } else {
      // Redireciona para o login se o aluno não estiver logado
      window.location.href = "/login";
    }

    // Busca das disciplinas disponíveis
    const fetchDisciplinas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/disciplinas");
        setDisciplinas(response.data);
      } catch (error) {
        console.error("Erro ao buscar disciplinas:", error);
      }
    };

    fetchDisciplinas();
  }, []);

  const matricular = async () => {
    try {
      if (!alunoId || !disciplinaId) {
        alert("Por favor, forneça o ID do aluno e escolha uma disciplina.");
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/disciplinas/${disciplinaId}/associar`, 
        { alunoId }
      );

      alert("Matrícula realizada!");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao matricular aluno:", error);
      alert("Erro ao realizar matrícula.");
    }
  };

  return (
    <div className="matricula-page">
      <div className="matricula-container">
        <h2 className="matricula-title">Matricular Aluno na Disciplina</h2>

        {/* Formulário de Matrícula */}
        <div className="matricula-form">
          <div className="matricula-form-group">
            <label htmlFor="alunoId" className="matricula-form-label">
              ID do Aluno
            </label>
            <input
              type="text"
              id="alunoId"
              className="matricula-form-input"
              placeholder="ID do Aluno"
              value={alunoId}
              readOnly // O ID do aluno é apenas exibido e não editável
            />
          </div>

          <div className="matricula-form-group">
            <label htmlFor="disciplinaId" className="matricula-form-label">
              Selecionar Disciplina
            </label>
            <select
              id="disciplinaId"
              className="matricula-form-input"
              value={disciplinaId}
              onChange={(e) => setDisciplinaId(e.target.value)}
            >
              <option value="">Escolha uma disciplina</option>
              {disciplinas.map((disciplina) => (
                <option key={disciplina._id} value={disciplina._id}>
                  {disciplina.nome} - {disciplina.codigo}
                </option>
              ))}
            </select>
          </div>

          <button className="matricula-form-button" onClick={matricular}>
            Matricular
          </button>
        </div>
      </div>
    </div>
  );
}

export default Matricula;
