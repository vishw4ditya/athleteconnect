# Quick Setup Guide

## Prerequisites Check

Before running the application, ensure you have:

1. ✅ **Node.js** installed (version 14 or higher)
   - Check: `node --version`
2. ✅ **MongoDB** installed and running

   - For local MongoDB: Run `mongod` in a separate terminal
   - Or use MongoDB Atlas (cloud): Update the MONGODB_URI in backend/.env

3. ✅ **npm** installed (comes with Node.js)
   - Check: `npm --version`

## First Time Setup

### Option 1: Manual Setup (Recommended for first-time users)

1. **Start MongoDB** (in a new terminal):

   ```bash
   mongod
   ```

2. **Start Backend** (in a new terminal):

   ```bash
   cd backend
   npm start
   ```

   Wait until you see "MongoDB connected successfully"

3. **Start Frontend** (in a new terminal):

   ```bash
   cd frontend
   npm run dev
   ```

4. **Open Browser**:
   Navigate to: http://localhost:5173

### Option 2: Using Scripts (Windows only)

**Using Batch File:**

```bash
start-servers.bat
```

**Using PowerShell:**

```bash
.\start-servers.ps1
```

## Quick Test

1. Open http://localhost:5173
2. Click "Register as Athlete"
3. Fill in the registration form
4. Login with your credentials
5. Add video URLs in your dashboard

## Default Configuration

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173
- **MongoDB**: mongodb://localhost:27017/athlete-platform

## Troubleshooting

### MongoDB Connection Failed

- Ensure MongoDB is running: `mongod`
- Check if port 27017 is available
- Verify MONGODB_URI in backend/.env

### Backend Port in Use

- Edit backend/.env and change PORT=5000 to another port
- Restart the backend server

### Frontend Port in Use

- Vite will automatically suggest another port
- Accept the suggestion or edit vite.config.js

### Dependencies Issues

```bash
# Reinstall backend dependencies
cd backend
rm -rf node_modules package-lock.json
npm install

# Reinstall frontend dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Environment Variables

Make sure backend/.env contains:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/athlete-platform
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

## Next Steps

1. ✅ Register as an athlete
2. ✅ Upload a profile photo
3. ✅ Add your video URLs
4. ✅ Share your contact information
5. ✅ Let viewers discover your talent!

## Support

For issues or questions:

- Check the main README.md for detailed documentation
- Review the API endpoints section
- Verify all prerequisites are met
- Check terminal logs for error messages

---

Happy coding! 🚀
