package com.refri.api.ingredient;

import com.refri.api.ingredient.dto.CreateUserIngredientDto;
import com.refri.api.ingredient.dto.UpdateUserIngredientDto;
import com.refri.api.ingredient.entity.UserIngredient;
import com.refri.api.ingredient.service.IngredientService;
import com.refri.api.ingredient.service.UserIngredientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ingredient")
public class IngredientController {
    private final IngredientService ingredientService;
    private final UserIngredientService userIngredientService;

    @PostMapping("/user")
    public UserIngredient create(
            @RequestBody @Valid CreateUserIngredientDto createUserIngredientDto
    ) {
        return userIngredientService.create(createUserIngredientDto);
    }

    @GetMapping("/user")
    public List<UserIngredient> findAll() {
        return userIngredientService.findAll();
    }

    @GetMapping("/user/{id}")
    public UserIngredient findById(@RequestParam("id") Long id) {
        return userIngredientService.findById(id);
    }

    @PatchMapping("/user/{id}")
    public UserIngredient update(
            @RequestParam("id") Long id,
            @RequestBody @Valid UpdateUserIngredientDto updateUserIngredientDto
    ) {
        return userIngredientService.update(id, updateUserIngredientDto);
    }
}
