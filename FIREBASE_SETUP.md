# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

## Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication** > **Get Started**
2. Enable **Email/Password** authentication
3. (Optional) Enable **Google** sign-in provider

## Step 3: Create Firestore Database

1. Go to **Firestore Database** > **Create database**
2. Start in **production mode** (we'll set up security rules)
3. Choose a location for your database

## Step 4: Set Up Security Rules

Go to **Firestore Database** > **Rules** and paste the following rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blog posts - public read for published, admin write
    match /blogPosts/{postId} {
      allow read: if resource.data.published == true || request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Images - public read, admin write
    match /images/{imageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Page content - public read, admin write
    match /pageContent/{pageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Charter inquiries - public create, admin read/write
    match /charterInquiries/{inquiryId} {
      allow create: if true;
      allow read, write: if request.auth != null;
    }
    
    // Charter registrations - public read/write for guestData, admin full access
    match /charterRegistrations/{registrationId} {
      allow read: if true; // Anyone can read (needed for customer form)
      allow create: if request.auth != null; // Only admin can create
      allow update: if request.auth != null || 
                     (request.resource.data.diff(resource.data).affectedKeys().hasOnly(['guestData', 'status', 'updatedAt'])); // Customer can only update guestData
      allow delete: if request.auth != null;
    }
    
    // Contact messages - public create, admin read/write
    match /contactMessages/{messageId} {
      allow create: if true;
      allow read, write: if request.auth != null;
    }
    
    // Lesson inquiries - public create, admin read/write
    match /lessonInquiries/{inquiryId} {
      allow create: if true;
      allow read, write: if request.auth != null;
    }
    
    // Slideshow images - public read, admin write
    match /slideshowImages/{imageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Home slideshow images - public read, admin write
    match /homeSlideshowImages/{imageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Headshots - public read, admin write
    match /headshots/{headshotId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**Note:** Firestore uses a rules language (not JSON). The format above is the correct syntax for Firestore security rules. If you're using Realtime Database instead, that uses JSON format, but this project uses Firestore.

## Step 5: Get Configuration

1. Go to **Project Settings** (gear icon) > **General**
2. Scroll to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Copy the configuration values

## Step 6: Set Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

## Step 7: Create Admin User

1. Go to **Authentication** > **Users**
2. Click "Add user"
3. Enter email and password for your admin account
4. Save the credentials securely

## Step 8: Install Dependencies

```bash
npm install
```

## Security Features

- ✅ Email/Password authentication
- ✅ Google Sign-in (optional)
- ✅ Protected admin routes
- ✅ Firestore security rules
- ✅ Input validation
- ✅ Only published posts visible to public

## Collections Structure

- `blogPosts` - Blog posts (title, content, excerpt, published, etc.)
- `images` - Image library (url, name, uploadedAt, etc.)
- `pageContent` - Page text content (heroTitle, section1Title, etc.)
- `charterInquiries` - Public charter inquiries from customers
- `charterRegistrations` - Charter registration forms (lockedFields, guestData, status)
- `contactMessages` - General contact form submissions
- `lessonInquiries` - Lesson inquiry form submissions
- `slideshowImages` - Images for Charters page slideshow
- `homeSlideshowImages` - Images for Home page slideshow
- `headshots` - Headshot images for About Me page

## Access Admin Panel

1. Navigate to `/admin/login`
2. Sign in with your admin credentials
3. Access the dashboard with tabs for:
   - Blog Posts management
   - Image Library
   - Page Content editing
   - Charter Management (inquiries and registration forms)

