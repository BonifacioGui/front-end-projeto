import { useState, useEffect } from "react";
import api from "../services/api"; // Importa o serviço de API
import "../styles/global.css";

function Disciplinas() {
  const [disciplina, setDisciplina] = useState({ nome: "", codigo: "", cargaHoraria: "" });
  const [disciplinas, setDisciplinas] = useState([]);
  const [mensagemSucesso, setMensagemSucesso] = useState(""); // Estado para a mensagem de sucesso
  const [erroCadastro, setErroCadastro] = useState(""); // Estado para mensagens de erro no cadastro

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const res = await api.get("/disciplinas");
        setDisciplinas(res.data);
      } catch (error) {
        console.error("Erro ao buscar disciplinas:", error.response?.data || error.message);
      }
    };
    fetchDisciplinas();
  }, []);

  const cadastrarDisciplina = async () => {
    try {
      const email = localStorage.getItem("email");
      const senha = localStorage.getItem("senha");
  
      if (!email || !senha) {
        setErroCadastro("Erro de autenticação! Faça login novamente.");
        return;
      }
  
      const novaDisciplina = {
        nome: disciplina.nome.trim(),
        codigo: disciplina.codigo.trim(),
        cargaHoraria: parseInt(disciplina.cargaHoraria, 10) || 0,
        email,  // 🔹 Agora o email será enviado
        senha,  // 🔹 Agora a senha será enviada
      };
  
      if (!novaDisciplina.nome || !novaDisciplina.codigo || novaDisciplina.cargaHoraria <= 0) {
        setErroCadastro("Preencha todos os campos corretamente!");
        return;
      }
  
      const res = await api.post("/disciplinas", novaDisciplina);
      setDisciplinas([...disciplinas, res.data]);
      setDisciplina({ nome: "", codigo: "", cargaHoraria: "" });
      setMensagemSucesso("Disciplina cadastrada com sucesso!");
      setErroCadastro("");
  
      console.log("Dados enviados ao backend:", JSON.stringify(novaDisciplina, null, 2));
  
      setTimeout(() => {
        setMensagemSucesso("");
      }, 3000);
    } catch (error) {
      console.error("Erro ao cadastrar disciplina:", error.response?.data || error.message);
      setErroCadastro("Erro ao cadastrar disciplina. Você não tem permissão!");
    }
  };
  
  
  return (
    <div className="disciplinas-page">
      <div className="disciplinas-container">
        <h2 className="disciplinas-title">Cadastro de Disciplina</h2>

        {/* Formulário de Cadastro */}
        <div className="disciplinas-form">
          <div className="disciplinas-form-group">
            <label htmlFor="nome">Nome da Disciplina</label>
            <input
              type="text"
              id="nome"
              className="disciplinas-form-input"
              placeholder="Nome da Disciplina"
              value={disciplina.nome}
              onChange={(e) => setDisciplina({ ...disciplina, nome: e.target.value })}
            />
          </div>

          <div className="disciplinas-form-group">
            <label htmlFor="codigo">Código da Disciplina</label>
            <input
              type="text"
              id="codigo"
              className="disciplinas-form-input"
              placeholder="Código da Disciplina"
              value={disciplina.codigo}
              onChange={(e) => setDisciplina({ ...disciplina, codigo: e.target.value })}
            />
          </div>

          <div className="disciplinas-form-group">
            <label htmlFor="cargaHoraria">Carga Horária</label>
            <input
              type="number"
              id="cargaHoraria"
              className="disciplinas-form-input"
              placeholder="Carga Horária (horas)"
              value={disciplina.cargaHoraria}
              onChange={(e) => setDisciplina({ ...disciplina, cargaHoraria: e.target.value })}
              min="1"
            />
          </div>

          <button className="disciplinas-form-button" onClick={cadastrarDisciplina}>
            Cadastrar
          </button>
        </div>

        {/* Exibindo mensagens de erro ou sucesso */}
        {erroCadastro && <div className="error-message">{erroCadastro}</div>}
        {mensagemSucesso && <div className="success-message">{mensagemSucesso}</div>}

        {/* Lista de Disciplinas */}
        <h3 className="disciplinas-subtitle">Lista de Disciplinas</h3>
        <ul className="disciplinas-list">
          {disciplinas.map((d) => (
            <li key={d.id || d.codigo} className="disciplinas-list-item">
              {d.codigo} - {d.nome} - {d.cargaHoraria}h
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Disciplinas;
