package com.nic.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EvaluateAssignmentDetailsDto {

	private long submissionId;
	private long studentId;
	private String name;
	private double maxMarks;
	private String fileName;
	private String fileType;
	private String submissionDate;
	
	public EvaluateAssignmentDetailsDto(long submissionId, long studentId, String name, double maxMarks,
			String fileName, String fileType, String submissionDate) {
		this.submissionId = submissionId;
		this.studentId = studentId;
		this.name = name;
		this.maxMarks = maxMarks;
		this.fileName = fileName;
		this.fileType = fileType;
		this.submissionDate = submissionDate;
	}
	
	
}
