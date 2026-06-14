
# 🔗 URL Shortener + QR Code Generator (ShortIQ)

Hello Everybody 👋 

This is my full-stack URL Shortener project called **ShortIQ**.  
It helps users convert long URLs into short links, track clicks, create custom aliases, and generate QR codes for easy sharing.


## 🚀 What this project does

- Shortens long URLs into simple links
- Allows custom alias like `kato`, `rose`, etc.
- Tracks how many times a link is clicked
- Generates QR codes for each short link
- Provides a dashboard to manage all links
- Includes login & registration system
- Shows user profile and settings
- Supports dark/light theme
- Allows copy & delete of links

## 🧠 How I planned this project

I started by thinking about a real-world problem:  
👉 Long URLs are difficult to share and track.

So I designed this system:

1. User logs in
2. User enters a long URL
3. Backend generates a short ID
4. Short link redirects to original URL
5. Every click is tracked in database
6. QR code is generated for easy sharing



## 🏗️ Architecture


Frontend (React)
↓
Backend (Node.js + Express)
↓
MongoDB Database


Frontend sends requests to backend APIs using Axios.  
Backend handles authentication, URL creation, redirect logic, and analytics.  
MongoDB stores all users and URLs.


## ⚙️ Tech Stack

- React.js (Frontend)
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- QRCode.react
- Axios


## 📦 Features in detail

### 🔐 Authentication
- Login & Register system using JWT

### 🔗 URL Shortener
- Converts long URLs into short links

### ✏️ Custom Alias
- Users can choose their own short link name

### 📊 Analytics
- Tracks number of clicks per link

### 📱 QR Code Generator
- Generates QR codes for short URLs

### 👤 Profile Page
- Shows user details and stats

### ⚙️ Settings
- Change theme (dark/light)
- Change password


## 🧪 Example Flow

1. User enters:
[https://facebook.com](https://facebook.com)

2. System generates:
[http://localhost:5000/kato](http://localhost:5000/kato)

3. QR Code generated for this link

4. When scanned → redirects to original website


## 📸 Sample Output

- Dashboard shows all created links
- Each link shows clicks count
- QR code displayed for sharing
- Analytics page shows link performance


## 📌 Assumptions

- User must be logged in to create short links
- Backend runs on localhost during development
- MongoDB is used for storing all data
- Each short ID must be unique


## 🎥 Demo Video
https://youtu.be/G1ZsLGPhqgs?si=M3xZharydIBsL_Xg


## 🧠 What I learned

- Full-stack API integration
- JWT authentication flow
- MongoDB data modeling
- React state management
- QR code generation
- Real-world deployment thinking


## 🏁 Hackathon Submission

This project is a part of a hackathon run by https://katomaran.com

# 🚀 Next step (important)

After pasting:

```bash
git add README.md
git commit -m "Add professional hackathon README"
git push
```

Thank you for checking out my project!


