# ☁️ Personal Cloud Storage System

<div align="center">

![Personal Cloud](https://img.shields.io/badge/Personal-Cloud-blue?style=for-the-badge&logo=icloud&logoColor=white)
![Flask](https://img.shields.io/badge/Backend-Flask-green?style=for-the-badge&logo=flask&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.8%2B-yellow?style=for-the-badge&logo=python&logoColor=white)

**Your Personal Cloud Storage Solution** - Secure, Private, and Self-Hosted

[🚀 Features](#-features) • [📦 Installation](#-installation) • [⚡ API Usage](#-api-usage) • [🔧 Project Structure](#-project-structure) • [🤝 Contributing](#-contributing)

</div>

---

## ✨ Overview

Personal Cloud Storage is a **self-hosted file storage solution** that gives you complete control over your data. Built with Flask, it provides a secure backend API for file management, user authentication, and cloud storage functionality—all running on your own server.

### 🌟 Why Personal Cloud?
- ✅ **Complete Privacy** - Your data stays on your server
- ✅ **No Subscription Fees** - One-time setup, forever free
- ✅ **Full Control** - Customize as per your needs
- ✅ **Lightweight** - Minimal resource consumption
- ✅ **Easy Setup** - Get running in 5 minutes

---

## 🚀 Features

| Feature | Description | Status |
|---------|-------------|--------|
| 🔐 **User Authentication** | Sign up, Sign in, and secure login sessions | ✅ Implemented |
| 📁 **File Upload** | Upload any type of file to your personal cloud | ✅ Implemented |
| 📂 **File Listing** | View all uploaded files in your storage | ✅ Implemented |
| 🔓 **Session Management** | Secure login/logout functionality | ✅ Implemented |
| 🌐 **CORS Support** | Ready for frontend integration (React/Angular/Vue) | ✅ Implemented |
| 🛡️ **Basic Security** | Authorization checks for protected routes | ✅ Implemented |
| 🐍 **Python + Flask** | Lightweight and efficient backend | ✅ Implemented |

---

## 📦 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Git (optional)

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/Rohitt-Rajj/Presonal-cloud.git
cd Presonal-cloud
```

#### 2. Create Virtual Environment (Recommended)
```bash
# For Windows
python -m venv venv
venv\Scripts\activate

# For Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

#### 3. Install Dependencies
```bash
pip install flask flask-cors
```

#### 4. Run the Application
```bash
python app.py
```

#### 5. Verify Installation
Open your browser and navigate to:
```
http://localhost:5000
```
You should see: `"Backend is running successfully on Flask!"`

---

## ⚡ API Usage

### 📍 Base URL
```
http://localhost:5000
```

### 🔑 Authentication Endpoints

#### 1. **Sign Up** - `POST /signup`
Create a new user account.
```json
Request Body:
{
    "email": "user@example.com",
    "password": "yourpassword"
}

Response:
{
    "message": "Signup successful!"
}
```

#### 2. **Sign In** - `POST /signin`
Login to existing account.
```json
Request Body:
{
    "email": "user@example.com",
    "password": "yourpassword"
}

Response:
{
    "message": "Signin successful!"
}
```

#### 3. **Logout** - `POST /logout`
End current session.
```json
Request Body:
{
    "email": "user@example.com"
}

Response:
{
    "message": "Logged out successfully"
}
```

### 📁 File Management Endpoints

#### 4. **Upload File** - `POST /upload`
Upload a file to your cloud storage.
```bash
# Using curl
curl -X POST http://localhost:5000/upload \
  -F "email=user@example.com" \
  -F "file=@/path/to/your/file.pdf"

Response:
{
    "message": "File uploaded successfully!",
    "filename": "file.pdf"
}
```

#### 5. **List Files** - `GET /files`
Get all files in your storage.
```bash
# Using curl
curl "http://localhost:5000/files?email=user@example.com"

Response:
{
    "files": ["document.pdf", "image.jpg", "video.mp4"]
}
```

---

## 🔧 Project Structure

```
Personal-Cloud/
├── app.py                 # Main Flask application
├── uploads/               # Directory for storing uploaded files
│   ├── document.pdf      # User uploaded files
│   ├── image.jpg
│   └── ...
├── requirements.txt      # Python dependencies
└── README.md            # This documentation
```

### 🏗️ Code Architecture
```python
# Core Components:
1. Flask App Setup      → Flask + CORS configuration
2. User Management      → In-memory user storage
3. Session Handling     → logged_in_users set for active sessions
4. File Operations      → Uploads folder management
5. API Endpoints        → RESTful routes for all operations
```

---

## 🧪 Testing the API

### Using Postman/Insomnia
1. **Sign Up**: `POST` to `http://localhost:5000/signup`
2. **Sign In**: `POST` to `http://localhost:5000/signin`
3. **Upload File**: `POST` to `http://localhost:5000/upload` (multipart/form-data)
4. **List Files**: `GET` to `http://localhost:5000/files?email=user@example.com`
5. **Logout**: `POST` to `http://localhost:5000/logout`

### Using Python Requests
```python
import requests

# Sign up
response = requests.post('http://localhost:5000/signup', 
                        json={'email': 'test@test.com', 'password': '1234'})

# Upload file
files = {'file': open('test.pdf', 'rb')}
data = {'email': 'test@test.com'}
response = requests.post('http://localhost:5000/upload', 
                        files=files, data=data)
```

---

## 🚨 Error Handling

| Status Code | Meaning | Solution |
|-------------|---------|----------|
| `400` | Bad Request | Check request body format |
| `401` | Unauthorized | User not logged in |
| `404` | Not Found | Route doesn't exist |
| `500` | Server Error | Check server logs |

---

## 🔮 Future Enhancements

### Planned Features
- [ ] **Database Integration** (SQLite/PostgreSQL)
- [ ] **File Encryption** (AES-256)
- [ ] **User Roles & Permissions**
- [ ] **File Sharing Links**
- [ ] **Version Control** for files
- [ ] **Web Interface** (React Frontend)
- [ ] **Docker Support** for easy deployment
- [ ] **REST API Documentation** (Swagger/OpenAPI)

### Current Limitations
- ⚠️ **In-memory storage** (users lost on restart)
- ⚠️ **No file encryption** (basic security only)
- ⚠️ **Single folder structure** (no subfolders)
- ⚠️ **No file size limits**

---

## 🛠️ Development

### Adding New Features
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Running Tests
```bash
# Add test files and run
python -m pytest tests/
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Bugs** - Open an issue with detailed description
2. **Suggest Features** - Share your ideas for improvement
3. **Submit Code** - Fix bugs or add features via PR
4. **Improve Docs** - Help make documentation better

### Contribution Guidelines
- Follow PEP 8 style guide for Python code
- Add comments for complex logic
- Update documentation for new features
- Write tests for new functionality

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

