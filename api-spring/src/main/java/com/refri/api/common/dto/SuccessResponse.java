package com.refri.api.common.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SuccessResponse {
    private boolean success = true;
    private int statusCode = 200;
}
