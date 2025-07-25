package com.nic.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.nic.config.JwtUtils;
import com.nic.dto.EnrollmentDto;
import com.nic.dto.JoinClassroomDto;
import com.nic.dto.PendingEnrollmentDto;
import com.nic.entity.ClassroomDetails;
import com.nic.entity.ResponseDto;
import com.nic.entity.StudentEnrollment;
import com.nic.repository.ClassroomDetailsRepo;
import com.nic.repository.StudentEnrollmentRepo;

import io.jsonwebtoken.Claims;

@Service
public class StudentServiceImpl implements StudentService{

	@Autowired
	private StudentEnrollmentRepo studentEnrollmentRepo;
	
	@Autowired
	private ClassroomDetailsRepo classroomDetailsRepo;
	
	@Autowired
	JwtUtils jwtUtils;
	
	
	@Override
	public ResponseDto joinClassroom(JoinClassroomDto joinClassroomDto, String authHeader) {
		
		ResponseDto response = new ResponseDto();
		
		ClassroomDetails classroom = classroomDetailsRepo.getClassroomByClassroomCode(joinClassroomDto.getClassroomCode());
		
		if(classroom == null) {
			response.setStatus("Not Found");
			response.setStatusCode(HttpStatus.NOT_FOUND.value());
			response.setMessage("Invalid classroom code : " + joinClassroomDto.getClassroomCode() );
		}
		else 
		{
			System.out.println("Token : "+authHeader);
			
			String token = authHeader.replace("Bearer ","").trim();
			Claims payload = jwtUtils.getPayloadFromJwt(token);
			
			System.out.println("Payload : "+payload);
			int userId = Integer.parseInt(payload.get("userid").toString());
			
			System.out.println("User ID : "+userId);
			
			StudentEnrollment alreadyEnroll = studentEnrollmentRepo.getEnrollmentDetailsByClassroomIdAndStudentId(classroom.getClassRoomId(), userId);
			
			if(alreadyEnroll == null)
			{
				StudentEnrollment enrollment = new StudentEnrollment();
				
				enrollment.setClassroomId(classroom.getClassRoomId());
				enrollment.setStudentId(userId);
				enrollment.setStatus("D");
				enrollment.setEnrollmentDate(LocalDate.now().toString());
				
				studentEnrollmentRepo.save(enrollment);
				
				response.setStatus("Success");
				response.setStatusCode(HttpStatus.OK.value());
				response.setMessage("Enrollment pending");
			}
			else 
			{
				response.setStatus("danger");
				response.setStatusCode(HttpStatus.CONFLICT.value());
				response.setMessage("Enrollment already exist");
			}
		
			
			
			
		}
		
		return response;
	}


	@Override
	public ResponseDto getEnrollmentStatus(String authHeader) {
		
		String token = authHeader.replace("Bearer ","").trim();
		Claims payload = jwtUtils.getPayloadFromJwt(token);
		
		System.out.println("Payload : "+payload);
		int userId = Integer.parseInt(payload.get("userid").toString());
		System.out.println("User ID  : "+userId);
		
		List<PendingEnrollmentDto> pendingEnrollments=studentEnrollmentRepo.getPendingEnrollmentDetails(userId);
		
		ResponseDto response=new ResponseDto();
		response.setData(pendingEnrollments);
		response.setMessage("pending enrollments fetched successfully");
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		return response;
	}


	@Override
	public ResponseDto getPendingEnrollmentsByClassroomId(int classroomId) {
		
		List<EnrollmentDto> enrollments=studentEnrollmentRepo.getPendingEnrollmentsByClassroomId(classroomId);
		ResponseDto response=new ResponseDto();
		response.setData(enrollments);
		response.setMessage("pending enrollments fetched successfully");
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		return response;
	}

}
