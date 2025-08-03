package com.nic.service;

import java.io.File;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLIntegrityConstraintViolationException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nic.dto.AssignmentDto;
import com.nic.dto.GradedAssignmentDto;
import com.nic.dto.NotSubmittedAssignmentStudentDetailsDto;
import com.nic.dto.SubmitAssignmentDto;
import com.nic.dto.SubmittedAssignmentDto;
import com.nic.dto.SubmittedAssignmentStudentDetailsDto;
import com.nic.entity.Assignment;
import com.nic.entity.ResponseDto;
import com.nic.entity.StudentAssignmentSubmission;
import com.nic.repository.AssignmentRepo;
import com.nic.repository.StudentAssignmentSubmissionRepo;

import jakarta.transaction.Transactional;

@Service
public class AssignmentServiceImpl implements AssignmentService {
	
	 @Autowired
	  private ModelMapper modelMapper;
	 
	 @Autowired
	 private AssignmentRepo assignmentRepo;
	 
	 @Autowired 
	 private StudentAssignmentSubmissionRepo studentSubmissionRepo; 

	@Transactional
	@Override
	public ResponseDto createAssignment(AssignmentDto assignmentDto, MultipartFile pdfFile) {
		
		 ResponseDto response=new ResponseDto();
		 System.out.println("assignment details : "+assignmentDto);
		
		System.out.println("File name : "+pdfFile.getName());
		System.out.println("File Size : "+pdfFile.getSize());
		
		
		Assignment entity = modelMapper.map(assignmentDto, Assignment.class);
		entity.setMaxMarks((int)assignmentDto.getMarks());
		
		
		
		SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
		
//		String formattedDate = formater.format(assignmentDto.getDueDate());
//	     System.out.println("Date formatted : "+formattedDate);
	     entity.setAssignmentId(0);

//	     entity.setDueDate(formattedDate);
	     
	     
	     String path="D:\\Drive(F)\\Sunbeam LMS\\lms\\lms_data\\"+assignmentDto.getClassroomId();


	     entity.setFilePath(path);
	     
	     
		 assignmentRepo.save(entity);
		 
		 
		 try
		 {
			 File directory=new File(path + "\\" + entity.getAssignmentId());
			 if(!directory.exists()) {
					boolean created=directory.mkdirs();
					System.out.println("directory created");
					
			}
			 
			 Path filePath = Paths.get(path + "\\" + entity.getAssignmentId() + "\\Assignment.pdf");
			 
			 
			 pdfFile.transferTo(filePath.toFile());
			 
		 }
		 catch(IOException e)
		 {
			 response.setMessage("Failed to create assignment");
			 response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
			 return response;
		 }
		 
		
		
		response.setStatusCode(HttpStatus.OK.value());
		response.setMessage("Assignment created successfully");
 
		return response;
	}

	@Override
	public List<Assignment> getAllAssignments(int classroomId) {
		List<Assignment> assignment = new ArrayList<>();
		assignment=assignmentRepo.getAssignmentsByClassroomId(classroomId);

//		GetAssignmentDto getAssignments=new GetAssignmentDto();
//		getAssignments.set;		

		return assignment;
	}
	
	public AssignmentDto getAssignmentDetailsByAssignmentId(int assignmentId)
	{
		return assignmentRepo.getAssignmentByAssignmentId(assignmentId);
	}

	@Transactional
	@Override
	public ResponseDto submitStudentAssignment(SubmitAssignmentDto assignment, MultipartFile assignmentFile, int studentId) {
		
		
		System.out.println("Assignment Data : "+assignment);
		System.out.println("File name : "+assignment.getFilename());
		System.out.println("File Size : "+assignmentFile.getSize());
		
		String filePath = "D:\\Drive(F)\\Sunbeam LMS\\lms\\lms_data\\"+assignment.getClassroomId()+"\\"+assignment.getAssignmentId();
		
		StudentAssignmentSubmission submissionEntity = new StudentAssignmentSubmission();

		submissionEntity.setAssignmentId(assignment.getAssignmentId());
		submissionEntity.setStudentId(studentId);
		submissionEntity.setMarks(0);
		submissionEntity.setStatus("D");
		submissionEntity.setSubmissionDate(LocalDate.now().toString());
		submissionEntity.setFilePath(filePath);
		submissionEntity.setFileName(assignment.getFilename());
		if(assignmentFile.getContentType().equals("aaplication/pdf"))
		{
			submissionEntity.setFileType("pdf");
		}
		else 
		{
			submissionEntity.setFileType("zip");
		}
		
		StudentAssignmentSubmission submitted = studentSubmissionRepo.save(submissionEntity);
		
		ResponseDto response = new ResponseDto();
		try
		{
			
			File directory=new File(filePath + "\\" + submitted.getSubmissionId());
			
			if(!directory.exists()) {
				boolean created=directory.mkdirs();
				System.out.println("directory created");
				
			}
			
			Path assignmentFilePath = Paths.get(filePath + "\\" + submitted.getSubmissionId() + "\\" + assignment.getFilename());
			 
			 
			 assignmentFile.transferTo(assignmentFilePath.toFile());
			
			response.setMessage("Assignment submitted successfully");
			response.setStatus("success");
			response.setStatusCode(HttpStatus.OK.value());

		}
		catch(IOException e)
		{
			response.setMessage("Failed to submit assignment");
			 response.setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
			 return response;
		}
		
		
		return response;
	}

	@Override
	public ResponseDto getSubmittedAssignmentStatus(int assignmentId, int studentId) {
		
		ResponseDto response = new ResponseDto();
		
		SubmittedAssignmentDto submissionStatus = studentSubmissionRepo.getSubmittedAssignmentStatus(assignmentId, studentId);
		
		if(submissionStatus == null)
		{
			response.setMessage("No submission found");
			response.setStatus("danger");
			response.setStatusCode(HttpStatus.NOT_FOUND.value());
		}
		else 
		{
			response.setMessage("Submission found");
			response.setStatus("success");
			response.setStatusCode(HttpStatus.OK.value());
			response.setData(submissionStatus);
		}
		
		return response;
	}

	@Override
	public ResponseDto getSubmittedAssignmentDetailsByAssignmentId(long assignmentId) {
		
		ResponseDto response = new ResponseDto();
		
		List<SubmittedAssignmentStudentDetailsDto> submittedStudents = studentSubmissionRepo.getSubmittedAssignmentDetailsByAssignmentId(assignmentId);
		
		response.setData(submittedStudents);
		response.setMessage("Assignments submitted by students fetched successfully");
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		
		return response;
	}

	@Override
	public ResponseDto getStudentDetailsNotSubmittedAssignmentByAssignmentId(long classroomId, long assignmentId) {
		
		
		ResponseDto response = new ResponseDto();
		
		List<NotSubmittedAssignmentStudentDetailsDto> notSubmittedStudents = studentSubmissionRepo.getDetailsOfStudentsNotSubmittedAssignmentByAssignmentId( classroomId ,assignmentId);
		
		response.setData(notSubmittedStudents);
		response.setMessage("Student not submitted assignments fetched successfully");
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		
		return response;
	}

	@Override
	public ResponseDto getStudentDetailsWhoseAssignmentAreGradedByAssignmentId(long assignmentId) {
		ResponseDto response = new ResponseDto();
	
		
		List<GradedAssignmentDto> gradedStudents = studentSubmissionRepo.getDetailsOfStudentsWhoseAssignmentsAreGradedByAssignmentId( assignmentId);
		
		response.setData(gradedStudents);
		response.setMessage("Student graded fetched successfully");
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		
		return response;
	}
	
}


