import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { autorService, livroService } from '../services/api';

export default function LivroForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState({ titulo: '', isbn: '', anoPublicacao: '', genero: '', autorId: '' });
  const [autores, setAutores] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    autorService
      .listar()
      .then((r) => setAutores(r.data))
      .catch(() => setErro('Erro ao carregar autores.'));
  }, []);

  useEffect(() => {
    if (id) {
      livroService
        .buscar(id)
        .then((r) =>
          setLivro({
            titulo: r.data.titulo || '',
            isbn: r.data.isbn || '',
            anoPublicacao: r.data.anoPublicacao || '',
            genero: r.data.genero || '',
            autorId: r.data.autor ? String(r.data.autor.id) : '',
          })
        )
        .catch(() => setErro('Livro não encontrado.'));
    }
  }, [id]);

  const alterar = (e) => setLivro({ ...livro, [e.target.name]: e.target.value });

  const salvar = (e) => {
    e.preventDefault();
    const dados = {
      titulo: livro.titulo,
      isbn: livro.isbn,
      anoPublicacao: livro.anoPublicacao ? Number(livro.anoPublicacao) : null,
      genero: livro.genero,
      autor: { id: Number(livro.autorId) }, // o autor vai só com o id
    };
    const req = id ? livroService.atualizar(id, dados) : livroService.criar(dados);
    req.then(() => navigate('/livros')).catch(() => setErro('Erro ao salvar livro.'));
  };

  return (
    <div>
      <h2>{id ? 'Editar livro' : 'Novo livro'}</h2>
      <form onSubmit={salvar}>
        <label>Título *
          <input name="titulo" value={livro.titulo} onChange={alterar} maxLength={200} required />
        </label>
        <label>ISBN
          <input name="isbn" value={livro.isbn} onChange={alterar} maxLength={20} />
        </label>
        <label>Ano de publicação
          <input type="number" name="anoPublicacao" value={livro.anoPublicacao} onChange={alterar} />
        </label>
        <label>Gênero
          <input name="genero" value={livro.genero} onChange={alterar} maxLength={50} />
        </label>
        <label>Autor *
          <select name="autorId" value={livro.autorId} onChange={alterar} required>
            <option value="">Selecione um autor</option>
            {autores.map((a) => (
              <option key={a.id} value={a.id}>{a.nome}</option>
            ))}
          </select>
        </label>
        {erro && <p className="erro">{erro}</p>}
        <p>
          <button type="submit">Salvar</button>
          <button type="button" className="secondary" onClick={() => navigate('/livros')}>Cancelar</button>
        </p>
      </form>
    </div>
  );
}
