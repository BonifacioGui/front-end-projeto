import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/global.css";

function Disciplinas() {
  const [disciplina, setDisciplina] = useState({ nome: "", codigo: "", cargaHoraria: "" });
  const [disciplinas, setDisciplinas] = useState([]);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [erroCadastro, setErroCadastro] = useState("");
  const [editando, setEditando] = useState(false);
  const [disciplinaEditando, setDisciplinaEditando] = useState(null);
  const navigate = useNavigate();

  const isAdmin = () => {
    const email = localStorage.getItem("email");
    return email === "admin@admin.com";
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    const senha = localStorage.getItem("senha");

    if (!email || !senha) {
      navigate("/login");
    }

    const fetchDisciplinas = async () => {
      try {
        const res = await api.get("/disciplinas");
        setDisciplinas(res.data);
      } catch (error) {
        console.error("Erro ao buscar disciplinas:", error.response?.data || error.message);
      }
    };
    fetchDisciplinas();
  }, [navigate]);

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
        email,
        senha,
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

      setTimeout(() => {
        setMensagemSucesso("");
      }, 3000);
    } catch (error) {
      console.error("Erro ao cadastrar disciplina:", error.response?.data || error.message);
      setErroCadastro("Erro ao cadastrar disciplina. Você não tem permissão!");
    }
  };

  const editarDisciplina = async () => {
    try {
      const email = localStorage.getItem("email");
      const senha = localStorage.getItem("senha");

      if (!email || !senha) {
        setErroCadastro("Erro de autenticação! Faça login novamente.");
        return;
      }

      const disciplinaAtualizada = {
        nome: disciplina.nome.trim(),
        codigo: disciplina.codigo.trim(),
        cargaHoraria: parseInt(disciplina.cargaHoraria, 10) || 0,
        email,
        senha,
      };

      if (!disciplinaAtualizada.nome || !disciplinaAtualizada.codigo || disciplinaAtualizada.cargaHoraria <= 0) {
        setErroCadastro("Preencha todos os campos corretamente!");
        return;
      }

      const res = await api.put(`/disciplinas/${disciplinaEditando._id}`, disciplinaAtualizada);
      setDisciplinas(disciplinas.map(d => d._id === res.data._id ? res.data : d));
      setDisciplina({ nome: "", codigo: "", cargaHoraria: "" });
      setMensagemSucesso("Disciplina atualizada com sucesso!");
      setErroCadastro("");
      setEditando(false);
      setDisciplinaEditando(null);

      setTimeout(() => {
        setMensagemSucesso("");
      }, 3000);
    } catch (error) {
      console.error("Erro ao atualizar disciplina:", error.response?.data || error.message);
      setErroCadastro("Erro ao atualizar disciplina. Você não tem permissão!");
    }
  };

  const iniciarEdicao = (disciplina) => {
    setEditando(true);
    setDisciplinaEditando(disciplina);
    setDisciplina({
      nome: disciplina.nome,
      codigo: disciplina.codigo,
      cargaHoraria: disciplina.cargaHoraria.toString(),
    });
  };

  const cancelarEdicao = () => {
    setEditando(false);
    setDisciplinaEditando(null);
    setDisciplina({ nome: "", codigo: "", cargaHoraria: "" });
  };

  const deletarDisciplina = async (id) => {
    try {
      const email = localStorage.getItem("email");
      const senha = localStorage.getItem("senha");

      if (!email || !senha) {
        setErroCadastro("Erro de autenticação! Faça login novamente.");
        return;
      }

      await api.delete(`/disciplinas/${id}`, { data: { email, senha } });
      setDisciplinas(disciplinas.filter(d => d._id !== id));
      setMensagemSucesso("Disciplina removida com sucesso!");
      setErroCadastro("");

      setTimeout(() => {
        setMensagemSucesso("");
      }, 3000);
    } catch (error) {
      console.error("Erro ao deletar disciplina:", error.response?.data || error.message);
      setErroCadastro("Erro ao deletar disciplina. Você não tem permissão!");
    }
  };

  return (
    <div className="disciplinas-page">
      <div className="disciplinas-container">
        <h2 className="disciplinas-title">{editando ? "Editar Disciplina" : "Cadastro de Disciplina"}</h2>

        {/* Formulário de Cadastro/Edição */}
        <div className="disciplinas-form">
          <div className="form-group">
            <label htmlFor="nome">Nome da Disciplina</label>
            <input
              type="text"
              id="nome"
              placeholder="Nome da Disciplina"
              value={disciplina.nome}
              onChange={(e) => setDisciplina({ ...disciplina, nome: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="codigo">Código da Disciplina</label>
            <input
              type="text"
              id="codigo"
              placeholder="Código da Disciplina"
              value={disciplina.codigo}
              onChange={(e) => setDisciplina({ ...disciplina, codigo: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cargaHoraria">Carga Horária</label>
            <input
              type="number"
              id="cargaHoraria"
              placeholder="Carga Horária (horas)"
              value={disciplina.cargaHoraria}
              onChange={(e) => setDisciplina({ ...disciplina, cargaHoraria: e.target.value })}
              min="1"
            />
          </div>

          {editando ? (
            <div className="form-buttons">
              <button className="btn btn-primary" onClick={editarDisciplina}>
                Atualizar
              </button>
              <button className="btn btn-secondary" onClick={cancelarEdicao}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={cadastrarDisciplina}>
              Cadastrar
            </button>
          )}
        </div>

        {/* Mensagens de Sucesso ou Erro */}
        {mensagemSucesso && <div className="alert alert-success">{mensagemSucesso}</div>}
        {erroCadastro && <div className="alert alert-error">{erroCadastro}</div>}

        {/* Lista de Disciplinas */}
        <h3 className="disciplinas-subtitle">Lista de Disciplinas</h3>
        <table className="disciplinas-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Carga Horária</th>
              {isAdmin() && <th>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {disciplinas.map((d) => (
              <tr key={d._id}>
                <td>{d.codigo}</td> {/* Código da disciplina */}
                <td>{d.nome}</td> {/* Nome da disciplina */}
                <td>{d.cargaHoraria}h</td> {/* Carga horária */}
                {isAdmin() && (
                  <td>
                    <button className="btn btn-edit" onClick={() => iniciarEdicao(d)}>
                       Editar
                    </button>
                    <button className="btn btn-delete" onClick={() => deletarDisciplina(d._id)}>
                       Excluir
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Disciplinas;