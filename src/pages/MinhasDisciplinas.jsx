import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/global.css";

function MinhasDisciplinas() {
  const [aluno, setAluno] = useState(null); // Informações do aluno
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const navigate = useNavigate();

  // Busca as informações do aluno logado
  useEffect(() => {
    const fetchAlunoLogado = async () => {
      try {
        const alunoId = localStorage.getItem("alunoId"); // Pega o ID do aluno do localStorage

        // Se não houver ID, o aluno não está logado
        if (!alunoId) {
          setLoading(false);
          return;
        }

        // Faz a requisição para buscar as informações do aluno
        const res = await api.get(`/alunos/me/${alunoId}`);
        setAluno(res.data); // Armazena as informações do aluno no estado
      } catch (error) {
        console.error("Erro ao buscar informações do aluno:", error.response?.data || error.message);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchAlunoLogado();
  }, [navigate]);

  // Se ainda estiver carregando, exibe uma mensagem
  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="minhas-disciplinas-page">
      <h2>Minhas Disciplinas</h2>

      {/* Exibe as disciplinas se o aluno estiver logado */}
      {aluno ? (
        <div className="disciplinas-list">
          <h3>Disciplinas Matriculadas</h3>
          {aluno.disciplinas && aluno.disciplinas.length > 0 ? (
            <table className="disciplinas-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Código</th>
                </tr>
              </thead>
              <tbody>
                {aluno.disciplinas.map((disciplina) => (
                  <tr key={disciplina._id}>
                    <td>{disciplina.nome}</td>
                    <td>{disciplina.codigo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nenhuma disciplina matriculada.</p>
          )}
        </div>
      ) : (
        // Mensagem se o aluno não estiver logado
        <div className="not-logged-in">
          <p>Você precisa estar logado para visualizar suas disciplinas.</p>
          <button onClick={() => navigate("/login")}>Fazer Login</button>
        </div>
      )}
    </div>
  );
}

export default MinhasDisciplinas;