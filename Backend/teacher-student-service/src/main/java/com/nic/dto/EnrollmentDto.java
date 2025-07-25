package com.nic.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EnrollmentDto {

	private int studentId;
	private String StudentName;
	private String status;
	
	public EnrollmentDto(int studentId, String studentName, String status) {
		this.studentId = studentId;
		StudentName = studentName;
		this.status = status;
	}
	
	
}
