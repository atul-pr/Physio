# Quick Start - Run PhysioCare Locally

## Step 1: Add MongoDB to Backend

1. Create `backend/.env` (copy from `backend/.env.example`)
2. Add your MongoDB Atlas connection string:

```
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster.xxxxx.mongodb.net/physiocare?retryWrites=true&w=majority
JWT_SECRET=any-random-secret-at-least-32-characters
```

## Step 2: Install Dependencies

**PowerShell (Windows):**
```powershell
cd frontend; npm install
cd ..\backend; npm install
```

**Bash / Mac / Linux:**
```bash
cd frontend && npm install
cd ../backend && npm install
```

## Step 3: Create Admin User (First Time Only)

**PowerShell:** `cd backend; npm run seed`  
**Bash:** `cd backend && npm run seed`

This creates admin login:
- **Email:** admin@physiocare.com
- **Password:** Admin@123

## Step 4: Run the App

**Terminal 1 - Start Backend:**
```powershell
cd backend; npm run dev
```
✅ Backend runs at http://localhost:5000

**Terminal 2 - Start Frontend:**
```powershell
cd frontend; npm run dev
```
✅ Frontend runs at http://localhost:5173

## Step 5: Open in Browser

Go to **http://localhost:5173**

- Browse services, exercises, book appointments
- Login at `/login` with admin credentials
- View appointments at `/admin`

---

**Note:** You do NOT need to add anything to frontend `.env` for local development. The Vite proxy handles API calls automatically.
