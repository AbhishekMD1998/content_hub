package com.contenthub.web;

import com.contenthub.service.TranslationService;
import com.contenthub.web.dto.TranslateRequest;
import com.contenthub.web.dto.TranslateResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/translate")
public class TranslationController {

    private final TranslationService translationService;

    public TranslationController(TranslationService translationService) {
        this.translationService = translationService;
    }

    @PostMapping
    public TranslateResponse translate(@Valid @RequestBody TranslateRequest request) {
        return new TranslateResponse(
                translationService.translate(
                        request.texts(),
                        request.sourceLang(),
                        request.targetLang()
                )
        );
    }
}
