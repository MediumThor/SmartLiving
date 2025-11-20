# Brian Kendzor - Smart Living Website

A modern React + Vite website for Brian Kendzor's Smart Living platform, rebuilt from the original Wix site.

## Features

- ✅ Modern React + TypeScript + Vite setup
- ✅ Responsive navigation with all pages from original site
- ✅ Contact form with submission handling
- ✅ Clean, modern UI/UX
- ✅ Ready for future login functionality
- ✅ All pages: Welcome, About Me, Sailing, Leadership, Wellness, Connect, Blog, Resources

## Project Structure

```
briankendzor-website/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── ContactForm.tsx
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Sailing.tsx
│   │   ├── Leadership.tsx
│   │   ├── Wellness.tsx
│   │   ├── Connect.tsx
│   │   ├── Blog.tsx
│   │   └── Resources.tsx
│   ├── App.tsx          # Main app with routing
│   └── main.tsx         # Entry point
├── public/              # Static assets
└── package.json
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Form Submission

The contact form is set up to submit to `/api/contact`. You'll need to:

1. Set up a backend API endpoint at `/api/contact` that accepts POST requests
2. Or update the `ContactForm.tsx` to point to your actual API endpoint
3. The form sends: `{ name, email, phone, message }`

## Future Enhancements

- [ ] Add login/authentication functionality
- [ ] Connect contact form to backend API
- [ ] Add blog post management
- [ ] Add image uploads
- [ ] Add survey functionality
- [ ] Add webinar signup integration

## Notes

- Logo image should be placed at `public/logo.png`
- All pages are currently placeholder content - ready to be filled in
- The site is fully responsive and mobile-friendly
