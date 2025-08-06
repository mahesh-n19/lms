package com.nic.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SubmittedAssignmentStudentDetailsDto {

	private long submissionId;
	private String name;
	private String submissionDate;
	
	public SubmittedAssignmentStudentDetailsDto(long submissionId, String name,String submissionDate )
	{
		this.submissionId = submissionId;
		this.name = name;
		this.submissionDate = submissionDate;
	}
	
	
}
