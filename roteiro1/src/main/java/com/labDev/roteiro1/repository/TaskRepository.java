package com.labDev.roteiro1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.labDev.roteiro1.entity.Task;
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}