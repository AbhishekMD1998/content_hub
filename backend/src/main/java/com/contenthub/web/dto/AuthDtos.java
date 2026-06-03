package com.contenthub.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public final class AuthDtos {

    private AuthDtos() {}

    public record SignupRequest(
            @NotBlank @Email String email,
            @NotBlank @Size(min = 6, max = 100) String password,
            String displayName
    ) {}

    public record LoginRequest(
            @NotBlank @Email String email,
            @NotBlank String password
    ) {}

    public record AuthResponse(String token, UserResponse user) {}

    public record UserResponse(
            String id,
            String email,
            String displayName,
            String avatarUrl,
            String role
    ) {}
}
