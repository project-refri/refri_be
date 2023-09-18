package com.refri.api.ingredient.service;

import com.refri.api.common.exception.NotFoundException;
import com.refri.api.ingredient.dto.CreateUserIngredientDto;
import com.refri.api.ingredient.dto.UpdateUserIngredientDto;
import com.refri.api.ingredient.entity.UserIngredient;
import com.refri.api.ingredient.repository.UserIngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserIngredientService {
    private final UserIngredientRepository userIngredientRepository;

    public UserIngredient create(CreateUserIngredientDto createUserIngredientDto) {
        return userIngredientRepository.save(createUserIngredientDto.toEntity());
    }

    public List<UserIngredient> findAll() {
        return userIngredientRepository.findAll();
    }

    public UserIngredient findById(Long id) {
        return userIngredientRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public UserIngredient update(Long id, UpdateUserIngredientDto updateUserIngredientDto) {
        UserIngredient userIngredient = userIngredientRepository.findById(id).orElseThrow(NotFoundException::new);
        userIngredient.update(updateUserIngredientDto);
        return userIngredient;
    }

    public void delete(Long id) {
        UserIngredient userIngredient = userIngredientRepository.findById(id).orElseThrow(NotFoundException::new);
        userIngredientRepository.delete(userIngredient);
    }
}
