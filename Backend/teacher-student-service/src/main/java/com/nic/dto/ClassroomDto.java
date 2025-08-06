package com.nic.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ClassroomDto {
    private Long id;
    private String name;
    private String teacherName;

    public ClassroomDto(Long id,String name,String teacherName){
    	this.id=id;
    	this.name=name;
    	this.teacherName=teacherName;
    }
}
