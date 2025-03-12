import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/global.css";

function MinhasDisciplinas() {
  const [disciplinas, setDisciplinas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const alunoId = localStorage.getItem("alunoId");

    if (!alunoId) {
      navigate("/login"); // Redireciona para o login se não houver alunoId
      return;
    }

    const fetchDisciplinas = async () => {
      try {
        const alunoId = localStorage.getItem("alunoId");
        console.log("alunoId:", alunoId);
        const res = await api.get(`/alunos/me/${alunoId}`);
        setDisciplinas(res.data.disciplinas || []);
      } catch (error) {
        console.error("Erro ao buscar disciplinas:", error.response?.data || error.message);
        alert("Erro ao carregar disciplinas. Tente novamente mais tarde.");
      }
    };

    fetchDisciplinas();
  }, [navigate]);

  return (
    <div className="minhas-disciplinas-page">
      <h2>Minhas Disciplinas</h2>

      {disciplinas.length > 0 ? (
        <table className="disciplinas-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Código</th>
              <th>Carga Horária</th>
            </tr>
          </thead>
          <tbody>
            {disciplinas.map((disciplina) => (
              <tr key={disciplina._id}>
                <td>{disciplina.nome}</td>
                <td>{disciplina.codigo}</td>
                <td>{disciplina.cargaHoraria} horas</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhuma disciplina matriculada.</p>
      )}
    </div>
  );
}

export default MinhasDisciplinas;