import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "../styles/global.css";

function Header() {
  const navigate = useNavigate();

  // Função para sair (logout)
  const handleLogout = () => {
    localStorage.removeItem("alunoId");
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("senha");
    alert("Você saiu da sua conta com sucesso!"); // Mensagem de confirmação
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header">
      <Container fluid className="header-container">
        {/* Título Centralizado */}
        <Navbar.Brand href="/" className="header-brand">
          Sistema de Cadastro de Alunos
        </Navbar.Brand>

        {/* Botão de Toggle para Mobile */}
        <Navbar.Toggle aria-controls="header-nav" className="header-toggle" />

        {/* Links de Navegação */}
        <Navbar.Collapse id="header-nav" className="header-collapse">
          <Nav className="header-nav ms-auto"> {/* ms-auto para alinhar à direita */}
            <Nav.Link as={Link} to="/" className="header-nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/alunos" className="header-nav-link">
              Cadastrar Aluno
            </Nav.Link>
            <Nav.Link as={Link} to="/disciplinas" className="header-nav-link">
              Disciplinas
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="header-nav-link">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/matriculas" className="header-nav-link">
              Matriculas
            </Nav.Link>
            <Nav.Link as={Link} to="/minhas-disciplinas" className="header-nav-link">
              Minhas Disciplinas
            </Nav.Link>

            {/* Botão de Logout */}
            {localStorage.getItem("authToken") && (
              <Button
                variant="danger"
                onClick={handleLogout}
                size="sm" // Tamanho pequeno
                className="logout-button"
              >
                Sair
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;