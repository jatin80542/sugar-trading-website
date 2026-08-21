# Deploy — from this zip to a live website

Follow these parts in order. Every command is copy-paste ready.
After each step there is an **Expected** line — if what you see does not match,
stop and check the Troubleshooting table at the bottom before continuing.

Total time: about 45 minutes, most of it waiting for installs.

---

# PART 0 — Check your machine is ready

You need Node.js version 18.18 or higher.

**Mac (Terminal):**

```bash
node -v && npm -v
```

**Windows (PowerShell):**

```powershell
node -v; npm -v
```

**Expected:** something like `v22.11.0` and `10.9.0`.

If you get `command not found` or a version below 18.18, install Node from
<https://nodejs.org> — download the **LTS** version, run the installer, then
**close and reopen your terminal** and run the check again.

---

# PART 1 — Run it on your own machine first

Never deploy something you have not seen working locally.

**Step 1.1** — unzip the folder and go into it.

Mac:

```bash
cd ~/Downloads/meridian-cane-sugar-website
```

Windows:

```powershell
cd $HOME\Downloads\meridian-cane-sugar-website
```

Check you are in the right place:

```bash
ls package.json
```

(Windows: `dir package.json`)

**Expected:** it prints `package.json`. If it says "No such file", you are in the
wrong folder — unzip it again and `cd` into the folder that directly contains
`package.json`.

**Step 1.2** — install dependencies.

```bash
npm install
```

**Expected:** `added 340 packages` (the number may differ slightly). Yellow
warnings are normal. Red `ERR!` lines are not.

**Step 1.3** — start the site.

```bash
npm run dev
```

**Expected:**

```
▲ Next.js 15.5.23
- Local:  http://localhost:3000
✓ Ready in 1.2s
```

Open <http://localhost:3000> in your browser. Click through all five nav items.

**Step 1.4** — stop the server with `Ctrl + C` when you are done looking.

---

# PART 2 — Put your real business details in

All six items live in **one file**: `lib/company.ts`.

Open it in VS Code:

```bash
code lib/company.ts
```

(If `code` is not recognised, just open the file from the VS Code File menu.)

Search the file for `⚠ REPLACE BEFORE LAUNCH`. Change these:

| Line | Change it to |
|---|---|
| `name` | Your trading name, e.g. `"Gupta Commodities"` |
| `legalName` | Your registered company name in full |
| `siteUrl` | Your real domain, e.g. `"https://www.yourcompany.com"` — **no trailing slash** |
| `domain` | Same domain without `https://` |
| `contact.tradeDeskEmail` | Your real trade desk mailbox |
| `contact.complianceEmail` | Your real compliance mailbox |
| `contact.phoneDisplay` | e.g. `"+91 161 4000 000"` |
| `contact.phoneHref` | Same number, digits only with country code: `"+911614000000"` |
| `contact.whatsappDisplay` | Your WhatsApp business number |
| `offices` | Your real address lines |
| `registrations` | Your CIN, GSTIN, IEC — leave any blank and the footer just skips it |

**`siteUrl` matters more than it looks.** It generates your `sitemap.xml`, every
canonical URL and all social share previews. A wrong value here quietly damages
your SEO from day one.

**Leave `certifications: []` empty** unless you actually hold the certificate.
Your own Trade Compliance page tells buyers to distrust suppliers who claim
credentials without documents — do not contradict it on your own site.

**Step 2.1** — verify your changes render.

```bash
npm run dev
```

Open <http://localhost:3000/contact> and check your real email and phone appear.
Stop with `Ctrl + C`.

**Step 2.2** — confirm nothing is left as placeholder.

Mac:

```bash
grep -rn "XXXX\|\.example\|REPLACE BEFORE" lib/company.ts
```

Windows:

```powershell
Select-String -Path lib\company.ts -Pattern "XXXX|\.example|REPLACE BEFORE"
```

**Expected:** no output at all. Any line that prints is still a placeholder.

---

# PART 3 — Connect the enquiry form

Right now the form politely tells visitors the inbox is not connected. Fix that
before launch, or every enquiry is lost.

**The easiest route: a free Formspree-style webhook via Zapier or Make.**
If you already use n8n or have your own API, point it there instead.

**Step 3.1** — get a webhook URL.

1. Sign up free at <https://zapier.com>
2. Create a Zap → Trigger: **Webhooks by Zapier** → **Catch Hook**
3. Copy the URL it gives you (looks like `https://hooks.zapier.com/hooks/catch/123456/abcdef`)
4. Action: **Email by Zapier** → send to your trade desk mailbox

**Step 3.2** — create your local environment file.

Mac:

```bash
cp .env.example .env.local
```

Windows:

```powershell
Copy-Item .env.example .env.local
```

**Step 3.3** — open `.env.local` and add your URL. Remove the `#` from the start
of the line:

```
ENQUIRY_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/123456/abcdef
```

**Step 3.4** — restart and test properly.

```bash
npm run dev
```

In a **second** terminal window, run:

```bash
curl -s -X POST http://localhost:3000/api/enquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Buyer","company":"Test Foods Ltd","email":"buyer@testfoods.com","product":"icumsa-45","requirement":"Testing the enquiry endpoint before going live."}' \
  -w "\nstatus=%{http_code}\n"
```

Windows PowerShell:

```powershell
curl.exe -s -X POST http://localhost:3000/api/enquiry -H "Content-Type: application/json" -d '{\"name\":\"Test Buyer\",\"company\":\"Test Foods Ltd\",\"email\":\"buyer@testfoods.com\",\"product\":\"icumsa-45\",\"requirement\":\"Testing the enquiry endpoint before going live.\"}' -w "`nstatus=%{http_code}`n"
```

**Expected:** `{"ok":true,"reference":"MC-20260821-A1B2"}` and `status=200`.
Then check Zapier actually received it.

If you get `status=503` — `.env.local` is missing, misspelled, or you did not
restart the server after editing it.

**Note:** `.env.local` is deliberately never uploaded to GitHub. You will add the
same value to Vercel separately in Part 6.

---

# PART 4 — Confirm the production build works

This is the exact build Vercel will run. If it fails here, it fails there.

```bash
npm run build
```

**Expected:** `✓ Compiled successfully` followed by a table of 18 routes ending
in `└ ○ /trade-compliance-fraud-prevention`.

If you see `Failed to compile`, do not proceed. Read the error — it names the
file and line.

---

# PART 5 — Put the code on GitHub

Vercel deploys from GitHub, and this also gives you a backup and version history.

**Step 5.1** — check Git is installed.

```bash
git --version
```

If not found, install from <https://git-scm.com>.

**Step 5.2** — create the repository on GitHub.

1. Go to <https://github.com/new>
2. Repository name: `sugar-trading-website`
3. Set it to **Private**
4. Do **not** tick "Add a README", "Add .gitignore" or "Choose a license" — the
   project already has these and ticking them causes a merge conflict
5. Click **Create repository**

**Step 5.3** — connect and push. Run these from inside the project folder,
replacing `jatin80542` if you use a different account:

```bash
git init
git add .
git commit -m "Sugar trading website — initial version"
git branch -M main
git remote add origin https://github.com/jatin80542/sugar-trading-website.git
git push -u origin main
```

**Expected:** a list of files, then `Writing objects: 100%` and
`branch 'main' set up to track 'origin/main'`.

If it asks for a password, GitHub no longer accepts account passwords. Create a
token at <https://github.com/settings/tokens> → **Generate new token (classic)**
→ tick the `repo` scope → paste the token as the password.

**Step 5.4** — the critical check. Go to your repository page on GitHub and
confirm:

- [ ] `.env.local` is **NOT** listed (it must never be there)
- [ ] `node_modules` is **NOT** listed
- [ ] `app`, `components`, `lib`, `styles`, `public` all are listed

If `.env.local` appears, delete the repository, confirm `.gitignore` exists in
your folder, and start Step 5.3 again.

---

# PART 6 — Deploy to Vercel

**Step 6.1** — sign up at <https://vercel.com/signup>. Choose **Continue with
GitHub**. This links the two accounts automatically.

**Step 6.2** — on the Vercel dashboard click **Add New → Project**.

**Step 6.3** — find `sugar-trading-website` in the list and click **Import**.
If it is not listed, click **Adjust GitHub App Permissions** and grant access to
that repository.

**Step 6.4** — the configuration screen. Vercel detects Next.js automatically:

- Framework Preset: **Next.js** (leave it)
- Root Directory: `./` (leave it)
- Build Command, Output Directory, Install Command: **leave all three untouched**

**Step 6.5** — before clicking Deploy, expand **Environment Variables** and add:

| Name | Value |
|---|---|
| `ENQUIRY_WEBHOOK_URL` | your Zapier URL from Part 3 |

Click **Add**.

**Step 6.6** — click **Deploy**.

**Expected:** 2–4 minutes of build logs, then a confetti screen and a URL like
`https://sugar-trading-website.vercel.app`.

**Step 6.7** — click the URL. Your site is live on the internet.

### Alternative: deploy from the terminal instead

If you prefer the CLI:

```bash
npm install -g vercel
vercel login
vercel
```

Answer the prompts (accept every default), then publish to production:

```bash
vercel --prod
```

Environment variables still have to be added in the dashboard afterwards, so the
GitHub route above is generally less work.

---

# PART 7 — Point your own domain at it

**Step 7.1** — buy a domain if you have not. GoDaddy, Namecheap and Hostinger
all work. Match it to your company name.

**Step 7.2** — in Vercel: your project → **Settings** → **Domains** → type your
domain (e.g. `meridiancane.com`) → **Add**.

**Step 7.3** — Vercel shows you the DNS records to create. Log in to wherever you
bought the domain, find **DNS Management**, and add exactly what Vercel shows.
It is normally:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

**Use the values on your Vercel screen, not the ones above** — they can change.

**Step 7.4** — wait. DNS takes 10 minutes to 48 hours, usually under an hour.
Vercel's Domains page shows **Valid Configuration** with a green tick when ready,
and issues the HTTPS certificate automatically. You do not buy or install SSL.

**Step 7.5** — once live, go back and make sure `siteUrl` in `lib/company.ts`
matches your real domain exactly. If you changed it, push the update:

```bash
git add lib/company.ts
git commit -m "Set production domain"
git push
```

Vercel redeploys automatically within about two minutes.

---

# PART 8 — Verify the live site

Replace `yourcompany.com` with your real domain in each command.

**Step 8.1** — every page loads.

```bash
for p in / /products /products/icumsa-45 /products/icumsa-150 /products/vhp-raw-sugar /products/vvhp-raw-sugar /products/beet-sugar /brazilian-sugar-supply-program /trade-compliance-fraud-prevention /contact /privacy-policy /terms /sitemap.xml /robots.txt; do
  printf "%-40s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' https://yourcompany.com$p)"
done
```

**Expected:** `200` on every line.

**Step 8.2** — HTTPS is working. Look for the padlock in your browser address bar.

**Step 8.3** — the form works live. Fill in the form on your real site with your
own details and click send.

**Expected:** a success panel with a reference number, and the email arriving in
your trade desk mailbox within a minute. **If this does not work, nothing else
matters** — it is the only conversion path on the site.

**Step 8.4** — run through `QA-CHECKLIST.md` on the live site, especially the
responsive section on a real phone.

**Step 8.5** — submit to Google.

1. Go to <https://search.google.com/search-console>
2. Add your domain as a property and verify it (Vercel-hosted domains verify via
   a DNS TXT record you add the same way as Part 7)
3. Go to **Sitemaps** and submit: `sitemap.xml`

Indexing takes a few days to a few weeks. This is normal.

---

# PART 9 — Making changes after launch

You never need to redeploy manually again. Edit, then:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

Vercel rebuilds and publishes within about two minutes. Watch progress under
**Deployments** in the dashboard.

**Always run `npm run build` locally before pushing.** If it fails on your
machine it will fail on Vercel, and a failed build leaves the previous version
live — which is safe, but confusing if you do not know why nothing changed.

**Rolling back:** dashboard → **Deployments** → find the last good one → the
`...` menu → **Promote to Production**. Takes seconds.

---

# PART 10 — Troubleshooting

| What you see | What it means | Fix |
|---|---|---|
| `command not found: node` | Node is not installed or terminal not restarted | Install from nodejs.org, close and reopen terminal |
| `Cannot read properties of undefined (reading 'fileExists')` | A `next.config.ts` file exists | Must be `next.config.mjs` — the project already ships correctly |
| `TypeScript 7.0.2 is not supported` | npm pulled TypeScript 7 | `npm install -D typescript@5.9.3` then rebuild |
| Build works locally, fails on Vercel | Usually a missing environment variable | Settings → Environment Variables, add it, then **Redeploy** |
| Form returns `status=503` live | `ENQUIRY_WEBHOOK_URL` not set on Vercel | Add it in Settings, then Redeploy — env changes need a rebuild |
| Domain shows "Invalid Configuration" | DNS not propagated or records wrong | Wait an hour, re-check the records match Vercel exactly |
| Site loads but has no styling | Build partially failed | Check Vercel build logs for the first red error |
| `remote: Permission denied` on push | Wrong GitHub credentials | Use a personal access token as the password |
| Old content still showing | Browser cache | Hard refresh: `Cmd+Shift+R` (Mac) / `Ctrl+F5` (Windows) |

---

# Launch checklist

Print this. Do not skip items.

- [ ] All six placeholders in `lib/company.ts` replaced
- [ ] `siteUrl` set to the real domain, no trailing slash
- [ ] `grep` for placeholders returns nothing
- [ ] Privacy Policy and Terms reviewed by a lawyer, warning banners removed
- [ ] `npm run build` passes locally
- [ ] `.env.local` confirmed absent from GitHub
- [ ] Enquiry form tested end to end **on the live domain**
- [ ] All 14 URLs return 200 on the live domain
- [ ] Site checked on a real phone
- [ ] HTTPS padlock showing
- [ ] Sitemap submitted to Google Search Console
- [ ] No certification, volume or capability claimed that you cannot document
