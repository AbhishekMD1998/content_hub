package com.contenthub.web;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/admin/docs")
@PreAuthorize("hasRole('ADMIN')")
public class AdminDocsController {

    private static final Map<String, String> DOCS = Map.of(
            "developer-guide", "Content-Hub-Developer-Guide.pdf",
            "architecture", "Content-Hub-Architecture-Design.pdf"
    );

    @GetMapping
    public List<DocInfo> list() {
        return List.of(
                new DocInfo(
                        "developer-guide",
                        "Developer Guide",
                        "Setup, API reference, auth flows, and troubleshooting."
                ),
                new DocInfo(
                        "architecture",
                        "Architecture & Design",
                        "System design, deployment, data model, and security."
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> view(@PathVariable String id) throws IOException {
        String filename = DOCS.get(id);
        if (filename == null) {
            throw new ResponseStatusException(NOT_FOUND, "Document not found.");
        }
        Resource resource = new ClassPathResource("docs/" + filename);
        if (!resource.exists()) {
            throw new ResponseStatusException(NOT_FOUND, "Document file missing.");
        }
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                .body(resource);
    }

    public record DocInfo(String id, String title, String description) {}
}
