# Full-Stack Developer Portfolio

A clean, modern, responsive portfolio for freelance client work, built with:

- **Frontend**: React + Vite + Tailwind CSS
- **Backend (Local)**: Node.js + Express.js
- **Backend (Production)**: Vercel Serverless Functions
- **Database**: MongoDB Atlas
- **Email Delivery**: Nodemailer + Gmail SMTP

## Folder Structure

```text
PORTFOLIO/
├── api/                   # Vercel Serverless Functions (Production Backend)
│   └── contact.js         # API route for handling contact form in production
├── backend/               # Local Development Express Server
│   ├── src/
│   ├── .env               # Local env file (MongoDB & SMTP config)
│   └── package.json
├── frontend/              # React Vite Frontend App
│   ├── src/
│   ├── .env               # Frontend env (VITE_API_URL)
│   └── package.json
├── package.json           # Root package.json (Vercel dependencies)
├── vercel.json            # Vercel build & route configuration
└── README.md
```

## How to Run Locally

### 1) Backend (Local Express Server)

```bash
cd backend
npm install
npm run dev
```
Make sure you have a `backend/.env` file containing your MongoDB Atlas connection string and SMTP details. The server runs on `http://localhost:5000`.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```
Ensure your `frontend/.env` has `VITE_API_URL=http://localhost:5000` for local development.

## Production Deployment (Vercel)

This project is configured for **zero-config deployment on Vercel**. 

Vercel will automatically build the `frontend` directory for the static UI and use the `api/` directory at the root to host Serverless Functions (like the contact form handler).

### Environment Variables on Vercel
When deploying to Vercel, make sure to add the following variables in the **Settings -> Environment Variables** section of your Vercel Dashboard:

| Key | Example Value |
| :--- | :--- |
| `MONGO_URI` | `mongodb+srv://<user>:<password>@cluster0...` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `your-email@gmail.com` |
| `SMTP_PASS` | `your-app-password` |
| `CONTACT_RECEIVER_EMAIL` | `your-email@gmail.com` |

*(Note: In production on Vercel, leave `VITE_API_URL` empty in your frontend `.env` so it uses relative paths for the API.)*

## About Me

My name is Abhijeet Jena. I am an MCA graduate and aspiring Full‑Stack Developer with hands‑on experience in React.js, Node.js, Express.js, and MongoDB. I enjoy building web applications, solving problems, and continuously learning new technologies to improve my development skills. My MCA completed in 2026. I have three projects:
1. **Quick Bite** – Online food delivery application.
2. **Redstore** – E‑commerce website.
3. **Weather App** – Simple weather project using HTML, CSS, JS and an API.
