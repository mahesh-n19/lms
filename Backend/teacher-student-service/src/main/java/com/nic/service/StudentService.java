package com.nic.service;

import com.nic.dto.JoinClassroomDto;
import com.nic.entity.ResponseDto;

public interface StudentService {

	public ResponseDto joinClassroom(JoinClassroomDto joinClassroomDto);
	
}
