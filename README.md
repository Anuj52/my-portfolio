# Portfolio Website

A modern, responsive portfolio website built with **React**, **TypeScript**, and **Tailwind CSS**, powered by **Vite**. This project showcases my skills, projects, and experience in a visually appealing and interactive way.

## 🚀 Features

-   **Modern UI/UX**: Clean and professional design using Tailwind CSS.
-   **Responsive Design**: Fully optimized for all devices (mobile, tablet, desktop).
-   **Interactive Elements**: Smooth animations and transitions powered by Framer Motion.
-   **Contact Form**: Functional contact form integrated with EmailJS.
-   **Project Showcase**: Dedicated section to display projects with links to live demos and repositories.
-   **Fast Performance**: Optimized build using Vite.

## 🛠️ Tech Stack

-   **Frontend Framework**: [React](https://reactjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/) / [React Icons](https://react-icons.github.io/react-icons/)

## 📦 Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory and add your EmailJS credentials (if using EmailJS):

    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```

4.  **Start the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

## scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the app for production.
-   `npm run preview`: Previews the production build locally.
-   `npm run lint`: Runs ESLint to check for code quality issues.
-   `npm run tokens`: Regenerates the design exports in `design/` from the tokens and checks every colour pair.
-   `npm run tokens:check`: Same check without writing; fails on a low-contrast pair, a missing token or a stale export.

## 🎨 Design System

The look is defined once, in [`src/styles/tokens.css`](src/styles/tokens.css): colour, spacing (8px grid), radius and type scale. Components use token-backed utilities (`bg-surface`, `text-fg`, `border-line`, `text-h2`, ...) instead of hard-coded colours; the only literals left are black shadows and alpha masks.

| Palette | `data-theme` | Character |
| --- | --- | --- |
| **Slate & Muted Indigo** (default) | none | Charcoal `#0B0E14`, indigo `#6366F1` identity accent, cyan `#38BDF8` actions |
| Warm Carbon & Amber | `carbon-amber` | Coffee-brown `#121110`, amber `#E5A93C`, parchment text |
| Nordic Zinc & Arctic Ice | `nordic-zinc` | Near-black `#09090B`, monochrome with one cyan accent |

Try another palette by setting `<html data-theme="carbon-amber">` in `index.html`.

**Colour roles.** Indigo means *identity* (icons, section numbers, tags, hover tints). Cyan means *action* (buttons, focus ring, progress bar). Small indigo text uses `text-accent-text`, because plain `#6366F1` is only 4.3:1 on the page background. Never put small text on an indigo fill: neither white (4.47:1) nor dark ink (4.32:1) reaches 4.5:1. Form inputs use the stronger `border-line-strong` outline so they meet the 3:1 rule for UI controls.

**Accessibility is enforced, not just documented.** `npm run tokens:check` parses the tokens file and tests every text and UI colour pair of every palette against WCAG 2.2 (4.5:1 for text, 3:1 for UI parts). The latest results are in [`design/contrast-report.md`](design/contrast-report.md).

**Design assets** (generated, do not edit by hand): [`design/tokens.json`](design/tokens.json) (W3C design-tokens format, for Figma or Style Dictionary) and one SVG swatch sheet per palette in [`design/swatches/`](design/swatches). The social card `public/og-image.png` is rendered from [`design/og-image.html`](design/og-image.html).

## 📂 Project Structure

```
src/
├── components/   # Reusable UI components (Header, Footer, ContactForm, etc.)
├── styles/       # tokens.css: colour palettes, spacing, radius, type scale
├── assets/       # Static assets (images, icons)
├── App.tsx       # Main application component
├── main.tsx      # Entry point
└── index.css     # Global styles, Tailwind directives and shared component classes
design/           # Generated token exports, swatches, contrast report, OG card source
scripts/          # design-tokens.mjs: token exporter and WCAG contrast checker
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).