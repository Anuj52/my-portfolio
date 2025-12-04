# Deploying to Vercel Securely

This guide explains how to upload your project to GitHub and deploy it to Vercel while keeping your private information secure.

## 1. Prerequisites

-   A [GitHub account](https://github.com/signup).
-   A [Vercel account](https://vercel.com/signup).
-   [Git installed](https://git-scm.com/downloads) on your computer.

## 2. Upload to GitHub

Before deploying to Vercel, you need to put your code on GitHub.

1.  **Initialize Git**:
    Open your terminal in the project folder and run:
    ```bash
    git init
    ```

2.  **Add Files**:
    Stage all your files for the first commit:
    ```bash
    git add .
    ```

3.  **Commit Changes**:
    Save your changes with a message:
    ```bash
    git commit -m "Initial commit"
    ```

4.  **Create a Repository on GitHub**:
    -   Go to [github.com/new](https://github.com/new).
    -   Enter a **Repository name** (e.g., `my-portfolio`).
    -   Choose **Public** or **Private**.
    -   Click **Create repository**.

5.  **Connect and Push**:
    Copy the commands under "…or push an existing repository from the command line" and run them in your terminal. They will look like this:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git branch -M main
    git push -u origin main
    ```

## 3. Security Check

Before deploying, ensure that your sensitive information is **NOT** in your code.

-   **Check `.gitignore`**: Ensure `.env` and `.env.local` are listed in your `.gitignore` file. This prevents your secrets from being uploaded to GitHub.
-   **Check Code**: Ensure you are using `import.meta.env.VITE_YOUR_VARIABLE` instead of hardcoding values.

## 4. Deployment Steps

1.  **Log in to Vercel**: Go to [vercel.com](https://vercel.com) and log in.
2.  **Add New Project**: Click "Add New..." -> "Project".
3.  **Import Repository**: Find your portfolio repository and click "Import".
4.  **Configure Project**:
    -   **Framework Preset**: Vercel should automatically detect "Vite".
    -   **Root Directory**: Leave as `./` (unless your app is in a subdirectory).
    -   **Environment Variables**: **This is the important part for security.**
        -   Expand the "Environment Variables" section.
        -   Add your secrets here (e.g., `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, etc.).
        -   **Name**: The name of the variable (e.g., `VITE_EMAILJS_PUBLIC_KEY`).
        -   **Value**: The actual secret key.
        -   Click "Add" for each variable.
5.  **Deploy**: Click "Deploy".

## 5. Post-Deployment

-   Vercel will build your project.
-   Once finished, you will get a live URL (e.g., `your-portfolio.vercel.app`).
-   Test your contact form to ensure the environment variables are working correctly.

## 6. Updating Secrets

If you need to change a secret later:
1.  Go to your project dashboard on Vercel.
2.  Click "Settings" -> "Environment Variables".
3.  Edit the variable and save.
4.  **Redeploy** your application for the changes to take effect (go to "Deployments" -> three dots on latest deployment -> "Redeploy").
