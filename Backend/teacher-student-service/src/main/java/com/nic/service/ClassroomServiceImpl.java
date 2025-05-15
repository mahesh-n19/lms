package com.nic.service;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.nic.dto.ClassroomDetailsDto;
import com.nic.entity.ClassroomDetails;
import com.nic.entity.ResponseDto;
import com.nic.repository.ClassroomDetailsRepo;

@Service
public class ClassroomServiceImpl implements ClassroomService{
	
	@Autowired
	private ClassroomDetailsRepo classroomDetailsRepo;

	@Override
	public ResponseDto createClassroom(ClassroomDetailsDto obj, int userId) {
		
		LocalDateTime currentDts = LocalDateTime.now(); 
		
		ClassroomDetails classRoom = new ClassroomDetails();
		
		classRoom.setTitle(obj.getTitle());
		classRoom.setDescription(obj.getDescription());
		classRoom.setClassRoomCode(obj.getClassroomCode());
		classRoom.setCreatedDts(currentDts.toString() );
		classRoom.setTeacherId(userId);
		
		classRoom = classroomDetailsRepo.save(classRoom);
		
		ResponseDto response = new ResponseDto();
		response.setStatus("success");
		response.setStatusCode(HttpStatus.OK.value());
		response.setMessage("Classroom created successfully");
		response.setData(classRoom);
		
		return response;
	}

	
	
	
}
