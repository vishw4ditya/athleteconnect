# 🚀 Unified Deployment Guide

Your Athlete Platform is now **merged** - frontend and backend run on one server!

## ✅ What's Already Done

1. **JWT Secret Configured** - Strong 128-character secret already set in `backend/.env`
2. **Frontend API** - Uses relative paths (`/api`) for same-server deployment
3. **Backend Serves Frontend** - Backend automatically serves React app in production
4. **Build Script** - Automated script to merge frontend into backend
5. **Cloudinary Configured** - Images stored permanently in the cloud

---

## 🛠️ Quick Start - Local Testing

### Development (Frontend + Backend separate):

```bash
# From project root
npm run dev
```

This runs both servers:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Production Build (Merged):

```bash
# 1. Build frontend
npm run build

# 2. Test locally
cd backend
NODE_ENV=production npm start

# Visit: http://localhost:5000 (single server!)
```

---

## 📦 Deployment Steps

### Option 1: Deploy to Railway (Recommended - Easiest)

1. **Push to GitHub** (if not already):

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy on Railway**:

   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway auto-detects Node.js

3. **Configure Environment Variables** in Railway dashboard:

   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://anew14057_db_user:Aditya2903@cluster0.vmfjf08.mongodb.net/athlete-platform
   JWT_SECRET=040a202593c0b77b0564b9dbcb2c2b7fe6ebf2f000195d3eb0ec4777b7dd7e6e1e4c02d94ba848ac1fe72c237ccc8a785a79ea6cd871c8158fe1fc16bd64cc2f
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=dm15wtri6
   CLOUDINARY_API_KEY=938428271326957
   CLOUDINARY_API_SECRET=25-0j5wQMX5Yjs8Monwp77hRCz0
   ```

4. **Set Build Commands**:

   - **Root Directory**: Keep default (project root)
   - **Build Command**: `npm run build && cd backend && npm install`
   - **Start Command**: `cd backend && npm start`

5. **Deploy!** Railway will give you a URL like: `https://your-app.railway.app`

---

### Option 2: Deploy to Render

1. **Create Web Service**:

   - Go to [render.com](https://render.com)
   - New → Web Service
   - Connect your GitHub repo

2. **Configure**:

   - **Name**: athlete-platform
   - **Build Command**: `npm run build && cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**: (same as Railway above)

3. **Deploy!** Render gives you a URL like: `https://athlete-platform.onrender.com`

---

### Option 3: Deploy to Heroku

```bash
# Install Heroku CLI, then:
cd backend
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set JWT_SECRET="your_jwt_secret"
heroku config:set CLOUDINARY_CLOUD_NAME="dm15wtri6"
heroku config:set CLOUDINARY_API_KEY="938428271326957"
heroku config:set CLOUDINARY_API_SECRET="25-0j5wQMX5Yjs8Monwp77hRCz0"

# Before deploying, run build from project root:
cd ..
npm run build

# Then deploy backend
cd backend
git init
git add .
git commit -m "Deploy"
heroku git:remote -a your-app-name
git push heroku main
```

---

## 🎯 Understanding the Merge

### File Structure:

```
project-root/
├── frontend/          (React source code)
├── backend/           (Express server)
│   └── public/        (Built React app - created on build)
├── scripts/
│   └── build.js       (Merges frontend into backend)
└── package.json       (Root build scripts)
```

### How It Works:

1. **Build**: `npm run build` compiles React → `frontend/dist/`
2. **Merge**: Copies `frontend/dist/` → `backend/public/`
3. **Serve**: Backend serves static files from `public/` folder
4. **API**: All `/api/*` requests go to Express routes
5. **React Router**: All other requests serve `index.html`

---

## 🔒 Security Checklist

- ✅ JWT Secret is strong (128-character random hex)
- ✅ MongoDB Atlas has IP whitelist configured
- ✅ Cloudinary credentials are secure
- ✅ `.env` files excluded from git
- ✅ CORS configured (not needed for same-server)
- ✅ Production errors sanitized

---

## 🧪 Testing After Deployment

1. **Visit your deployment URL**
2. **Register** a new athlete account
3. **Upload** a profile photo (check Cloudinary dashboard)
4. **Add** video URLs
5. **Browse** Athletes page as a viewer
6. **Click** athlete card to see profile with videos

---

## 📊 Monitoring

### Check Logs:

- **Railway**: Dashboard → Deployments → View Logs
- **Render**: Dashboard → Logs tab
- **Heroku**: `heroku logs --tail`

### Common Issues:

**Issue**: "Cannot GET /"

- **Fix**: Make sure `NODE_ENV=production` is set

**Issue**: API not working

- **Fix**: Check backend logs for errors

**Issue**: Images not loading

- **Fix**: Verify Cloudinary credentials in environment variables

**Issue**: MongoDB connection failed

- **Fix**: Check MongoDB Atlas IP whitelist (add `0.0.0.0/0`)

---

## 🎉 You're Live!

Your unified Athlete Platform is now deployed with:

- ✅ One server for everything
- ✅ Permanent image storage (Cloudinary)
- ✅ Secure JWT authentication
- ✅ Video showcase capabilities
- ✅ Public athlete profiles

**Single URL for everything:** `https://your-app.railway.app`

---

## 💡 Pro Tips

1. **Custom Domain**: Add your own domain in Railway/Render settings
2. **SSL**: Automatically provided by hosting platforms
3. **Updates**: Just push to GitHub, auto-deploys!
4. **Scaling**: Upgrade plan if you get lots of traffic

Need help? Check the platform logs for detailed error messages!
