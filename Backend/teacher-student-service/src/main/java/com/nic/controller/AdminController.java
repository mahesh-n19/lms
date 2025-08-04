package com.nic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nic.dto.AssignmentDto;
import com.nic.dto.ClassroomDto;
import com.nic.dto.UserSummaryDto;
import com.nic.entity.Assignment;
import com.nic.entity.ResponseDto;
import com.nic.service.AssignmentService;
import com.nic.service.ClassroomService;
import com.nic.service.UserService;

@RestController
@RequestMapping("/api/v1")
public class AdminController {
	@Autowired
   private UserService userService;
	@Autowired
   private ClassroomService classroomService;
	@Autowired
   private AssignmentService assignmentService;
	
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/get-count")
	public ResponseDto getAllCount()
	{

		return assignmentService.getAdminCount();
	}
	
}
