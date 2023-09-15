package com.refri.api.ingredient.dto;

import com.refri.api.ingredient.entity.Ingredient;
import com.refri.api.ingredient.type.FoodType;
import com.refri.api.ingredient.type.StoreMethod;
import com.refri.api.user.entity.User;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.URL;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UpdateUserIngredientDto {

    @NotBlank
    private String name;

    @NotNull
    private Ingredient ingredient;

    @NotNull
    private User owner;

    @NotNull
    private FoodType foodType;

    @NotNull
    private StoreMethod storeMethod;

    @Min(1)
    private int count;

    @Min(0)
    private int daysBeforeExpiration;

    @NotBlank
    @URL
    private String icon;
}
