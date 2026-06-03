package com.contenthub.web.dto;

import com.contenthub.domain.Blog;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;

public record BlogDto(
        String id,
        String slug,
        String title,
        String excerpt,
        String author,
        String category,
        String readTime,
        String coverImage,
        List<String> tags,
        List<Object> blocks,
        String content,
        String source,
        Instant createdAt
) {
    public static BlogDto from(Blog blog) {
        return new BlogDto(
                blog.getSlug(),
                blog.getSlug(),
                blog.getTitle(),
                blog.getExcerpt(),
                blog.getAuthor(),
                blog.getCategory(),
                blog.getReadTime(),
                blog.getCoverImage(),
                blog.getTags() != null ? Arrays.asList(blog.getTags()) : List.of(),
                blog.getBlocks(),
                blog.getContent(),
                blog.getSource(),
                blog.getCreatedAt()
        );
    }
}
