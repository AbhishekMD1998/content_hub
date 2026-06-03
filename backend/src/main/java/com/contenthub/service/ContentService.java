package com.contenthub.service;

import com.contenthub.domain.Article;
import com.contenthub.domain.Blog;
import com.contenthub.domain.User;
import com.contenthub.repository.ArticleRepository;
import com.contenthub.repository.BlogRepository;
import com.contenthub.web.dto.ArticleDto;
import com.contenthub.web.dto.BlogDto;
import com.contenthub.web.dto.CreateBlogRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
public class ContentService {

    private static final Pattern NON_SLUG = Pattern.compile("[^a-z0-9]+");

    private final ArticleRepository articleRepository;
    private final BlogRepository blogRepository;

    public ContentService(ArticleRepository articleRepository, BlogRepository blogRepository) {
        this.articleRepository = articleRepository;
        this.blogRepository = blogRepository;
    }

    public List<ArticleDto> listArticles() {
        return articleRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(ArticleDto::summary)
                .toList();
    }

    public ArticleDto getArticle(String slug) {
        Article article = articleRepository.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("Article not found."));
        return ArticleDto.from(article);
    }

    public List<BlogDto> listBlogs() {
        return blogRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(BlogDto::from)
                .toList();
    }

    public BlogDto getBlog(String slug) {
        Blog blog = blogRepository.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("Blog not found."));
        return BlogDto.from(blog);
    }

    @Transactional
    public BlogDto createBlog(CreateBlogRequest request, User author) {
        Blog blog = new Blog();
        blog.setSlug(uniqueBlogSlug(slugify(request.title())));
        blog.setTitle(request.title().trim());
        blog.setExcerpt(request.excerpt() != null && !request.excerpt().isBlank()
                ? request.excerpt().trim()
                : request.content().substring(0, Math.min(120, request.content().length())) + "…");
        blog.setAuthor(request.author() != null && !request.author().isBlank()
                ? request.author().trim()
                : author.getDisplayName());
        blog.setCategory(request.category() != null && !request.category().isBlank()
                ? request.category().trim()
                : "General");
        blog.setContent(request.content().trim());
        blog.setSource("admin");
        blog.setCreatedBy(author);
        return BlogDto.from(blogRepository.save(blog));
    }

    @Transactional
    public void deleteBlog(String slug) {
        Blog blog = blogRepository.findBySlug(slug)
                .orElseThrow(() -> new IllegalArgumentException("Blog not found."));
        blogRepository.delete(blog);
    }

    public static String slugify(String input) {
        String normalized = Normalizer.normalize(input.toLowerCase(Locale.ROOT), Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");
        return NON_SLUG.matcher(normalized).replaceAll("-").replaceAll("^-|-$", "");
    }

    private String uniqueBlogSlug(String base) {
        String slug = base;
        int i = 1;
        while (blogRepository.findBySlug(slug).isPresent()) {
            slug = base + "-" + i++;
        }
        return slug;
    }
}
