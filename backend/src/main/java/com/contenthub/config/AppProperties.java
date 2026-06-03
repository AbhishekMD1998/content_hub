package com.contenthub.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProperties(
        Jwt jwt,
        String frontendUrl,
        String corsAllowedOrigins
) {
    public record Jwt(String secret, long expirationMs) {}
}
