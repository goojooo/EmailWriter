# 📧 Context-Aware Email Assistant

A Chrome Extension for Gmail that injects an AI-powered reply button into compose windows and generates context-aware email responses using a Spring Boot backend integrated with Google's Gemini API.

The extension automatically extracts email content, sends it to a REST API, and inserts the generated reply back into the compose box, providing a faster and more efficient email writing experience.

## Features

- AI-powered email reply generation
- Gmail Chrome Extension integration
- Dynamic compose window detection using MutationObserver
- Context-aware response generation with Gemini API
- Automatic reply insertion into compose box
- Duplicate button prevention
- Secure API key management using environment variables

- ## 🏗 Architecture

```text
Gmail
   ↓
Chrome Extension (content.js)
   ↓
Spring Boot REST API
   ↓
Gemini API
   ↓
Spring Boot
   ↓
Chrome Extension
   ↓
Compose Window
```

## 🛠 Tech Stack

### Backend
- Java 17
- Spring Boot
- REST APIs
- WebClient
- Jackson
- Maven

### AI Integration
- Gemini API
- Prompt Engineering

### Chrome Extension
- JavaScript
- Manifest V3
- MutationObserver
- DOM Manipulation
- Fetch API

## 📂 Project Structure

```
EmailWriter
│
├── email-writer-ext/
│   ├── manifest.json
│   ├── content.js
│   └── content.css
│
├── src/main/java/com/email/writer/
│   ├── EmailWriterApplication.java
│   ├── EmailGeneratorController.java
│   ├── EmailGeneratorService.java
│   └── EmailRequest.java
│
├── src/main/resources/
│   └── application.properties
│
├── pom.xml
└── README.md
```

## ⚙️ Setup Guide

### 1. Clone Repository

```bash
git clone https://github.com/goojooo/EmailWriter.git
cd EmailWriter
```

### 2. Configure Environment Variable

Set your Gemini API key:

#### Windows

```cmd
setx GEMINI_API_KEY "YOUR_API_KEY"
```

Restart your IDE after setting the variable.

### 3. Start Backend

```bash
./mvnw spring-boot:run
```

The server starts at:

```text
http://localhost:8090
```

### 4. Load Chrome Extension

1. Open Chrome.
2. Go to:

```
chrome://extensions/
```

3. Enable **Developer Mode**.
4. Click **Load unpacked**.
5. Select the `email-writer-ext` folder.
6. Open Gmail and start composing an email.
7. Click **AI Reply** to generate contextual responses.

---

## 🔗 API Endpoint

### Generate Email Reply

```http
POST /api/email/generate
```

### Request Body

```json
{
  "emailContent": "Original email content",
  "tone": "Professional"
}
```

### Response

```text
Hi Naaki,

Thank you for the update. I will review the documentation and provide feedback by Friday.

Best regards,

[Your Name]
```

---

## 📸 Screenshots

### AI Reply Button Injected into Gmail

<img src="screenshots/gmail-compose.png" width="800"/>

### Generated Reply Inserted into Compose Window

<img src="screenshots/generated-reply.png" width="800"/>

---

## 🚀 Future Enhancements

- Outlook support
- Tone customization
- Multi-language replies
- Cloud deployment
- Response history

---

## 📚 Key Learnings

- Building REST APIs with Spring Boot.
- Integrating external AI services using WebClient.
- Working with Chrome Extension Manifest V3.
- Using MutationObserver for dynamic DOM detection.
- Applying prompt engineering for context-aware responses.
- Managing sensitive API keys securely using environment variables.

---

## 📄 License

----

---

⭐ If you found this project useful, consider giving it a star on GitHub!
