package com.contenthub.web;

import com.contenthub.security.AuthUserPrincipal;
import com.contenthub.service.AuthService;
import com.contenthub.service.UserService;
import com.contenthub.web.dto.AuthDtos.AuthResponse;
import com.contenthub.web.dto.AuthDtos.LoginRequest;
import com.contenthub.web.dto.AuthDtos.SignupRequest;
import com.contenthub.web.dto.AuthDtos.UserResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/signup")
    public AuthResponse signup(@Valid @RequestBody SignupRequest request) {
        try {
            return authService.signup(request);
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        try {
            return authService.login(request);
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, ex.getMessage());
        }
    }

    @GetMapping("/me")
    public UserResponse me(@AuthenticationPrincipal AuthUserPrincipal principal) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated.");
        }
        return userService.toResponse(userService.findById(principal.getId()));
    }

    @GetMapping("/google/url")
    public Map<String, String> googleAuthUrl() {
        return Map.of("url", "/oauth2/authorization/google");
    }

    @GetMapping("/config")
    public Map<String, Object> config(
            @Value("${spring.security.oauth2.client.registration.google.client-id:}") String googleClientId
    ) {
        boolean googleEnabled = googleClientId != null && !googleClientId.isBlank();
        return Map.of("googleEnabled", googleEnabled);
    }
}
