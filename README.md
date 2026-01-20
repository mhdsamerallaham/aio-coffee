# AIO Coffee - Modern Coffee Brand Website

A premium, minimal single-page website for AIO coffee brand with the slogan "All in One — Coffee as a Ritual".

## 🎨 Design Philosophy

- **Brand Colors**: Deep burgundy/wine red inspired by dark coffee
- **Accent Colors**: Soft off-white/cream and light gray
- **Feeling**: Premium, calm, ritualistic, minimal
- **Typography**: Elegant serif fonts for a sophisticated feel

## 🛠 Tech Stack

- **React 19** with functional components
- **Vite** for fast development and building
- **Plain CSS** with CSS variables for theming
- **No UI frameworks** - completely custom design
- **Fully responsive** design

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx & Header.css      # Sticky navigation
│   ├── Hero.jsx & Hero.css          # Video background hero
│   ├── About.jsx & About.css        # Two-column about section
│   ├── Products.jsx & Products.css  # Product grid
│   ├── Location.jsx & Location.css  # Google Maps integration
│   └── Footer.jsx & Footer.css      # Minimal footer
├── assets/
│   ├── images/
│   │   ├── about.jpg               # About section image
│   │   ├── product-1.jpg           # Filter Coffee
│   │   ├── product-2.jpg           # Ice Latte
│   │   └── product-3.jpg           # Espresso
│   └── videos/
│       └── hero.mp4                # Hero background video
├── App.jsx & App.css                # Main app component
└── index.css                        # Global styles & CSS variables
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📸 Assets

The website now includes actual media assets:

### ✅ Currently Installed
- **about.jpg** - Beautiful coffee shop image from Pexels (photo by tonderue)
- **hero.mp4** - Background video for hero section

### 📷 Still Needed (Optional)
Add to `src/assets/images/`:
- `product-1.jpg` - Filter Coffee presentation
- `product-2.jpg` - Ice Latte presentation  
- `product-3.jpg` - Espresso presentation

**Note**: The Products section currently uses elegant gradient placeholders. Uncomment the relevant CSS sections in `Products.css` to use actual product images.

## 🎯 Key Features

### Header
- Sticky navigation with scroll effects
- Transparent background → burgundy on scroll
- Smooth scroll navigation to sections

### Hero Section
- Full viewport height
- Video background with dark burgundy overlay
- Fade-in animations for content
- No call-to-action buttons (minimal design)

### About Section
- Two-column layout (image + text)
- Emotional, ritual-focused brand story
- Responsive stacking on mobile

### Products Section
- Grid layout with hover animations
- Product cards with images and descriptions
- Subtle hover effects and transitions

### Location Section
- Embedded Google Maps iframe
- Contact information
- Rounded corners and responsive design

### Footer
- Brand information and slogan
- Contact details
- Social media icons
- Minimal, elegant design

## 🎨 CSS Variables

The design uses CSS variables for consistent theming:

```css
:root {
  --burgundy: #6b0f1a;
  --burgundy-dark: #4a0b12;
  --burgundy-light: #8a1e2a;
  --cream: #f5f1ee;
  --soft-gray: #d8d3cf;
  --text-light: #f5f1ee;
  --text-muted: #d8d3cf;
}
```

## 📱 Responsive Design

- **Desktop**: Full layouts with proper spacing
- **Tablet**: Adjusted grids and typography
- **Mobile**: Stacked layouts, optimized touch targets

## ♿ Accessibility

- Semantic HTML5 structure
- Focus indicators for keyboard navigation
- Reduced motion support
- Proper ARIA labels where needed

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design works on all screen sizes
- Smooth scrolling with fallback support
