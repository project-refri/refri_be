package com.refri.api.user.dto;

import com.refri.api.user.entity.User;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserResDto {
    private User data;
}
