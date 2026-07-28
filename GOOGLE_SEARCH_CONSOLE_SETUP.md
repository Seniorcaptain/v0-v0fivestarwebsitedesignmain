# Google Search Console Setup Guide
## FIVE ST★R Driving School

---

## Step 1: Create/Sign in to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account (use the same account as your business)
3. Click "Add property" to register your domain

---

## Step 2: Verify Domain Ownership

Choose one verification method:

### Method 1: DNS Records (Recommended)
1. Go to your domain registrar (e.g., GoDaddy, Namecheap)
2. Add the TXT record provided by Google Search Console
3. Google will verify automatically (may take 24-48 hours)

### Method 2: HTML File Upload
1. Download the verification file from Google Search Console
2. Upload to your website root directory: `/public/google-[verification-id].html`
3. Google will verify when it can access the file

### Method 3: HTML Meta Tag
Add to `app/layout.tsx` in the `<head>` tag:
```html
<meta name="google-site-verification" content="[verification-id]" />
```

---

## Step 3: Submit Your Sitemap

1. In Google Search Console, go to **Sitemaps**
2. Click **Add/Test Sitemap**
3. Enter: `https://fivestardrivingschools.com/sitemap.xml`
4. Click **Submit**

**Status**: Should show "Success" within a few hours

---

## Step 4: Submit Your Robots.txt

1. Go to **Crawl** → **robots.txt Tester** (if available in your region)
2. Verify the robots.txt is accessible
3. Check that Google can crawl your site

Your robots.txt is at: `https://fivestardrivingschools.com/robots.txt`

---

## Step 5: Request Indexing

### Bulk Request (First Time)
1. In Google Search Console, go to **Sitemaps**
2. Your submitted sitemap should show indexed pages
3. Wait 2-4 weeks for full indexing

### Individual URL Requests
1. Use **URL Inspection** tool
2. Enter each page URL:
   - `https://fivestardrivingschools.com/`
   - `https://fivestardrivingschools.com/book-lesson`
   - `https://fivestardrivingschools.com/gallery`
   - `https://fivestardrivingschools.com/privacy-policy`
3. Click **Request Indexing**

---

## Step 6: Monitor Search Performance

### Key Metrics to Watch
1. **Coverage**: All pages should show "Covered"
2. **Mobile Usability**: Should show "No issues"
3. **Core Web Vitals**: Monitor for improvements
4. **Indexing**: Track page crawl status

### Dashboard Sections to Review
1. **Overview**: General health of search performance
2. **Performance**: Keywords you're ranking for
3. **Coverage**: Indexing status of all pages
4. **Enhancements**: Structured data validation
5. **Mobile Usability**: Mobile-friendly status

---

## Step 7: Monitor Structured Data

1. Go to **Enhancements** → **Rich Results**
2. Look for "LocalBusiness" schema validation
3. Check that all 1000+ reviews are recognized

Expected: 
- ✅ Valid structured data
- ✅ No errors or warnings

---

## Step 8: Set Up Google Analytics Integration

1. In Google Search Console:
   - Go to **Settings** → **Google Analytics property**
   - Select your Google Analytics property
   - Link the two accounts

2. In Google Analytics:
   - Go to **Acquisition** → **Google Search Console**
   - View which keywords drive traffic

---

## Step 9: Set Preferred Domain

1. In Google Search Console → **Settings**
2. Set preferred domain:
   - Choose: `https://fivestardrivingschools.com/` (without www or with www, be consistent)
3. Redirect all alternate versions to your preferred domain

---

## Step 10: Add Business Information

1. Go to **Settings** → **Business Information** (if available)
2. Verify your business details:
   - Name: FIVE ST★R Driving School
   - Location: Jeda Plaza, Roysambu, Nairobi
   - Phone: +254794478773
   - Services: Driving Training, NTSA Certification

---

## Optimization Tips for Google Search Console

### Improve Search Performance
1. **Fix crawl errors**: Address any 404s or blocked resources
2. **Add internal links**: Link related pages together
3. **Optimize for mobile**: Ensure all pages pass mobile-friendly test
4. **Improve page speed**: Target Core Web Vitals optimization
5. **Create better content**: Longer, more comprehensive pages rank better

### Monitor These Reports
1. **Search Results**: See which queries show your site
2. **Page Experience**: Check Core Web Vitals status
3. **Links**: Identify who links to you (backlink opportunities)
4. **Removals**: Monitor for any content removal requests

---

## Step 11: Link Google Business Profile

1. Create/verify Google Business Profile (formerly Google My Business)
   - Go to [Google Business Profile](https://www.google.com/business/)
   - Create 15+ locations (one for each branch)
   - Verify each location with postcard or phone code

2. In Google Search Console:
   - Link your Business Profile to your website
   - Helps with local search visibility

---

## Ongoing Monitoring Checklist

### Weekly
- [ ] Check for new crawl errors (Google Search Console → Coverage)
- [ ] Review new search queries (Performance report)
- [ ] Check mobile usability issues

### Monthly  
- [ ] Analyze keyword rankings (top 20 queries)
- [ ] Review Core Web Vitals (target: Good for all 3 metrics)
- [ ] Check indexing rate
- [ ] Review traffic sources (Analytics)
- [ ] Look for new backlink opportunities

### Quarterly
- [ ] Full SEO audit using Lighthouse
- [ ] Analyze competitor keywords
- [ ] Review schema markup implementation
- [ ] Check for ranking improvements

---

## Core Web Vitals Target Metrics

Your website should achieve:

| Metric | Target |
|--------|--------|
| Largest Contentful Paint (LCP) | < 2.5 seconds |
| First Input Delay (FID) | < 100 milliseconds |
| Cumulative Layout Shift (CLS) | < 0.1 |

**Current Status** (from SEO report):
- LCP: 4.4s (Mobile) → Needs improvement
- FID: 0.28s → Good
- CLS: 0 → Excellent

---

## Common Issues & Solutions

### Issue: "Robots.txt blocked content"
**Solution**: Ensure robots.txt allows important pages (already done ✅)

### Issue: "Mobile usability problems"
**Solution**: Test with mobile-friendly tool and fix issues

### Issue: "Pages not indexed"
**Solution**: 
1. Submit sitemap again
2. Request indexing manually
3. Check for noindex meta tags (none present ✅)

### Issue: "Crawl errors"
**Solution**: Monitor Coverage report and fix 404s

### Issue: "Mobile page speed low"
**Solution**: Reduce unused JavaScript, optimize images

---

## Advanced: Link Your Social Media

In Google Search Console Settings:
1. Add your social media profiles:
   - Facebook page URL
   - Twitter/X profile URL
   - Instagram profile URL
   - LinkedIn profile URL
   - YouTube channel URL

This helps Google understand your brand presence.

---

## Advanced: Implement AMP (Optional)

If you want to implement Accelerated Mobile Pages:
1. Create AMP versions of key pages
2. Add AMP canonical links
3. Monitor in Search Console → Enhancements → AMP

Current Status: Not implemented (not required for driving school site)

---

## Troubleshooting: Why Your Site Isn't Appearing in Google

| Problem | Cause | Solution |
|---------|-------|----------|
| Domain not verified | Domain ownership not confirmed | Verify with one of 3 methods above |
| Robots.txt blocks all | robots.txt disallows crawling | Review robots.txt (already correct ✅) |
| Noindex tag present | noindex meta tag blocking indexing | Check layout.tsx (already removed ✅) |
| Sitemap not submitted | Sitemap not registered in GSC | Submit in Sitemaps section |
| Pages too new | Brand new site needs time | Wait 2-4 weeks after verification |
| Duplicate content | Multiple versions of same page | Set preferred domain (with/without www) |
| Too many redirects | Redirect chains causing issues | Minimize redirects |

---

## Resources & Documentation

### Official Google Resources
- [Google Search Console Help](https://support.google.com/webmasters)
- [Core Web Vitals Guide](https://web.dev/core-web-vitals/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [PageSpeed Insights](https://pagespeed.web.dev)

### Local SEO Resources (Kenya-specific)
- Set up Google My Business for Kenya
- Add business to Kenya directories
- Verify NTSA certification details
- Register with Kenya Chamber of Commerce

---

## Expected Timeline

| Timeline | Expected Outcome |
|----------|------------------|
| Day 1 | Domain verification complete |
| Day 2-3 | Sitemap indexed |
| Week 1 | First crawl of website |
| Week 2-4 | Pages start appearing in search results |
| Month 2-3 | Rankings begin to stabilize |
| Month 3-6 | Significant ranking improvements |

---

## Success Criteria

After 2-3 months, you should see:
- ✅ All 4 pages indexed in Google
- ✅ Website appears for brand search ("five star driving")
- ✅ Website appears for at least 10 relevant keywords
- ✅ 50+ monthly organic search visits
- ✅ Zero crawl errors in Search Console
- ✅ Mobile-friendly status: "Passed"

---

## Action Items for Today

1. [ ] Create/verify Google Search Console account
2. [ ] Verify domain ownership
3. [ ] Submit sitemap.xml
4. [ ] Submit robots.txt for testing
5. [ ] Request indexing for 4 main pages
6. [ ] Check Google Business Profile setup
7. [ ] Set up Analytics integration
8. [ ] Bookmark Google Search Console for daily use

---

## Notes

- **Verification completed**: ✅ (in this project)
- **Sitemap created**: ✅ (public/sitemap.xml)
- **robots.txt created**: ✅ (public/robots.txt)
- **Schema markup added**: ✅ (app/layout.tsx)
- **Google Business Profile**: ⏳ (Create manually for each branch)
- **Backlink strategy**: ⏳ (To be implemented)

---

**Last Updated**: July 28, 2025  
**Status**: Ready for submission  
**Next Step**: Verify domain in Google Search Console
