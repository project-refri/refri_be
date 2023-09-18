package com.refri.api.ingredient.dto;

import com.refri.api.ingredient.entity.Ingredient;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CreateIngredientDto {
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

    public Ingredient toEntity() {
        return Ingredient.builder()
                .name(name)
                .description(description)
                .thumbnail(thumbnail)
                .icon(icon)
                .build();
    }
}
