package com.nic.controller;

import java.text.SimpleDateFormat;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nic.dto.AssignmentDto;
import com.nic.dto.GetAssignmentDto;
import com.nic.entity.Assignment;
import com.nic.entity.ResponseDto;
import com.nic.service.AssignmentService;

@RestController
@RequestMapping("/api/v1")
public class AssignmentController {
 
	
	@Autowired
	private AssignmentService assignmentService;
	
	 
	
	
	@PreAuthorize("hasRole('TEACHER')")
	@PostMapping(value = "/create-assignment", consumes = {"multipart/form-data"})
	public ResponseDto createAssignment(
		@RequestPart("assignmentDto") AssignmentDto assignmentDto,
		@RequestParam("assignment") MultipartFile pdfFile
	)
	{
		
				
		return assignmentService.createAssignment(assignmentDto, pdfFile);
			
	}	
	
	@PreAuthorize("hasRole('TEACHER')")
	@GetMapping("/classroom-assignment/{id}")
	public List<Assignment> getAssignments(@PathVariable("id") int classroomId) {
		return assignmentService.getAllAssignments(classroomId);
	}
}
