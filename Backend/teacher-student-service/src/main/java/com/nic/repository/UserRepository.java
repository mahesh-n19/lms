package com.nic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nic.config.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	
	
	public User findByEmail(String email);    
    @Query("SELECT COUNT(U) from User U where U.role='ROLE_TEACHER' ")
    public int countTeacher();
    @Query("SELECT COUNT(U) from User U where U.role='ROLE_USER' ")
	public int countStudent();
}


