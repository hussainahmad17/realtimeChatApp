#   Full Stack Realtime Chat App

Highlights:

- 🌟 Tech stack: MERN + Socket.io + TailwindCSS + Daisy UI
- 🎃 Authentication && Authorization with JWT
- 👾 Real-time messaging with Socket.io
- 🚀 Online user status
- 👌 Global state management with Zustand
- 🐞 Error handling both on the server and on the client
- ⭐ At the end Deployment like a pro for FREE!
- ⏳ And much more!

### Backend `.env`

Create `backend/.env` and populate it with:

```ini
PORT=5001
MONGODB_URI=your-mongodb-uri
JWT_SECRET=super-secret-string

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Optional but recommended for deployments
CLIENT_ORIGINS=http://localhost:5173,https://your-frontend-domain
CLIENT_SOCKET_ORIGINS=http://localhost:5173,https://your-frontend-domain
SERVE_FRONTEND=false
NODE_ENV=development
```

### Frontend `.env`

Create `frontend/.env` for local overrides:

```ini
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
```

When deploying the frontend, set the variables above to the public backend URL (for example, `https://your-app.vercel.app/api`).

### Useful scripts

```bash
# Install all workspace dependencies
npm install

# Frontend dev server
npm run dev:frontend

# Backend dev server
npm run dev:backend

# Build the Vite frontend (used by Vercel)
npm run build
```

### Deploying to Vercel

1. Push this repository to GitHub and import it into Vercel.
2. In the Vercel dashboard set the following Environment Variables for the project:
	- `MONGODB_URI`, `JWT_SECRET`, Cloudinary credentials
	- `CLIENT_ORIGINS` and `CLIENT_SOCKET_ORIGINS` (include your Vercel domain and `http://localhost:5173` if you use Preview deployments)
	- `VITE_API_URL` = `https://<your-vercel-domain>/api`
	- `VITE_SOCKET_URL` = `https://<your-vercel-domain>`
3. Leave the default build command (`npm run build`) and output directory (`frontend/dist`).
4. Trigger a deployment. API requests are automatically proxied to `api/index.js`, and every non-API route rewrites back to the Vite SPA, so refreshes work on deep links.
