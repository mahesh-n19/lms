package com.nic.service;

import java.util.List;

import com.nic.dto.ClassroomDetailsDto;
import com.nic.dto.ClassroomDto;
import com.nic.entity.ResponseDto;

public interface ClassroomService {

	public ResponseDto createClassroom(ClassroomDetailsDto obj, int userId);
	
	public ResponseDto getClassroomDetails(int classroomId);

	public List<ClassroomDto> getAllClassrooms();
}
