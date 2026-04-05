# Resumé.ai — Full-Stack Resume Builder & Analyzer

A production-ready MERN stack application with Claude AI integration for building,
analyzing, and optimizing resumes. Includes authentication, 8 templates (4 premium),
Stripe billing, PDF/Word export, and AI-powered suggestions.

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React 18, Vite, React Router v6         |
| Backend    | Node.js, Express 5                      |
| Database   | MongoDB + Mongoose                      |
| Auth       | JWT (jsonwebtoken) + bcryptjs           |
| AI         | Anthropic Claude API (claude-sonnet-4)  |
| Payments   | Stripe (Checkout + Webhooks)            |
| PDF Export | Puppeteer (server-side)                 |
| Word Export| docx npm package                        |
| Uploads    | Multer + Cloudinary                     |

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB running locally or Atlas URI
- Anthropic API key
- Stripe account (test keys)

### 1. Clone & Install
```bash
git clone https://github.com/you/resume-ai.git
cd resume-ai
npm run install:all
```

### 2. Environment Variables
```bash
cp .env.example server/.env
# Fill in all values in server/.env
```

### 3. Run in Development
```bash
npm run dev
# Server: http://localhost:5000
# Client: http://localhost:5173
```

### 4. Docker (optional)
```bash
docker-compose up --build
```

## Project Structure

```
resume-ai/
├── server/                 # Express API
│   ├── config/             # DB + Cloudinary config
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routers
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Auth, premium, upload guards
│   ├── services/           # Claude, PDF, Stripe, DOCX
│   └── utils/              # Helpers, validators
└── client/                 # React + Vite
    └── src/
        ├── pages/          # Route-level components
        ├── components/     # Feature components
        ├── hooks/          # Custom React hooks
        ├── context/        # Auth + Resume context
        ├── services/       # Axios API calls
        └── utils/          # Client-side helpers
```

## API Endpoints

### Auth
| Method | Endpoint           | Description        |
|--------|--------------------|--------------------|
| POST   | /api/auth/signup   | Register user      |
| POST   | /api/auth/signin   | Login + JWT        |
| GET    | /api/auth/me       | Get current user   |

### Resumes
| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| GET    | /api/resumes          | List user resumes  |
| POST   | /api/resumes          | Create resume      |
| PUT    | /api/resumes/:id      | Update resume      |
| DELETE | /api/resumes/:id      | Delete resume      |
| GET    | /api/resumes/:id/pdf  | Download PDF       |
| GET    | /api/resumes/:id/docx | Download Word      |

### Analysis
| Method | Endpoint               | Description         |
|--------|------------------------|---------------------|
| POST   | /api/analysis/general  | General AI analysis |
| POST   | /api/analysis/match    | Job description match |
| GET    | /api/analysis          | User analysis history |

### Billing
| Method | Endpoint                    | Description           |
|--------|-----------------------------|-----------------------|
| POST   | /api/billing/checkout       | Create Stripe session |
| POST   | /api/billing/webhook        | Stripe webhook        |
| GET    | /api/billing/subscription   | Get current plan      |
| POST   | /api/billing/cancel         | Cancel subscription   |

## Features

- **Authentication** — JWT-based sign up / sign in, protected routes
- **Resume Builder** — 6-section form with live preview
- **8 Templates** — 4 free + 4 premium (Classic, Modern, Minimal, Bold, Executive, Creative, Tech Pro, Elegant)
- **AI Suggestions** — Per-field Claude-powered writing improvements
- **AI Analyzer** — General scoring + Job Description match with keyword gap analysis
- **PDF Export** — Puppeteer server-side rendering
- **Word Export** — .docx generation via `docx` package
- **Billing** — Stripe Checkout with webhook plan activation
- **Dashboard** — Resume history, analysis history, account stats

## License
MIT
