package com.contenthub.config;

import com.contenthub.domain.Article;
import com.contenthub.domain.Blog;
import com.contenthub.domain.Role;
import com.contenthub.domain.User;
import com.contenthub.repository.ArticleRepository;
import com.contenthub.repository.BlogRepository;
import com.contenthub.repository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.io.InputStream;
import java.time.Instant;
import java.time.format.DateTimeParseException;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ArticleRepository articleRepository;
    private final BlogRepository blogRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;

    public DataSeeder(
            UserRepository userRepository,
            ArticleRepository articleRepository,
            BlogRepository blogRepository,
            PasswordEncoder passwordEncoder,
            ObjectMapper objectMapper
    ) {
        this.userRepository = userRepository;
        this.articleRepository = articleRepository;
        this.blogRepository = blogRepository;
        this.passwordEncoder = passwordEncoder;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        seedAdminUser();
        seedArticles();
        seedBlogs();
    }

    private void seedAdminUser() {
        String adminEmail = "admin@contenthub.com";
        userRepository.findByEmailIgnoreCase(adminEmail).ifPresentOrElse(user -> {
            if (user.getRole() != Role.ADMIN) {
                user.setRole(Role.ADMIN);
                userRepository.save(user);
            }
        }, () -> {
            User admin = new User();
            admin.setEmail(adminEmail);
            admin.setPasswordHash(passwordEncoder.encode("admin123"));
            admin.setDisplayName("Admin");
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
        });
    }

    private void seedArticles() {
        if (articleRepository.count() > 0) {
            return;
        }

        createArticle(
                "react-server-components",
                "Understanding React Server Components",
                "A practical overview of how server components change data fetching and bundle size.",
                "Editorial Team",
                "Engineering",
                "8 min",
                "2026-05-12",
                """
                React Server Components let you render parts of your UI on the server without shipping their logic to the client.

                This article walks through when to reach for RSC, how they interact with client components, and common pitfalls teams hit during adoption."""
        );

        createArticle(
                "design-systems-that-scale",
                "Design Systems That Scale",
                "Patterns for tokens, documentation, and governance as your product surface grows.",
                "Maya Chen",
                "Design",
                "6 min",
                "2026-04-28",
                """
                A design system is more than a component library. Tokens, accessibility baselines, and contribution workflows keep teams aligned.

                We cover how to start small, measure adoption, and evolve primitives without breaking product teams."""
        );

        createArticle(
                "technical-writing-for-developers",
                "Writing Technical Content for Developers",
                "Structure, tone, and examples that help readers ship faster.",
                "Alex Rivera",
                "Content",
                "5 min",
                "2026-03-15",
                """
                Great developer content respects the reader's time. Lead with outcomes, show runnable examples, and link to deeper references.

                This guide shares an outline template we use for tutorials, release notes, and architecture decision records."""
        );
    }

    private void createArticle(
            String slug,
            String title,
            String excerpt,
            String author,
            String category,
            String readTime,
            String createdAt,
            String content
    ) {
        Article article = new Article();
        article.setSlug(slug);
        article.setTitle(title);
        article.setExcerpt(excerpt);
        article.setAuthor(author);
        article.setCategory(category);
        article.setReadTime(readTime);
        article.setContent(content.trim());
        article.setCreatedAt(parseInstant(createdAt));
        articleRepository.save(article);
    }

    private void seedBlogs() throws Exception {
        if (blogRepository.count() > 0) {
            return;
        }

        try (InputStream in = getClass().getResourceAsStream("/seed/blogs.json")) {
            if (in == null) {
                return;
            }
            JsonNode root = objectMapper.readTree(in);
            JsonNode blogs = root.get("blogs");
            if (blogs == null || !blogs.isArray()) {
                return;
            }
            for (JsonNode node : blogs) {
                Blog blog = new Blog();
                blog.setSlug(node.get("id").asText());
                blog.setTitle(node.get("title").asText());
                blog.setExcerpt(node.path("excerpt").asText(null));
                blog.setAuthor(node.path("author").asText("Content Hub"));
                blog.setCategory(node.path("category").asText("General"));
                blog.setReadTime(node.path("readTime").asText(null));
                blog.setCoverImage(node.path("coverImage").asText(null));
                blog.setSource("json");

                if (node.hasNonNull("tags") && node.get("tags").isArray()) {
                    String[] tags = new String[node.get("tags").size()];
                    for (int i = 0; i < tags.length; i++) {
                        tags[i] = node.get("tags").get(i).asText();
                    }
                    blog.setTags(tags);
                }

                if (node.has("blocks")) {
                    List<Object> blocks = objectMapper.convertValue(
                            node.get("blocks"),
                            new TypeReference<List<Object>>() {}
                    );
                    blog.setBlocks(blocks);
                }

                blog.setContent(node.path("content").asText(null));
                blog.setCreatedAt(parseInstant(node.path("createdAt").asText()));
                blogRepository.save(blog);
            }
        }
    }

    private Instant parseInstant(String value) {
        if (value == null || value.isBlank()) {
            return Instant.now();
        }
        try {
            return Instant.parse(value);
        } catch (DateTimeParseException ex) {
            return Instant.parse(value + "T12:00:00Z");
        }
    }
}
