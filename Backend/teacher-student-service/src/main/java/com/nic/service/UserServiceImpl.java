package com.nic.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.nic.config.User;
import com.nic.dto.RegisterUserDto;
import com.nic.dto.UserSummaryDto;
import com.nic.entity.ClassroomDetails;
import com.nic.entity.ResponseDto;
import com.nic.repository.AssignmentRepo;
import com.nic.repository.ClassroomDetailsRepo;
import com.nic.repository.StudentAssignmentSubmissionRepo;
import com.nic.repository.UserRepository;


@Service
public class UserServiceImpl implements UserService{

    private final StudentAssignmentSubmissionRepo studentAssignmentSubmissionRepo;

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
    private ModelMapper modelMapper;
	
	@Autowired
	private ClassroomDetailsRepo classRoomRepo;
	
	@Autowired
	private AssignmentRepo assignmentRepo;

    UserServiceImpl(StudentAssignmentSubmissionRepo studentAssignmentSubmissionRepo) {
        this.studentAssignmentSubmissionRepo = studentAssignmentSubmissionRepo;
    }
	
	public User getUserDetailsByEmail(String email)
	{
		
		return userRepo.findByEmail(email);
		
	}
	
	
	@Override
	public ResponseDto registerUser(RegisterUserDto user) {
		
//		UserEntity userObj = userRepo.save(user);
		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		User userObj = new User();
		userObj.setName(user.getName());
		userObj.setEmail(user.getEmail());
		userObj.setPassword(encoder.encode(user.getPassword()));
		userObj.setRole("ROLE_USER");
		
		userRepo.save(userObj);
		
		ResponseDto response = new ResponseDto();
		
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		response.setMessage("User registered successfully");
		
		
		return response;
	}

	@Override
	public ResponseDto registerTeacher(RegisterUserDto user) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
		User userObj = new User();
		userObj.setName(user.getName());
		userObj.setEmail(user.getEmail());
		userObj.setPassword(encoder.encode(user.getPassword()));
		userObj.setRole("ROLE_TEACHER");
		
		userRepo.save(userObj);
		
		ResponseDto response = new ResponseDto();
		
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		response.setMessage("Teacher registered successfully");
		
		
		return response;
	}


	@Override
	public ResponseDto getMyCreatedClassroom(int userId) {
		
		List<ClassroomDetails> classRoomsDetails = classRoomRepo.getClassroomByUserId(userId);

		
		ResponseDto response = new ResponseDto();
		
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		response.setMessage("Teacher registered successfully");
		response.setData(classRoomsDetails);
		
		return response;
		
	}


	@Override
	public List<UserSummaryDto> getUsersByRole(String role) {
       List<User> users=userRepo.findByRole(role);
       List<UserSummaryDto> userDtos=new ArrayList<>();
       for(User user:users) {
    	   UserSummaryDto dto=modelMapper.map(user, UserSummaryDto.class);
    	   userDtos.add(dto);
       }
       return userDtos;
	}

	@Override
	public ResponseDto teacherServiceDashboard(int userId) {
		// TODO: implement this method
//		int studentCount=userRepo.countStudentDashboardByTeacherID(userId);
		int studentCount=userRepo.countStudent();
		int classroomCount=classRoomRepo.getClassroomCountByTeacherID(userId);
		int assignmentsCount=assignmentRepo.countAssignments();
		
		
		ResponseDto response = new ResponseDto();
		
		Map<String, Integer> counts = new HashMap<>();
		counts.put("students", studentCount);
		counts.put("classrooms", classroomCount);
		counts.put("assignments", assignmentsCount);
		response.setData(counts);
		response.setMessage("Counts fetched successfulluy");
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		
		return response;
	}
	
	

}
