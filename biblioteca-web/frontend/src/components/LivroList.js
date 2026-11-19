import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { livroService } from '../services/api';

export default function LivroList() {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState('');
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    livroService
      .listar()
      .then((r) => setLivros(r.data))
      .catch(() => setErro('Erro ao carregar livros.'));
  }, [versao]);

  const excluir = (id) => {
    if (!window.confirm('Excluir este livro?')) return;
    livroService
      .deletar(id)
      .then(() => setVersao((v) => v + 1))
      .catch(() => setErro('Erro ao excluir livro.'));
  };

  return (
    <div>
      <div className="page-header">
        <h2>Livros</h2>
        <Link className="btn" to="/livros/novo">Novo livro</Link>
      </div>
      {erro && <p className="erro">{erro}</p>}
      <table>
        <thead>
          <tr><th>Título</th><th>Autor</th><th>Ano</th><th>Gênero</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {livros.length === 0 && (
            <tr><td colSpan="5" className="vazio">Nenhum livro cadastrado.</td></tr>
          )}
          {livros.map((l) => (
            <tr key={l.id}>
              <td>{l.titulo}</td>
              <td>{l.autor ? l.autor.nome : ''}</td>
              <td>{l.anoPublicacao}</td>
              <td>{l.genero}</td>
              <td>
                <Link className="btn secondary" to={`/livros/editar/${l.id}`}>Editar</Link>
                <button className="danger" onClick={() => excluir(l.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
