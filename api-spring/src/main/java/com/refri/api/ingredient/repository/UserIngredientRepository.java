package com.refri.api.ingredient.repository;

import com.refri.api.ingredient.entity.UserIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserIngredientRepository extends JpaRepository<UserIngredient, Long> {
}
