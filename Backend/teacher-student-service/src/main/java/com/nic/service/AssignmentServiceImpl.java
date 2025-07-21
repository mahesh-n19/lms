package com.nic.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nic.dto.AssignmentDto;
import com.nic.entity.Assignment;
import com.nic.entity.ResponseDto;
import com.nic.repository.AssignmentRepo;

import jakarta.transaction.Transactional;

@Service
public class AssignmentServiceImpl implements AssignmentService {
	
	 @Autowired
	  private ModelMapper modelMapper;
	 
	 @Autowired
	 private AssignmentRepo assignmentRepo;

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
		 String formattedDate = formater.format(assignmentDto.getDueDate());
	     System.out.println("Date formatted : "+formattedDate);
	     entity.setAssignmentId(0);
	     entity.setDueDate(formattedDate);
	     
	     String path="D:\\sunbeam\\lms\\lms_data\\"+assignmentDto.getClassroomId();

	     entity.setFilePath(path);
	     
	     System.out.println("Entity : "+entity);
		
		 assignmentRepo.save(entity);
		 
		 System.out.println("after save");
		 
		 
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
		 
		System.out.println("entity : "+entity);
		
		
		response.setStatusCode(HttpStatus.OK.value());
		response.setMessage("Assignment created successfully");
 
		return response;
	}
	
}
