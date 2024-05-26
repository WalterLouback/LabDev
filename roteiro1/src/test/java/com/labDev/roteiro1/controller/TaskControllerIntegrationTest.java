package com.labDev.roteiro1.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.labDev.roteiro1.entity.Task;
import com.labDev.roteiro1.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TaskControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setup() {
        taskRepository.deleteAll();
    }

    @Test
    void testCreateTask() throws Exception {
        Task task = new Task();
        task.setTitulo("Test Task");
        task.setDescricao("Task Description");
        task.setDataVencimento(new Date());
        task.setPrioridade("Alta");

        mockMvc.perform(post("/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(task)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.titulo").value("Test Task"))
                .andExpect(jsonPath("$.descricao").value("Task Description"))
                .andExpect(jsonPath("$.prioridade").value("Alta"));
    }

    @Test
    void testGetAllTasks() throws Exception {
        Task task1 = new Task();
        task1.setTitulo("Task 1");
        task1.setDescricao("Description 1");
        task1.setDataVencimento(new Date());
        task1.setPrioridade("Alta");

        Task task2 = new Task();
        task2.setTitulo("Task 2");
        task2.setDescricao("Description 2");
        task2.setDataVencimento(new Date());
        task2.setPrioridade("Baixa");

        taskRepository.saveAll(List.of(task1, task2));

        mockMvc.perform(get("/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].titulo").value("Task 1"))
                .andExpect(jsonPath("$[1].titulo").value("Task 2"));
    }

    @Test
    void testUpdateTask() throws Exception {
        Task task = new Task();
        task.setTitulo("Initial Task");
        task.setDescricao("Initial Description");
        task.setDataVencimento(new Date());
        task.setPrioridade("Média");
        Task savedTask = taskRepository.save(task);

        Task updatedTask = new Task();
        updatedTask.setTitulo("Updated Task");
        updatedTask.setDescricao("Updated Description");
        updatedTask.setDataVencimento(new Date());
        updatedTask.setPrioridade("Alta");

        mockMvc.perform(put("/tasks/" + savedTask.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedTask)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").value("Updated Task"))
                .andExpect(jsonPath("$.descricao").value("Updated Description"))
                .andExpect(jsonPath("$.prioridade").value("Alta"));

        Task fetchedTask = taskRepository.findById(savedTask.getId()).get();
        assertThat(fetchedTask.getTitulo()).isEqualTo("Updated Task");
        assertThat(fetchedTask.getDescricao()).isEqualTo("Updated Description");
        assertThat(fetchedTask.getPrioridade()).isEqualTo("Alta");
    }

    @Test
    void testDeleteTask() throws Exception {
        Task task = new Task();
        task.setTitulo("Task to be deleted");
        task.setDescricao("Description");
        task.setDataVencimento(new Date());
        task.setPrioridade("Baixa");
        Task savedTask = taskRepository.save(task);

        mockMvc.perform(delete("/tasks/" + savedTask.getId()))
                .andExpect(status().isOk());

        assertThat(taskRepository.findById(savedTask.getId())).isEmpty();
    }

    @Test
    void testGetTaskById() throws Exception {
        Task task = new Task();
        task.setTitulo("Task to be fetched");
        task.setDescricao("Description");
        task.setDataVencimento(new Date());
        task.setPrioridade("Alta");
        Task savedTask = taskRepository.save(task);

        mockMvc.perform(get("/tasks/" + savedTask.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").value("Task to be fetched"))
                .andExpect(jsonPath("$.descricao").value("Description"))
                .andExpect(jsonPath("$.prioridade").value("Alta"));
    }
}
