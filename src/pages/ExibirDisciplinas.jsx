import { useState } from "react";
import axios from "axios";
import "../styles/global.css"; // Ajuste o caminho conforme necessário

function ExibirDisciplinas() {
  const [alunoId, setAlunoId] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);

  const buscarDisciplinas = async () => {
    const res = await axios.get(`http://localhost:5000/matriculas/${alunoId}`);
    setDisciplinas(res.data);
  };

  return (
    <div className="disciplinas-page">
      <div className="disciplinas-container">
        <h2 className="disciplinas-title">Disciplinas do Aluno</h2>
        <input
          type="text"
          placeholder="ID do Aluno"
          onChange={(e) => setAlunoId(e.target.value)}
          className="disciplinas-input"
        />
        <button onClick={buscarDisciplinas} className="disciplinas-button">
          Buscar
        </button>

        <ul className="disciplinas-list">
          {disciplinas.map((d, index) => (
            <li key={index} className="disciplinas-item">
              {d.nome}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExibirDisciplinas;