package com.nic.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nic.dto.SubmittedAssignmentDto;
import com.nic.entity.StudentAssignmentSubmission;

public interface StudentAssignmentSubmissionRepo extends JpaRepository<StudentAssignmentSubmission, Long> {

	
	@Query("SELECT new com.nic.dto.SubmittedAssignmentDto(S.submissionId,S.status, S.marks, S.submissionDate, S.fileName, S.fileType) FROM StudentAssignmentSubmission S where S.assignmentId=?1 and S.studentId=?2")
	public SubmittedAssignmentDto getSubmittedAssignmentStatus(int assignmentId, int studentId);
	
	@Query("FROM StudentAssignmentSubmission S where S.submissionId=?1")
	public StudentAssignmentSubmission getSubmissionDetailsById(int submissionId);
	
}
