import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaUserGraduate, FaBook, FaClipboardList, FaSignInAlt, FaListAlt } from "react-icons/fa"; // Adicione o ícone FaListAlt
import "../styles/global.css"; // Ajuste o caminho conforme necessário

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="home-hero">
        <Container className="text-center">
          <h1 className="home-title">Bem-vindo ao Sistema de Cadastro e Gerenciamentode de Alunos</h1>
          <p className="home-subtitle">
            Gerencie alunos, disciplinas e matrículas de forma eficiente e intuitiva.
          </p>
        </Container>
      </div>

      {/* Funcionalidades em Cards */}
      <Container className="home-features">
        <Row className="justify-content-center">
          <Col md={6} lg={3} className="mb-4">
            <Card className="home-card">
              <Card.Body className="text-center">
                <FaUserGraduate size={48} className="home-icon" />
                <Card.Title>Cadastro de Alunos</Card.Title>
                <Card.Text>
                  Cadastre e gerencie os dados dos alunos de forma simples e rápida.
                </Card.Text>
                <Button as={Link} to="/alunos" variant="primary" className="home-button">
                  Acessar
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card className="home-card">
              <Card.Body className="text-center">
                <FaBook size={48} className="home-icon" />
                <Card.Title>Cadastro de Disciplinas</Card.Title>
                <Card.Text>
                  Gerencie as disciplinas oferecidas e suas cargas horárias.
                </Card.Text>
                <Button as={Link} to="/disciplinas" variant="secondary" className="home-button">
                  Acessar
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card className="home-card">
              <Card.Body className="text-center">
                <FaClipboardList size={48} className="home-icon" />
                <Card.Title>Matrículas</Card.Title>
                <Card.Text>
                  Realize e gerencie as matrículas dos alunos nas disciplinas.
                </Card.Text>
                <Button as={Link} to="/matriculas" variant="success" className="home-button">
                  Acessar
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card className="home-card">
              <Card.Body className="text-center">
                <FaListAlt size={48} className="home-icon" /> {/* Ícone para "Minhas Disciplinas" */}
                <Card.Title>Minhas Disciplinas</Card.Title>
                <Card.Text>
                  Visualize as disciplinas nas quais você está matriculado.
                </Card.Text>
                <Button as={Link} to="/minhas-disciplinas" variant="warning" className="home-button">
                  Acessar
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card className="home-card">
              <Card.Body className="text-center">
                <FaSignInAlt size={48} className="home-icon" />
                <Card.Title>Login</Card.Title>
                <Card.Text>
                  Acesse o sistema para gerenciar alunos, disciplinas e matrículas.
                </Card.Text>
                <Button as={Link} to="/login" variant="info" className="home-button">
                  Acessar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="home-footer">
        <Container className="text-center">
          <p className="home-footer-text">
            © 2025 Sistema de Cadastro e Gerenciamento de Alunos. Todos os direitos reservados.
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default Home;