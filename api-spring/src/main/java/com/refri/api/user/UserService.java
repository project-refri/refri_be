package com.refri.api.user;

import com.refri.api.common.exception.UserDuplicatedException;
import com.refri.api.common.exception.UserNotFoundException;
import com.refri.api.user.dto.CreateUserDto;
import com.refri.api.user.dto.UpdateUserDto;
import com.refri.api.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User create(CreateUserDto createUserDto) {
        if (userRepository.findByEmail(createUserDto.getEmail()).isPresent() ||
            userRepository.findByUsername(createUserDto.getUsername()).isPresent()) {
            throw new UserDuplicatedException();
        }
        return userRepository.save(createUserDto.toEntity());
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findOne(Long id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
    }

    public User update(Long id, UpdateUserDto updateUserDto) {
        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        user.update(updateUserDto);
        return user;
    }

    public void delete(Long id) {
        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        userRepository.delete(user);
    }
}
