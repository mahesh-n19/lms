package com.nic.service;

import org.springframework.web.multipart.MultipartFile;

import com.nic.dto.AssignmentDto;
import com.nic.entity.ResponseDto;

public interface AssignmentService {
  public ResponseDto createAssignment(AssignmentDto dto,MultipartFile pdfFile); 
}
