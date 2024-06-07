import React, { useState } from 'react';

export const TodoForm = ({ addTask }) => {
  const [task, setTask] = useState({
    titulo: '',
    descricao: '',
    dataVencimento: '',
    prioridade: 'Baixa',
    status: 'Prevista',
    tipoTarefa: 'Livre'
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask({
      titulo: '',
      descricao: '',
      dataVencimento: '',
      prioridade: 'Baixa',
      status: 'Prevista',
      tipoTarefa: 'Livre'
    });
  };

  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
      <input
        type='text'
        name='titulo'
        value={task.titulo}
        onChange={handleChange}
        placeholder='Título'
        className='todo-input'
        required
      />
      <input
        type='text'
        name='descricao'
        value={task.descricao}
        onChange={handleChange}
        placeholder='Descrição'
        className='todo-input'
        required
      />
      <input
        type='date'
        name='dataVencimento'
        value={task.dataVencimento}
        onChange={handleChange}
        className='todo-input'
      />
      <select
        name='prioridade'
        value={task.prioridade}
        onChange={handleChange}
        className='todo-input'
      >
        <option value='Baixa'>Baixa</option>
        <option value='Media'>Média</option>
        <option value='alta'>Alta</option>
      </select>
      <button type='submit' className='todo-btn'>Adicionar</button>
    </form>
  );
};
