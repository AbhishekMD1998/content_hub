package com.contenthub.web.dto;

import com.contenthub.domain.Article;
import java.time.Instant;

public record ArticleDto(
        String id,
        String slug,
        String title,
        String excerpt,
        String author,
        String category,
        String readTime,
        String content,
        Instant createdAt
) {
    public static ArticleDto from(Article article) {
        return new ArticleDto(
                article.getSlug(),
                article.getSlug(),
                article.getTitle(),
                article.getExcerpt(),
                article.getAuthor(),
                article.getCategory(),
                article.getReadTime(),
                article.getContent(),
                article.getCreatedAt()
        );
    }

    public static ArticleDto summary(Article article) {
        return new ArticleDto(
                article.getSlug(),
                article.getSlug(),
                article.getTitle(),
                article.getExcerpt(),
                article.getAuthor(),
                article.getCategory(),
                article.getReadTime(),
                null,
                article.getCreatedAt()
        );
    }
}
