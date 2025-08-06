package com.nic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nic.config.JwtUtils;
import com.nic.dto.EnrollmentActionDto;
import com.nic.dto.JoinClassroomDto;
import com.nic.entity.ResponseDto;
import com.nic.service.StudentService;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping("/api/v1")
public class StudentController {

	@Autowired
	private StudentService studentService;
	
	@PreAuthorize("hasRole('USER')")
	@PostMapping("/join-classroom")
	public ResponseDto joinClassroom(@RequestBody JoinClassroomDto joinClassroomDto , @RequestHeader("Authorization") String authHeader) {
		
		return studentService.joinClassroom(joinClassroomDto, authHeader);
		
	}
	
	@PreAuthorize("hasRole('USER')")
	@GetMapping("/enrollment-status")
	public ResponseDto getEnrollmentStatus( @RequestHeader("Authorization") String authHeader) {
		return studentService.getEnrollmentStatus(authHeader);
	}
	
	@PreAuthorize("hasRole('TEACHER')")
	@GetMapping("/get-pending-enrollments/{id}")
	public ResponseDto getPendingEnrollmentsByClassroomId(@PathVariable ("id") int classroomId ) {
		return studentService.getPendingEnrollmentsByClassroomId(classroomId);
	}
	
	@PreAuthorize("hasRole('TEACHER')")
	@GetMapping("/get-approved-enrollments/{id}")
	public ResponseDto getApprovedEnrollementsByClassroomId(@PathVariable ("id") int classroomId )
	{
		return studentService.getApprovedEnrollementsByClassroomId(classroomId);
	}
	
	@PreAuthorize("hasRole('TEACHER')")
	@PostMapping("/approve-student")
	public ResponseDto approveStudentEnrollment(@RequestBody EnrollmentActionDto enrollment)
	{
		
		return studentService.approveStudentEnrollment(enrollment.getClassroomId(),enrollment.getStudentId());
	}
	
	@PreAuthorize("hasRole('TEACHER')")
	@PostMapping("/reject-student")
	public ResponseDto rejectStudentEnrollment(@RequestBody EnrollmentActionDto enrollment)
	{
		
		return studentService.rejectStudentEnrollment(enrollment.getClassroomId(),enrollment.getStudentId());
	}
	
	
	@PreAuthorize("hasRole('USER')")
	@GetMapping("/enrolled-classroom")
	public ResponseDto getJoinedClassroomDetailsByStudentId( @RequestHeader("Authorization") String authHeader)
	{
		return studentService.getJoinedClassroomDetailsByStudentId(authHeader);
	}
	
	@PreAuthorize("hasRole('USER')")
	@GetMapping("/assignments/{id}")
	public ResponseDto getAssignmentsByClassroomId(@PathVariable("id") int classroomId) {
		
		return studentService.getAssignmentsByClassroomId(classroomId);
	}
	
	// method for student dashboard
	@PreAuthorize("hasRole('USER')")
	@GetMapping("/get-student-dashboard")
	public ResponseDto getAllCount(@RequestHeader("Authorization") String authHeader) {
		String token = authHeader.replace("Bearer ","").trim();
		JwtUtils jwtUtils = new JwtUtils();
		Claims payload = jwtUtils.getPayloadFromJwt(token);
		int userId = Integer.parseInt(payload.get("userid").toString());
		
		return studentService.studentDashboard(userId);
	}
	
	
	
	
}
