import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { autorService } from '../services/api';

export default function AutorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [autor, setAutor] = useState({ nome: '', nacionalidade: '', dataNascimento: '' });
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (id) {
      autorService
        .buscar(id)
        .then((r) =>
          setAutor({
            nome: r.data.nome || '',
            nacionalidade: r.data.nacionalidade || '',
            dataNascimento: r.data.dataNascimento || '',
          })
        )
        .catch(() => setErro('Autor não encontrado.'));
    }
  }, [id]);

  const alterar = (e) => setAutor({ ...autor, [e.target.name]: e.target.value });

  const salvar = (e) => {
    e.preventDefault();
    const dados = { ...autor, dataNascimento: autor.dataNascimento || null };
    const req = id ? autorService.atualizar(id, dados) : autorService.criar(dados);
    req.then(() => navigate('/autores')).catch(() => setErro('Erro ao salvar autor.'));
  };

  return (
    <div>
      <h2>{id ? 'Editar autor' : 'Novo autor'}</h2>
      <form onSubmit={salvar}>
        <label>Nome *
          <input name="nome" value={autor.nome} onChange={alterar} maxLength={100} required />
        </label>
        <label>Nacionalidade
          <input name="nacionalidade" value={autor.nacionalidade} onChange={alterar} maxLength={50} />
        </label>
        <label>Data de nascimento
          <input type="date" name="dataNascimento" value={autor.dataNascimento} onChange={alterar} />
        </label>
        {erro && <p className="erro">{erro}</p>}
        <p>
          <button type="submit">Salvar</button>
          <button type="button" className="secondary" onClick={() => navigate('/autores')}>Cancelar</button>
        </p>
      </form>
    </div>
  );
}
