package com.nic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nic.entity.StudentEnrollment;

@Repository
public interface StudentEnrollmentRepo extends JpaRepository<StudentEnrollment, Long> {

}
