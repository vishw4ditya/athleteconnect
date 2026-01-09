# \ud83d\ude80 Quick Reference - Merged Deployment

## \ud83d\udcbb Commands

### Development (Both servers):

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Production Build:

```bash
npm run build
```

Creates merged app in `backend/public/`

### Test Production Locally:

```bash
cd backend
NODE_ENV=production npm start
```

Visit: http://localhost:5000

---

## \ud83d\udd10 Your Configuration

### JWT Secret (Already Set):

```
040a202593c0b77b0564b9dbcb2c2b7fe6ebf2f000195d3eb0ec4777b7dd7e6e1e4c02d94ba848ac1fe72c237ccc8a785a79ea6cd871c8158fe1fc16bd64cc2f
```

### MongoDB Connection:

```
mongodb+srv://anew14057_db_user:Aditya2903@cluster0.vmfjf08.mongodb.net/athlete-platform
```

### Cloudinary:

- Cloud Name: `dm15wtri6`
- API Key: `938428271326957`
- API Secret: `25-0j5wQMX5Yjs8Monwp77hRCz0`

---

## \ud83d\udce6 Deployment Checklist

- [ ] Run `npm run build` from project root
- [ ] Verify `backend/public/` folder exists
- [ ] Set `NODE_ENV=production` in hosting platform
- [ ] Add all environment variables to platform
- [ ] Set build command: `npm run build && cd backend && npm install`
- [ ] Set start command: `cd backend && npm start`
- [ ] Deploy!

---

## \ud83d\udce1 Platform Specifics

### Railway:

- Auto-detects Node.js
- Build from root, run from backend
- Free tier: 500 hours/month

### Render:

- Web Service type
- Auto SSL certificate
- Free tier: 750 hours/month

### Heroku:

- Requires Heroku CLI
- Must deploy backend folder
- Free tier deprecated (paid plans only)

---

## \ud83d\udc1e Troubleshooting

| Issue              | Solution                        |
| ------------------ | ------------------------------- |
| "Cannot GET /"     | Set `NODE_ENV=production`       |
| API 404            | Check backend logs              |
| Images not showing | Verify Cloudinary env vars      |
| MongoDB error      | Add `0.0.0.0/0` to IP whitelist |
| Build fails        | Run `npm install` in root first |

---

## \ud83d\udcf1 URLs After Deployment

**Railway**: `https://your-app.railway.app`  
**Render**: `https://athlete-platform.onrender.com`  
**Heroku**: `https://your-app.herokuapp.com`

Everything (frontend + backend + API) on ONE URL! \ud83c\udf89
