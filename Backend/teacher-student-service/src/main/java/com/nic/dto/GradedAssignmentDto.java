package com.nic.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GradedAssignmentDto {

	private String name;
	private String email;
	private double marks;
	
	
	public GradedAssignmentDto(String name, String email, double marks)
	{
		this.name = name;
		this.email = email;
		this.marks = marks;
	}
	
}
