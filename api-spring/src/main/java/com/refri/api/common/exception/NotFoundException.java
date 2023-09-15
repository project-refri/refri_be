package com.refri.api.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class NotFoundException extends RuntimeException {
    private String message = "Entity not found";
}
