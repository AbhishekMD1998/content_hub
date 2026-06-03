package com.contenthub.repository;

import com.contenthub.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ArticleRepository extends JpaRepository<Article, UUID> {
    Optional<Article> findBySlug(String slug);
    List<Article> findAllByOrderByCreatedAtDesc();
}
