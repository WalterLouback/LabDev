import React, { useState } from 'react';

export const TodoForm = ({ addTask, currentTask, onSave, onEdit }) => {
  const [task, setTask] = useState(
    currentTask || {
      titulo: '',
      descricao: '',
      dataVencimento: '',
      prioridade: 'Baixa',
      status: 'Prevista',
      tipoTarefa: 'Livre'
    }
  );

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentTask) {
      onEdit(task);
    } else {
      addTask(task);
    }
  };

  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
      <label>Título</label>
      <input
        type='text'
        name='titulo'
        value={task.titulo}
        onChange={handleChange}
        placeholder='Título'
        className='todo-input'
        required
      />
      <label>Descrição</label>
      <input
        type='text'
        name='descricao'
        value={task.descricao}
        onChange={handleChange}
        placeholder='Descrição'
        className='todo-input'
        required
      />
      <label>Data de Vencimento</label>
      <input
        type='date'
        name='dataVencimento'
        value={task.dataVencimento}
        onChange={handleChange}
        className='todo-input'
      />
      <label>Prioridade</label>
      <select
        name='prioridade'
        value={task.prioridade}
        onChange={handleChange}
        className='todo-input'
      >
        <option value='Baixa'>Baixa</option>
        <option value='Media'>Média</option>
        <option value='Alta'>Alta</option>
      </select>
      <button type='submit' className='todo-btn'>{currentTask ? 'Salvar' : 'Adicionar'}</button>
    </form>
  );
};
