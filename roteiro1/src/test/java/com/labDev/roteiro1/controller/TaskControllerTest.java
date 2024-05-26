package com.labDev.roteiro1.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.labDev.roteiro1.controler.TaskController;
import com.labDev.roteiro1.entity.Task;
import com.labDev.roteiro1.service.TaskService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.text.SimpleDateFormat;
import java.util.Date;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TaskController.class)
public class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TaskService taskService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetTaskById() throws Exception {
        Date dataVencimento = new Date();
        Task task = new Task();
        task.setId(1L);
        task.setTitulo("Test Task");
        task.setDescricao("Test Description");
        task.setDataVencimento(dataVencimento);
        task.setPrioridade("High");
        task.setStatus("Prevista");

        when(taskService.getTaskById(1L)).thenReturn(task);

        mockMvc.perform(get("/tasks/1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json("{\"id\":1,\"titulo\":\"Test Task\",\"descricao\":\"Test Description\",\"dataVencimento\":\"" + formatDate(task.getDataVencimento()) + "\",\"prioridade\":\"High\",\"status\":\"Prevista\"}"));
    }
    private String formatDate(Date date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return dateFormat.format(date);
    }
}
