import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/global.css";

function Alunos() {
  const [aluno, setAluno] = useState({
    nome: "",
    email: "",
    curso: "",
    senha: "",
    dataNascimento: "",
    telefone: "",
    matricula: "",
    endereco: {
      rua: "",
      bairro: "",
      numero: "",
      cidade: "",
      cep: "",
    },
  });

  const [alunos, setAlunos] = useState([]); // Lista de alunos
  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");
  const [editando, setEditando] = useState(false); // Modo de edição
  const [alunoEditando, setAlunoEditando] = useState(null); // Aluno sendo editado
  const navigate = useNavigate();

  // Verifica se o usuário é admin
  const isAdmin = () => {
    const email = localStorage.getItem("email");
    return email === "admin@admin.com";
  };

  // Busca a lista de alunos (apenas para admin)
  useEffect(() => {
    if (isAdmin()) {
      const fetchAlunos = async () => {
        try {
          const res = await api.get("/alunos"); // Busca a lista de alunos
          setAlunos(res.data);
        } catch (error) {
          console.error("Erro ao buscar alunos:", error.response?.data || error.message);
        }
      };
      fetchAlunos();
    }
  }, []);

  // Funções de máscara (telefone, data, matrícula, CEP)
  const aplicarMascaraTelefone = (valor) => {
    return valor
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1)$2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 14);
  };

  const aplicarMascaraData = (valor) => {
    return valor
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .slice(0, 10);
  };

  const aplicarMascaraMatricula = (valor) => {
    return valor.replace(/\D/g, "").slice(0, 6);
  };

  const aplicarMascaraCEP = (valor) => {
    return valor.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2").slice(0, 9);
  };

  // Validação dos campos
  const validarCampos = () => {
    const novosErros = {};

    // Validação de campos obrigatórios
    Object.entries(aluno).forEach(([campo, valor]) => {
      if (typeof valor === "string" && !valor.trim()) {
        novosErros[campo] = `${campo} é obrigatório`;
      }
    });

    // Validação do endereço
    Object.entries(aluno.endereco).forEach(([campo, valor]) => {
      if (!valor.trim()) {
        novosErros[campo] = `O campo ${campo} é obrigatório`;
      }
    });

    // Validação do telefone
    const telefoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/;
    if (!telefoneRegex.test(aluno.telefone)) {
      novosErros.telefone = "Formato inválido. Use (99)99999-9999";
    }

    // Validação da matrícula
    const matriculaRegex = /^\d{6}$/;
    if (!matriculaRegex.test(aluno.matricula)) {
      novosErros.matricula = "A matrícula deve ter exatamente 6 números";
    }

    // Validação da data de nascimento
    const dataNascimentoRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dataNascimentoRegex.test(aluno.dataNascimento)) {
      novosErros.dataNascimento = "Formato inválido. Use DD/MM/AAAA";
    }

    // Validação do CEP
    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(aluno.endereco.cep)) {
      novosErros.cep = "Formato inválido. Use XXXXX-XXX";
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(aluno.email)) {
      novosErros.email = "Formato de email inválido. Use exemplo@dominio.com";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Cadastrar ou atualizar aluno
  const salvarAluno = async () => {
    setMensagem("");

    if (!validarCampos()) {
      setMensagem("Preencha todos os campos corretamente!");
      return;
    }

    const alunoFormatado = {
      ...aluno,
      dataNascimento: aluno.dataNascimento.split("/").reverse().join("-"),
    };

    try {
      if (editando) {
        // Atualizar aluno existente (apenas admin pode editar)
        if (!isAdmin()) {
          setMensagem("Apenas o admin pode editar alunos.");
          return;
        }
        await api.put(`/alunos/${alunoEditando._id}`, alunoFormatado);
        setMensagem("Aluno atualizado com sucesso!");
      } else {
        // Cadastrar novo aluno (qualquer pessoa pode cadastrar)
        await api.post("/alunos/register", alunoFormatado);
        setMensagem("Aluno cadastrado com sucesso!");
      }

      // Limpar formulário e atualizar lista
      setAluno({
        nome: "",
        email: "",
        curso: "",
        senha: "",
        dataNascimento: "",
        telefone: "",
        matricula: "",
        endereco: {
          rua: "",
          bairro: "",
          numero: "",
          cidade: "",
          cep: "",
        },
      });
      setErros({});
      setEditando(false);
      setAlunoEditando(null);

      // Atualizar lista de alunos (apenas para admin)
      if (isAdmin()) {
        const res = await api.get("/alunos");
        setAlunos(res.data);
      }

      // Redirecionar para a página de login após 2 segundos
      setTimeout(() => {
        navigate("/login"); // Redireciona para a rota de login
      }, 2000);
    } catch (error) {
      console.error("Erro ao salvar aluno:", error.response?.data || error.message);
      setMensagem(error.response?.data?.message || "Erro ao salvar aluno.");
    }
  };

  // Iniciar edição de aluno (apenas admin pode editar)
  const iniciarEdicao = (aluno) => {
    if (!isAdmin()) {
      setMensagem("Apenas o admin pode editar alunos.");
      return;
    }
    setEditando(true);
    setAlunoEditando(aluno);
    setAluno({
      ...aluno,
      dataNascimento: aluno.dataNascimento.split("-").reverse().join("/"),
    });
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setEditando(false);
    setAlunoEditando(null);
    setAluno({
      nome: "",
      email: "",
      curso: "",
      senha: "",
      dataNascimento: "",
      telefone: "",
      matricula: "",
      endereco: {
        rua: "",
        bairro: "",
        numero: "",
        cidade: "",
        cep: "",
      },
    });
  };

  // Excluir aluno (apenas admin pode excluir)
  const excluirAluno = async (id) => {
    if (!isAdmin()) {
      setMensagem("Apenas o admin pode excluir alunos.");
      return;
    }
    try {
      await api.delete(`/alunos/${id}`);
      setMensagem("Aluno excluído com sucesso!");
      const res = await api.get("/alunos");
      setAlunos(res.data);
    } catch (error) {
      console.error("Erro ao excluir aluno:", error.response?.data || error.message);
      setMensagem(error.response?.data?.message || "Erro ao excluir aluno.");
    }
  };

  return (
    <div className="alunos-page">
      <div className="alunos-container">
        <h2 className="mb-4">{editando ? "Editar Aluno" : "Cadastro de Aluno"}</h2>

        {mensagem && (
          <div className={`alert ${mensagem.includes("sucesso") ? "alert-success" : "alert-danger"}`}>
            {mensagem}
          </div>
        )}

        {/* Formulário de cadastro/edição */}
        {[
          { label: "Nome", key: "nome" },
          { label: "Email", key: "email" },
          { label: "Curso", key: "curso" },
          { label: "Senha", key: "senha", type: "password" },
          { label: "Data de Nascimento", key: "dataNascimento", mascara: aplicarMascaraData },
          { label: "Matrícula", key: "matricula", mascara: aplicarMascaraMatricula },
          { label: "Telefone", key: "telefone", mascara: aplicarMascaraTelefone },
        ].map(({ label, key, type, mascara }, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={key}>{label}</label>
            <input
              type={type || "text"}
              id={key}
              className="form-control"
              placeholder={label}
              value={aluno[key] || ""}
              onChange={(e) =>
                setAluno({ ...aluno, [key]: mascara ? mascara(e.target.value) : e.target.value })
              }
              autoComplete="off"
            />
            {erros[key] && <div className="error-message">{erros[key]}</div>}
          </div>
        ))}

        {/* Campos do endereço */}
        <h4 className="mt-3">Endereço</h4>
        {[
          { label: "Rua", key: "rua" },
          { label: "Bairro", key: "bairro" },
          { label: "Número", key: "numero" },
          { label: "Cidade", key: "cidade" },
          { label: "CEP", key: "cep", mascara: aplicarMascaraCEP },
        ].map(({ label, key, mascara }, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={key}>{label}</label>
            <input
              type="text"
              id={key}
              className="form-control"
              placeholder={label}
              value={aluno.endereco[key] || ""}
              onChange={(e) =>
                setAluno({
                  ...aluno,
                  endereco: {
                    ...aluno.endereco,
                    [key]: mascara ? mascara(e.target.value) : e.target.value,
                  },
                })
              }
            />
            {erros[key] && <div className="error-message">{erros[key]}</div>}
          </div>
        ))}

        <button className="btn btn-primary mt-3" onClick={salvarAluno}>
          {editando ? "Atualizar" : "Cadastrar"}
        </button>
        {editando && (
          <button className="btn btn-secondary mt-3 ml-2" onClick={cancelarEdicao}>
            Cancelar
          </button>
        )}

        {/* Lista de alunos (apenas para admin) */}
        {isAdmin() && (
          <>
            <h3 className="mt-5">Lista de Alunos</h3>
            <table className="alunos-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Curso</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((a) => (
                  <tr key={a._id}>
                    <td className="nome-destaque">{a.nome}</td>
                    <td className="email-destaque">{a.email}</td>
                    <td className="curso-destaque">{a.curso}</td>
                    <td>
                      <button className="btn btn-edit btn-sm" onClick={() => iniciarEdicao(a)}>
                        Editar
                      </button>
                      <button className="btn btn-danger btn-sm ml-2" onClick={() => excluirAluno(a._id)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default Alunos;