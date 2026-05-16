# Fugug Times

A modern, BBC-style news website built with React, TypeScript, and Tailwind CSS.

![Fugug Times](public/images/london.jpg)

## Features

- 📰 **Authentic BBC Design** - Red masthead, serif headlines, proper news layout
- 🔴 **Live Breaking News Ticker** - Rotating headlines
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop
- 🎨 **Complete Pages**:
  - Home with featured stories
  - Article reader
  - About Us
  - Contact (with form)
  - Careers (6 job listings)
  - Advertise (media kit)
  - Legal (Terms, Privacy, Cookies)
  - Live, Watch, Podcasts
- 🔍 **Search Functionality** - Real-time article filtering
- 💾 **Bookmark Articles**
- 📧 **Newsletter Signup**
- ⚡ **Fast** - Vite + React 19

## Tech Stack

- **React 19** - Latest React with TypeScript
- **Vite** - Lightning fast build tool
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

## Getting Started

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

Open http://localhost:5173

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## Project Structure

```
src/
  App.tsx          # Main application (all pages)
  main.tsx         # Entry point
  index.css        # Global styles

public/
  images/          # News images
  favicon.svg      # Site icon
```

## Customization

All content is in `src/App.tsx`:

- **Articles**: Edit the `articles` array (line 25)
- **Breaking news**: Update `breakingNews` array (line 18)
- **Company info**: Search for "Fugug Times Ltd" and update
- **Contact details**: Update in Contact page section
- **Colors**: Main brand color is `#bb1919` (BBC red)

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag 'dist' folder to netlify.com/drop
```

### GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch
```

## License

MIT - Use freely for your projects.

## Credits

Built as a demonstration of modern news website design, inspired by BBC News.

---

**Fugug Times** - Trusted. Independent. Global.
