# Production Deployment Guide - Merged Server

This guide will help you deploy your **unified** Athlete Platform where frontend and backend run on the same server.

## 🎯 What Changed?

✅ **Frontend + Backend = One Server**  
✅ **Single deployment** instead of two separate deployments  
✅ **Relative API paths** - frontend calls `/api` instead of full URLs  
✅ **Simplified hosting** - deploy only the backend folder  
✅ **Strong JWT Secret** - 128-character hex string for security

---

## 📋 Pre-Deployment Checklist

### Backend Configuration

1. **Environment Variables** - Update `backend/.env` for production:

   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_production_mongodb_uri
   JWT_SECRET=your_strong_random_secret_key
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   FRONTEND_URL=https://your-frontend-url.com
   ```

2. **Security**:
   - Generate a strong JWT secret: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
   - Never commit `.env` files to git
   - Use MongoDB Atlas for production database

### Frontend Configuration

1. **Environment Variables** - Update `frontend/.env.production`:

   ```env
   VITE_API_URL=https://your-backend-url.com/api
   ```

2. **Build the Frontend**:
   ```bash
   cd frontend
   npm run build
   ```
   This creates a `dist` folder with optimized production files.

---

## 🚀 Deployment Options

### Option 1: Deploy to Vercel (Frontend) + Railway (Backend)

#### Frontend (Vercel - Free):

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**:
     - `VITE_API_URL` = your backend URL
5. Deploy!

#### Backend (Railway - Free tier):

1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add all from your `.env`
4. Railway will give you a URL like `https://your-app.railway.app`
5. Update frontend's `VITE_API_URL` with this URL

---

### Option 2: Deploy to Render (Both Frontend & Backend)

#### Backend (Render):

1. Go to [render.com](https://render.com)
2. Create **New Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Name**: athlete-platform-backend
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add all from `.env`
5. Deploy and get your backend URL

#### Frontend (Render):

1. Create **New Static Site**
2. Configure:
   - **Name**: athlete-platform-frontend
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**:
     - `VITE_API_URL` = your backend URL
3. Deploy!

---

### Option 3: Deploy to Heroku

#### Backend:

```bash
cd backend
heroku create your-app-name-backend
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set CLOUDINARY_CLOUD_NAME=your_name
heroku config:set CLOUDINARY_API_KEY=your_key
heroku config:set CLOUDINARY_API_SECRET=your_secret
heroku config:set FRONTEND_URL=https://your-frontend.com
git push heroku main
```

#### Frontend:

```bash
cd frontend
heroku create your-app-name-frontend
heroku buildpacks:set heroku/nodejs
heroku config:set VITE_API_URL=https://your-backend.herokuapp.com/api
git push heroku main
```

---

## 🔒 Security Best Practices

1. **Never expose sensitive data**:

   - Keep `.env` files out of git
   - Use `.env.example` for templates

2. **Strong JWT Secret**:

   - Use a random 64-character string
   - Change it in production

3. **CORS Configuration**:

   - Set `FRONTEND_URL` to your actual domain
   - Don't use wildcards (`*`) in production

4. **MongoDB**:

   - Use MongoDB Atlas for production
   - Enable IP whitelisting
   - Use strong passwords

5. **Cloudinary**:
   - Use transformation limits
   - Enable signed uploads for security

---

## ✅ Post-Deployment Verification

1. **Test API Health**:

   ```bash
   curl https://your-backend-url.com
   # Should return: {"message":"Athlete Platform API is running","environment":"production"}
   ```

2. **Test Frontend**:

   - Visit your frontend URL
   - Try registering a new athlete
   - Upload a profile photo
   - Check if videos display correctly

3. **Check Logs**:

   - Backend: Check deployment platform logs
   - Frontend: Check browser console

4. **Monitor Performance**:
   - Test loading times
   - Check Cloudinary dashboard for image delivery
   - Monitor MongoDB Atlas metrics

---

## 🐛 Common Issues & Solutions

### Issue: CORS Errors

**Solution**: Make sure `FRONTEND_URL` in backend `.env` matches your actual frontend URL

### Issue: Images Not Loading

**Solution**: Verify Cloudinary credentials are correct in production environment

### Issue: API Connection Failed

**Solution**: Check that `VITE_API_URL` points to the correct backend URL

### Issue: MongoDB Connection Error

**Solution**:

- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for all IPs)
- Verify connection string is correct

### Issue: 500 Internal Server Error

**Solution**: Check backend logs for detailed error messages

---

## 📊 Monitoring & Maintenance

### Recommended Tools:

- **Uptime Monitoring**: [UptimeRobot](https://uptimerobot.com) (free)
- **Error Tracking**: [Sentry](https://sentry.io) (free tier)
- **Analytics**: [Google Analytics](https://analytics.google.com)

### Regular Tasks:

- Monitor Cloudinary storage usage
- Check MongoDB Atlas database size
- Review server logs weekly
- Update dependencies monthly (`npm update`)

---

## 🎉 Your App is Live!

After deployment, your Athlete Platform will be accessible worldwide with:

- ✅ Persistent image storage via Cloudinary
- ✅ Secure authentication with JWT
- ✅ Fast, optimized frontend
- ✅ Scalable backend API
- ✅ Professional video showcases

**Need help?** Check the logs on your deployment platform for detailed error messages.
