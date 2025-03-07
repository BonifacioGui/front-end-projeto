import { useState } from "react";
import axios from "axios";

function ExibirDisciplinas() {
  const [alunoId, setAlunoId] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);

  const buscarDisciplinas = async () => {
    const res = await axios.get(`http://localhost:5000/matriculas/${alunoId}`);
    setDisciplinas(res.data);
  };

  return (
    <div>
      <h2>Disciplinas do Aluno</h2>
      <input type="text" placeholder="ID do Aluno" onChange={(e) => setAlunoId(e.target.value)} />
      <button onClick={buscarDisciplinas}>Buscar</button>

      <ul>
        {disciplinas.map((d, index) => (
          <li key={index}>{d.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default ExibirDisciplinas;
