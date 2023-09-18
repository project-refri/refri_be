package com.refri.api.ingredient.entity;


import com.refri.api.ingredient.dto.UpdateIngredientDto;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "ingredient")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "thumbnail", nullable = false)
    private String thumbnail;

    @Column(name = "icon", nullable = false)
    private String icon;

    @Builder
    public Ingredient(String name, String description, String thumbnail, String icon) {
        this.name = name;
        this.description = description;
        this.thumbnail = thumbnail;
        this.icon = icon;
    }

    public void update(UpdateIngredientDto updateIngredientDto) {
        this.name = updateIngredientDto.getName();
        this.description = updateIngredientDto.getDescription();
        this.thumbnail = updateIngredientDto.getThumbnail();
        this.icon = updateIngredientDto.getIcon();
    }

}
