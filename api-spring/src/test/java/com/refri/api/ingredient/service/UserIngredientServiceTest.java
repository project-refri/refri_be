package com.refri.api.ingredient.service;

import com.refri.api.common.exception.NotFoundException;
import com.refri.api.ingredient.dto.CreateUserIngredientDto;
import com.refri.api.ingredient.dto.UpdateUserIngredientDto;
import com.refri.api.ingredient.entity.Ingredient;
import com.refri.api.ingredient.entity.UserIngredient;
import com.refri.api.ingredient.repository.UserIngredientRepository;
import com.refri.api.ingredient.type.FoodType;
import com.refri.api.ingredient.type.StoreMethod;
import com.refri.api.user.entity.User;
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
@DisplayName("UserIngredientService 테스트")
public class UserIngredientServiceTest {

    @Mock
    private UserIngredientRepository userIngredientRepository;

    @InjectMocks
    private UserIngredientService userIngredientService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        userIngredientService = new UserIngredientService(userIngredientRepository);
    }

    @Test
    @DisplayName("create 메서드 테스트 - 유저 재료 생성 성공")
    public void testCreateIngredient() {
        // Arrange
        CreateUserIngredientDto createUserIngredientDto = new CreateUserIngredientDto(
                "testIngredient", Ingredient.builder().build(), User.builder().build(),
                FoodType.VEGETABLE, StoreMethod.REFRIGERATE, 1, 1, "http://example.com/thumbnail.png"
        );
        UserIngredient userIngredient = UserIngredient.builder().build();

        when(userIngredientRepository.save(any(UserIngredient.class))).thenReturn(createUserIngredientDto.toEntity());

        // Act
        UserIngredient result = userIngredientService.create(createUserIngredientDto);

        // Assert
        assertNotNull(result);
    }

    @Test
    @DisplayName("findAll 메서드 테스트 - 유저 재료 모두 찾기 성공")
    public void testFindAllIngredients() {
        // Arrange
        List<UserIngredient> userIngredientList = new ArrayList<>();
        // Add some sample ingredients to the list.

        when(userIngredientRepository.findAll()).thenReturn(userIngredientList);

        // Act
        List<UserIngredient> result = userIngredientService.findAll();

        // Assert
        assertEquals(userIngredientList.size(), result.size());
        // Add more assertions to verify that the result contains the expected data.
    }

    @Test
    @DisplayName("findById 메서드 테스트 - 유저 재료 ID 찾기 성공")
    public void testFindIngredientById_WhenIngredientExists() {
        // Arrange
        Long ingredientId = 1L;
        UserIngredient expectedIngredient = UserIngredient.builder().build();

        when(userIngredientRepository.findById(ingredientId)).thenReturn(Optional.of(expectedIngredient));

        // Act
        UserIngredient result = userIngredientService.findById(ingredientId);

        // Assert
        assertNotNull(result);
        // Add more assertions to verify that other properties of the result match the expected data.
    }

    @Test
    @DisplayName("findById 메서드 테스트 - 유저 재료 ID 찾기 실패")
    public void testFindIngredientById_WhenIngredientDoesNotExist() {
        // Arrange
        Long nonExistentIngredientId = 99L; // Choose an ID that doesn't exist in the repository.

        when(userIngredientRepository.findById(nonExistentIngredientId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(NotFoundException.class, () -> {
            userIngredientService.findById(nonExistentIngredientId);
        });
        // Verify that a NotFoundException is thrown when the ingredient doesn't exist.
    }


    @Test
    @DisplayName("update 메서드 테스트 - 유저 재료 수정 성공")
    public void testUpdateIngredient_WhenIngredientExists() {
        // Arrange
        Long ingredientId = 1L;
        UpdateUserIngredientDto updateDto = new UpdateUserIngredientDto(
                "testIngredient", Ingredient.builder().build(), User.builder().build(),
                FoodType.VEGETABLE, StoreMethod.REFRIGERATE, 1, 1, "http://example.com/thumbnail.png"
        );
        UserIngredient existingIngredient = UserIngredient.builder().build();

        when(userIngredientRepository.findById(ingredientId)).thenReturn(Optional.of(existingIngredient));
        when(userIngredientRepository.save(any(UserIngredient.class))).thenReturn(existingIngredient);

        // Act
        UserIngredient result = userIngredientService.update(ingredientId, updateDto);

        // Assert
        assertNotNull(result);
        // Add more assertions to verify that other properties of the result match the updated data in updateDto.
    }

    @Test
    @DisplayName("update 메서드 테스트 - 유저 재료 수정 실패")
    public void testUpdateIngredient_WhenIngredientDoesNotExist() {
        // Arrange
        Long nonExistentIngredientId = 99L; // Choose an ID that doesn't exist in the repository.
        UpdateUserIngredientDto updateDto = new UpdateUserIngredientDto(
                "testIngredient", Ingredient.builder().build(), User.builder().build(),
                FoodType.VEGETABLE, StoreMethod.REFRIGERATE, 1, 1, "http://example.com/thumbnail.png"
        );

        when(userIngredientRepository.findById(nonExistentIngredientId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(NotFoundException.class, () -> {
            userIngredientService.update(nonExistentIngredientId, updateDto);
        });
        // Verify that a NotFoundException is thrown when trying to update a non-existent ingredient.
    }

    @Test
    @DisplayName("delete 메서드 테스트 - 유저 재료 삭제 성공")
    public void testDeleteIngredient_WhenIngredientExists() {
        // Arrange
        Long ingredientId = 1L;
        UserIngredient existingIngredient = UserIngredient.builder().build();

        when(userIngredientRepository.findById(ingredientId)).thenReturn(Optional.of(existingIngredient));

        // Act
        userIngredientService.delete(ingredientId);

        // Assert
        // Verify that the delete operation was called once.
        verify(userIngredientRepository, times(1)).delete(existingIngredient);
    }

    @Test
    @DisplayName("delete 메서드 테스트 - 유저 재료 삭제 실패")
    public void testDeleteIngredient_WhenIngredientDoesNotExist() {
        // Arrange
        Long nonExistentIngredientId = 99L; // Choose an ID that doesn't exist in the repository.

        when(userIngredientRepository.findById(nonExistentIngredientId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(NotFoundException.class, () -> {
            userIngredientService.delete(nonExistentIngredientId);
        });
        // Verify that a NotFoundException is thrown when trying to delete a non-existent ingredient.
    }
}
