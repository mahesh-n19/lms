package com.nic.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmitAssignmentDto {

	private int classroomId;
	private int assignmentId;
	private String filename;
	
}
