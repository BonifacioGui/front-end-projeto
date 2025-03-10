import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importe o useNavigate
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

  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate(); // Inicialize o hook useNavigate

  // Limpar campos de email e senha quando a página de cadastro for carregada
  useEffect(() => {
    setAluno((prevState) => ({
      ...prevState,
      email: "",
      senha: "",
    }));
  }, []);

  const aplicarMascaraTelefone = (valor) => {
    return valor
      .replace(/\D/g, "") // Remove tudo que não for número
      .replace(/^(\d{2})(\d)/, "($1)$2") // Adiciona parênteses no DDD
      .replace(/(\d{5})(\d)/, "$1-$2") // Adiciona o hífen no telefone
      .slice(0, 14); // Limita ao tamanho máximo (14 caracteres)
  };

  const aplicarMascaraData = (valor) => {
    return valor
      .replace(/\D/g, "") // Remove tudo que não for número
      .replace(/^(\d{2})(\d)/, "$1/$2") // Adiciona a primeira barra
      .replace(/(\d{2})(\d)/, "$1/$2") // Adiciona a segunda barra
      .slice(0, 10); // Limita ao tamanho máximo (10 caracteres)
  };

  const aplicarMascaraMatricula = (valor) => {
    return valor.replace(/\D/g, "").slice(0, 6); // Apenas números, máximo 6 caracteres
  };

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

    // Validação do telefone (99)99999-9999
    const telefoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/;
    if (!telefoneRegex.test(aluno.telefone)) {
      novosErros.telefone = "Formato inválido. Use (99)99999-9999";
    }

    // Validação da matrícula (6 números)
    const matriculaRegex = /^\d{6}$/;
    if (!matriculaRegex.test(aluno.matricula)) {
      novosErros.matricula = "A matrícula deve ter exatamente 6 números";
    }

    // Validação da data de nascimento (DD/MM/AAAA)
    const dataNascimentoRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dataNascimentoRegex.test(aluno.dataNascimento)) {
      novosErros.dataNascimento = "Formato inválido. Use DD/MM/AAAA";
    }

    // Validação do CEP (8 números)
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

  const cadastrarAluno = async () => {
    setMensagem("");

    if (!validarCampos()) {
      setMensagem("Preencha todos os campos corretamente!");
      return;
    }

    const alunoFormatado = {
      ...aluno,
      dataNascimento: aluno.dataNascimento.split("/").reverse().join("-"),
    };

    console.log("Enviando para API:", alunoFormatado);

    try {
      await api.post("/alunos/register", alunoFormatado);
      setMensagem("Cadastrado com sucesso!");

      // Redireciona para a página de login após 2 segundos
      setTimeout(() => {
        navigate("/login"); // Redireciona para a rota de login
      }, 2000);

      // Limpa o formulário
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
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error.response?.data || error.message);
      setMensagem(error.response?.data?.message || "Erro ao cadastrar aluno.");
    }
  };

  

  return (
    <div className="alunos-page">
      <div className="alunos-container">
        <h2 className="mb-4">Cadastro de Aluno</h2>

        {mensagem && (
          <div className={`alert ${mensagem.includes("sucesso") ? "alert-success" : "alert-danger"}`}>
            {mensagem}
          </div>
        )}

        {/* Campos do formulário */}
        {[
          { label: "Nome", key: "nome" },
          { label: "Email", key: "email" },
          { label: "Curso", key: "curso" },
          { label: "Senha", key: "senha" },
          { label: "Data de Nascimento", key: "dataNascimento", mascara: aplicarMascaraData },
          { label: "Matrícula", key: "matricula", mascara: aplicarMascaraMatricula },
          { label: "Telefone", key: "telefone", mascara: aplicarMascaraTelefone },
        ].map(({ label, key, mascara }, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={key}>{label}</label>
            <input
              type={key === "senha" ? "password" : "text"}
              id={key}
              className="form-control"
              placeholder={label}
              value={aluno[key] || ""}
              onChange={(e) =>
                setAluno({ ...aluno, [key]: mascara ? mascara(e.target.value) : e.target.value })
              }
              autoComplete="off" // Desabilitando o preenchimento automático para email e senha
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
          { label: "CEP", key: "cep", mascara: (valor) => valor.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2").slice(0, 9) },
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

        <button className="btn btn-primary mt-3" onClick={cadastrarAluno}>
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default Alunos;