import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/global.css"; // Ajuste o caminho conforme necessário

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState(""); // Estado para mensagem de sucesso
  const [erroLogin, setErroLogin] = useState(""); // Estado para armazenar mensagens de erro de login
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !senha) {
      setErroLogin("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/alunos/login", { email, senha });

      console.log("Resposta do backend:", response.data);

      const { alunoId, token, isAdmin } = response.data;

      localStorage.setItem("alunoId", alunoId);
      localStorage.setItem("authToken", token);
      localStorage.setItem("email", email); // 🔹 Armazena o email
      localStorage.setItem("senha", senha); // 🔹 Armazena a senha (⚠️ Melhor usar token!)

      setMensagemSucesso("Login realizado com sucesso!");
      setErroLogin("");

      setTimeout(() => {
        if (isAdmin) {
          navigate("/");
        } else {
          navigate("/alunos");
        }
      }, 2000);
    } catch (error) {
      console.error("Erro de autenticação:", error);
      setErroLogin("Erro ao realizar login. Verifique suas credenciais.");
      setMensagemSucesso("");
    }
  };

  // Função para sair (logout)
  const handleLogout = () => {
    localStorage.removeItem("alunoId");
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("senha");
    alert("Você saiu da sua conta com sucesso!"); // Mensagem de confirmação
    navigate("/login"); // Redireciona para a página de login
  };

  // Função para capturar a tecla Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(); // Chama a função de login ao pressionar Enter
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form onKeyDown={handleKeyDown}> {/* Adiciona o evento de teclado aqui */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="login-input"
          />
          <button type="button" onClick={handleLogin} className="login-button">
            Entrar
          </button>
        </form>

        {/* Botão de Sair */}
        <button onClick={handleLogout} className="logout-button">
          Sair
        </button>

        {/* Exibindo mensagens de erro ou sucesso */}
        {erroLogin && <div className="error-message">{erroLogin}</div>}
        {mensagemSucesso && <div className="success-message">{mensagemSucesso}</div>}
      </div>
    </div>
  );
}

export default Login;