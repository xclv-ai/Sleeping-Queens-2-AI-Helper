
# How to Deploy and Use Your App

You have all the necessary code in your GitHub repository. Follow these two final steps to get your application live and running on your iPhone.

---

## ✅ Step 1: Deploy to Vercel (Free)

Since you have a Vercel account and your code is on GitHub, this process is fast and straightforward.

1.  **Log in to Vercel**: Go to your [Vercel Dashboard](https://vercel.com/dashboard).

2.  **Import Project**: Click the **"Add New..."** button and select **"Project"** from the dropdown menu.
    ![Vercel Add New Project](https://files.readme.io/fe467a2-Vercel_Add_New_Project.png)

3.  **Select Your Repository**: On the "Import Git Repository" page, find your `xclv-ai/Sleeping-Queens-2-AI-Helper` repository and click the **"Import"** button next to it.

4.  **Configure Your Project**:
    *   Vercel will automatically detect the correct settings. You do not need to change anything in the "Build & Output Settings".
    *   **CRITICAL STEP**: Expand the **"Environment Variables"** section. You must add your Gemini API key here for the app to work.
        *   **Name**: `API_KEY`
        *   **Value**: Paste your actual Gemini API key here.
    ![Vercel Environment Variables](https://vercel.com/docs/storage/vercel-kv/kv-environment-variables.png)

5.  **Deploy**: Click the **"Deploy"** button.

Vercel will now build and deploy your application. When it's finished, you will be taken to a congratulations screen with a public URL (like `https://your-project-name.vercel.app`). **This is the link to your live app!**

---

## 📱 Step 2: Install on Your iPhone

1.  **Open Safari**: On your iPhone, open the Safari browser and go to the URL you received from Vercel.

2.  **Share**: Tap the **"Share"** icon (the square with an arrow pointing up) at the bottom of the screen.
    ![iOS Share Icon](https://support.apple.com/library/content/dam/edam/applecare/images/en_US/iOS/ios15-iphone13-pro-safari-share-icon.png)

3.  **Add to Home Screen**: Scroll down the share menu and tap **"Add to Home Screen"**.

4.  **Confirm**: Tap **"Add"** in the top-right corner of the next screen.

That's it! The app icon will now be on your iPhone's home screen. You can launch it just like a native app, without the browser's address bar.
