package com.contenthub.security;

import com.contenthub.config.AppProperties;
import com.contenthub.service.AuthService;
import com.contenthub.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserService userService;
    private final AuthService authService;
    private final String frontendUrl;

    public OAuth2LoginSuccessHandler(
            UserService userService,
            AuthService authService,
            AppProperties appProperties
    ) {
        this.userService = userService;
        this.authService = authService;
        this.frontendUrl = appProperties.frontendUrl();
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        var attrs = new java.util.HashMap<>(oauth2User.getAttributes());
        if (!attrs.containsKey("sub") && oauth2User.getName() != null) {
            attrs.put("sub", oauth2User.getName());
        }
        var user = userService.findOrCreateGoogleUser(attrs);
        var authResponse = authService.buildResponse(user);

        String target = UriComponentsBuilder
                .fromUriString(frontendUrl + "/auth/callback")
                .queryParam("token", authResponse.token())
                .encode(StandardCharsets.UTF_8)
                .build()
                .toUriString();

        getRedirectStrategy().sendRedirect(request, response, target);
    }
}
