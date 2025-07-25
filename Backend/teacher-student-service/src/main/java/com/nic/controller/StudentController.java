package com.nic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nic.dto.JoinClassroomDto;
import com.nic.entity.ResponseDto;
import com.nic.service.StudentService;

@RestController
@RequestMapping("/api/v1")
public class StudentController {

	
	@Autowired
	private StudentService studentService;
	
	@PostMapping("/join-classroom")
	public ResponseDto joinClassroom(@RequestBody JoinClassroomDto joinClassroomDto) {
		
		return studentService.joinClassroom(joinClassroomDto);
		
	}
	
}
