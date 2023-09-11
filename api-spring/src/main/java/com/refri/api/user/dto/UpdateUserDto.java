package com.refri.api.user.dto;

import com.refri.api.user.type.Diet;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

@Data
@AllArgsConstructor
@NoArgsConstructor()
public class UpdateUserDto {
    @NotBlank
    private String username;

    @URL
    private String thumbnail;

    @NotBlank
    private String introduction;

    private Diet diet;
}
