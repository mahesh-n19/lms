package com.nic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nic.dto.AssignmentDto;
import com.nic.dto.SubmittedAssignmentStudentDetailsDto;
import com.nic.entity.Assignment;

public interface AssignmentRepo extends JpaRepository<Assignment, Long>{

	@Query(value="select * from assignment a where a.classroom_id=?1", nativeQuery = true )
	public List<Assignment> getAssignmentsByClassroomId(int classroomId);

	@Query("Select new com.nic.dto.AssignmentDto(a.assignmentId,a.classroomId, a.title,a.description,a.dueDate, a.maxMarks ) from Assignment a where a.assignmentId=?1")
	public AssignmentDto getAssignmentByAssignmentId(int assignmentId);
	
	@Query("From Assignment a where a.assignmentId=?1")
	public Assignment getByAssignmentId(long assignmentId);
    
	@Query("select count(a) from Assignment a")
	public int countAssignments();
	
	@Query(value = "SELECT COUNT(a.assignment_id) FROM student_enrollment se " +
            "JOIN assignment a ON se.classroom_id = a.classroom_id " +
            "WHERE se.student_id = :userID AND se.status = 'A'", nativeQuery = true)
	public Integer countAssignmentsForStudent(@Param("userID") int userID);

	@Query(value = "SELECT COUNT(se.student_id) AS total_students " +
            "FROM classroom_details cd " +
            "JOIN student_enrollment se ON cd.classroom_id = se.classroom_id " +
            "WHERE cd.teacher_id = :userID AND se.status = 'A'", 
    nativeQuery = true)
	public int countStudentDashboardByTeacherID(@Param("userID") int userID);
	
	// assingment count by teacher-ID
	@Query(value ="SELECT COUNT(a.assignment_id) AS total_assignments\r\n"
			+ "FROM assignment a\r\n"
			+ "JOIN classroom_details cd ON a.classroom_id = cd.classroom_id\r\n"
			+ "WHERE cd.teacher_id = :userID", nativeQuery = true)
	Integer assigmentCountByTeacherID(@Param("userID") int userID);
	
	

	
	
	
	 
	
	
	
}
