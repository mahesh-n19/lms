package com.nic.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NotSubmittedAssignmentStudentDetailsDto {

	private String name;
	private String email;
	
	public NotSubmittedAssignmentStudentDetailsDto(String name, String email)
	{
		this.name = name;
		this.email = email;
	}
	
}
