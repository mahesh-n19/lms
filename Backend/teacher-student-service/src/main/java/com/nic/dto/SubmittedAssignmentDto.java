package com.nic.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SubmittedAssignmentDto {

	private long submissionId;
	private String status;
	private double marks;
	private String submissionDate;
	private String filename;
	private String filetype;
	
	
	public SubmittedAssignmentDto(long submissionId , String status, double marks, String submissionData, String filename, String filetype)
	{
		this.submissionId = submissionId;
		this.status = status;
		this.marks = marks;
		this.submissionDate = submissionData;
		this.filename = filename;
		this.filetype = filetype;
	}
	
}
