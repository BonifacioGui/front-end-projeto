import { useState, useEffect } from "react";
import axios from "axios";

function Disciplinas() {
  const [disciplina, setDisciplina] = useState({ nome: "", cargaHoraria: "" });
  const [disciplinas, setDisciplinas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/disciplinas").then((res) => setDisciplinas(res.data));
  }, []);

  const cadastrarDisciplina = async () => {
    const res = await axios.post("http://localhost:5000/disciplinas", disciplina);
    setDisciplinas([...disciplinas, res.data]);
  };

  return (
    <div>
      <h2>Cadastro de Disciplina</h2>
      <input type="text" placeholder="Nome" onChange={(e) => setDisciplina({ ...disciplina, nome: e.target.value })} />
      <button onClick={cadastrarDisciplina}>Cadastrar</button>

      <h3>Lista de Disciplinas</h3>
      <ul>
        {disciplinas.map((d, index) => (
          <li key={index}>{d.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default Disciplinas;
