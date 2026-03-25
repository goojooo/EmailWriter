package com.email.writer;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    // ✅ Constructor Injection (Spring will inject automatically)
    public EmailGeneratorController(EmailGeneratorService emailGeneratorService) {
        this.emailGeneratorService = emailGeneratorService;
    }

    @PostMapping("/generate")
    public String generateEmail(@RequestBody EmailRequest request) {
        return emailGeneratorService.generateEmailReply(request);
    }
}