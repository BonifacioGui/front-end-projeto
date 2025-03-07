import { useState } from "react";
import axios from "axios";

function Matricula() {
  const [alunoId, setAlunoId] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("");

  const matricular = async () => {
    await axios.post("http://localhost:5000/matriculas", { alunoId, disciplinaId });
    alert("Matrícula realizada!");
  };

  return (
    <div>
      <h2>Matricular Aluno</h2>
      <input type="text" placeholder="ID do Aluno" onChange={(e) => setAlunoId(e.target.value)} />
      <input type="text" placeholder="ID da Disciplina" onChange={(e) => setDisciplinaId(e.target.value)} />
      <button onClick={matricular}>Matricular</button>
    </div>
  );
}

export default Matricula;
