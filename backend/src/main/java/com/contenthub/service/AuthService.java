package com.contenthub.service;

import com.contenthub.domain.User;
import com.contenthub.web.dto.AuthDtos.AuthResponse;
import com.contenthub.web.dto.AuthDtos.LoginRequest;
import com.contenthub.web.dto.AuthDtos.SignupRequest;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthService(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    public AuthResponse signup(SignupRequest request) {
        User user = userService.register(request.email(), request.password(), request.displayName());
        return buildResponse(user);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userService.authenticate(request.email(), request.password());
        return buildResponse(user);
    }

    public AuthResponse buildResponse(User user) {
        return new AuthResponse(jwtService.generateToken(user), userService.toResponse(user));
    }
}
