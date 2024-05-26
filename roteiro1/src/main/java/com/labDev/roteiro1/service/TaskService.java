package com.labDev.roteiro1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.labDev.roteiro1.entity.Task;
import com.labDev.roteiro1.repository.TaskRepository;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task) {
        if (task.getTipoTarefa() == null || task.getTipoTarefa().isEmpty()) {
            task.setTipoTarefa("Livre");
        } else if (!task.getTipoTarefa().equals("Data") && !task.getTipoTarefa().equals("Prazo") && !task.getTipoTarefa().equals("Livre")) {
            throw new IllegalArgumentException("Tipo de tarefa inválido: " + task.getTipoTarefa());
        }

        if (task.getStatus() == null) {
            task.setStatus("Prevista");
        }

        if (!task.getStatus().equals("Concluída")) {
            task.calcularStatus();
        }

        return taskRepository.save(task);
    }

    public Task updateTask(Long taskId, Task taskDetails) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada com id: " + taskId));

        if (taskDetails.getTipoTarefa() == null || taskDetails.getTipoTarefa().isEmpty()) {
            task.setTipoTarefa("Livre");
        } else if (!task.getTipoTarefa().equals("Data") && !task.getTipoTarefa().equals("Prazo") && !task.getTipoTarefa().equals("Livre")) {
            throw new IllegalArgumentException("Tipo de tarefa inválido: " + task.getTipoTarefa());
        }

        if (taskDetails.getStatus() == null) {
            taskDetails.setStatus("Prevista");
        }

        if (!taskDetails.getStatus().equals("Concluída")) {
            task.calcularStatus();
        }

        task.setTitulo(taskDetails.getTitulo());
        task.setDescricao(taskDetails.getDescricao());
        task.setDataVencimento(taskDetails.getDataVencimento());
        task.setPrioridade(taskDetails.getPrioridade());
        task.setTipoTarefa(taskDetails.getTipoTarefa());
       // task.setStatus(taskDetails.getStatus());

        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada com id: " + taskId));

        taskRepository.delete(task);
    }

    public Task getTaskById(Long taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada com id: " + taskId));
    }
}
