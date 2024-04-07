package com.labDev.roteiro1.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.labDev.roteiro1.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
}