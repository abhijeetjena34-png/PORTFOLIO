# Full-Stack Developer Portfolio

A clean, modern, responsive portfolio for freelance client work, built with:

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express.js + MongoDB

## Folder Structure

```text
PORTFOLIO/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## Setup

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## API

- `POST /api/contact` - submit contact form
- `GET /api/health` - health check

## Notes

- Update placeholder personal details and project links in `frontend/src/data/portfolioData.js`.
- Make sure MongoDB is running and `MONGO_URI` is set correctly.

## About Me

My name is Abhijeet Jena. I am an MCA graduate and aspiring Full‑Stack Developer with hands‑on experience in React.js, Node.js, Express.js, and MongoDB. I enjoy building web applications, solving problems, and continuously learning new technologies to improve my development skills. My MCA completed in 2026. I have three projects:
1. **Quick Bite** – Online food delivery application.
2. **Redstore** – E‑commerce website.
3. **Weather App** – Simple weather project using HTML, CSS, JS and an API.
