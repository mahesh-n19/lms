package com.nic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nic.dto.GradedAssignmentDto;
import com.nic.dto.NotSubmittedAssignmentStudentDetailsDto;
import com.nic.dto.SubmittedAssignmentDto;
import com.nic.dto.SubmittedAssignmentStudentDetailsDto;
import com.nic.entity.StudentAssignmentSubmission;

public interface StudentAssignmentSubmissionRepo extends JpaRepository<StudentAssignmentSubmission, Long> {

	
	@Query("SELECT new com.nic.dto.SubmittedAssignmentDto(S.submissionId,S.status, S.marks, S.submissionDate, S.fileName, S.fileType) FROM StudentAssignmentSubmission S where S.assignmentId=?1 and S.studentId=?2")
	public SubmittedAssignmentDto getSubmittedAssignmentStatus(int assignmentId, int studentId);
	
	@Query("select new com.nic.dto.SubmittedAssignmentStudentDetailsDto(S.submissionId, U.name, S.submissionDate) FROM StudentAssignmentSubmission S INNER JOIN User U on S.studentId = U.userId where S.assignmentId=?1 and S.status='D'")
	public List<SubmittedAssignmentStudentDetailsDto> getSubmittedAssignmentDetailsByAssignmentId(long assignmentId);

	@Query("select new com.nic.dto.NotSubmittedAssignmentStudentDetailsDto(U.name,U.email) "
		+ " FROM StudentEnrollment SE "
		+ " JOIN User U on SE.studentId = U.userId"
		+ " WHERE SE.classroomId=?1 AND NOT EXISTS ("
		+ "												SELECT SAS FROM StudentAssignmentSubmission SAS"
		+ "												JOIN Assignment A on A.assignmentId = SAS.assignmentId"
		+ "												WHERE SAS.studentId = SE.studentId and SAS.assignmentId=?2 and A.classroomId=?1"
		+ ")")
	public List<NotSubmittedAssignmentStudentDetailsDto> getDetailsOfStudentsNotSubmittedAssignmentByAssignmentId(long classroomId, long assignmentId);

	
	@Query("select new com.nic.dto.GradedAssignmentDto(U.name,U.email,SAS.marks)"
		+ " FROM User U "
		+ " JOIN StudentAssignmentSubmission SAS on U.userId = SAS.studentId "
		+ " WHERE SAS.assignmentId=?1 and SAS.status='A'")
	public List<GradedAssignmentDto> getDetailsOfStudentsWhoseAssignmentsAreGradedByAssignmentId(long assignmentId);

	
	
}
