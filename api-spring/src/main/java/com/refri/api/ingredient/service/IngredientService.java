package com.refri.api.ingredient.service;

import com.refri.api.common.exception.NotFoundException;
import com.refri.api.ingredient.dto.CreateIngredientDto;
import com.refri.api.ingredient.dto.UpdateIngredientDto;
import com.refri.api.ingredient.entity.Ingredient;
import com.refri.api.ingredient.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    public Ingredient create(CreateIngredientDto createIngredientDto) {
        return ingredientRepository.save(createIngredientDto.toEntity());
    }

    public List<Ingredient> findAll() {
        return ingredientRepository.findAll();
    }

    public Ingredient findById(Long id) {
        return ingredientRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public Ingredient update(Long id, UpdateIngredientDto updateIngredientDto) {
        Ingredient ingredient = ingredientRepository.findById(id).orElseThrow(NotFoundException::new);
        ingredient.update(updateIngredientDto);
        return ingredient;
    }

    public void delete(Long id) {
        Ingredient ingredient = ingredientRepository.findById(id).orElseThrow(NotFoundException::new);
        ingredientRepository.delete(ingredient);
    }
}
