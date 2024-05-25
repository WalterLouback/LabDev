package com.labDev.roteiro1.entity;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Entity;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private String descricao;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dataVencimento;
    private String prioridade;
    private String status;
    private String tipoTarefa = "Livre";

    public Long getId() {
        return id;
    }
    public String getTipoTarefa() {
        return tipoTarefa;
    }

    public void calcularStatus() {
        if (this.tipoTarefa.equals("Data") || this.tipoTarefa.equals("Prazo")) {
            if (this.dataVencimento == null) {
                this.status = "Prevista"; 
            } else if (this.dataVencimento.before(new Date())) {
                this.status =  diferencaEmDias(dataVencimento, new Date()) +" dias de atraso"; 
            } else {
                this.status = "Prevista"; 
            }
        } else if (this.tipoTarefa.equals("Livre")) {
            this.status = "Prevista";
        }
    }

    public static long diferencaEmDias(Date dataInicial, Date dataFinal) {
        long diferencaMillis = dataFinal.getTime() - dataInicial.getTime();
        return diferencaMillis / (1000 * 60 * 60 * 24);
    }

    public void setTipoTarefa(String tipoTarefa) {
        this.tipoTarefa = tipoTarefa;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Date getDataVencimento() {
        return dataVencimento;
    }

    public void setDataVencimento(Date dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public String getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(String prioridade) {
        this.prioridade = prioridade;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
}
