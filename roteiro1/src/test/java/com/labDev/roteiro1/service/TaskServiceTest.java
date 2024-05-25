package com.labDev.roteiro1.service;

import com.labDev.roteiro1.entity.Task;
import com.labDev.roteiro1.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Date;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

public class TaskServiceTest {

    @InjectMocks
    private TaskService taskService;

    @Mock
    private TaskRepository taskRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetTaskById() {
        Task task = new Task();
        task.setId(1L);
        task.setTitulo("Test Task");
        task.setDescricao("Test Description");
        task.setDataVencimento(new Date());
        task.setPrioridade("High");
        task.setStatus("Pending");

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        Task foundTask = taskService.getTaskById(1L);
        assertThat(foundTask).isNotNull();
        assertThat(foundTask.getTitulo()).isEqualTo("Test Task");
    }
}
