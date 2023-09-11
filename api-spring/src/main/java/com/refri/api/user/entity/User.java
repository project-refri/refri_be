package com.refri.api.user.entity;

import com.refri.api.user.dto.UpdateUserDto;
import com.refri.api.user.type.Diet;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = lombok.AccessLevel.PROTECTED)
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "introduction", nullable = false)
    private String introduction;

    @Column(name = "diet", nullable = false)
    @Enumerated(EnumType.STRING)
    private Diet diet;

    @Column(name = "thumbnail", nullable = false)
    private String thumbnail;


    @Builder
    public User(String username, String email, String introduction, Diet diet, String thumbnail) {
        this.username = username;
        this.email = email;
        this.introduction = introduction;
        this.diet = diet;
        this.thumbnail = thumbnail;
    }

    public void update(UpdateUserDto updateUserDto) {
        this.username = updateUserDto.getUsername();
        this.introduction = updateUserDto.getIntroduction();
        this.diet = updateUserDto.getDiet();
        this.thumbnail = updateUserDto.getThumbnail();
    }
}
