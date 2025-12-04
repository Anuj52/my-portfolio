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

## 📂 Project Structure

```
src/
├── components/   # Reusable UI components (Header, Footer, ContactForm, etc.)
├── assets/       # Static assets (images, icons)
├── App.tsx       # Main application component
├── main.tsx      # Entry point
└── index.css     # Global styles and Tailwind directives
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).