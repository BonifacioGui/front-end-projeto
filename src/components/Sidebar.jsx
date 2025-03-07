import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

function Sidebar() {
  return (
    <div className="sidebar">
      <ListGroup variant="flush">
        <ListGroup.Item as={Link} to="/alunos">
          Cadastro de Alunos
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/disciplinas">
          Disciplinas
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/matriculas">
          Matrículas
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Sidebar;
