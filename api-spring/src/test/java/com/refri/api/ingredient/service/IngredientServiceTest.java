package com.refri.api.ingredient.service;

import com.refri.api.common.exception.NotFoundException;
import com.refri.api.ingredient.dto.CreateIngredientDto;
import com.refri.api.ingredient.dto.UpdateIngredientDto;
import com.refri.api.ingredient.entity.Ingredient;
import com.refri.api.ingredient.repository.IngredientRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@Slf4j
@DisplayName("IngredientService 테스트")
public class IngredientServiceTest {

    @Mock
    private IngredientRepository ingredientRepository;

    @InjectMocks
    private IngredientService ingredientService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        ingredientService = new IngredientService(ingredientRepository);
    }

    @Test
    @DisplayName("create 메서드 테스트 - 재료 생성 성공")
    public void testCreateIngredient() {
        // Arrange
        CreateIngredientDto createIngredientDto = new CreateIngredientDto(
                "testIngredient", "testIngredient", "http://example.com/thumbnail.png",
                "http://example.com/icon.ico"
        );
        Ingredient createdIngredient = Ingredient.builder().name("testIngredient").description(
                "testIngredient").thumbnail("http://example.com/thumbnail.png").icon(
                "http://example.com/icon.ico").build();

        when(ingredientRepository.save(any(Ingredient.class))).thenReturn(createIngredientDto.toEntity());

        // Act
        Ingredient result = ingredientService.create(createIngredientDto);

        // Assert
        assertNotNull(result);
    }

    @Test
    @DisplayName("findAll 메서드 테스트 - 재료 모두 찾기 성공")
    public void testFindAllIngredients() {
        // Arrange
        List<Ingredient> ingredientList = new ArrayList<>();
        // Add some sample ingredients to the list.

        when(ingredientRepository.findAll()).thenReturn(ingredientList);

        // Act
        List<Ingredient> result = ingredientService.findAll();

        // Assert
        assertEquals(ingredientList.size(), result.size());
        // Add more assertions to verify that the result contains the expected data.
    }

    @Test
    @DisplayName("findById 메서드 테스트 - 재료 ID 찾기 성공")
    public void testFindIngredientById_WhenIngredientExists() {
        // Arrange
        Long ingredientId = 1L;
        Ingredient expectedIngredient = Ingredient.builder().build();

        when(ingredientRepository.findById(ingredientId)).thenReturn(Optional.of(expectedIngredient));

        // Act
        Ingredient result = ingredientService.findById(ingredientId);

        // Assert
        assertNotNull(result);
        // Add more assertions to verify that other properties of the result match the expected data.
    }

    @Test
    @DisplayName("findById 메서드 테스트 - 재료 ID 찾기 실패")
    public void testFindIngredientById_WhenIngredientDoesNotExist() {
        // Arrange
        Long nonExistentIngredientId = 99L; // Choose an ID that doesn't exist in the repository.

        when(ingredientRepository.findById(nonExistentIngredientId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(NotFoundException.class, () -> {
            ingredientService.findById(nonExistentIngredientId);
        });
        // Verify that a NotFoundException is thrown when the ingredient doesn't exist.
    }


    @Test
    @DisplayName("update 메서드 테스트 - 재료 수정 성공")
    public void testUpdateIngredient_WhenIngredientExists() {
        // Arrange
        Long ingredientId = 1L;
        UpdateIngredientDto updateDto = new UpdateIngredientDto(
                "testIngredient", "testIngredient", "http://example.com/thumbnail.png",
                "http://example.com/icon.ico"
        );
        Ingredient existingIngredient = Ingredient.builder().build();

        when(ingredientRepository.findById(ingredientId)).thenReturn(Optional.of(existingIngredient));
        when(ingredientRepository.save(any(Ingredient.class))).thenReturn(existingIngredient);

        // Act
        Ingredient result = ingredientService.update(ingredientId, updateDto);

        // Assert
        assertNotNull(result);
        // Add more assertions to verify that other properties of the result match the updated data in updateDto.
    }

    @Test
    @DisplayName("update 메서드 테스트 - 재료 수정 실패")
    public void testUpdateIngredient_WhenIngredientDoesNotExist() {
        // Arrange
        Long nonExistentIngredientId = 99L; // Choose an ID that doesn't exist in the repository.
        UpdateIngredientDto updateDto = new UpdateIngredientDto(
                "testIngredient", "testIngredient", "http://example.com/thumbnail.png",
                "http://example.com/icon.ico"
        );

        when(ingredientRepository.findById(nonExistentIngredientId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(NotFoundException.class, () -> {
            ingredientService.update(nonExistentIngredientId, updateDto);
        });
        // Verify that a NotFoundException is thrown when trying to update a non-existent ingredient.
    }

    @Test
    @DisplayName("delete 메서드 테스트 - 재료 삭제 성공")
    public void testDeleteIngredient_WhenIngredientExists() {
        // Arrange
        Long ingredientId = 1L;
        Ingredient existingIngredient = Ingredient.builder().build();

        when(ingredientRepository.findById(ingredientId)).thenReturn(Optional.of(existingIngredient));

        // Act
        ingredientService.delete(ingredientId);

        // Assert
        // Verify that the delete operation was called once.
        verify(ingredientRepository, times(1)).delete(existingIngredient);
    }

    @Test
    @DisplayName("delete 메서드 테스트 - 재료 삭제 실패")
    public void testDeleteIngredient_WhenIngredientDoesNotExist() {
        // Arrange
        Long nonExistentIngredientId = 99L; // Choose an ID that doesn't exist in the repository.

        when(ingredientRepository.findById(nonExistentIngredientId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(NotFoundException.class, () -> {
            ingredientService.delete(nonExistentIngredientId);
        });
        // Verify that a NotFoundException is thrown when trying to delete a non-existent ingredient.
    }
}
