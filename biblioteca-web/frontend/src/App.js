import React from 'react';
import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AutorList from './components/AutorList';
import AutorForm from './components/AutorForm';
import LivroList from './components/LivroList';
import LivroForm from './components/LivroForm';

export default function App() {
  return (
    <>
      <nav>
        <Link to="/autores" className="brand">
          <span className="brand-logo" />
          Biblioteca Web
        </Link>
        <NavLink to="/autores" className="nav-link">Autores</NavLink>
        <NavLink to="/livros" className="nav-link">Livros</NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/autores" replace />} />
          <Route path="/autores" element={<AutorList />} />
          <Route path="/autores/novo" element={<AutorForm />} />
          <Route path="/autores/editar/:id" element={<AutorForm />} />
          <Route path="/livros" element={<LivroList />} />
          <Route path="/livros/novo" element={<LivroForm />} />
          <Route path="/livros/editar/:id" element={<LivroForm />} />
        </Routes>
      </main>
    </>
  );
}
