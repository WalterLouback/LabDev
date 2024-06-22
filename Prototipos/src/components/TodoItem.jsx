import React from 'react';

export const TodoItem = ({ task, onTaskClick, onUpdateStatus }) => {
  return (
    <div className='TodoItem'>
      <h3>{task.titulo}</h3>
      <p>{task.descricao}</p>
      <button onClick={() => onTaskClick(task.id)} className='details-btn'>Detalhes</button>
      {task.status !== 'Concluída' && (
        <button onClick={() => onUpdateStatus(task, 'Concluída')} className='complete-btn'>Concluir</button>
      )}
      {task.status === 'Concluída' && (
        <button onClick={() => onUpdateStatus(task, 'Prevista')} className='reopen-btn'>Reabrir</button>
      )}
    </div>
  );
};
