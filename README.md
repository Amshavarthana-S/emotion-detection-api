# 😊 Emotion Detection App

An AI-powered web application that detects emotions from text using Machine Learning.

## 🌍 Live Demo

👉 **[https://invigorating-blessing-production-97ab.up.railway.app/](https://invigorating-blessing-production-97ab.up.railway.app/)**

---

## ✨ Features

- 🤖 AI-powered emotion detection
- ⚡ Real-time analysis
- 📊 Confidence score display
- 🎨 Clean and responsive UI
- 🌐 Deployed and accessible worldwide

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios (API calls)
- CSS3 (Styling)

### Backend
- Node.js
- Express.js
- AI/ML Model (Transformer based)

### Deployment
- Railway (Backend + Frontend)
- GitHub (Version Control)

---

## 🚀 How It Works

```
User types text
      ↓
React Frontend sends request
      ↓
Node.js Backend receives text
      ↓
AI Model detects emotion
      ↓
Result shown to user
```

---

## 😊 Supported Emotions

- Joy
- Sadness
- Anger
- Neutral
- And more...

---

## 📸 Screenshots

### Home Page
![Emotion Detection App](https://invigorating-blessing-production-97ab.up.railway.app/)

---

## 🏃 Run Locally

### Prerequisites
- Node.js 16+
- npm

### Backend Setup

```bash
# Clone the repo
git clone https://github.com/Amshavarthana-S/emotion-detection-api.git

# Go to backend folder
cd emotion-detection-api

# Install dependencies
npm install

# Run server
node index.js
```

### Frontend Setup

```bash
# Go to frontend folder
cd emotion-detection-frontend

# Install dependencies
npm install

# Run app
npm start
```

### Open Browser
```
http://localhost:3000
```

---

## 📡 API Endpoints

### Detect Emotion
```
POST /api/emotion/detect

Body:
{
  "text": "I am very happy!"
}

Response:
{
  "emotion": "joy",
  "confidence": 95,
  "text": "I am very happy!"
}
```

---

## 📁 Project Structure

```
emotion-detection-api/
├── emotion-detection-api/      ← Backend
│   ├── index.js                ← Main server
│   ├── package.json
│   └── node_modules/
│
└── emotion-detection-frontend/ ← Frontend
    ├── src/
    │   ├── App.js              ← Main component
    │   ├── App.css             ← Styles
    │   └── index.js
    ├── public/
    │   └── index.html
    └── package.json
```

---

## 🎓 What I Learned

- ✅ Building REST APIs with Node.js & Express
- ✅ Building UI with React.js
- ✅ Integrating AI/ML models
- ✅ Connecting Frontend & Backend
- ✅ Deploying full-stack apps on Railway
- ✅ Version control with Git & GitHub

---



## 👨‍💻 Author

**Amshavarthana**

- GitHub: [@Amshavarthana-S](https://github.com/Amshavarthana-S)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- Hugging Face - AI Models
- Railway - Deployment Platform
- React - Frontend Framework
- Node.js - Backend Runtime
