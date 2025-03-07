import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css"; // Importando o CSS moderno

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
    <div className="container mt-4">
      <h2 className="mb-4">Cadastro de Aluno</h2>
      
      {/* Formulário para cadastro */}
      <div className="form-group">
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          className="form-control"
          placeholder="Nome"
          onChange={(e) => setAluno({ ...aluno, nome: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="endereco">Endereço</label>
        <input
          type="text"
          id="endereco"
          className="form-control"
          placeholder="Endereço"
          onChange={(e) => setAluno({ ...aluno, endereco: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="curso">Curso</label>
        <input
          type="text"
          id="curso"
          className="form-control"
          placeholder="Curso"
          onChange={(e) => setAluno({ ...aluno, curso: e.target.value })}
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={cadastrarAluno}>
        Cadastrar
      </button>

      {/* Lista de alunos */}
      <h3 className="mt-4">Lista de Alunos</h3>
      <ul className="list-group">
        {alunos.map((a, index) => (
          <li key={index} className="list-group-item">
            {a.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Alunos;
