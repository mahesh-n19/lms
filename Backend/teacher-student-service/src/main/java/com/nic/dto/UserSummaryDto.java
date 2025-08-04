package com.nic.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserSummaryDto {
    private int userId;
    private String name;

    public UserSummaryDto(int id, String name) {
        this.userId = id;
        this.name = name;
    }
}
