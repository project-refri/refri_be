package com.refri.api.ingredient.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UpdateIngredientDto {
    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotBlank
    @URL
    private String thumbnail;

    @NotBlank
    @URL
    private String icon;
}
