# Dee & Bee Designs — Portfolio Website

A handcrafted portfolio site for custom handbag orders, with a visual CMS for easy updates.

---

## Running Locally

1. Make sure you have [Node.js](https://nodejs.org) installed (version 18 or higher).
2. Open a terminal, navigate to this folder, and run:
   ```
   npm install
   npm run dev
   ```
3. Open your browser to `http://localhost:5173`

---

## Deploying to Netlify

### Step 1 — Build
```
npm run build
```
This creates a `dist/` folder.

### Step 2 — Upload
1. Go to [netlify.com](https://netlify.com) and sign up free
2. Click **Add new site → Deploy manually**
3. Drag the `dist/` folder onto the upload area — you're live!

---

## Setting Up the CMS (one-time setup after deploying)

This gives you a visual editor at yoursite.com/admin to add/edit/delete bags with no code.

### Step 1 — Put your files on GitHub
1. Create a free account at [github.com](https://github.com)
2. Create a new repository called `deeandbee-designs`
3. Upload all your project files there
4. In Netlify: **Site configuration → Build & deploy → Link repository** → connect your GitHub repo

### Step 2 — Enable Netlify Identity
1. Netlify dashboard → **Site configuration → Identity → Enable Identity**
2. Set Registration to **Invite only**
3. Scroll to **Git Gateway → Enable Git Gateway**

### Step 3 — Invite yourself
1. In the Identity section, click **Invite users**
2. Enter your email address and accept the invite email — set your password

### Step 4 — Log in and start editing!
Go to `yoursite.com/admin`, log in, and you'll see your portfolio editor.

---

## How to Add or Edit a Bag (ongoing)

1. Go to `yoursite.com/admin` and log in
2. Click **Portfolio** in the left sidebar
3. Click an existing bag to edit it, or **New Bag** to add one
4. Fill in the name, description, upload a photo, add tags
5. Click **Publish** — your site updates within a minute or two

No code. No rebuilding. Just fill in the form and publish.

---

## Connecting a Custom Domain

Buy a domain from [Namecheap](https://namecheap.com) (~$12/year), then in Netlify:
**Domain management → Add a domain** and follow the wizard.

---

## Changing the Admin Password (for the main site login)

In `src/App.jsx`, find:
```javascript
const ADMIN_PASSWORD = 'deeandbee2024'
```
Change it, save, push to GitHub — Netlify redeploys automatically.

---

## Contact Form Email Notifications

1. Submit a test form on your live site first
2. Netlify dashboard → **Site configuration → Forms → custom-order → Form notifications**
3. Add your email — done!

---

## Tech Stack

- React 18 + Vite + React Router 6
- Netlify CMS (visual portfolio editor)
- Netlify Identity (secure login)
- Netlify Forms (contact form)
- Google Fonts: Pinyon Script + Cormorant Garamond
