# 🚀 PHASE 1: Foundation & Setup

**Objective:** Establish project foundation with Astro, Tailwind, GitHub, and DigitalOcean deployment

**Duration:** 2-3 hours

**Success Criteria:**
- ✅ Astro project with Tailwind CSS running locally
- ✅ GitHub repository connected
- ✅ DigitalOcean deployed successfully
- ✅ `.ondigitalocean.app` URL accessible via HTTPS
- ✅ Auto-deploy working

---

## Tasks

### 1. Initialize Astro Project (30 min)
```bash
cd /Users/uspharoh/CascadeProjects/GlobalManagement
npm create astro@latest . -- --template minimal --no-install --no-git
npm install
npx astro add tailwind
npx astro add react
npm install motion
npm run dev
```

### 2. Configure for Production (15 min)
- Create `astro.config.mjs` with site URL
- Configure `tailwind.config.mjs` with brand colors (blues/grays/orange)
- Set up image optimization

### 3. Create Project Structure (20 min)
```bash
mkdir -p src/{components,layouts,pages,styles,assets/images}
mkdir -p public
```

Create `src/styles/global.css` with Tailwind directives  
Create `src/pages/index.astro` with "Phase 1 Complete" message

### 4. Git Setup (15 min)
```bash
git init
git add .
git commit -m "Phase 1: Initial Astro setup"
```

### 5. Push to GitHub (15 min)
```bash
git remote add origin https://github.com/uspharaoh93/GlobalManagement.git
git branch -M main
git push -u origin main --force
```

### 6. Deploy to DigitalOcean (30 min)
- Create App Platform app
- Connect GitHub repo
- Configure: Build = `npm run build`, Output = `dist`
- Deploy and test `.ondigitalocean.app` URL

### 7. Test Auto-Deploy (10 min)
- Make small change
- Push to GitHub
- Verify auto-deployment triggers

---

## Deliverables Checklist
- [ ] Local dev server at localhost:4321
- [ ] Tailwind CSS working
- [ ] React + Motion.dev installed
- [ ] Git repo initialized
- [ ] Pushed to GitHub
- [ ] DigitalOcean app deployed
- [ ] HTTPS URL working
- [ ] Auto-deploy tested

---

# 📐 META PROMPT FOR PHASE 1

```
You are an Astro expert building a construction company website from scratch.

TASK: Initialize Astro project, set up Tailwind CSS + React + Motion.dev, create GitHub repo, and deploy to DigitalOcean App Platform.

TECH STACK:
- Astro 5.x (minimal template)
- Tailwind CSS 4
- React 18 (for animations later)
- Motion.dev
- GitHub: uspharaoh93/GlobalManagement
- Hosting: DigitalOcean App Platform

STEPS:
1. Initialize Astro in /Users/uspharoh/CascadeProjects/GlobalManagement
2. Add Tailwind CSS integration
3. Add React integration (for future Motion.dev components)
4. Install motion package
5. Configure astro.config.mjs with site: "https://www.globalconstructionnv.com"
6. Configure tailwind.config.mjs with custom colors (primary blues, accent orange)
7. Create folder structure: components/, layouts/, pages/, styles/, assets/images/
8. Create src/styles/global.css with Tailwind directives
9. Create src/pages/index.astro with styled "Phase 1 Complete" message
10. Initialize Git with proper .gitignore
11. Push to GitHub (main branch, may need --force)
12. Create DigitalOcean App Platform app from GitHub
13. Configure build: Command = "npm run build", Output = "dist", Type = Static Site
14. Deploy and verify HTTPS URL works
15. Test auto-deploy (make change, push, verify)

SUCCESS CRITERIA:
- Local server runs at localhost:4321
- Tailwind classes work
- Code pushed to GitHub
- Site deployed to .ondigitalocean.app
- Auto-deploy configured

CONSTRAINTS:
- Don't add content yet (Phase 3)
- Don't build components yet (Phase 2)
- Focus only on foundation and deployment pipeline

DELIVERABLE: Working Astro + Tailwind foundation deployed with auto-deploy enabled.
```
