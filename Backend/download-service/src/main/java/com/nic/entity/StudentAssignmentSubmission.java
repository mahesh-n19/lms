package com.nic.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="student_assignment_submission")
@AllArgsConstructor
@NoArgsConstructor
public class StudentAssignmentSubmission {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "submission_id")
	private long submissionId;
	
	@Column(name="assignment_id")
	private int assignmentId;
	
	@Column(name="student_id")
	private int studentId;
	
	@Column(name="marks")
	private double marks;
	
	@Column(name="status")
	private String status;
	
	@Column(name="file_path")
	private String filePath;
	
	@Column(name="file_name")
	private String fileName;
	
	@Column(name="file_type")
	private String fileType;
	
	@Column(name="submission_date")
	private String submissionDate;
	

}
