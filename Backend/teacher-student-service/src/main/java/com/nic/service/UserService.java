package com.nic.service;

import java.util.List;

import com.nic.config.User;
import com.nic.dto.RegisterUserDto;
import com.nic.dto.UserSummaryDto;
import com.nic.entity.ResponseDto;

public interface UserService {
	
	public ResponseDto registerUser(RegisterUserDto user);
	public ResponseDto registerTeacher(RegisterUserDto user);
	public User getUserDetailsByEmail(String email);
	public ResponseDto getMyCreatedClassroom(int userId);
    public List<UserSummaryDto>getUsersByRole(String role);
    
    // for teacher dashboard service methd
    public ResponseDto teacherServiceDashboard(int userId);
}
