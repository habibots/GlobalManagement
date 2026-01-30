# 🌐 PHASE 6: DNS Migration & Launch

**Objective:** Migrate DNS from GoDaddy to Cloudflare and launch on custom domain

**Duration:** 2-3 hours (spread over 2 days due to DNS propagation)

**Success Criteria:**
- ✅ DNS migrated to Cloudflare
- ✅ Custom domain pointing to DigitalOcean
- ✅ HTTPS working on custom domain
- ✅ Old URLs redirecting with 301s
- ✅ Site live and accessible

---

## Timeline Overview

**Day 1 (Feb 1) Evening:**
- Reduce GoDaddy DNS TTL to 300 seconds
- Wait 24-48 hours for old TTL to expire

**Day 2 (Feb 2) Morning:**
- Create Cloudflare account
- Add domain and review DNS records
- Get Cloudflare nameservers

**Day 2 (Feb 2) Afternoon:**
- Change nameservers at GoDaddy
- Wait for DNS propagation (1-4 hours typically)

**Day 2 (Feb 2) Evening:**
- Add custom domain to DigitalOcean
- Configure SSL in Cloudflare
- Test site on custom domain
- Launch! 🚀

---

## Tasks

### DAY 1 TASKS

### 1. Document Current DNS (20 min)
**Before making any changes:**

1. Log into GoDaddy DNS management
2. Screenshot ALL DNS records:
   - A records
   - CNAME records
   - MX records (email)
   - TXT records
   - Any other records

3. Save screenshots locally as backup

### 2. Reduce DNS TTL at GoDaddy (15 min)

**Why:** Short TTL means faster propagation when we change nameservers

**Steps:**
1. GoDaddy → My Products → DNS
2. For each DNS record:
   - Click Edit
   - Change TTL to 300 seconds (5 minutes)
   - Save
3. Do this for ALL records

**Critical:** Must wait 24-48 hours after this before changing nameservers

---

### DAY 2 TASKS (MORNING)

### 3. Create Cloudflare Account (10 min)

1. Go to https://cloudflare.com
2. Sign up (free account)
3. Verify email

### 4. Add Domain to Cloudflare (15 min)

1. Dashboard → Add Site
2. Enter: `globalconstructionnv.com`
3. Select FREE plan
4. Cloudflare scans existing DNS records (takes 1-2 min)

### 5. Review DNS Records in Cloudflare (20 min)

**Cloudflare will import most records automatically**

**Verify these are present:**
- A record for @ (root domain)
- CNAME or A for www
- MX records (if email hosted at GoDaddy)
- Any TXT records (SPF, DKIM for email)

**Add any missing records manually**

**Important:** Keep MX records if email is hosted at GoDaddy!

### 6. Get Cloudflare Nameservers (5 min)

Cloudflare will show you two nameservers:
- Example: `chloe.ns.cloudflare.com`
- Example: `dion.ns.cloudflare.com`

**Copy these** - you'll need them for GoDaddy

---

### DAY 2 TASKS (AFTERNOON)

### 7. Change Nameservers at GoDaddy (15 min)

**This is the critical step that migrates DNS**

1. Log into GoDaddy
2. My Products → Domains
3. Click on `globalconstructionnv.com`
4. Scroll to "Nameservers" section
5. Click "Change"
6. Select "I'll use my own nameservers"
7. Enter Cloudflare's two nameservers
8. Click "Save"

**What happens:** GoDaddy will propagate the nameserver change globally

### 8. Verify in Cloudflare (10 min)

1. Return to Cloudflare dashboard
2. Click "Done, check nameservers"
3. Cloudflare will verify the change (may take 15 min - 2 hours)

You'll see "Great news! Cloudflare is now protecting your site"

### 9. Wait for DNS Propagation (1-4 hours)

**Check propagation status:**
- Go to https://www.whatsmydns.net
- Enter: `globalconstructionnv.com`
- Select: NS (Nameserver)
- Check: Should show Cloudflare nameservers worldwide

**Or use terminal:**
```bash
nslookup globalconstructionnv.com
# Should show Cloudflare nameservers
```

**Expected:** 1-4 hours for full global propagation
**Maximum:** 24 hours (rare)

---

### DAY 2 TASKS (EVENING - AFTER DNS PROPAGATES)

### 10. Configure SSL in Cloudflare (10 min)

1. Cloudflare dashboard → SSL/TLS
2. Select encryption mode: **"Full (strict)"** if DigitalOcean has SSL, or **"Flexible"** if not
3. Enable "Always Use HTTPS"
4. Enable "Automatic HTTPS Rewrites"

### 11. Add Custom Domain in DigitalOcean (20 min)

1. Log into DigitalOcean
2. App Platform → Your app → Settings
3. Domains → "Add Domain"
4. Enter: `www.globalconstructionnv.com`
5. DigitalOcean provides a CNAME target (e.g., `your-app.ondigitalocean.app`)

### 12. Update DNS in Cloudflare (15 min)

**Add/Update these records:**

1. **WWW subdomain (primary):**
   - Type: CNAME
   - Name: `www`
   - Target: `your-app.ondigitalocean.app`
   - Proxy status: ✅ Proxied (orange cloud)
   - TTL: Auto

2. **Root domain redirect:**
   - Type: A
   - Name: `@`
   - Target: Point to www using Cloudflare redirect rule (or add separate A record)

**Cloudflare Page Rule (optional):**
- URL: `globalconstructionnv.com/*`
- Setting: Forwarding URL (301 Permanent Redirect)
- Destination: `https://www.globalconstructionnv.com/$1`

### 13. Test Custom Domain (15 min)

**Test these URLs:**
- https://www.globalconstructionnv.com (should work)
- https://globalconstructionnv.com (should redirect to www)
- http://www.globalconstructionnv.com (should redirect to https)

**Verify:**
- Green padlock (HTTPS working)
- All pages load correctly
- Contact form works
- Images display
- Navigation works

### 14. Set Up 301 Redirects (20 min)

**Old GoDaddy URLs → New URLs**

In Cloudflare Page Rules (free plan allows 3):

1. Old home URL → New home
2. Old services URL → New services
3. Old contact URL → New contact

Example:
- `www.globalconstructionnv.com/home.html` → `https://www.globalconstructionnv.com/`

### 15. Final Testing (30 min)

**Complete testing checklist:**
- [ ] All 4 pages load on custom domain
- [ ] HTTPS working (green padlock)
- [ ] Contact form sends emails
- [ ] Mobile responsive
- [ ] All links work
- [ ] Images display correctly
- [ ] No console errors
- [ ] Fast loading (under 3 seconds)
- [ ] Google Search Console notified (optional)

### 16. Monitor & Celebrate! 🎉

**First 24 hours:**
- Monitor form submissions
- Check for any 404 errors
- Respond to any user reports
- Watch DigitalOcean deployment logs

**Rollback plan if issues:**
- Revert nameservers back to GoDaddy originals
- Old site will become active again
- Debug and retry when ready

---

## Deliverables Checklist

### Day 1 (Feb 1 Evening)
- [ ] Current DNS records documented (screenshots)
- [ ] DNS TTL reduced to 300 seconds at GoDaddy
- [ ] Waiting period started (24-48 hours)

### Day 2 (Feb 2 Morning)
- [ ] Cloudflare account created
- [ ] Domain added to Cloudflare
- [ ] DNS records reviewed and corrected
- [ ] Cloudflare nameservers obtained

### Day 2 (Feb 2 Afternoon)
- [ ] Nameservers changed at GoDaddy
- [ ] Cloudflare verified change
- [ ] DNS propagation confirmed

### Day 2 (Feb 2 Evening)
- [ ] SSL configured in Cloudflare
- [ ] Custom domain added to DigitalOcean
- [ ] DNS records updated in Cloudflare
- [ ] Site accessible on custom domain
- [ ] HTTPS working correctly
- [ ] 301 redirects configured
- [ ] All pages tested
- [ ] Contact form tested
- [ ] Site officially LIVE! 🚀

---

# 📐 META PROMPT FOR PHASE 6

```
You are a DNS and DevOps expert completing the Global Management & Construction website. Phases 1-5 complete, site ready on .ondigitalocean.app.

TASK: Migrate DNS from GoDaddy to Cloudflare and launch on custom domain globalconstructionnv.com

CRITICAL: This is a 2-day process due to DNS propagation requirements.

DAY 1 (FEB 1 EVENING):

1. Document current GoDaddy DNS:
   - Log into GoDaddy DNS management
   - Screenshot ALL records (A, CNAME, MX, TXT)
   - Save as backup

2. Reduce TTL at GoDaddy:
   - Edit each DNS record
   - Change TTL to 300 seconds (5 minutes)
   - Save all changes
   - **CRITICAL:** Must wait 24-48 hours after this

3. Inform user:
   - "TTL reduced to 300 seconds"
   - "Must wait until Feb 2 to proceed with nameserver change"
   - "This prevents extended downtime"

DAY 2 (FEB 2 MORNING):

4. Create Cloudflare account (free):
   - Sign up at cloudflare.com
   - Verify email

5. Add domain to Cloudflare:
   - Add Site → globalconstructionnv.com
   - Select FREE plan
   - Cloudflare scans existing DNS

6. Review DNS records:
   - Verify A records imported
   - Verify MX records (email!) imported
   - Add any missing records manually
   - **Critical:** Don't lose MX records or email breaks

7. Get Cloudflare nameservers:
   - Cloudflare shows 2 nameservers (e.g., name1.ns.cloudflare.com)
   - Copy both

DAY 2 (FEB 2 AFTERNOON):

8. Change nameservers at GoDaddy:
   - GoDaddy → Domains → globalconstructionnv.com
   - Nameservers → Change
   - "Use my own nameservers"
   - Enter both Cloudflare nameservers
   - Save

9. Verify in Cloudflare:
   - "Done, check nameservers"
   - Wait for Cloudflare confirmation (15 min - 2 hours)

10. Check DNS propagation:
    - Use whatsmydns.net (NS lookup for globalconstructionnv.com)
    - Should show Cloudflare nameservers globally
    - Usually 1-4 hours for full propagation

DAY 2 (FEB 2 EVENING - AFTER PROPAGATION):

11. Configure SSL in Cloudflare:
    - SSL/TLS → Full (strict) or Flexible
    - Enable "Always Use HTTPS"
    - Enable "Automatic HTTPS Rewrites"

12. Add domain in DigitalOcean:
    - App Platform → app → Settings → Domains
    - Add Domain: www.globalconstructionnv.com
    - Get CNAME target from DigitalOcean

13. Update Cloudflare DNS:
    
    CNAME record:
    - Type: CNAME
    - Name: www
    - Target: [your-app].ondigitalocean.app
    - Proxy: ✅ Proxied (orange cloud)
    
    Root redirect (Page Rule):
    - globalconstructionnv.com/* → https://www.globalconstructionnv.com/$1
    - 301 Permanent Redirect

14. Test custom domain:
    - https://www.globalconstructionnv.com (should work)
    - https://globalconstructionnv.com (should redirect to www)
    - http://www.globalconstructionnv.com (should redirect to https)
    - Verify: Green padlock, all pages work, form works

15. Configure 301 redirects:
    - Old URLs (.html) → new URLs (clean)
    - Use Cloudflare Page Rules (3 free)

16. Final testing:
    - All 4 pages load
    - HTTPS working
    - Form sends emails
    - Mobile responsive
    - No errors in console
    - Fast loading

SUCCESS CRITERIA:
- ✅ DNS on Cloudflare nameservers
- ✅ Site loads at www.globalconstructionnv.com
- ✅ HTTPS working (green padlock)
- ✅ HTTP → HTTPS redirect working
- ✅ Root → www redirect working
- ✅ Contact form delivers emails
- ✅ All pages accessible
- ✅ Mobile responsive

ROLLBACK PLAN:
If anything breaks:
1. Change nameservers back to GoDaddy originals at GoDaddy
2. Old site becomes active again
3. Debug issue
4. Retry when ready

TIMING:
- Day 1 Evening: 30 min work, then wait 24-48 hours
- Day 2 Morning: 45 min work
- Day 2 Afternoon: 30 min work, then wait 1-4 hours for propagation
- Day 2 Evening: 1 hour work, then celebrate!

IMPORTANT NOTES:
- Reducing TTL before nameserver change prevents extended downtime
- Keep MX records or email breaks
- Use "www" as primary domain (easier DNS setup)
- Cloudflare proxy (orange cloud) provides CDN + DDoS protection
- Test thoroughly before announcing launch

USER MUST PROVIDE:
- Confirmation when 24-48 hour wait is complete
- Access to GoDaddy account
- Business Gmail for final form testing
```
