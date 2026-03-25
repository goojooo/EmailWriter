package com.email.writer;

import lombok.Value;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
public class EmailGeneratorService {

    private final WebClinet webClinet;
    private final String apiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder,
                                   @Value("${gemini.api.url}") String baseUrl,
                                   @Value("${gemini.api.key}") String geminiApiKey) {
        this.apiKey = geminiApiKey;
        this.webClinet = webClientBuilder.baseUrl(baseUrl).build();
    }

    public String generateEmailReply(EmailRequest emailRequest) {
        // Build prompt
        String prompt = buildPrompt(emailRequest);

        // Prepare raw JSON Body
        String requestBody = String.format("""
                        {
                            "contents": [
                              {
                                "parts": [
                                  {
                                    "text": "%s"
                                  }
                                ]
                              }
                            ]
                          }""", prompt);
        // Send Response
        String response = webClinet.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1beta/models/gemini-3-flash-preview:generateContent")
                        .build())
                .header("x-goog-api-key", apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrive()
                .bodyToMono(String.class)
                .block()
                ;

        // Extract Response
        return extractResponseContent(response);
         
    }

    private String extractResponseContent(String response) {
        ObjectMapper mapper = new ObjectMapper();
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a profesional reply");
        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty())
        {
            prompt.append("Use a ").append(emailRequest.getTone()).append(" tone.");
            // Use a professional tone
        }
        prompt.append("Original Email : \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}
