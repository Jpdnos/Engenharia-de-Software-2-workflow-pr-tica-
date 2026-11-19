import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { autorService } from '../services/api';

export default function AutorList() {
  const [autores, setAutores] = useState([]);
  const [erro, setErro] = useState('');
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    autorService
      .listar()
      .then((r) => setAutores(r.data))
      .catch(() => setErro('Erro ao carregar autores.'));
  }, [versao]);

  const excluir = (id) => {
    if (!window.confirm('Excluir este autor?')) return;
    autorService
      .deletar(id)
      .then(() => setVersao((v) => v + 1))
      .catch((e) =>
        setErro(
          e.response && e.response.status === 409
            ? 'Este autor possui livros. Exclua os livros antes.'
            : 'Erro ao excluir autor.'
        )
      );
  };

  return (
    <div>
      <div className="page-header">
        <h2>Autores</h2>
        <Link className="btn" to="/autores/novo">Novo autor</Link>
      </div>
      {erro && <p className="erro">{erro}</p>}
      <table>
        <thead>
          <tr><th>Nome</th><th>Nacionalidade</th><th>Nascimento</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {autores.length === 0 && (
            <tr><td colSpan="4" className="vazio">Nenhum autor cadastrado.</td></tr>
          )}
          {autores.map((a) => (
            <tr key={a.id}>
              <td>{a.nome}</td>
              <td>{a.nacionalidade}</td>
              <td>{a.dataNascimento}</td>
              <td>
                <Link className="btn secondary" to={`/autores/editar/${a.id}`}>Editar</Link>
                <button className="danger" onClick={() => excluir(a.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
