package com.labDev.roteiro1.controller;

import com.labDev.roteiro1.controler.TaskController;
import com.labDev.roteiro1.entity.Task;
import com.labDev.roteiro1.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class TaskControllerTest {

    private MockMvc mockMvc;

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(taskController).build();
    }

    @Test
    public void testGetAllTasks() throws Exception {
        Task task1 = new Task();
        task1.setId(1L);
        task1.setTitulo("Task 1");
        
        Task task2 = new Task();
        task2.setId(2L);
        task2.setTitulo("Task 2");

        when(taskService.getAllTasks()).thenReturn(Arrays.asList(task1, task2));

        mockMvc.perform(get("/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].titulo").value("Task 1"))
                .andExpect(jsonPath("$[1].titulo").value("Task 2"));

        verify(taskService, times(1)).getAllTasks();
    }

    @Test
    public void testCreateTask() throws Exception {
        Task task = new Task();
        task.setId(1L);
        task.setTitulo("Task 1");
        task.setDescricao("Description 1");
        task.setDataVencimento(new Date());

        when(taskService.createTask(any(Task.class))).thenReturn(task);

        mockMvc.perform(post("/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"titulo\": \"Task 1\", \"descricao\": \"Description 1\", \"dataVencimento\": \"2024-05-25\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").value("Task 1"));

        verify(taskService, times(1)).createTask(any(Task.class));
    }

    @Test
    public void testUpdateTask() throws Exception {
        Task task = new Task();
        task.setId(1L);
        task.setTitulo("Task Updated");

        when(taskService.updateTask(anyLong(), any(Task.class))).thenReturn(task);

        mockMvc.perform(put("/tasks/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"titulo\": \"Task Updated\", \"descricao\": \"Updated Description\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").value("Task Updated"));

        verify(taskService, times(1)).updateTask(anyLong(), any(Task.class));
    }

    @Test
    public void testDeleteTask() throws Exception {
        doNothing().when(taskService).deleteTask(anyLong());

        mockMvc.perform(delete("/tasks/1"))
                .andExpect(status().isOk());

        verify(taskService, times(1)).deleteTask(anyLong());
    }

    @Test
    public void testGetTaskById() throws Exception {
        Task task = new Task();
        task.setId(1L);
        task.setTitulo("Task 1");

        when(taskService.getTaskById(anyLong())).thenReturn(task);

        mockMvc.perform(get("/tasks/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").value("Task 1"));

        verify(taskService, times(1)).getTaskById(anyLong());
    }
}
