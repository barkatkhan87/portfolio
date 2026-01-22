Below is a **single `README.md`** you can place at the **root of your GitHub repository** (same level as `frontend/` and `backend/`). It covers **both backend + frontend** in one file.

---

# ✅ Root `README.md` (Frontend + Backend in One)

```md
# Personal Portfolio Website (MERN) — Full Stack Project

A production-ready **personal portfolio** built with the **MERN stack** (MongoDB, Express, React, Node.js) using:

- **Frontend:** React (Vite) + Tailwind CSS + Material UI (MUI)
- **Backend:** Node.js + Express.js (ES Modules) + MongoDB (Mongoose)
- **Auth:** Admin-only JWT authentication
- **Uploads:** Cloudinary (project thumbnails + images, avatar, resume)
- **API Docs:** Swagger UI
- **Architecture:** MVC backend structure
- **Admin Panel:** Projects CRUD, Skills CRUD, About/Profile management, Messages management

---

## Project Structure

```
repo-root/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── docs/                 # Swagger docs
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── seeds/
│   ├── utils/
│   ├── validations/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   └── package.json
└── README.md
```

---

## Features

### Public Website
- Home (About preview + Featured projects)
- About (bio, experience, education)
- Projects (list, filter, detail view)
- Skills (grouped categories)
- Contact form (stores message + sends email if configured)

### Admin Dashboard (Protected Routes)
- Admin login (JWT)
- Dashboard stats
- Projects: add/edit/delete + image upload
- Skills: add/edit/delete + visibility toggle
- About/Profile: update content + upload avatar + resume
- Messages: view, mark read/replied/archived, star, delete, bulk actions

---

## Requirements
- Node.js **18+** (recommended for stability)
- MongoDB local OR MongoDB Atlas
- Cloudinary account (for file uploads)
- SMTP credentials (optional, for contact email notifications)

---

# Local Setup (Development)

## 1) Clone Repo
```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

---

## 2) Backend Setup

### Install dependencies
```bash
cd backend
npm install
```

### Create `.env`
Create `backend/.env`:

```env
NODE_ENV=development
PORT=5000

MONGODB_URI=mongodb://localhost:27017/portfolio

JWT_SECRET=your_super_secret_jwt_key_here_make_it_long
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

ADMIN_EMAIL=salabcomputer@gmail.com
ADMIN_PASSWORD=8780039523
ADMIN_NAME=Admin User

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=noreply@yourportfolio.com
FROM_NAME=Portfolio Contact

FRONTEND_URL=http://localhost:3000
```

### Seed Admin + Sample Data
```bash
npm run seed
```

(Optional reset admin)
```bash
npm run reset-admin
```

### Run Backend
```bash
npm run dev
```

Backend URLs:
- API Health: http://localhost:5000/api/health
- Swagger Docs: http://localhost:5000/api-docs

---

## 3) Frontend Setup (Vite + Proxy)

### Install dependencies
```bash
cd ../frontend
npm install
```

### Create `.env`
Create `frontend/.env`:

```env
VITE_API_URL=/api
VITE_APP_NAME=My Portfolio
```

### Run Frontend
```bash
npm run dev
```

Frontend URL:
- http://localhost:3000

---

## Vite Proxy (Important)
Frontend calls APIs like:
- `/api/about`
- `/api/projects`

Vite proxies these requests to backend:
- `http://localhost:5000/api/...`

This avoids CORS problems in development.


# API Testing (Swagger)

Swagger UI:
- http://localhost:5000/api-docs

For protected endpoints:
1. Call `/api/auth/login`
2. Copy returned JWT token
3. Click **Authorize** in Swagger
4. Paste `Bearer <token>`

---

# Prettier (Formatting)

## Backend
```bash
cd backend
npm run format
npm run format:check
```

## Frontend
```bash
cd frontend
npm run format
npm run format:check
```

---

# Production Deployment Notes

### Backend
Recommended hosting:
- Render / Railway / VPS

You must set:
- MongoDB Atlas connection string
- Cloudinary keys
- JWT secrets
- FRONTEND_URL = your deployed frontend URL

### Frontend
Recommended hosting:
- Netlify / Vercel

For production, you may change:
```env
VITE_API_URL=https://your-backend-domain.com/api
```

---

## License
MIT
