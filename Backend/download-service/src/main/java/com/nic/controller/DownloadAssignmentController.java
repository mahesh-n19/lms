package com.nic.controller;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import com.nic.entity.Assignment;
import com.nic.entity.StudentAssignmentSubmission;
import com.nic.repository.AssignmentRepo;
import com.nic.repository.StudentAssignmentSubmissionRepo;

@RestController
@RequestMapping("/api/v1")
public class DownloadAssignmentController {

	
	@Autowired
	private AssignmentRepo assignmentRepo;
	
	@Autowired 
	private StudentAssignmentSubmissionRepo submissionRepo;
	
	@GetMapping("/download-assignment/{id}")
	public ResponseEntity<Resource> downloadTeacherAssignment(@PathVariable("id") int assignmentId)
	{
		
		
		Assignment assignment = assignmentRepo.getByAssignmentId(assignmentId);
		
		String filePath = assignment.getFilePath()+"\\" + assignment.getAssignmentId() + "\\Assignment.pdf";
		Path path = Paths.get(filePath).normalize();
		Resource resource = null;
		try {
			resource = new UrlResource(path.toUri());
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		return ResponseEntity.ok()
				 .contentType(MediaType.APPLICATION_PDF)
				 .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"Assignment.pdf\"")
				 .body(resource);
	}
	
	
	@GetMapping("/download-submitted-assignment/{id}")
	public ResponseEntity<Resource> downloadStudentSubmittedAssignment(@PathVariable("id") int submissionId)
	{
		StudentAssignmentSubmission assignment = submissionRepo.getSubmissionDetailsById(submissionId);
		
		String filePath = assignment.getFilePath()+"\\" + assignment.getSubmissionId() + "\\" + assignment.getFileName();
		Path path = Paths.get(filePath).normalize();
		
		Resource resource = null;
		try {
			resource = new UrlResource(path.toUri());
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		
		return ResponseEntity.ok()
				 .contentType(MediaType.parseMediaType("application/octet-stream"))
				 .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + assignment.getFileName() + "\"")
				 .body(resource);
		
	}
	
}
