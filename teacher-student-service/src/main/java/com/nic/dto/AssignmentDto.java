package com.nic.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentDto {
   private String title;
   private String description;
   private Date dueDate;
   private double marks;
   private String classroomId;
}
