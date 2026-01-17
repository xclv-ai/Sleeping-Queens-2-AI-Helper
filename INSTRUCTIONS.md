
# Final Instructions: How to Deploy the Working App

The application has been completely rewritten to be more robust and fix all previous errors. Please follow these steps carefully.

---

## Step 1: Clean Up Your GitHub Repository

To avoid any conflicts, you must clean up your repository.

1.  **DELETE** the following files and folders from your `xclv-ai/Sleeping-Queens-2-AI-Helper` repository. **Do not keep them.**
    *   `index.tsx`
    *   `App.tsx`
    *   `sw.js`
    *   `constants.ts`
    *   The entire `components` folder.
    *   The entire `services` folder.

2.  **KEEP** only the following files/folders:
    *   The `api` folder (and the `get-key.ts` file inside it).
    *   `manifest.json`
    *   `metadata.json`
    *   This `INSTRUCTIONS.md` file.

---

## Step 2: Add the New `index.html`

1.  Take the new `index.html` file I have provided.
2.  Add it to your repository. If an `index.html` file already exists, **replace its entire content** with the new code.

---

## Step 3: Deploy on Vercel

1.  Go to your Vercel dashboard.
2.  Find your `sleeping-queens-2-ai-helper` project.
3.  Go to the "Deployments" tab.
4.  Find the latest deployment (it should have triggered automatically after you pushed your changes to GitHub) and click on it.
5.  **CRITICAL:** Ensure your `API_KEY` is still set correctly in the project's settings (`Settings` -> `Environment Variables`).

Your application will now be live and working at the URL provided by Vercel. You can then add it to your iPhone's home screen as described previously.
