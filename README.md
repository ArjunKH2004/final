# StreamSift

A modern, real-time audience analytics platform for streamers and content creators built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎯 **Instant Clarity** - Real-time insights into what your audience loves
- ⚡ **Boost Engagement** - AI-powered suggestions to keep viewers hooked
- 📡 **Audience Radar** - Global audience analytics across platforms
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📱 **Responsive** - Works perfectly on all devices
- 🚀 **Performance** - Built with Next.js 14 and optimized for speed

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom gradient themes
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Ready for Vercel, Netlify, or any modern platform

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd streamsift
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
streamsift/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Navigation.tsx     # Header navigation
│   ├── Hero.tsx          # Hero section with animations
│   ├── Features.tsx      # Features showcase
│   └── FloatingIcons.tsx # Animated social icons
├── public/               # Static assets
└── ...config files
```

## Customization

### Colors & Gradients

The app uses a custom color palette defined in `tailwind.config.js`:

- `neon-purple`: #8B5CF6
- `neon-blue`: #3B82F6
- `neon-pink`: #EC4899
- `neon-cyan`: #06B6D4
- `dark-space`: #0F0F23
- `space-purple`: #1E1B4B

### Animations

All animations are built with Framer Motion and include:

- Floating elements
- Gradient text effects
- Hover interactions
- Scroll-triggered animations

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms

The app is a standard Next.js application and can be deployed to:

- Netlify
- Railway
- AWS Amplify
- Any platform supporting Node.js

## License

MIT License - feel free to use this project for your own streaming analytics platform!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
