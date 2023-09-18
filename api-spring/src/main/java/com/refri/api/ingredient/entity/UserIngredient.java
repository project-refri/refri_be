package com.refri.api.ingredient.entity;

import com.refri.api.ingredient.dto.UpdateUserIngredientDto;
import com.refri.api.ingredient.type.FoodType;
import com.refri.api.ingredient.type.StoreMethod;
import com.refri.api.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user_ingredient")
public class UserIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingredient_id", referencedColumnName = "id", foreignKey = @ForeignKey(value = ConstraintMode.NO_CONSTRAINT))
    private Ingredient ingredient;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", foreignKey = @ForeignKey(value = ConstraintMode.NO_CONSTRAINT))
    private User owner;

    @Enumerated(EnumType.STRING)
    @Column(name = "food_type", nullable = false)
    private FoodType foodType;

    @Enumerated(EnumType.STRING)
    @Column(name = "store_method", nullable = false)
    private StoreMethod storeMethod;

    @Column(name = "count", nullable = false)
    private int count;

    @Column(name = "days_before_expiration", nullable = false)
    private int daysBeforeExpiration;

    @Column(name = "icon", nullable = false)
    private String icon;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at", nullable = false)
    private Date updatedAt;

    @Builder
    public UserIngredient(
            String name, Ingredient ingredient, User owner, FoodType foodType, StoreMethod storeMethod, int count,
            int daysBeforeExpiration, String icon, Date createdAt, Date updatedAt
    ) {
        this.name = name;
        this.ingredient = ingredient;
        this.owner = owner;
        this.foodType = foodType;
        this.storeMethod = storeMethod;
        this.count = count;
        this.daysBeforeExpiration = daysBeforeExpiration;
        this.icon = icon;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public void update(UpdateUserIngredientDto updateUserIngredientDto) {
        this.name = updateUserIngredientDto.getName();
        this.ingredient = updateUserIngredientDto.getIngredient();
        this.owner = updateUserIngredientDto.getOwner();
        this.foodType = updateUserIngredientDto.getFoodType();
        this.storeMethod = updateUserIngredientDto.getStoreMethod();
        this.count = updateUserIngredientDto.getCount();
        this.daysBeforeExpiration = updateUserIngredientDto.getDaysBeforeExpiration();
        this.icon = updateUserIngredientDto.getIcon();
    }

}
