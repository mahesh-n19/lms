package com.nic.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.nic.dto.JoinClassroomDto;
import com.nic.entity.ClassroomDetails;
import com.nic.entity.ResponseDto;
import com.nic.entity.StudentEnrollment;
import com.nic.repository.ClassroomDetailsRepo;
import com.nic.repository.StudentEnrollmentRepo;

@Service
public class StudentServiceImpl implements StudentService{

	@Autowired
	private StudentEnrollmentRepo studentEnrollmentRepo;
	
	@Autowired
	private ClassroomDetailsRepo classroomDetailsRepo;
	
	
	@Override
	public ResponseDto joinClassroom(JoinClassroomDto joinClassroomDto) {
		
		ResponseDto response = new ResponseDto();
		
		ClassroomDetails classroom = classroomDetailsRepo.getClassroomByClassroomCode(joinClassroomDto.getClassroomCode());
		
		if(classroom == null) {
			response.setStatus("Not Found");
			response.setStatusCode(HttpStatus.NOT_FOUND.value());
			response.setMessage("Invalid classroom code : " + joinClassroomDto.getClassroomCode() );
		}
		else 
		{
			StudentEnrollment enrollment = new StudentEnrollment();
			
			enrollment.setClassroomId(classroom.getClassRoomId());
			enrollment.setStudentId(joinClassroomDto.getStudentId());
			enrollment.setStatus("D");
			enrollment.setEnrollmentDate(LocalDate.now().toString());
			
			studentEnrollmentRepo.save(enrollment);
			
			response.setStatus("Success");
			response.setStatusCode(HttpStatus.OK.value());
			response.setMessage("Enrollment pending");
			
		}
		
		return response;
	}

}
