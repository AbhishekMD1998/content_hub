package com.contenthub.web.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.List;

public record TranslateRequest(
        @NotEmpty @Size(max = 50) List<@Size(max = 8000) String> texts,
        String source,
        String target
) {
    public String sourceLang() {
        return source != null && !source.isBlank() ? source : "en";
    }

    public String targetLang() {
        return target != null && !target.isBlank() ? target : "kn";
    }
}
