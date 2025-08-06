package com.nic.dto;

import com.nic.entity.ResponseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ClassroomDetailsDto {

	private String title;
	private String description;
	private int classroomCode;
	
}
