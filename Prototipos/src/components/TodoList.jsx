import React from 'react';
import { FaTrash } from 'react-icons/fa';


export const TodoList = () => {
  return (
    <div className='Todo'>
      <p className='completed'>Tarefa 1</p>
      <div>
        <FaTrash className='delete-icon' />
      </div>
    </div>
  );
};
