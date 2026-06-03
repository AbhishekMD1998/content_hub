package com.contenthub.web.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateBlogRequest(
        @NotBlank String title,
        String excerpt,
        String author,
        String category,
        String content
) {}
