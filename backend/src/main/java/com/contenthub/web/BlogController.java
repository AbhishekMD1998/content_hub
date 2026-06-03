package com.contenthub.web;

import com.contenthub.security.AuthUserPrincipal;
import com.contenthub.service.ContentService;
import com.contenthub.service.UserService;
import com.contenthub.web.dto.BlogDto;
import com.contenthub.web.dto.CreateBlogRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    private final ContentService contentService;
    private final UserService userService;

    public BlogController(ContentService contentService, UserService userService) {
        this.contentService = contentService;
        this.userService = userService;
    }

    @GetMapping
    public List<BlogDto> list() {
        return contentService.listBlogs();
    }

    @GetMapping("/{slug}")
    public BlogDto get(@PathVariable String slug) {
        try {
            return contentService.getBlog(slug);
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

    @PostMapping
    public BlogDto create(
            @Valid @RequestBody CreateBlogRequest request,
            @AuthenticationPrincipal AuthUserPrincipal principal
    ) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated.");
        }
        var user = userService.findById(principal.getId());
        return contentService.createBlog(request, user);
    }

    @DeleteMapping("/{slug}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @PathVariable String slug,
            @AuthenticationPrincipal AuthUserPrincipal principal
    ) {
        if (principal == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Not authenticated.");
        }
        try {
            contentService.deleteBlog(slug);
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }
}
