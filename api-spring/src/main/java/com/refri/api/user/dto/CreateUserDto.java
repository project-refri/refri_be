package com.refri.api.user.dto;

import com.refri.api.user.entity.User;
import com.refri.api.user.type.Diet;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CreateUserDto {

    @NotBlank
    private String username;

    @Email
    private String email;

    public User toEntity() {
        return User.builder()
                .username(this.getUsername())
                .email(this.getEmail())
                .introduction("안녕하세요!")
                .diet(Diet.NORMAL)
                .thumbnail("https://refri.s3.ap-northeast-2.amazonaws.com/vegan.png")
                .build();
    }
}

