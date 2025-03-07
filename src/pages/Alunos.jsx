import { useState, useEffect } from "react";
import axios from "axios";

function Alunos() {
  const [aluno, setAluno] = useState({ nome: "", endereco: "", curso: "" });
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/alunos").then((res) => setAlunos(res.data));
  }, []);

  const cadastrarAluno = async () => {
    const res = await axios.post("http://localhost:5000/alunos", aluno);
    setAlunos([...alunos, res.data]);
  };

  return (
    <div>
      <h2>Cadastro de Aluno</h2>
      <input type="text" placeholder="Nome" onChange={(e) => setAluno({ ...aluno, nome: e.target.value })} />
      <button onClick={cadastrarAluno}>Cadastrar</button>

      <h3>Lista de Alunos</h3>
      <ul>
        {alunos.map((a, index) => (
          <li key={index}>{a.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default Alunos;
