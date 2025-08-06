package com.nic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nic.config.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	
	
	public User findByEmail(String email);
    List<User> findByRole(String role);
    
    @Query("SELECT COUNT(U) from User U where U.role='ROLE_TEACHER' ")
    public int countTeacher();
    @Query("SELECT COUNT(U) from User U where U.role='ROLE_USER' ")
	public int countStudent();
    
    // method for student count in teacher-dashbard
    @Query(value = "SELECT COUNT(*) FROM users WHERE role = 'ROLE_USER' AND user_id = :userID", nativeQuery = true)
    public int countStudentDashboardByTeacherID(@Param("userID") int userID);

}


