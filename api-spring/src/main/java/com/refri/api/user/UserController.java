package com.refri.api.user;


import com.refri.api.user.dto.CreateUserDto;
import com.refri.api.user.dto.UpdateUserDto;
import com.refri.api.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @PostMapping()
    public User create(@RequestBody @Valid CreateUserDto createUserDto) {
        return userService.create(createUserDto);
    }

    @GetMapping()
    public List<User> findAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User findById(@RequestParam("id") Long id) {
        return userService.findById(id);
    }

    @PatchMapping("/{id}")
    public User update(@RequestParam("id") Long id, @RequestBody @Valid UpdateUserDto updateUserDto) {
        return userService.update(id, updateUserDto);
    }
}
