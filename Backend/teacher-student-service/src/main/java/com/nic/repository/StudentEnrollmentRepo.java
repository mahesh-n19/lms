package com.nic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nic.dto.EnrollmentDto;
import com.nic.dto.PendingEnrollmentDto;
import com.nic.entity.StudentEnrollment;

@Repository
public interface StudentEnrollmentRepo extends JpaRepository<StudentEnrollment, Long> {

	
	@Query(" FROM StudentEnrollment S where S.classroomId = ?1 and S.studentId = ?2 ")
	public StudentEnrollment getEnrollmentDetailsByClassroomIdAndStudentId(int classroomId, int studentId);
	
	@Query("Select new com.nic.dto.PendingEnrollmentDto(C.title, C.classRoomCode , S.status) FROM ClassroomDetails C INNER JOIN StudentEnrollment S ON C.classRoomId = S.classroomId Where S.studentId = ?1 and ( S.status='D' or S.status = 'R' ) ")
	public List<PendingEnrollmentDto> getPendingEnrollmentDetails(int studentId);
	
	@Query("select new com.nic.dto.EnrollmentDto(U.userId,U.name,E.status) from User U Inner Join StudentEnrollment E On E.studentId=U.userId where E.status='D'")
	public List<EnrollmentDto>  getPendingEnrollmentsByClassroomId(int classroomId);
}
