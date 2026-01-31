# Frontend Not Starting - ERR_CONNECTION_REFUSED / spawn EPERM

## Problem
- `localhost:5173` shows "Connection refused"
- Or: `Error: spawn EPERM` when running `npm run dev`

## Solutions (try in order)

### 1. Run in a NEW terminal (outside Cursor)
Open **Windows PowerShell** or **Command Prompt** directly (not Cursor's terminal):

```powershell
cd "C:\Users\Atul Prajapati\OneDrive\Desktop\JERAM\frontend"
npm run dev
```

Sometimes Cursor's sandbox blocks child processes.

---

### 2. Run as Administrator
1. Right-click **PowerShell** or **Command Prompt**
2. Click **Run as administrator**
3. Run:
```powershell
cd "C:\Users\Atul Prajapati\OneDrive\Desktop\JERAM\frontend"
npm run dev
```

---

### 3. Move project OUTSIDE OneDrive
OneDrive can lock files and cause EPERM errors.

1. Copy the entire `JERAM` folder to: `C:\Projects\JERAM` (or any folder NOT in OneDrive)
2. Open terminal and run:
```powershell
cd C:\Projects\JERAM\frontend
npm run dev
```

---

### 4. Add Windows Defender exclusion
1. Open **Windows Security** → **Virus & threat protection**
2. Click **Manage settings** under "Virus & threat protection settings"
3. Scroll to **Exclusions** → **Add or remove exclusions**
4. Add folder: `C:\Users\Atul Prajapati\OneDrive\Desktop\JERAM`

---

### 5. Reinstall node_modules
```powershell
cd "C:\Users\Atul Prajapati\OneDrive\Desktop\JERAM\frontend"
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run dev
```

---

### 6. Use different port (if 5173 is blocked)
Edit `frontend/vite.config.js` and change port to 3000:

```js
server: {
  port: 3000,
  ...
}
```

Then open http://localhost:3000

---

## Quick checklist
- [ ] Backend running? (`cd backend` → `npm run dev`) - should show "Server running on port 5000"
- [ ] Frontend running? (`cd frontend` → `npm run dev`) - should show "Local: http://localhost:5173"
- [ ] Both need to run in **separate terminals** at the same time
