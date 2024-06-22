import React from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({ tasks, onEdit, onTaskClick,onUpdateStatus }) => {
  return (
    <div className='TodoList'>
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} onEdit={onEdit} onTaskClick={onTaskClick} onUpdateStatus={onUpdateStatus} />
      ))}
    </div>
  );
};
