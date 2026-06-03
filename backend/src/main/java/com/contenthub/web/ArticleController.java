package com.contenthub.web;

import com.contenthub.service.ContentService;
import com.contenthub.web.dto.ArticleDto;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ContentService contentService;

    public ArticleController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping
    public List<ArticleDto> list() {
        return contentService.listArticles();
    }

    @GetMapping("/{slug}")
    public ArticleDto get(@PathVariable String slug) {
        try {
            return contentService.getArticle(slug);
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }
}
