import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import './Home.css'; // Estilização personalizada

function Home() {
  return (
    <Container className="text-center">
      <Row className="mt-5">
        <Col>
          <h1>Bem-vindo ao Sistema de Cadastro de Alunos</h1>
          <p className="lead">Gerencie alunos, disciplinas e matrículas de forma eficiente.</p>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Button variant="primary" size="lg" as={Link} to="/alunos">
            Cadastro de Alunos
          </Button>
        </Col>
        <Col>
          <Button variant="secondary" size="lg" as={Link} to="/disciplinas">
            Cadastro de Disciplinas
          </Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Button variant="success" size="lg" as={Link} to="/matriculas">
            Matrículas
          </Button>
        </Col>
        <Col>
          <Button variant="info" size="lg" as={Link} to="/login">
            Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
