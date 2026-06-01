#!/bin/bash
# DNS Security Audit Script
# Run this whenever you remove a Vercel deployment or branch
# Lists all CNAMEs pointing to vercel.app and checks if they're claimed

set -e

DOMAIN="fivestardrivingschools.com"

echo "=== DNS Security Audit for $DOMAIN ==="
echo ""

# Check main domain
echo "📌 Main Domain:"
dig +short "$DOMAIN" CNAME A

echo ""
echo "📌 WWW Subdomain:"
dig +short "www.$DOMAIN" CNAME A

echo ""
echo "=== Checking Common Subdomains ==="
echo ""

SUBDOMAINS=("staging" "dev" "preview" "api" "admin" "blog" "mail" "ftp")

for sub in "${SUBDOMAINS[@]}"; do
  result=$(dig +short "$sub.$DOMAIN" CNAME 2>/dev/null || true)
  if [ -n "$result" ]; then
    if [[ $result == *"vercel.app"* ]] || [[ $result == *"vercel-dns.com"* ]]; then
      echo "⚠️  WARN: $sub.$DOMAIN → $result"
      echo "   Action: Verify this deployment is still active in Vercel"
    else
      echo "✅ $sub.$DOMAIN → $result"
    fi
  fi
done

echo ""
echo "=== Email Security (SPF/DKIM/DMARC) ==="
echo ""

echo "SPF Records for $DOMAIN:"
dig +short "$DOMAIN" TXT | grep "v=spf1" || echo "No SPF record found"

echo ""
echo "DMARC Policy for $DOMAIN:"
dig +short "_dmarc.$DOMAIN" TXT | grep "v=DMARC1" || echo "No DMARC record found"

echo ""
echo "=== Audit Complete ==="
echo "If any 'WARN' entries exist, review them in your Vercel project settings"
echo "Consider adding SPF and DMARC records if not present"
