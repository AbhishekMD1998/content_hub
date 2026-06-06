package com.contenthub.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TranslationService {

    private static final int MAX_CHUNK_LENGTH = 450;
    private final RestClient restClient = RestClient.create();
    private final ConcurrentHashMap<String, String> cache = new ConcurrentHashMap<>();

    public List<String> translate(List<String> texts, String source, String target) {
        if (texts == null || texts.isEmpty()) {
            return List.of();
        }
        if (source.equalsIgnoreCase(target)) {
            return List.copyOf(texts);
        }

        List<String> results = new ArrayList<>(texts.size());
        for (String text : texts) {
            results.add(translateText(text, source, target));
        }
        return results;
    }

    private String translateText(String text, String source, String target) {
        if (text == null || text.isBlank()) {
            return text;
        }

        String cacheKey = source + "|" + target + "|" + text;
        String cached = cache.get(cacheKey);
        if (cached != null) {
            return cached;
        }

        String translated;
        if (text.length() <= MAX_CHUNK_LENGTH) {
            translated = fetchTranslation(text, source, target);
        } else {
            StringBuilder builder = new StringBuilder();
            for (String chunk : chunkText(text, MAX_CHUNK_LENGTH)) {
                builder.append(fetchTranslation(chunk, source, target));
                pauseBriefly();
            }
            translated = builder.toString();
        }

        cache.put(cacheKey, translated);
        return translated;
    }

    private String fetchTranslation(String text, String source, String target) {
        try {
            URI uri = URI.create(
                    "https://api.mymemory.translated.net/get?q="
                            + java.net.URLEncoder.encode(text, java.nio.charset.StandardCharsets.UTF_8)
                            + "&langpair="
                            + source
                            + "|"
                            + target
            );
            JsonNode body = restClient.get().uri(uri).retrieve().body(JsonNode.class);
            if (body != null && body.has("responseData")) {
                JsonNode translated = body.get("responseData").get("translatedText");
                if (translated != null && !translated.asText().isBlank()) {
                    return translated.asText();
                }
            }
        } catch (Exception ignored) {
            /* fall back to source text */
        }
        return text;
    }

    private static List<String> chunkText(String text, int maxLength) {
        List<String> chunks = new ArrayList<>();
        int start = 0;
        while (start < text.length()) {
            int end = Math.min(start + maxLength, text.length());
            if (end < text.length()) {
                int split = text.lastIndexOf(' ', end);
                if (split > start) {
                    end = split;
                }
            }
            chunks.add(text.substring(start, end).trim());
            start = end;
            while (start < text.length() && text.charAt(start) == ' ') {
                start++;
            }
        }
        return chunks;
    }

    private static void pauseBriefly() {
        try {
            Thread.sleep(75);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
        }
    }
}
