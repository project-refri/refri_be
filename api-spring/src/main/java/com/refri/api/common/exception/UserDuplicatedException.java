package com.refri.api.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDuplicatedException extends RuntimeException {
    private String message = "User is duplicated";
}
