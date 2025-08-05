package com.nic.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.nic.dto.AssignmentDto;
import com.nic.dto.EvaluateDto;
import com.nic.dto.GetAssignmentDto;
import com.nic.dto.SubmitAssignmentDto;
import com.nic.entity.Assignment;
import com.nic.entity.ResponseDto;

public interface AssignmentService {
  public ResponseDto createAssignment(AssignmentDto dto,MultipartFile pdfFile);

  public List<Assignment> getAllAssignments(int classroomId); 
  
  public AssignmentDto getAssignmentDetailsByAssignmentId(int assignmentId);
  
  public ResponseDto submitStudentAssignment(SubmitAssignmentDto assignment ,MultipartFile assignmentFile, int studentId);
  public ResponseDto getSubmittedAssignmentStatus(int assignmentId, int studentId);
  
  public ResponseDto getSubmittedAssignmentDetailsByAssignmentId(long assignmentId);
  public ResponseDto getStudentDetailsNotSubmittedAssignmentByAssignmentId(long classroomId, long assignmentId);
  public ResponseDto getStudentDetailsWhoseAssignmentAreGradedByAssignmentId(long assignmentId);
  
  public ResponseDto getSubmissionDetailsBySubmissionId(long submissioId);
  
  public ResponseDto evaluateSubmissionBuSubmissionId(long submissionId, EvaluateDto evaluate);
}
