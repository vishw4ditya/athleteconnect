# Production Checklist ✅

Use this checklist before deploying to production.

## Backend Configuration

- [ ] **MongoDB Setup**

  - [ ] MongoDB Atlas account created
  - [ ] Production database created
  - [ ] IP whitelist configured (0.0.0.0/0 for all IPs or specific IPs)
  - [ ] Connection string updated in `.env`

- [ ] **Cloudinary Setup**

  - [ ] Cloudinary account created (free tier)
  - [ ] Cloud name, API key, and API secret obtained
  - [ ] Environment variables set in `.env`

- [ ] **Environment Variables**

  - [ ] `NODE_ENV=production`
  - [ ] Strong `JWT_SECRET` generated (use: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)
  - [ ] `MONGODB_URI` points to production database
  - [ ] Cloudinary credentials are correct
  - [ ] `FRONTEND_URL` set to actual frontend domain
  - [ ] All `.env` variables documented in `.env.example`

- [ ] **Security**
  - [ ] `.env` file is in `.gitignore`
  - [ ] CORS configured with actual frontend URL
  - [ ] Error messages sanitized in production
  - [ ] No sensitive data in logs

## Frontend Configuration

- [ ] **Environment Variables**

  - [ ] `.env.production` file created
  - [ ] `VITE_API_URL` points to production backend
  - [ ] `.env` files added to `.gitignore`

- [ ] **Build & Test**
  - [ ] Run `npm run build` successfully
  - [ ] Test production build locally: `npm run preview`
  - [ ] Check console for errors
  - [ ] Verify API connections work

## Deployment

- [ ] **Choose Deployment Platform**

  - [ ] Vercel (Frontend) + Railway (Backend)
  - [ ] Render (Both)
  - [ ] Heroku (Both)
  - [ ] Other: ****\_\_****

- [ ] **Backend Deployed**

  - [ ] Backend URL obtained
  - [ ] Health check endpoint working (`GET /`)
  - [ ] Database connection successful
  - [ ] Environment variables set on platform

- [ ] **Frontend Deployed**

  - [ ] Frontend URL obtained
  - [ ] Build completed successfully
  - [ ] `VITE_API_URL` configured with backend URL
  - [ ] Static files served correctly

- [ ] **DNS & Domain (Optional)**
  - [ ] Custom domain purchased
  - [ ] DNS records configured
  - [ ] SSL certificate active (usually automatic)

## Post-Deployment Testing

- [ ] **Core Functionality**

  - [ ] Homepage loads correctly
  - [ ] User registration works
  - [ ] Profile photo upload to Cloudinary works
  - [ ] User login works
  - [ ] Dashboard displays correctly
  - [ ] Video URL adding works
  - [ ] Athletes listing page shows all athletes
  - [ ] Individual athlete profile page works
  - [ ] Videos display and play correctly

- [ ] **Security Testing**

  - [ ] HTTPS enabled (SSL certificate)
  - [ ] JWT authentication working
  - [ ] Protected routes require login
  - [ ] CORS allows only frontend domain

- [ ] **Performance**
  - [ ] Images load from Cloudinary CDN
  - [ ] Page load times < 3 seconds
  - [ ] API response times < 500ms
  - [ ] Mobile responsive design works

## Monitoring Setup

- [ ] **Error Tracking**

  - [ ] Sentry or similar tool configured (optional)
  - [ ] Error alerts set up

- [ ] **Uptime Monitoring**

  - [ ] UptimeRobot or similar configured (optional)
  - [ ] Downtime alerts set up

- [ ] **Analytics**
  - [ ] Google Analytics configured (optional)

## Documentation

- [ ] **Update README**

  - [ ] Production URLs documented
  - [ ] Deployment instructions included
  - [ ] Environment variables documented

- [ ] **Team Communication**
  - [ ] Production URLs shared with team
  - [ ] Login credentials documented securely
  - [ ] Deployment access shared with team

## Final Verification

- [ ] All environment variables backed up securely
- [ ] Git repository pushed to remote
- [ ] Production URLs accessible publicly
- [ ] Test from different devices/browsers
- [ ] Mobile testing completed

---

## 🎉 Ready to Deploy!

Once all items are checked, you're ready to go live!

**Production URLs:**

- Frontend: ************\_\_\_************
- Backend: ************\_\_\_************

**Deployed on:** ******\_\_\_******
**Deployed by:** ******\_\_\_******
