# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website development project for Chuncool (천년수), a physics educator and technology innovator. The project aims to create a sophisticated, hip, and interactive single-page application (SPA) to be deployed at chuncool.co.kr using Cloudflare Pages.

## Development Environment

Since this is currently a planning phase repository with no actual codebase yet, the following structure is planned:

### Tech Stack
- **Frontend**: HTML5, CSS3 (Grid/Flexbox), Vanilla JavaScript
- **Deployment**: Cloudflare Pages with custom domain (chuncool.co.kr)
- **Design System**: Dark mode, glassmorphism effects, neon accents
- **Optional Libraries**: AOS (Animate On Scroll), Particles.js, Three.js

### Project Structure (Planned)
```
/
├── index.html          # Main HTML file
├── css/
│   ├── main.css       # Main stylesheet
│   └── animations.css # Animation definitions
├── js/
│   ├── main.js        # Core JavaScript
│   └── animations.js  # Animation logic
├── assets/
│   ├── images/        # Optimized images (WebP)
│   └── icons/         # SVG icons
└── docs/              # Development documentation
```

## Development Commands

Since no package.json or build system exists yet, standard commands will be:

```bash
# Start local development server (when implemented)
npx serve .  # or python -m http.server

# Image optimization (manual process)
# Convert images to WebP format for performance

# Deployment to Cloudflare Pages
# Will be handled through Cloudflare dashboard or CLI
```

## Key Design Requirements

### Visual Design
- **Primary Colors**: Neon cyan (#00f5ff), Violet (#8b5cf6), Amber (#f59e0b)
- **Background**: Dark navy (#0f0f23), Midnight (#1a1a2e)
- **Effects**: Glassmorphism, gradient backgrounds, neon accents
- **Typography**: Sans-serif fonts with bold headings

### Performance Targets
- Lighthouse score: 95+
- First Contentful Paint: <1.5s
- Cumulative Layout Shift: <0.1

### Content Sections
1. Hero section with animated background
2. About section with profile information
3. Education & Career timeline (interactive)
4. Skills section with visual representations
5. Contact section with social links

## Development Phases

1. **Basic Structure**: HTML semantic markup, CSS layout, mobile-first responsive
2. **Design Implementation**: Glassmorphism, gradients, typography, color system
3. **Interactions**: Scroll animations, hover effects, smooth transitions
4. **Content**: All sections content, image optimization, SEO, accessibility
5. **Deployment**: Cloudflare Pages setup, domain connection, performance testing

## Profile Information

**Chuncool (천년수)**
- Physics educator with 15+ years experience
- Current: Gyeongju Girls' High School (2024-present)
- Education: Kyungpook National University (Physics Education, 2002-2008), Yeungnam University (AI/BigData, 2021-2024)
- Skills: Physics education, Excel/Google Sheets, Python, Arduino, 3D printing, VibeCoding
- Contact: chuncool@gjgh.hs.kr, Instagram: @chuncool

## Notes for Development

- This project emphasizes modern web technologies without complex frameworks
- Focus on performance optimization and accessibility
- Implement smooth animations and micro-interactions
- Ensure cross-browser compatibility
- Use semantic HTML for better SEO and accessibility