package com.nic.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nic.entity.Assignment;

public interface AssignmentRepo extends JpaRepository<Assignment, Long>{
   
}
