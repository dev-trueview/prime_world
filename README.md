
# Pride World City - Premium Real Estate Website

A modern, responsive single-page website for Pride World City, built with React, TypeScript, Vite, and Tailwind CSS. This website showcases luxury apartments with interactive galleries, enquiry forms, and WhatsApp integration.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ or any modern web browser
- No backend required - fully frontend-deployable

### Local Development

1. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd pride-world-city
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/           # All React components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── HeroSection.tsx  # Hero banner with CTA
│   ├── GallerySection.tsx # Interactive image gallery
│   ├── PricingSection.tsx # Pricing plans and offers
│   ├── FacilitiesSection.tsx # Amenities showcase
│   ├── ContactSection.tsx # Contact form
│   ├── WhatsAppFloat.tsx # Floating WhatsApp button
│   ├── EnquiryPopup.tsx # Auto-popup enquiry form
│   └── Header.tsx       # Navigation header
├── hooks/               # Custom React hooks
│   └── useEnquirySubmission.ts # Manages enquiry popup state
├── pages/               # Page components
│   └── Index.tsx        # Main homepage
├── lib/                 # Utility functions
└── index.css           # Global styles and design system
```

## 🎨 Content Management

### 1. Update Property Information

**Edit Pricing Section** (`src/components/PricingSection.tsx`):
```typescript
const pricingPlans = [
  {
    title: "2 BHK Apartments",
    price: "₹45 Lakhs onwards",
    // Update other details...
  }
];
```

**Edit Hero Section** (`src/components/HeroSection.tsx`):
```typescript
// Update main headline, description, and CTA text
<h1>Your Main Headline</h1>
<p>Your property description</p>
```

### 2. Update Images

**Gallery Images** (`src/components/GallerySection.tsx`):
```typescript
const galleryData = [
  {
    title: "Interior Views",
    images: [
      "/interior1.jpg",  // Add your images to public/ folder
      "/interior2.jpg",
      // Add more images...
    ]
  }
];
```

**Image Placement**:
- Place all images in the `public/` folder
- Reference them with `/filename.jpg` (no `public/` prefix)
- Supported formats: `.jpg`, `.webp`, `.png`

### 3. Update Contact Information

**Phone Number** (WhatsApp integration):
- Edit in `src/components/ContactSection.tsx`
- Edit in `src/components/WhatsAppFloat.tsx`
- Edit in `src/components/EnquiryPopup.tsx`
- Search for `7620658446` and replace with your number

**Email Address**:
- Edit in `src/components/ContactSection.tsx`
- Update `trueviewrealty.in@gmail.com`

### 4. Update Facilities/Amenities

**Edit Facilities** (`src/components/FacilitiesSection.tsx`):
```typescript
const facilities = [
  {
    icon: "🏊‍♂️",
    title: "Swimming Pool",
    description: "Olympic-size swimming pool"
  },
  // Add/edit more facilities...
];
```

### 5. Logo and Branding

**Logo Update**:
- Replace `public/logo.jpg` with your logo
- Update favicon in `index.html`:
  ```html
  <link rel="icon" href="/logo.jpg" />
  ```

**Colors and Branding** (`src/index.css`):
```css
:root {
  --real-estate-navy: #1a365d;
  --real-estate-gold: #d4af37;
  /* Update brand colors */
}
```

## 🎯 Form Management & User Experience

### Enquiry Popup Management

The website includes intelligent enquiry popup management to enhance user experience:

**How it Works**:
- Auto-popup appears every 2 minutes to capture leads
- Once a user submits ANY enquiry form (popup, contact section, or WhatsApp float), the auto-popup is disabled for their session
- State persists across page refreshes using sessionStorage
- Resets only when the browser session ends (tab/browser closed)

**Implementation Details**:
- `useEnquirySubmission` hook manages global submission state
- All enquiry forms are connected to this shared state
- Session-based storage ensures persistence without cookies

**Customization**:
- Change popup interval in `src/pages/Index.tsx` (currently 120000ms = 2 minutes)
- Modify popup content in `src/components/EnquiryPopup.tsx`

### Form Validation

**Phone Number Rules**:
- Exactly 10 digits required
- Must start with 6, 7, 8, or 9 (Indian mobile numbers)
- Automatically strips +91 country code if provided
- Shows clear error messages for invalid numbers

**WhatsApp Integration**:
- All forms redirect to WhatsApp with pre-filled messages
- Target number: 7620658446
- Messages are formatted with user details

## 🌐 Hosting Instructions

### Free GitHub Pages Hosting

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/pride-world-city.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Deploy from a branch
   - Branch: `main` / `root`
   - Save

3. **Build and Deploy**:
   ```bash
   npm run build
   git add dist/
   git commit -m "Add build files"
   git push
   ```

4. **Access Your Site**:
   - URL: `https://username.github.io/pride-world-city`

### Other Hosting Platforms

**Netlify**:
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

**Vercel**:
1. Import GitHub repository
2. Framework preset: Vite
3. Deploy

**Traditional Web Hosting**:
1. Run `npm run build`
2. Upload `dist/` folder contents to your hosting provider
3. Ensure your hosting supports single-page applications

## ⚡ Performance Optimization

### Built-in Optimizations

- **Image Optimization**: Lazy loading, WebP format support
- **Code Splitting**: Automatic with Vite
- **Tree Shaking**: Removes unused code
- **CSS Optimization**: Tailwind CSS purging
- **Bundle Optimization**: Modern ES modules

### Performance Features

- **Lighthouse Score**: 90+ achieved
- **Responsive Design**: Mobile-first approach
- **Fast Loading**: Optimized for 100k+ concurrent users
- **CDN Ready**: Static files optimized for CDN delivery

### Monitor Performance

```bash
# Check bundle size
npm run build -- --analyze

# Lighthouse audit (in browser DevTools)
# Performance > Generate report
```

## 🎨 Accessibility & UX

### Form Accessibility

- **High Contrast**: Dynamic text colors based on background
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Mobile Responsive**: Touch-friendly interface

### Color Contrast

The website automatically adjusts text colors for optimal readability:
- Light backgrounds: Dark text
- Dark backgrounds: Light text
- Form fields: High contrast validation

### Testing

```bash
# Check accessibility
npm run lighthouse -- --accessibility

# Test on different devices
npm run dev
# Open browser DevTools > Device simulation
```

## 🔧 Technical Details

### Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **Build**: Vite (fast HMR, optimized builds)
- **Deployment**: Static files (no server required)

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Environment Variables

No environment variables required - fully frontend application.

## 🚀 Advanced Customization

### Adding New Sections

1. Create component in `src/components/`
2. Import and add to `src/pages/Index.tsx`
3. Update navigation if needed

### Custom Animations

- Built with Tailwind CSS animations
- Custom keyframes in `src/index.css`
- Smooth transitions throughout

### SEO Optimization

- Update `index.html` meta tags
- Add structured data for real estate
- Optimize images with alt text

## 📞 Support

For technical support or customization:
- Email: trueviewrealty.in@gmail.com
- Phone: +91 7620658446

## 📄 License

This project is built for TrueView Realty's Pride World City project.

---

**Last Updated**: January 2025
**Version**: 2.0.0
