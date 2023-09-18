package com.refri.api.user;

import com.refri.api.common.exception.NotFoundException;
import com.refri.api.common.exception.UserDuplicatedException;
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

    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(NotFoundException::new);
    }

    public User update(Long id, UpdateUserDto updateUserDto) {
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);
        user.update(updateUserDto);
        return user;
    }

    public void delete(Long id) {
        User user = userRepository.findById(id).orElseThrow(NotFoundException::new);
        userRepository.delete(user);
    }
}
