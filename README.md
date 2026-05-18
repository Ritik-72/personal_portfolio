# Premium Personal Portfolio

A modern, high-performance, and fully responsive personal portfolio website built with React.js and FastAPI.

## ✨ Features

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion.
- **Backend**: FastAPI (Python), Pydantic, CORS enabled.
- **Animations**: Scroll-triggered animations, interactive backgrounds, glassmorphism.
- **Theme**: Dark/Light mode support with persistence.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Contact Form**: Integrated with FastAPI for message handling.

## 🚀 Quick Start

### Prerequisites

- Node.js (v20+)
- Python (v3.9+)

### Installation

1. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Backend**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

### Environment Variables

Create a `.env` file in the `backend/` directory:
```env
PORT=8000
HOST=0.0.0.0
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## 📦 Deployment

### Frontend (Vercel/Netlify)
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

### Backend (Render/Railway)
- Root Directory: `backend`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: FastAPI, Pydantic, Uvicorn.
- **Icons**: Lucide React.
- **Fonts**: Inter, Outfit (Google Fonts).

---

Built with ❤️ by [Ayusman](https://github.com/Ayusman)
