# Launch Checklist — Global Management & Construction

**Domain:** globalconstructionnv.com  
**Hosting:** DigitalOcean App Platform  
**DNS:** Cloudflare (Free)  
**Date:** February 2026

---

## Pre-Launch Code Preparation (DONE)

- [x] 301 redirects configured (`public/_redirects`)
- [x] Security & caching headers (`public/_headers`)
- [x] Custom 404 page created (`src/pages/404.astro`)
- [x] Sitemap updated with launch date
- [x] Cloudflare Web Analytics placeholder added (uncomment after setup)
- [x] robots.txt configured
- [x] Canonical URLs set to `https://www.globalconstructionnv.com`
- [x] Structured data (JSON-LD) in place
- [x] All 4 pages + thank-you page built

---

## DNS Migration Steps (Manual — Follow in Order)

### Day 1: Prep (30 min + wait)

1. **Document current DNS at GoDaddy**
   - Log into GoDaddy → DNS Management
   - Screenshot ALL records (A, CNAME, MX, TXT)
   - Save screenshots as backup

2. **Reduce TTL at GoDaddy**
   - Edit each DNS record → set TTL to **300 seconds**
   - Save all changes
   - **WAIT 24–48 hours** before proceeding

---

### Day 2 Morning: Cloudflare Setup (45 min)

3. **Create Cloudflare account**
   - Go to [cloudflare.com](https://cloudflare.com)
   - Sign up (free), verify email

4. **Add domain to Cloudflare**
   - Dashboard → Add Site → `globalconstructionnv.com`
   - Select **FREE** plan
   - Wait for DNS scan to complete

5. **Review imported DNS records**
   - Verify A records present
   - Verify MX records present (critical for email!)
   - Verify TXT records (SPF, DKIM)
   - Add any missing records manually

6. **Copy Cloudflare nameservers**
   - Two nameservers will be shown (e.g., `chloe.ns.cloudflare.com`)
   - Copy both — needed for GoDaddy

---

### Day 2 Afternoon: Nameserver Switch (30 min + wait)

7. **Change nameservers at GoDaddy**
   - GoDaddy → Domains → `globalconstructionnv.com`
   - Nameservers → Change → "I'll use my own nameservers"
   - Enter both Cloudflare nameservers
   - Save

8. **Verify in Cloudflare**
   - Click "Done, check nameservers"
   - Wait for confirmation (15 min – 2 hours)

9. **Check DNS propagation**
   - Go to [whatsmydns.net](https://www.whatsmydns.net)
   - Look up NS records for `globalconstructionnv.com`
   - Should show Cloudflare nameservers globally
   - Terminal check: `nslookup globalconstructionnv.com`

---

### Day 2 Evening: Go Live (1 hour)

10. **Configure SSL in Cloudflare**
    - SSL/TLS → **Full (strict)**
    - Enable "Always Use HTTPS"
    - Enable "Automatic HTTPS Rewrites"

11. **Add custom domain in DigitalOcean**
    - App Platform → Your App → Settings → Domains
    - Add Domain: `www.globalconstructionnv.com`
    - Copy the CNAME target DigitalOcean provides

12. **Update DNS in Cloudflare**
    - **CNAME record:**
      - Name: `www`
      - Target: `[your-app].ondigitalocean.app`
      - Proxy: Proxied (orange cloud)
    - **Root redirect (Page Rule):**
      - URL: `globalconstructionnv.com/*`
      - Setting: Forwarding URL → 301
      - Destination: `https://www.globalconstructionnv.com/$1`

13. **Test all URLs**
    - [ ] `https://www.globalconstructionnv.com` — should load
    - [ ] `https://globalconstructionnv.com` — should redirect to www
    - [ ] `http://www.globalconstructionnv.com` — should redirect to https
    - [ ] `http://globalconstructionnv.com` — should redirect to https://www

14. **Enable Cloudflare Web Analytics**
    - Cloudflare Dashboard → Web Analytics → Add Site
    - Copy the beacon token
    - Edit `src/layouts/BaseLayout.astro` line ~124
    - Uncomment the script tag and replace `YOUR_CF_BEACON_TOKEN`

---

## Post-Launch Verification

- [ ] All 4 pages load on custom domain
- [ ] HTTPS working (green padlock)
- [ ] Contact form sends to business Gmail
- [ ] Mobile responsive on real device
- [ ] All navigation links work
- [ ] Images display correctly
- [ ] No console errors
- [ ] Page loads under 3 seconds
- [ ] 404 page shows for invalid URLs
- [ ] Old .html URLs redirect properly

---

## Rollback Plan

If anything breaks after nameserver change:
1. Go to GoDaddy → Domains → Nameservers
2. Change back to GoDaddy's default nameservers
3. Old site becomes active again within minutes–hours
4. Debug the issue, then retry

---

## Post-Launch (First Week)

- [ ] Monitor form submissions in Gmail
- [ ] Check DigitalOcean deployment logs
- [ ] Watch for 404 errors in Cloudflare analytics
- [ ] Submit sitemap to Google Search Console
- [ ] Update Google My Business with new website URL
