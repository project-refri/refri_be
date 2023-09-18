package com.refri.api.user;

import com.refri.api.common.exception.NotFoundException;
import com.refri.api.common.exception.UserDuplicatedException;
import com.refri.api.user.dto.CreateUserDto;
import com.refri.api.user.dto.UpdateUserDto;
import com.refri.api.user.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@Slf4j
@DisplayName("UserService 테스트")
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(userRepository);
    }

    @Test
    @DisplayName("create 메서드 테스트 - 유저 생성 성공")
    public void testCreateUser_Success() {
        // Given
        CreateUserDto createUserDto = new CreateUserDto("testUser", "test@example.com");

        when(userRepository.findByEmail(createUserDto.getEmail())).thenReturn(Optional.empty());
        when(userRepository.findByUsername(createUserDto.getUsername())).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenReturn(createUserDto.toEntity());

        // When
        User createdUser = userService.create(createUserDto);

        // Then
        assertNotNull(createdUser);
    }

    @Test
    @DisplayName("create 메서드 테스트 - 중복된 이메일으로 인한 실패")
    public void testCreateUser_DuplicateEmail() {
        // Given
        CreateUserDto createUserDto = new CreateUserDto("existingUser", "existing@example.com");
        User existingUser = User.builder()
                .email("existing@example.com")
                .build();

        when(userRepository.findByEmail(createUserDto.getEmail())).thenReturn(Optional.of(existingUser));
        when(userRepository.findByUsername(createUserDto.getUsername())).thenReturn(Optional.empty());

        // When & Then
        assertThrows(UserDuplicatedException.class, () -> userService.create(createUserDto));
    }

    @Test
    @DisplayName("create 메서드 테스트 - 중복된 유저명으로 인한 실패")
    public void testCreateUser_DuplicateUsername() {
        // Given
        CreateUserDto createUserDto = new CreateUserDto("existingUser", "existing@example.com");
        User existingUser = User.builder()
                .username("existingUser")
                .build();

        when(userRepository.findByEmail(createUserDto.getEmail())).thenReturn(Optional.empty());
        when(userRepository.findByUsername(createUserDto.getUsername())).thenReturn(Optional.of(existingUser));

        // When & Then
        assertThrows(UserDuplicatedException.class, () -> userService.create(createUserDto));
    }


    @Test
    @DisplayName("findAll 메서드 테스트")
    public void testFindAllUsers() {
        // Given
        List<User> userList = Arrays.asList(User.builder().build(), User.builder().build());

        when(userRepository.findAll()).thenReturn(userList);

        // When
        List<User> result = userService.findAll();

        // Then
        assertNotNull(result);
        assertEquals(userList.size(), result.size());
    }

    @Test
    @DisplayName("findOne 메서드 테스트 - 유효한 ID로 조회")
    public void testFindOneUser_ValidId() {
        // Given
        Long validUserId = 1L;
        User user = User.builder().build();
        when(userRepository.findById(validUserId)).thenReturn(Optional.of(user));

        // When
        User result = userService.findById(validUserId);

        // Then
        assertNotNull(result);
    }

    @Test
    @DisplayName("findOne 메서드 테스트 - 유효하지 않은 ID로 조회")
    public void testFindOneUser_InvalidId() {
        // Given
        Long invalidUserId = 999L; // Assuming this ID does not exist
        when(userRepository.findById(invalidUserId)).thenReturn(Optional.empty());

        // When & Then

        assertThrows(NotFoundException.class, () -> userService.findById(invalidUserId));
    }

    @Test
    @DisplayName("findByEmail 메서드 테스트 - 유효한 이메일로 조회")
    public void testFindByEmail_ValidEmail() {
        // Given
        String validEmail = "test@example.com";
        User user = User.builder().build();
        when(userRepository.findByEmail(validEmail)).thenReturn(Optional.of(user));

        // When
        User result = userService.findByEmail(validEmail);

        // Then
        assertNotNull(result);
    }

    @Test
    @DisplayName("findByEmail 메서드 테스트 - 유효하지 않은 이메일로 조회")
    public void testFindByEmail_InvalidEmail() {
        // Given
        String invalidEmail = "nonexistent@example.com"; // Assuming this email does not exist
        when(userRepository.findByEmail(invalidEmail)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(NotFoundException.class, () -> userService.findByEmail(invalidEmail));
    }

    @Test
    @DisplayName("update 메서드 테스트")
    public void testUpdateUser() {
        // Given
        Long userIdToUpdate = 1L;
        UpdateUserDto updateUserDto = new UpdateUserDto(); // Customize this as needed
        User existingUser = User.builder().build();
        when(userRepository.findById(userIdToUpdate)).thenReturn(Optional.of(existingUser));

        // When
        User updatedUser = userService.update(userIdToUpdate, updateUserDto);

        // Then
        assertNotNull(updatedUser);
        // Add additional assertions for the update logic if needed
    }

    @Test
    @DisplayName("delete 메서드 테스트")
    public void testDeleteUser() {
        // Given
        Long userIdToDelete = 1L;
        User existingUser = User.builder().build();
        when(userRepository.findById(userIdToDelete)).thenReturn(Optional.of(existingUser));

        // When
        userService.delete(userIdToDelete);

        // Then: Verify that the delete method of the repository is called
        verify(userRepository, times(1)).delete(existingUser);
    }

}
