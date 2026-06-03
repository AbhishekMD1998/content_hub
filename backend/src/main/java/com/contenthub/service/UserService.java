package com.contenthub.service;

import com.contenthub.domain.Role;
import com.contenthub.domain.User;
import com.contenthub.repository.UserRepository;
import com.contenthub.web.dto.AuthDtos.UserResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Map;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId().toString(),
                user.getEmail(),
                user.getDisplayName(),
                user.getAvatarUrl(),
                user.getRole().name()
        );
    }

    @Transactional
    public User register(String email, String password, String displayName) {
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new IllegalArgumentException("Email is already registered.");
        }
        User user = new User();
        user.setEmail(email.toLowerCase().trim());
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setDisplayName(displayName != null && !displayName.isBlank()
                ? displayName.trim()
                : email.split("@")[0]);
        user.setRole(Role.USER);
        return userRepository.save(user);
    }

    public User authenticate(String email, String password) {
        User user = userRepository.findByEmailIgnoreCase(email.trim())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
        if (user.getPasswordHash() == null
                || !passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }
        return user;
    }

    @Transactional
    public User findOrCreateGoogleUser(Map<String, Object> attributes) {
        String googleId = (String) attributes.get("sub");
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
        String picture = (String) attributes.get("picture");

        return userRepository.findByGoogleId(googleId)
                .or(() -> userRepository.findByEmailIgnoreCase(email))
                .map(existing -> {
                    if (existing.getGoogleId() == null) {
                        existing.setGoogleId(googleId);
                        if (existing.getAvatarUrl() == null) {
                            existing.setAvatarUrl(picture);
                        }
                        return userRepository.save(existing);
                    }
                    return existing;
                })
                .orElseGet(() -> {
                    User user = new User();
                    user.setGoogleId(googleId);
                    user.setEmail(email.toLowerCase());
                    user.setDisplayName(name);
                    user.setAvatarUrl(picture);
                    user.setRole(Role.USER);
                    return userRepository.save(user);
                });
    }

    public User findById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
    }
}
