package com.contenthub.repository;

import com.contenthub.domain.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BlogRepository extends JpaRepository<Blog, UUID> {
    Optional<Blog> findBySlug(String slug);
    List<Blog> findAllByOrderByCreatedAtDesc();
}
